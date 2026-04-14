import { SquarePen, Clock3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'

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
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onNewChat}
              disabled={!showTitle}
              className="h-8 w-8 text-gray-500 hover:text-gray-900"
            >
              <SquarePen className="w-[18px] h-[18px]" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>新聊天</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleHistory}
              className="h-8 w-8 text-gray-500 hover:text-gray-900"
            >
              <Clock3 className="w-[18px] h-[18px]" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>对话历史记录</TooltipContent>
        </Tooltip>
      </div>
    </header>
  )
}
