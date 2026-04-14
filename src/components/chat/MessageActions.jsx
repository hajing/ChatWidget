import { useState } from 'react'
import { Copy, ThumbsUp, ThumbsDown, RefreshCw, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

function ActionButton({ icon: Icon, activeIcon: ActiveIcon, label, onClick, className }) {
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
    <button
      onClick={handleClick}
      className={cn(
        'inline-flex items-center justify-center rounded-md p-1.5',
        'text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors',
        active && 'text-gray-600',
        className,
      )}
      title={label}
    >
      <DisplayIcon className="w-4 h-4" />
    </button>
  )
}

export default function MessageActions({ content, onRetry }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(content).catch(() => {})
  }

  return (
    <div className="flex items-center gap-0.5 px-6 py-1">
      <ActionButton icon={Copy} activeIcon={Check} label="复制" onClick={handleCopy} />
      <ActionButton icon={ThumbsUp} label="赞" />
      <ActionButton icon={ThumbsDown} label="踩" />
      <ActionButton icon={RefreshCw} label="重新生成" onClick={onRetry} />
    </div>
  )
}
