import { useState, useRef, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'chat-panel-width'
const DEFAULT_W = 420
const MIN_W = 320
const MAX_RATIO = 0.7
const MAX_ABS = 960

function getDefaultWidth() {
  if (typeof window === 'undefined') return DEFAULT_W
  const saved = Number(localStorage.getItem(STORAGE_KEY))
  if (Number.isFinite(saved) && saved >= MIN_W) return saved
  return DEFAULT_W
}

function clamp(w) {
  if (typeof window === 'undefined') return Math.max(w, MIN_W)
  const maxW = Math.min(window.innerWidth * MAX_RATIO, MAX_ABS)
  return Math.max(MIN_W, Math.min(w, maxW))
}

export default function ResizableChatPanel({ children, className }) {
  const [width, setWidth] = useState(() => clamp(getDefaultWidth()))
  const dragging = useRef(false)
  const startX = useRef(0)
  const startW = useRef(0)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(width))
  }, [width])

  useEffect(() => {
    const onResize = () => setWidth((w) => clamp(w))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const onPointerDown = useCallback((e) => {
    e.preventDefault()
    dragging.current = true
    startX.current = e.clientX
    startW.current = width
    document.body.style.userSelect = 'none'
    document.body.style.cursor = 'ew-resize'
  }, [width])

  useEffect(() => {
    const onPointerMove = (e) => {
      if (!dragging.current) return
      const dx = e.clientX - startX.current
      setWidth(clamp(startW.current - dx))
    }
    const onPointerUp = () => {
      if (!dragging.current) return
      dragging.current = false
      document.body.style.userSelect = ''
      document.body.style.cursor = ''
    }
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
    }
  }, [])

  const reset = () => setWidth(clamp(DEFAULT_W))

  return (
    <div
      className={`relative h-full shrink-0 border-l border-gray-200 ${className || ''}`}
      style={{ width }}
    >
      <div
        onPointerDown={onPointerDown}
        onDoubleClick={reset}
        title="拖动调整宽度，双击恢复默认"
        className="group absolute inset-y-0 -left-1 w-2 cursor-ew-resize z-20 flex items-center justify-center"
      >
        <div className="h-12 w-[3px] rounded-full bg-black/10 group-hover:bg-black/30 group-active:bg-black/40 transition-colors" />
      </div>
      {children}
    </div>
  )
}
