import { Routes, Route, useParams, useNavigate } from 'react-router-dom'
import { useEffect, useCallback } from 'react'
import ChatWidget from '@/components/chat/ChatWidget'
import ChatHeader from '@/components/chat/ChatHeader'
import StartScreen from '@/components/chat/StartScreen'
import MessageList from '@/components/chat/MessageList'
import Composer from '@/components/chat/Composer'
import HistoryPanel from '@/components/chat/HistoryPanel'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useChatStore } from '@/stores/chat-store'

function ChatView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const store = useChatStore()

  useEffect(() => {
    const { activeSessionId, sessions } = useChatStore.getState()
    if (id && sessions[id] && activeSessionId !== id) {
      store.switchSession(id)
    }
  }, [id])

  const session = id ? store.sessions[id] : null
  const messages = session?.messages || []
  const title = session?.title || ''
  const hasMessages = messages.length > 0
  const busy = store.isThinking || store.isStreaming

  const handleNewChat = useCallback(() => {
    store.resetChat()
    navigate('/')
  }, [store.resetChat, navigate])

  const handleSend = useCallback((content) => {
    store.sendMessage(content)
    const sid = useChatStore.getState().activeSessionId
    if (sid) {
      navigate(`/chat/${sid}`, { replace: true })
    }
  }, [store.sendMessage, navigate])

  return (
    <>
      <ChatHeader
        title={title}
        onNewChat={handleNewChat}
        onToggleHistory={() => navigate('/history')}
      />
      {hasMessages ? (
        <MessageList
          messages={messages}
          isThinking={store.isThinking}
          isStreaming={store.isStreaming}
          onRetry={store.retryLastMessage}
        />
      ) : (
        <StartScreen
          greeting="今天能为你做些什么？"
          onSelectPrompt={handleSend}
        />
      )}
      <Composer onSend={handleSend} disabled={busy} />
    </>
  )
}

function HistoryView() {
  return <HistoryPanel />
}

export default function App() {
  return (
    <TooltipProvider delayDuration={300}>
      <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center p-4">
        <ChatWidget>
          <Routes>
            <Route path="/" element={<ChatView />} />
            <Route path="/chat/:id" element={<ChatView />} />
            <Route path="/history" element={<HistoryView />} />
          </Routes>
        </ChatWidget>
      </div>
    </TooltipProvider>
  )
}
