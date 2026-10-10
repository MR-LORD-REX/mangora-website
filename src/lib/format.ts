/** Join conditional class names. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/** 12345678 -> "11.8 MB". */
export function formatBytes(bytes: number | null | undefined, decimals = 1): string {
  if (bytes == null || Number.isNaN(bytes) || bytes <= 0) return '-'
  const units = ['B', 'KB', 'MB', 'GB']
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
  const value = bytes / Math.pow(1024, i)
  return `${value.toFixed(i === 0 ? 0 : decimals)} ${units[i]}`
}

/** 1240 -> "1.2k". */
export function formatCount(n: number | null | undefined): string {
  if (n == null || Number.isNaN(n)) return '0'
  if (n < 1000) return String(n)
  if (n < 1_000_000) return `${(n / 1000).toFixed(n < 10_000 ? 1 : 0)}k`
  return `${(n / 1_000_000).toFixed(1)}m`
}

const DATE_FMT = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

/** ISO string -> "Oct 10, 2026". Returns "-" for falsy/invalid input. */
export function formatDate(iso: string | null | undefined): string {
  if (!iso) return '-'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '-'
  return DATE_FMT.format(d)
}

/** "3 days ago", or "today" / "yesterday". */
export function timeAgo(iso: string | null | undefined): string {
  if (!iso) return ''
  const d = new Date(iso).getTime()
  if (Number.isNaN(d)) return ''
  const days = Math.floor((Date.now() - d) / 86_400_000)
  if (days <= 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 30) return `${days} days ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months} month${months === 1 ? '' : 's'} ago`
  const years = Math.floor(days / 365)
  return `${years} year${years === 1 ? '' : 's'} ago`
}

/** Strip a leading "v" from a tag: "v1.0.1" -> "1.0.1". */
export function normalizeVersion(tag: string | null | undefined): string {
  return (tag ?? '').replace(/^v/i, '').trim()
}