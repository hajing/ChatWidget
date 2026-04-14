import { MessageCircle, LayoutGrid, Sparkles, Code2, Server } from 'lucide-react'
import { Button } from '@/components/ui/button'

const STARTER_PROMPTS = [
  { icon: MessageCircle, text: 'What is ChatKit?' },
  { icon: LayoutGrid, text: 'Show me an example widget' },
  { icon: Sparkles, text: 'What can I customize?' },
  { icon: Code2, text: 'How do I use client side tools?' },
  { icon: Server, text: 'Server side tools' },
]

export default function StartScreen({ greeting, onSelectPrompt }) {
  return (
    <div className="flex-1 flex flex-col items-start justify-end px-6 pb-4">
      <h2 className="text-[22px] font-semibold text-gray-900 mb-4">
        {greeting}
      </h2>
      <div className="flex flex-col gap-2 w-full">
        {STARTER_PROMPTS.map(({ icon: Icon, text }) => (
          <Button
            key={text}
            variant="ghost"
            onClick={() => onSelectPrompt(text)}
            className="group flex items-center gap-3 w-full justify-start h-auto px-3 py-2.5 rounded-xl text-sm text-gray-700 font-normal"
          >
            <span className="flex items-center justify-center w-6 h-6 shrink-0 text-gray-400 group-hover:text-gray-600 transition-colors">
              <Icon className="w-[18px] h-[18px]" />
            </span>
            <span>{text}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}
