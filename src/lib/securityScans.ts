import { parseApkAsset, type Release } from './github'
import { REPO } from './site'

export interface SecurityScan {
  architecture: string
  sha256: string
  analysisLink: string
}

export type SecurityScans = Record<string, SecurityScan>

export function securityScanKey(version: string, architecture: string): string {
  return `${version}:${architecture.toLowerCase()}`
}

export async function fetchSecurityScans(releases: Release[]): Promise<SecurityScans> {
  const assets = releases.flatMap((release) =>
    release.assets
      .map(parseApkAsset)
      .filter((apk): apk is NonNullable<typeof apk> => apk !== null)
      .map((apk) => ({ version: apk.version, architecture: apk.abi })),
  )
  const uniqueAssets = [
    ...new Map(assets.map((asset) => [securityScanKey(asset.version, asset.architecture), asset])).values(),
  ]

  const results = await Promise.all(
    uniqueAssets.map(async ({ version, architecture }) => {
      const file = `scan_${version}_${architecture}.json`
      const response = await fetch(`${REPO.rawBase}/security/${encodeURIComponent(file)}`)
      if (response.status === 404) return null
      if (!response.ok) {
        throw new Error(`Could not load VirusTotal scan report ${file}: HTTP ${response.status}`)
      }

      const report = (await response.json()) as {
        version?: unknown
        architecture?: unknown
        sha256?: unknown
        analysis_status?: unknown
        analysis_link?: unknown
      }
      if (
        report.version !== version ||
        report.architecture !== architecture ||
        report.analysis_status !== 'completed' ||
        typeof report.sha256 !== 'string' ||
        !/^[0-9a-f]{64}$/.test(report.sha256) ||
        report.analysis_link !==
          `https://www.virustotal.com/gui/file/${report.sha256}/detection`
      ) {
        throw new Error(`VirusTotal scan report ${file} is invalid or incomplete.`)
      }
      return {
        key: securityScanKey(version, architecture),
        scan: {
          architecture,
          sha256: report.sha256,
          analysisLink: report.analysis_link,
        } satisfies SecurityScan,
      }
    }),
  )

  return Object.fromEntries(
    results.flatMap((result) => (result ? [[result.key, result.scan]] : [])),
  )
}
