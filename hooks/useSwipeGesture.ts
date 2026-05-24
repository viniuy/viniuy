import { useEffect, useRef } from 'react'

export function useSwipeGesture(onSwipeRight: () => void, onSwipeLeft: () => void) {
  const startX = useRef<number | null>(null)

  useEffect(() => {
    function onTouchStart(e: TouchEvent) {
      startX.current = e.touches[0].clientX
    }

    function onTouchEnd(e: TouchEvent) {
      if (startX.current === null) return
      const diff = e.changedTouches[0].clientX - startX.current
      if (Math.abs(diff) < 40) return  // ignore small movements

      if (diff > 0 && startX.current < 32) {
        onSwipeRight()
      } else if (diff < 0) {
        onSwipeLeft()
      }
      startX.current = null
    }

    window.addEventListener('touchstart', onTouchStart)
    window.addEventListener('touchend', onTouchEnd)
    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [onSwipeRight, onSwipeLeft])
}