import { createContext, useContext, useState } from 'react'

const SelectedEventContext = createContext(null)

export function SelectedEventProvider({ children }) {
  const [selectedEvent, setSelectedEvent] = useState(null)
  // selectedEvent shape: { id, name } — just enough for the sidebar label

  return (
    <SelectedEventContext.Provider value={{ selectedEvent, setSelectedEvent }}>
      {children}
    </SelectedEventContext.Provider>
  )
}

export function useSelectedEvent() {
  return useContext(SelectedEventContext)
}
