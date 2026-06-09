export const BASE = import.meta.env.VITE_ADMIN_BASE || '/xpanel-a9f2'

export const emptyDateDraft = {
  start_date: '',
  end_date: '',
  start_time: '',
  end_time: '',
}

export const POSTER_WIDTH = 425
export const POSTER_HEIGHT = 601
export const POSTER_QUALITY = 0.82

export const TODAY = new Date().toISOString().split('T')[0]
