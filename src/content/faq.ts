/** Shared between the Home FAQ accordion and the FAQPage JSON-LD (plan S10.3). */
export interface FaqItem {
  q: string
  a: string
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: 'Is Mangora free?',
    a: 'Yes. Mangora is free and open source, with no account, no subscription and no ads. Download the signed APK from GitHub Releases or Telegram.',
  },
  {
    q: 'Which manga and manhwa sources does Mangora support?',
    a: 'Eight sources are built in, including MangaDex, MangaKatana, MangaGeko, Comix, BrainRot and Philia Scans. Mangora also supports additional sources beyond the ones shown here - the full provider list is documented in the project README.',
  },
  {
    q: 'Does Mangora work offline?',
    a: 'Yes. Download chapters as .cbz files to a folder you choose, queue them over Wi-Fi only, and keep reading with no connection - ideal for flights or commuting.',
  },
  {
    q: 'How does the AI page translation work?',
    a: 'Mangora draws a bilingual overlay on any page: YOLO detects the text boxes, OCR reads the text (on-device via ExecuTorch, or a cloud endpoint), and Gemini translates it into your language. No pre-translated releases required.',
  },
  {
    q: 'Is my reading private?',
    a: 'Mangora has no account, no telemetry and no analytics. Cloud OCR and AI translation run only when you turn them on, using your own Gemini API key. Downloads are written to a folder you pick. The app itself stores everything locally in SQLite.',
  },
  {
    q: 'Which devices does Mangora support?',
    a: 'Android 7.0 or newer on an ARM64 (arm64-v8a) device. 32-bit ARM builds are not supported. Mangora is Android-only - there is no iOS version.',
  },
  {
    q: 'How do I install the APK?',
    a: 'Download the latest mangora-arm64-v8a APK, then allow installs from unknown sources for your browser or file manager when Android prompts. Updates install over older versions without uninstalling.',
  },
  {
    q: 'Is Mangora affiliated with the providers?',
    a: 'No. Mangora is an independent reader. It hosts no content and is not affiliated with any of the providers it supports; it fetches pages live from each provider when you read.',
  },
]