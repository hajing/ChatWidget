import { Routes, Route } from 'react-router-dom'
import ChatWidget from '@/components/chat/ChatWidget'
import ResizableContainer from '@/components/dev/ResizableContainer'
import { TooltipProvider } from '@/components/ui/tooltip'
import ChatPage from '@/pages/chat'
import HistoryPage from '@/pages/history'

export default function App() {
  return (
    <TooltipProvider delayDuration={300}>
      <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center p-4">
        <ResizableContainer>
          <ChatWidget>
            <Routes>
              <Route path="/" element={<ChatPage />} />
              <Route path="/chat/:id" element={<ChatPage />} />
              <Route path="/history" element={<HistoryPage />} />
            </Routes>
          </ChatWidget>
        </ResizableContainer>
      </div>
    </TooltipProvider>
  )
}
