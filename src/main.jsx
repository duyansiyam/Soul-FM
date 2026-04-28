import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// — Cursor logic
function initCursor() {
  const cursor = document.getElementById('cursor')
  const ring   = document.getElementById('cursor-ring')
  if (!cursor || !ring) return
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

  let mouseX = 0, mouseY = 0
  let cursorX = -100, cursorY = -100
  let ringX  = 0, ringY  = 0
  let visible = false
  let hovering = false

  // Hide until first mouse move
  cursor.style.opacity = '0'
  ring.style.opacity   = '0'

  window.addEventListener('pointermove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY

    if (!visible) {
      visible = true
      cursor.style.opacity = '1'
      ring.style.opacity   = '1'
    }
  }, { passive: true })

  // Hide when mouse leaves the window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0'
    ring.style.opacity   = '0'
    visible = false
  })
  document.addEventListener('mouseenter', () => {
    if (visible) {
      cursor.style.opacity = '1'
      ring.style.opacity   = '1'
    }
  })

  // Keep all cursor movement on the compositor with transform-backed CSS vars.
  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.65
    cursorY += (mouseY - cursorY) * 0.65
    ringX += (mouseX - ringX) * 0.12
    ringY += (mouseY - ringY) * 0.12
    cursor.style.setProperty('--cursor-x', `${cursorX}px`)
    cursor.style.setProperty('--cursor-y', `${cursorY}px`)
    ring.style.setProperty('--ring-x', `${ringX}px`)
    ring.style.setProperty('--ring-y', `${ringY}px`)
    requestAnimationFrame(animateCursor)
  }
  animateCursor()

  // Hover state — also works for dynamically added elements via delegation
  document.addEventListener('pointerover', (e) => {
    const isHoverTarget = Boolean(e.target.closest('a, button, [data-cursor-hover]'))
    if (isHoverTarget && !hovering) {
      hovering = true
      document.body.classList.add('cursor-hover')
    }
  }, { passive: true })
  document.addEventListener('pointerout', (e) => {
    const hoverTarget = e.target.closest('a, button, [data-cursor-hover]')
    const stillInside = hoverTarget && e.relatedTarget instanceof Element && hoverTarget.contains(e.relatedTarget)
    if (hoverTarget && !stillInside && hovering) {
      hovering = false
      document.body.classList.remove('cursor-hover')
    }
  }, { passive: true })

  // Click pulse
  window.addEventListener('mousedown', () => cursor.classList.add('cursor-click'))
  window.addEventListener('mouseup',   () => cursor.classList.remove('cursor-click'))
}

// Run after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCursor)
} else {
  initCursor()
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
