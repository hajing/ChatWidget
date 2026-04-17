import { useState } from 'react'
import { Copy, ThumbsUp, ThumbsDown, RefreshCw, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

function ActionButton({ icon: Icon, activeIcon: ActiveIcon, label, onClick }) {
  const [active, setActive] = useState(false)

  const handleClick = () => {
    setActive(true)
    onClick?.()
    if (ActiveIcon) {
      setTimeout(() => setActive(false), 2000)
    }
  }

  const DisplayIcon = active && ActiveIcon ? ActiveIcon : Icon

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClick}
          className={cn(
            'h-7 w-7 text-gray-400 hover:text-gray-600',
            active && 'text-gray-600',
          )}
        >
          <DisplayIcon className="w-4 h-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

export default function MessageActions({ content, onRetry }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(content).catch(() => {})
  }

  return (
    <div className="flex items-center gap-0.5 px-6 py-1">
      <ActionButton icon={Copy} activeIcon={Check} label="Copy" onClick={handleCopy} />
      <ActionButton icon={ThumbsUp} label="Like" />
      <ActionButton icon={ThumbsDown} label="Dislike" />
      <ActionButton icon={RefreshCw} label="Regenerate" onClick={onRetry} />
    </div>
  )
}
