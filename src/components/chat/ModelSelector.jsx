import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const MODELS = [
  { id: 'gpt-5', label: 'gpt-5' },
  { id: 'gpt-4.1', label: 'gpt-4.1' },
  { id: 'gpt-4.1-mini', label: 'gpt-4.1-mini' },
  { id: 'gpt-4.1-nano', label: 'gpt-4.1-nano' },
  { id: 'gpt-4o', label: 'gpt-4o' },
]

export default function ModelSelector() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(MODELS[0])
  const ref = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex items-center gap-1 px-2 py-1 rounded-lg text-[13px]',
          'text-gray-600 hover:bg-gray-100 transition-colors',
        )}
      >
        <span className="font-medium">{selected.label}</span>
        <ChevronDown className="w-3.5 h-3.5" />
      </button>
      {open && (
        <div className="absolute bottom-full left-0 mb-1 w-44 bg-white rounded-xl shadow-lg ring-1 ring-black/[0.06] py-1 z-50">
          {MODELS.map((model) => (
            <button
              key={model.id}
              onClick={() => { setSelected(model); setOpen(false) }}
              className={cn(
                'flex items-center justify-between w-full px-3 py-2 text-[13px] text-left',
                'hover:bg-gray-50 transition-colors',
                selected.id === model.id && 'text-gray-900 font-medium',
                selected.id !== model.id && 'text-gray-600',
              )}
            >
              <span>{model.label}</span>
              {selected.id === model.id && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
