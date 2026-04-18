import { Routes, Route } from 'react-router-dom'
import MainStage from '@/components/stage/MainStage'
import ChatWidget from '@/components/chat/ChatWidget'
import ResizableChatPanel from '@/components/dev/ResizableChatPanel'
import { TooltipProvider } from '@/components/ui/tooltip'
import ChatPage from '@/pages/chat'
import HistoryPage from '@/pages/history'

export default function App() {
  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex h-screen w-screen overflow-hidden">
        <div className="flex-1 min-w-0 h-full">
          <MainStage />
        </div>
        <ResizableChatPanel>
          <ChatWidget>
            <Routes>
              <Route path="/" element={<ChatPage />} />
              <Route path="/chat/:id" element={<ChatPage />} />
              <Route path="/history" element={<HistoryPage />} />
            </Routes>
          </ChatWidget>
        </ResizableChatPanel>
      </div>
    </TooltipProvider>
  )
}
