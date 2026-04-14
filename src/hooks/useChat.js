import { useState, useCallback, useRef } from 'react'
import { getMockResponse, generateTitle } from '@/lib/mock-responses'

let nextId = 1

export function useChat() {
  const [messages, setMessages] = useState([])
  const [isStreaming, setIsStreaming] = useState(false)
  const [title, setTitle] = useState('')
  const streamRef = useRef(null)

  const stopStreaming = useCallback(() => {
    if (streamRef.current) {
      clearInterval(streamRef.current)
      streamRef.current = null
    }
    setIsStreaming(false)
  }, [])

  const sendMessage = useCallback((content) => {
    if (!content.trim()) return
    stopStreaming()

    const userMsg = { id: nextId++, role: 'user', content: content.trim() }
    const assistantMsg = { id: nextId++, role: 'assistant', content: '' }

    setMessages((prev) => [...prev, userMsg, assistantMsg])
    setIsStreaming(true)

    if (!title) {
      setTitle(generateTitle(content))
    }

    const fullResponse = getMockResponse(content)
    let charIndex = 0

    streamRef.current = setInterval(() => {
      const chunkSize = Math.floor(Math.random() * 3) + 2
      charIndex = Math.min(charIndex + chunkSize, fullResponse.length)
      const partial = fullResponse.slice(0, charIndex)

      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMsg.id ? { ...m, content: partial } : m,
        ),
      )

      if (charIndex >= fullResponse.length) {
        clearInterval(streamRef.current)
        streamRef.current = null
        setIsStreaming(false)
      }
    }, 15)
  }, [title, stopStreaming])

  const resetChat = useCallback(() => {
    stopStreaming()
    setMessages([])
    setTitle('')
  }, [stopStreaming])

  const retryLastMessage = useCallback(() => {
    const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user')
    if (!lastUserMsg) return

    stopStreaming()
    setMessages((prev) => {
      const lastUserIdx = prev.findLastIndex((m) => m.role === 'user')
      return prev.slice(0, lastUserIdx)
    })

    setTimeout(() => sendMessage(lastUserMsg.content), 50)
  }, [messages, sendMessage, stopStreaming])

  return {
    messages,
    isStreaming,
    title,
    sendMessage,
    resetChat,
    retryLastMessage,
  }
}
