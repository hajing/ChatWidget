import { useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const MODELS = [
  { id: 'gpt-5', label: 'gpt-5' },
  { id: 'gpt-4.1', label: 'gpt-4.1' },
  { id: 'gpt-4.1-mini', label: 'gpt-4.1-mini' },
  { id: 'gpt-4.1-nano', label: 'gpt-4.1-nano' },
  { id: 'gpt-4o', label: 'gpt-4o' },
]

export default function ModelSelector() {
  const [selected, setSelected] = useState(MODELS[0])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-auto px-2 py-1 text-[13px] text-gray-600 gap-1 font-medium"
        >
          {selected.label}
          <ChevronDown className="w-3.5 h-3.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="start" className="w-44 rounded-xl">
        {MODELS.map((model) => (
          <DropdownMenuItem
            key={model.id}
            onClick={() => setSelected(model)}
            className={cn(
              'flex items-center justify-between text-[13px] cursor-pointer',
              selected.id === model.id ? 'text-gray-900 font-medium' : 'text-gray-600',
            )}
          >
            <span>{model.label}</span>
            {selected.id === model.id && <Check className="w-3.5 h-3.5" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
