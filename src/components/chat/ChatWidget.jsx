import { cn } from '@/lib/utils'

export default function ChatWidget({ children, className }) {
  return (
    <div
      className={cn(
        'relative flex flex-col w-full h-full min-w-[320px] min-h-[480px] bg-white rounded-2xl overflow-hidden',
        'shadow-[0_10px_40px_-12px_rgba(0,0,0,0.2)] ring-1 ring-black/[0.06]',
        className,
      )}
    >
      {children}
    </div>
  )
}
