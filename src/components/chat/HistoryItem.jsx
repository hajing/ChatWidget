import { useState } from 'react'
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

export default function HistoryItem({ title, isActive, onClick, onRename, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(title)

  const handleRenameSubmit = () => {
    const trimmed = draft.trim()
    if (trimmed && trimmed !== title) {
      onRename(trimmed)
    }
    setEditing(false)
  }

  if (editing) {
    return (
      <div className="flex items-center gap-1 px-3 py-2">
        <input
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={handleRenameSubmit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleRenameSubmit()
            if (e.key === 'Escape') setEditing(false)
          }}
          className="flex-1 text-sm bg-transparent border-b border-gray-300 outline-none py-0.5 px-1"
        />
      </div>
    )
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        'group flex items-center justify-between w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
        isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50',
      )}
    >
      <span className="truncate flex-1 min-w-0">{title || '新对话'}</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-600"
          >
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-36">
          <DropdownMenuItem
            onClick={(e) => { e.stopPropagation(); setDraft(title); setEditing(true) }}
            className="text-[13px] cursor-pointer"
          >
            <Pencil className="w-3.5 h-3.5 mr-2" />
            重命名
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => { e.stopPropagation(); onDelete() }}
            className="text-[13px] text-red-600 focus:text-red-600 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5 mr-2" />
            删除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </button>
  )
}
