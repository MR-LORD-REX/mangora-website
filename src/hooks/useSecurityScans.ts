import { useEffect, useState } from 'react'
import { fetchSecurityScans, type SecurityScans } from '../lib/securityScans'
import type { Release } from '../lib/github'

export interface SecurityScansState {
  scans: SecurityScans
  error: boolean
}

export function useSecurityScans(releases: Release[]): SecurityScansState {
  const [state, setState] = useState<SecurityScansState>({ scans: {}, error: false })

  useEffect(() => {
    let active = true
    fetchSecurityScans(releases).then((result) => {
      if (active) setState({ scans: result, error: false })
    }).catch(() => {
      if (active) setState({ scans: {}, error: true })
    })
    return () => {
      active = false
    }
  }, [releases])

  return state
}
