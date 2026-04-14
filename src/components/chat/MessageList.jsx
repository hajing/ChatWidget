import { useEffect, useRef } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import UserMessage from './UserMessage'
import AssistantMessage from './AssistantMessage'
import MessageActions from './MessageActions'

export default function MessageList({ messages, isStreaming, onRetry }) {
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
          return (
            <div key={msg.id}>
              <AssistantMessage
                content={msg.content}
                isStreaming={isStreaming && isLast}
              />
              {msg.content && !(isStreaming && isLast) && (
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
