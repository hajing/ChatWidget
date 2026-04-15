import { useState, useCallback, useRef, useEffect } from 'react'

const DEFAULT_W = 448
const DEFAULT_H = 820
const MIN_W = 320
const MIN_H = 480
const HANDLE_GAP = 1

export default function ResizableContainer({ children }) {
  const [size, setSize] = useState({ w: DEFAULT_W, h: DEFAULT_H })
  const dragging = useRef(null)
  const startPos = useRef({ x: 0, y: 0 })
  const startSize = useRef({ w: 0, h: 0 })

  const onPointerDown = useCallback((edge, e) => {
    e.preventDefault()
    dragging.current = edge
    startPos.current = { x: e.clientX, y: e.clientY }
    startSize.current = { ...size }
    document.body.style.userSelect = 'none'
  }, [size])

  useEffect(() => {
    const onPointerMove = (e) => {
      if (!dragging.current) return
      const dx = e.clientX - startPos.current.x
      const dy = e.clientY - startPos.current.y
      const edge = dragging.current

      setSize(() => {
        let w = startSize.current.w
        let h = startSize.current.h

        if (edge === 'right') w = Math.max(MIN_W, w + dx * 2)
        if (edge === 'left') w = Math.max(MIN_W, w - dx * 2)
        if (edge === 'bottom') h = Math.max(MIN_H, h + dy)

        return { w, h }
      })
    }

    const onPointerUp = () => {
      dragging.current = null
      document.body.style.userSelect = ''
    }

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
    }
  }, [])

  const maxH = typeof window !== 'undefined' ? window.innerHeight - 64 : 800

  return (
    <div
      className="relative"
      style={{ width: size.w, height: Math.min(size.h, maxH) }}
    >
      {children}

      {/* Left handle */}
      <div
        onPointerDown={(e) => onPointerDown('left', e)}
        className="group absolute inset-y-0 flex items-center justify-center cursor-ew-resize"
        style={{ width: 28, left: -(HANDLE_GAP + 28) }}
      >
        <div className="w-1 h-12 rounded-full bg-black/15 group-hover:bg-black/25 group-active:bg-black/35 transition-colors" />
      </div>

      {/* Right handle */}
      <div
        onPointerDown={(e) => onPointerDown('right', e)}
        className="group absolute inset-y-0 flex items-center justify-center cursor-ew-resize"
        style={{ width: 28, right: -(HANDLE_GAP + 28) }}
      >
        <div className="w-1 h-12 rounded-full bg-black/15 group-hover:bg-black/25 group-active:bg-black/35 transition-colors" />
      </div>

      {/* Bottom handle */}
      <div
        onPointerDown={(e) => onPointerDown('bottom', e)}
        className="group absolute left-0 right-0 flex items-center justify-center cursor-ns-resize"
        style={{ height: 28, bottom: -(HANDLE_GAP + 28) }}
      >
        <div className="h-1 w-16 rounded-full bg-black/15 group-hover:bg-black/25 group-active:bg-black/35 transition-colors" />
      </div>
    </div>
  )
}
