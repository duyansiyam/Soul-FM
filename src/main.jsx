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

  let mouseX = 0, mouseY = 0
  let ringX  = 0, ringY  = 0
  let visible = false

  // Hide until first mouse move
  cursor.style.opacity = '0'
  ring.style.opacity   = '0'

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY

    cursor.style.left = mouseX + 'px'
    cursor.style.top  = mouseY + 'px'

    if (!visible) {
      visible = true
      cursor.style.opacity = '1'
      ring.style.opacity   = '1'
    }
  })

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

  // Ring trails with lerp
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12
    ringY += (mouseY - ringY) * 0.12
    ring.style.left = ringX + 'px'
    ring.style.top  = ringY + 'px'
    requestAnimationFrame(animateRing)
  }
  animateRing()

  // Hover state — also works for dynamically added elements via delegation
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a, button, [data-cursor-hover]')) {
      document.body.classList.add('cursor-hover')
    }
  })
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest('a, button, [data-cursor-hover]')) {
      document.body.classList.remove('cursor-hover')
    }
  })

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