import { useState, useEffect, useRef } from 'react'
import { ChevronRight, Brain } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ThinkingBlock({ thinking, isActive }) {
  const [expanded, setExpanded] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const startRef = useRef(Date.now())

  useEffect(() => {
    if (!isActive) return
    startRef.current = Date.now()
    const timer = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startRef.current) / 1000))
    }, 1000)
    return () => clearInterval(timer)
  }, [isActive])

  useEffect(() => {
    if (isActive) {
      setExpanded(true)
    }
  }, [isActive])

  if (!thinking) return null

  const label = isActive
    ? `思考中${elapsed > 0 ? ` ${elapsed}s` : '...'}`
    : `已深度思考${elapsed > 0 ? ` (${elapsed}s)` : ''}`

  return (
    <div className="px-6 py-1.5">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-gray-700 transition-colors"
      >
        {isActive ? (
          <Brain className="w-4 h-4 animate-pulse text-amber-500" />
        ) : (
          <ChevronRight
            className={cn(
              'w-3.5 h-3.5 transition-transform duration-200',
              expanded && 'rotate-90',
            )}
          />
        )}
        <span className={cn(isActive && 'text-amber-600 font-medium')}>
          {label}
        </span>
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-300 ease-in-out',
          expanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div className="mt-2 pl-5 border-l-2 border-gray-200 text-[13px] text-gray-500 leading-relaxed italic">
          {thinking}
          {isActive && (
            <span className="inline-block w-[3px] h-[14px] bg-amber-400 ml-0.5 animate-pulse align-text-bottom" />
          )}
        </div>
      </div>
    </div>
  )
}
