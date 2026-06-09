import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase'
import { BASE, emptyDateDraft } from './constants'
import { resizeImageToDataUrl } from './utils'

export function useEventForm() {
  const navigate = useNavigate()
  const { eventId } = useParams()
  const descriptionRef = useRef(null)

  const [loading, setLoading] = useState(false)
  const [posterPreview, setPosterPreview] = useState('')
  const [posterImageUrl, setPosterImageUrl] = useState('')
  const [locationType, setLocationType] = useState('venue')

  const [form, setForm] = useState({
    title: '',
    category: '',
    tag: '',
    ageRestriction: 'No age restriction',
    ageRequirement: '',
    ageCustomNote: '',
    timezone: '(GMT+8) Manila, Philippines',
    dateTimes: [],
    dateDraft: emptyDateDraft,
    editingDateIndex: null,
    showDateEditor: true,
    hideDateTime: false,
    location_name: '',
    location_address: '',
    description: '',
    status: 'published',
  })

  const updateForm = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  // ── Load existing event ──────────────────────────────────────────────────
  useEffect(() => {
    const fetchEvent = async () => {
      if (!eventId) return
      try {
        setLoading(true)
        const eventSnap = await getDoc(doc(db, 'events', eventId))

        if (!eventSnap.exists()) {
          alert('Event not found.')
          navigate(`${BASE}/events`)
          return
        }

        const event = eventSnap.data()
        const dateTimes = Array.isArray(event.dateTimes)
          ? event.dateTimes
          : event.start_date
            ? [{
                start_date: event.start_date || '',
                end_date: event.end_date || event.start_date || '',
                start_time: event.start_time || '',
                end_time: event.end_time || '',
              }]
            : []
        const description = event.description || ''

        setForm((prev) => ({
          ...prev,
          title: event.title || '',
          category: event.category || '',
          tag: event.tag || '',
          ageRestriction: event.ageRestriction || 'No age restriction',
          ageRequirement: event.ageRequirement || '',
          ageCustomNote: event.ageCustomNote || '',
          timezone: event.timezone || '(GMT+8) Manila, Philippines',
          dateTimes,
          dateDraft: emptyDateDraft,
          editingDateIndex: null,
          showDateEditor: dateTimes.length === 0,
          hideDateTime: Boolean(event.hideDateTime),
          location_name: event.location_name || event.venue_name || event.venue?.name || '',
          location_address:
            event.location_address ||
            event.venue_address ||
            [event.venue?.street, event.venue?.city, event.venue?.province].filter(Boolean).join(', '),
          description,
          status: event.status || 'published',
        }))

        setLocationType(event.location_type || 'venue')
        setPosterPreview(event.poster_image || '')
        setPosterImageUrl(event.poster_image || '')

        if (descriptionRef.current) {
          descriptionRef.current.innerHTML = description
        }
      } catch (error) {
        console.error(error)
        alert('Failed to load event.')
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [eventId, navigate])

  // ── Poster ───────────────────────────────────────────────────────────────
  const handlePosterUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      alert('Please choose an image file.')
      return
    }
    try {
      const posterDataUrl = await resizeImageToDataUrl(file)
      setPosterPreview(posterDataUrl)
      setPosterImageUrl(posterDataUrl)
    } catch (error) {
      console.error(error)
      alert('Failed to read this image. Please try another image file.')
    }
  }

  // ── Date/Time ────────────────────────────────────────────────────────────
  const validateDateTime = () => {
    const draft = form.dateDraft

    if (!draft.start_date || !draft.end_date || !draft.start_time || !draft.end_time) {
      alert('Please complete the date and time first.')
      return false
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const startDateOnly = new Date(`${draft.start_date}T00:00`)
    const endDateOnly = new Date(`${draft.end_date}T00:00`)
    const startDateTime = new Date(`${draft.start_date}T${draft.start_time}`)
    const endDateTime = new Date(`${draft.end_date}T${draft.end_time}`)
    const now = new Date()

    if (startDateOnly < today) { alert('Start date cannot be in the past.'); return false }
    if (endDateOnly < startDateOnly) { alert('End date cannot be earlier than start date.'); return false }
    if (startDateTime < now) { alert('Start time cannot be in the past.'); return false }
    if (endDateTime <= startDateTime) { alert('End date and time must be later than start date and time.'); return false }

    const maxFuture = new Date()
    maxFuture.setFullYear(maxFuture.getFullYear() + 5)
    if (startDateTime > maxFuture) { alert('Event date cannot be more than 5 years in the future.'); return false }

    const duplicate = form.dateTimes.some(
      (item, index) =>
        index !== form.editingDateIndex &&
        item.start_date === draft.start_date &&
        item.end_date === draft.end_date &&
        item.start_time === draft.start_time &&
        item.end_time === draft.end_time
    )
    if (duplicate) { alert('This date and time already exists.'); return false }

    if (form.dateTimes.length >= 20 && form.editingDateIndex === null) {
      alert('You can only add up to 20 date and time schedules.')
      return false
    }

    return true
  }

  const handleSaveDateTime = () => {
    if (!validateDateTime()) return
    const draft = { ...form.dateDraft }

    if (form.editingDateIndex !== null) {
      const updated = [...form.dateTimes]
      updated[form.editingDateIndex] = draft
      updateForm('dateTimes', updated)
      updateForm('editingDateIndex', null)
    } else {
      updateForm('dateTimes', [...form.dateTimes, draft])
    }

    updateForm('dateDraft', emptyDateDraft)
    updateForm('showDateEditor', false)
  }

  const handleEditDateTime = (item, index) => {
    updateForm('dateDraft', item)
    updateForm('editingDateIndex', index)
    updateForm('showDateEditor', true)
  }

  const handleDeleteDateTime = (index) => {
    const updated = form.dateTimes.filter((_, i) => i !== index)
    updateForm('dateTimes', updated)
    if (form.editingDateIndex === index) {
      updateForm('dateDraft', emptyDateDraft)
      updateForm('editingDateIndex', null)
    }
  }

  // ── Description rich-text ────────────────────────────────────────────────
  const runCommand = (command, value = null) => {
    descriptionRef.current?.focus()
    document.execCommand(command, false, value)
    updateForm('description', descriptionRef.current?.innerHTML || '')
  }

  // ── Submit ───────────────────────────────────────────────────────────────
  const validateBeforeSubmit = () => {
    if (!form.title.trim()) { alert('Event name is required.'); return false }
    if (!form.category.trim()) { alert('Category is required.'); return false }
    if (!form.timezone) { alert('Timezone is required.'); return false }
    if (form.dateTimes.length === 0) { alert('Please add at least one date and time schedule.'); return false }
    if (form.ageRestriction === 'Must be' && !form.ageRequirement.trim()) { alert('Please enter the required age, example: 18+.'); return false }
    if (form.ageRestriction === 'Custom' && !form.ageCustomNote.trim()) { alert('Please enter your custom age restriction note.'); return false }
    if (locationType === 'venue') {
      if (!form.location_name.trim()) { alert('Location name is required.'); return false }
      if (!form.location_address.trim()) { alert('Location detail is required.'); return false }
    }
    const descriptionText = descriptionRef.current?.innerText?.trim() || ''
    if (descriptionText.length < 20) { alert('Description must be at least 20 characters.'); return false }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateBeforeSubmit()) return

    try {
      setLoading(true)
      const firstDate = form.dateTimes[0]

      const eventPayload = {
        title: form.title.trim(),
        category: form.category.trim(),
        tag: form.tag.trim(),
        ageRestriction: form.ageRestriction,
        ageRequirement: form.ageRequirement.trim(),
        ageCustomNote: form.ageCustomNote.trim(),
        timezone: form.timezone,
        dateTimes: form.dateTimes,
        event_date: firstDate.start_date,
        start_date: firstDate.start_date,
        end_date: firstDate.end_date,
        start_time: firstDate.start_time,
        end_time: firstDate.end_time,
        hideDateTime: form.hideDateTime,
        location_type: locationType,
        location_name: form.location_name.trim(),
        location_address: form.location_address.trim(),
        poster_image: posterImageUrl,
        description: form.description,
        status: form.status,
        soldOut: false,
        tickets: [],
        created_at: new Date(),
        updated_at: new Date(),
      }

      if (eventId) {
        const updates = { ...eventPayload }
        delete updates.created_at
        await updateDoc(doc(db, 'events', eventId), updates)
      } else {
        const docRef = await addDoc(collection(db, 'events'), eventPayload)
        alert('Event saved successfully. Add ticket types next.')
        navigate(`${BASE}/ticket-types/${docRef.id}`)
        return
      }

      alert(eventId ? 'Event updated successfully' : 'Event saved successfully')
      navigate(eventId ? `${BASE}/dashboard/${eventId}` : `${BASE}/events`)
    } catch (error) {
      console.error(error)
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return {
    // state
    eventId,
    loading,
    form,
    updateForm,
    locationType,
    setLocationType,
    posterPreview,
    descriptionRef,
    // handlers
    handlePosterUpload,
    handleSaveDateTime,
    handleEditDateTime,
    handleDeleteDateTime,
    runCommand,
    handleSubmit,
    navigate,
  }
}
