import { SquarePen, Clock3 } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ChatHeader({ title, onNewChat, onToggleHistory }) {
  const showTitle = !!title

  return (
    <header className="flex items-center justify-between px-4 h-12 shrink-0">
      <div className="flex-1 min-w-0">
        {showTitle && (
          <h1 className="text-sm font-semibold truncate">{title}</h1>
        )}
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={onNewChat}
          className={cn(
            'inline-flex items-center justify-center rounded-lg p-2',
            'text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors',
            'disabled:opacity-40 disabled:pointer-events-none',
          )}
          disabled={!showTitle}
          title="新聊天"
        >
          <SquarePen className="w-[18px] h-[18px]" />
        </button>
        <button
          onClick={onToggleHistory}
          className={cn(
            'inline-flex items-center justify-center rounded-lg p-2',
            'text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors',
          )}
          title="对话历史记录"
        >
          <Clock3 className="w-[18px] h-[18px]" />
        </button>
      </div>
    </header>
  )
}
