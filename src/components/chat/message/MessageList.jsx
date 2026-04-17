import { useEffect, useRef } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import UserMessage from './UserMessage'
import AssistantMessage from './AssistantMessage'
import ThinkingBlock from './ThinkingBlock'
import MessageActions from './MessageActions'
import { TopBlocks, BottomBlocks } from './blocks/BlockRenderer'

export default function MessageList({ messages, isThinking, isStreaming, onRetry }) {
  const bottomRef = useRef(null)

  const lastMsg = messages[messages.length - 1]
  // Track block mutations (task-list done count) for auto-scroll
  const blocksSig = lastMsg?.blocks
    ?.map((b, i) => {
      if (b.type === 'task-list') return `${i}:${b.items.filter((it) => it.done).length}`
      return `${i}:${b.status || ''}`
    })
    .join(',') || ''
  const scrollDep = lastMsg
    ? `${lastMsg.id}-${lastMsg.content?.length || 0}-${blocksSig}-${lastMsg.thinking?.length || 0}`
    : ''

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [scrollDep])

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
              <TopBlocks blocks={msg.blocks} />
              {msg.thinking && (
                <ThinkingBlock thinking={msg.thinking} isActive={thinkingActive} />
              )}
              {msg.content && (
                <AssistantMessage
                  content={msg.content}
                  isStreaming={streamingActive}
                />
              )}
              <BottomBlocks blocks={msg.blocks} />
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
