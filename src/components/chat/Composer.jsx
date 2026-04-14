import { useState, useRef, useEffect } from 'react'
import { Plus, ArrowUp, Atom } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import ModelSelector from './ModelSelector'

export default function Composer({ onSend, disabled }) {
  const [value, setValue] = useState('')
  const textareaRef = useRef(null)

  useEffect(() => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = Math.min(ta.scrollHeight, 150) + 'px'
  }, [value])

  const handleSubmit = () => {
    if (!value.trim() || disabled) return
    onSend(value)
    setValue('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const canSend = value.trim().length > 0 && !disabled

  return (
    <div className="shrink-0 px-3 pb-3">
      <div className="rounded-2xl border border-gray-200 bg-white focus-within:border-gray-300 transition-colors">
        <div className="flex items-end">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="给 AI 发消息"
            disabled={disabled}
            rows={1}
            className={cn(
              'flex-1 resize-none border-0 bg-transparent px-4 pt-3 pb-2',
              'text-[15px] placeholder:text-gray-400 outline-none',
              'min-h-[44px] max-h-[150px]',
            )}
          />
        </div>
        <div className="flex items-center justify-between px-2 pb-2">
          <div className="flex items-center gap-0.5">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-500"
                >
                  <Plus className="w-[18px] h-[18px]" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>添加附件</TooltipContent>
            </Tooltip>
            <ModelSelector />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-auto px-2 py-1 text-[13px] text-gray-500 gap-1.5"
                >
                  <Atom className="w-4 h-4" />
                  <span>Docs</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Search docs</TooltipContent>
            </Tooltip>
          </div>
          <button
            onClick={handleSubmit}
            disabled={!canSend}
            className={cn(
              'inline-flex items-center justify-center w-8 h-8 rounded-full transition-colors',
              canSend
                ? 'bg-black text-white hover:bg-gray-800'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed',
            )}
          >
            <ArrowUp className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>
      <p className="text-[11px] text-gray-400 text-center mt-2">
        AI can make mistakes
      </p>
    </div>
  )
}
