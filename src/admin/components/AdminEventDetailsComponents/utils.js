import { POSTER_WIDTH, POSTER_HEIGHT, POSTER_QUALITY } from './constants'

export function formatDisplayDate(dateString) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-PH', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatDisplayTime(timeString) {
  if (!timeString) return ''
  const [hours, minutes] = timeString.split(':')
  const date = new Date()
  date.setHours(Number(hours))
  date.setMinutes(Number(minutes))
  return date.toLocaleTimeString('en-PH', {
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function resizeImageToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const imageUrl = URL.createObjectURL(file)
    const image = new Image()

    image.onload = () => {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')

      if (!context) {
        URL.revokeObjectURL(imageUrl)
        reject(new Error('Canvas is not supported in this browser.'))
        return
      }

      canvas.width = POSTER_WIDTH
      canvas.height = POSTER_HEIGHT

      const sourceRatio = image.width / image.height
      const targetRatio = POSTER_WIDTH / POSTER_HEIGHT
      const sourceWidth = sourceRatio > targetRatio ? image.height * targetRatio : image.width
      const sourceHeight = sourceRatio > targetRatio ? image.height : image.width / targetRatio
      const sourceX = (image.width - sourceWidth) / 2
      const sourceY = (image.height - sourceHeight) / 2

      context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, POSTER_WIDTH, POSTER_HEIGHT)

      URL.revokeObjectURL(imageUrl)
      resolve(canvas.toDataURL('image/jpeg', POSTER_QUALITY))
    }

    image.onerror = () => {
      URL.revokeObjectURL(imageUrl)
      reject(new Error('Unable to load image.'))
    }

    image.src = imageUrl
  })
}
