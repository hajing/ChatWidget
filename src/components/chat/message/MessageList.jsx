import { useEffect, useRef } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import UserMessage from './UserMessage'
import AssistantMessage from './AssistantMessage'
import ThinkingBlock from './ThinkingBlock'
import MessageActions from './MessageActions'

export default function MessageList({ messages, isThinking, isStreaming, onRetry }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <ScrollArea className="flex-1">
      <div className="py-2">
        {messages.map((msg, idx) => {
          const isLast = idx === messages.length - 1
          if (msg.role === 'user') {
            return <UserMessage key={msg.id} content={msg.content} />
          }
          const thinkingActive = isThinking && isLast
          const streamingActive = isStreaming && isLast
          const busy = thinkingActive || streamingActive
          return (
            <div key={msg.id}>
              {msg.thinking && (
                <ThinkingBlock thinking={msg.thinking} isActive={thinkingActive} />
              )}
              {msg.content && (
                <AssistantMessage
                  content={msg.content}
                  isStreaming={streamingActive}
                />
              )}
              {msg.content && !busy && (
                <MessageActions content={msg.content} onRetry={onRetry} />
              )}
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  )
}
