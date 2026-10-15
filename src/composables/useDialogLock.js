import { onBeforeUnmount } from 'vue'

let lockCount = 0
let previousOverflow = 'auto'

export function useDialogLock() {
  let locked = false
  function lock() {
    if (locked || typeof document === 'undefined') return
    locked = true
    if (lockCount === 0) {
      previousOverflow = document.body.style.overflow || 'auto'
    }
    lockCount += 1
    document.body.style.overflow = 'hidden'
  }
  function unlock() {
    if (!locked || typeof document === 'undefined') return
    locked = false
    lockCount = Math.max(0, lockCount - 1)
    if (lockCount === 0) document.body.style.overflow = previousOverflow || 'auto'
  }
  onBeforeUnmount(unlock)
  return { lock, unlock }
}
