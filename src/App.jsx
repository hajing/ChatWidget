import ChatWidget from '@/components/chat/ChatWidget'
import ChatHeader from '@/components/chat/ChatHeader'
import StartScreen from '@/components/chat/StartScreen'
import MessageList from '@/components/chat/MessageList'
import Composer from '@/components/chat/Composer'
import { useChat } from '@/hooks/useChat'
import { TooltipProvider } from '@/components/ui/tooltip'

export default function App() {
  const { messages, isThinking, isStreaming, title, sendMessage, resetChat, retryLastMessage } = useChat()

  const hasMessages = messages.length > 0
  const busy = isThinking || isStreaming

  return (
    <TooltipProvider delayDuration={300}>
      <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center p-4">
        <ChatWidget>
          <ChatHeader
            title={title}
            onNewChat={resetChat}
            onToggleHistory={() => {}}
          />
          {hasMessages ? (
            <MessageList
              messages={messages}
              isThinking={isThinking}
              isStreaming={isStreaming}
              onRetry={retryLastMessage}
            />
          ) : (
            <StartScreen
              greeting="今天能为你做些什么？"
              onSelectPrompt={sendMessage}
            />
          )}
          <Composer onSend={sendMessage} disabled={busy} />
        </ChatWidget>
      </div>
    </TooltipProvider>
  )
}
