import { cn } from '@/lib/utils'

export default function ChatWidget({ children, className }) {
  return (
    <div
      className={cn(
        'relative flex flex-col w-full h-full bg-white overflow-hidden',
        className,
      )}
    >
      {children}
    </div>
  )
}
