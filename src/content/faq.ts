/** Shared between the Home FAQ accordion and the FAQPage JSON-LD (plan S10.3). */
export interface FaqItem {
  q: string
  a: string
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: 'Is Mangora free?',
    a: 'Yes. Mangora is free to download, with no account or subscription. Download the signed APK from GitHub Releases or Telegram.',
  },
  {
    q: 'How do I access reading content?',
    a: 'Mangora does not bundle a content catalogue. You choose and add a compatible third-party extension repository, then install extensions through the app. Extension authors and content services are independent of Mangora.',
  },
  {
    q: 'Does Mangora work offline?',
    a: 'Yes. Download chapters as .cbz files to a folder you choose, queue them over Wi-Fi only, and keep reading with no connection - ideal for flights or commuting.',
  },
  {
    q: 'How does the AI page translation work?',
    a: 'Mangora draws a bilingual overlay on any page: YOLO detects the text boxes, a downloadable on-device OCR model reads the text, and Gemini translates it into your language. Auto pages waits for the whole page OCR pass. Auto bubbles sends 1-5 OCR-ready bubbles per request so the first translations appear sooner, while prior pages are attached as context. You can also queue whole downloaded chapters under Settings > Translation queue, which writes results to the translation cache so pages open instantly.',
  },
  {
    q: 'Is my reading private?',
    a: 'Mangora operates no application server or backend and has no account or in-app analytics. Library data stays on-device. Reading requests go directly to the third-party endpoints used by your installed extension. OCR runs on-device; free translation sends recognized text directly to Google and AI translation sends it directly to Gemini. The Privacy Policy describes these flows.',
  },
  {
    q: 'Does Mangora have a server or account?',
    a: 'No. Mangora has no account system or application backend. Library, history, settings, OCR models, translation cache and API usage counters stay on-device. Only optional features contact third parties, and those requests go directly from your device.',
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
    q: 'Is Mangora responsible for third-party extensions or content?',
    a: 'Mangora is an independent reader and translation tool, not the operator of third-party extension repositories or content services. Those parties control their own software, content and policies. Legal responsibility depends on applicable law and facts; see the Terms and Copyright Policy.',
  },
]
