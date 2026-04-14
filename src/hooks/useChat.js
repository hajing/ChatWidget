import { useState, useCallback, useRef } from 'react'
import { getMockResponse, generateTitle } from '@/lib/mock-responses'

let nextId = 1

export function useChat() {
  const [messages, setMessages] = useState([])
  const [isThinking, setIsThinking] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const [title, setTitle] = useState('')
  const streamRef = useRef(null)
  const phaseRef = useRef(null)

  const stopAll = useCallback(() => {
    if (streamRef.current) {
      clearInterval(streamRef.current)
      streamRef.current = null
    }
    if (phaseRef.current) {
      clearTimeout(phaseRef.current)
      phaseRef.current = null
    }
    setIsThinking(false)
    setIsStreaming(false)
  }, [])

  const streamText = useCallback((msgId, field, fullText, speed, onDone) => {
    let charIndex = 0
    streamRef.current = setInterval(() => {
      const chunkSize = Math.floor(Math.random() * 3) + 2
      charIndex = Math.min(charIndex + chunkSize, fullText.length)
      const partial = fullText.slice(0, charIndex)

      setMessages((prev) =>
        prev.map((m) =>
          m.id === msgId ? { ...m, [field]: partial } : m,
        ),
      )

      if (charIndex >= fullText.length) {
        clearInterval(streamRef.current)
        streamRef.current = null
        onDone?.()
      }
    }, speed)
  }, [])

  const sendMessage = useCallback((content) => {
    if (!content.trim()) return
    stopAll()

    const userMsg = { id: nextId++, role: 'user', content: content.trim() }
    const assistantMsg = { id: nextId++, role: 'assistant', thinking: '', content: '' }

    setMessages((prev) => [...prev, userMsg, assistantMsg])

    if (!title) {
      setTitle(generateTitle(content))
    }

    const response = getMockResponse(content)

    setIsThinking(true)
    streamText(assistantMsg.id, 'thinking', response.thinking, 20, () => {
      setIsThinking(false)
      phaseRef.current = setTimeout(() => {
        setIsStreaming(true)
        streamText(assistantMsg.id, 'content', response.content, 15, () => {
          setIsStreaming(false)
        })
      }, 400)
    })
  }, [title, stopAll, streamText])

  const resetChat = useCallback(() => {
    stopAll()
    setMessages([])
    setTitle('')
  }, [stopAll])

  const retryLastMessage = useCallback(() => {
    const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user')
    if (!lastUserMsg) return

    stopAll()
    setMessages((prev) => {
      const lastUserIdx = prev.findLastIndex((m) => m.role === 'user')
      return prev.slice(0, lastUserIdx)
    })

    setTimeout(() => sendMessage(lastUserMsg.content), 50)
  }, [messages, sendMessage, stopAll])

  return {
    messages,
    isThinking,
    isStreaming,
    title,
    sendMessage,
    resetChat,
    retryLastMessage,
  }
}
