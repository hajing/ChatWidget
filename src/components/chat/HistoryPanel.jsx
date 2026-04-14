import { useNavigate } from 'react-router-dom'
import { ArrowLeft, SquarePen, Clock3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useChatStore } from '@/stores/chat-store'
import HistoryItem from './HistoryItem'

function groupByDate(sessions) {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  const yesterday = today - 86400000
  const weekAgo = today - 7 * 86400000

  const groups = { '今天': [], '昨天': [], '近7天': [], '更早': [] }

  const sorted = Object.values(sessions).sort((a, b) => b.createdAt - a.createdAt)

  for (const s of sorted) {
    if (s.createdAt >= today) groups['今天'].push(s)
    else if (s.createdAt >= yesterday) groups['昨天'].push(s)
    else if (s.createdAt >= weekAgo) groups['近7天'].push(s)
    else groups['更早'].push(s)
  }

  return Object.entries(groups).filter(([, items]) => items.length > 0)
}

export default function HistoryPanel() {
  const navigate = useNavigate()
  const { sessions, activeSessionId, createSession, switchSession, deleteSession, renameSession, resetChat } = useChatStore()

  const groups = groupByDate(sessions)
  const isEmpty = Object.keys(sessions).length === 0

  const handleNewChat = () => {
    resetChat()
    navigate('/')
  }

  const handleSelect = (id) => {
    switchSession(id)
    navigate(`/chat/${id}`)
  }

  const handleBack = () => {
    if (activeSessionId) {
      navigate(`/chat/${activeSessionId}`)
    } else {
      navigate('/')
    }
  }

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between px-4 h-12 shrink-0">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="h-8 w-8 text-gray-500 hover:text-gray-900 shrink-0"
          >
            <ArrowLeft className="w-[18px] h-[18px]" />
          </Button>
          <h1 className="text-sm font-semibold truncate">历史聊天记录</h1>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNewChat}
            className="h-8 w-8 text-gray-500 hover:text-gray-900"
          >
            <SquarePen className="w-[18px] h-[18px]" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-500 hover:text-gray-900"
          >
            <Clock3 className="w-[18px] h-[18px]" />
          </Button>
        </div>
      </header>

      <ScrollArea className="flex-1">
        <div className="px-3 pb-4">
          <button
            onClick={handleNewChat}
            className="flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <SquarePen className="w-4 h-4 text-gray-400" />
            <span>新聊天</span>
          </button>

          {isEmpty && (
            <div className="flex items-center justify-center py-16 text-sm text-gray-400">
              暂无聊天记录
            </div>
          )}

          {groups.map(([label, items]) => (
            <div key={label} className="mt-3">
              <div className="px-3 py-1.5 text-xs text-gray-400 font-medium">{label}</div>
              {items.map((s) => (
                <HistoryItem
                  key={s.id}
                  title={s.title}
                  isActive={s.id === activeSessionId}
                  onClick={() => handleSelect(s.id)}
                  onRename={(t) => renameSession(s.id, t)}
                  onDelete={() => {
                    deleteSession(s.id)
                    if (s.id === activeSessionId) navigate('/')
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
