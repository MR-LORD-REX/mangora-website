import { useCallback, useEffect, useState } from 'react'
import { fetchNote, fetchReleaseIndex, type FetchError, type ReleaseIndex } from '../lib/releases'

export interface IndexState {
  loading: boolean
  index: ReleaseIndex | null
  error: FetchError
  reload: () => void
}

export function useReleaseIndex(): IndexState {
  const [state, setState] = useState<{ loading: boolean; index: ReleaseIndex | null; error: FetchError }>({
    loading: true,
    index: null,
    error: null,
  })
  const [nonce, setNonce] = useState(0)
  const reload = useCallback(() => setNonce((n) => n + 1), [])

  useEffect(() => {
    let alive = true
    fetchReleaseIndex().then((res) => {
      if (alive) setState({ loading: false, index: res.data, error: res.error })
    })
    return () => {
      alive = false
    }
  }, [nonce])

  return { ...state, reload }
}

export interface NoteState {
  loading: boolean
  note: string | null
  error: FetchError
  reload: () => void
}

export function useNote(file: string | null): NoteState {
  const [state, setState] = useState<{ loading: boolean; note: string | null; error: FetchError }>({
    loading: file != null,
    note: null,
    error: null,
  })
  const [nonce, setNonce] = useState(0)
  const reload = useCallback(() => setNonce((n) => n + 1), [])

  useEffect(() => {
    if (!file) {
      setState({ loading: false, note: null, error: 'not-found' })
      return
    }
    let alive = true
    setState({ loading: true, note: null, error: null })
    fetchNote(file).then((res) => {
      if (alive) setState({ loading: false, note: res.data, error: res.error })
    })
    return () => {
      alive = false
    }
  }, [file, nonce])

  return { ...state, reload }
}