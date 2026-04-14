import { cn } from '@/lib/utils'

export default function ChatWidget({ children, className }) {
  return (
    <div
      className={cn(
        'relative flex flex-col w-[448px] h-[820px] max-h-[90vh] bg-white rounded-2xl',
        'shadow-[0_10px_40px_-12px_rgba(0,0,0,0.2)] ring-1 ring-black/[0.06]',
        className,
      )}
    >
      {children}
    </div>
  )
}
