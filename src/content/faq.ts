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
    a: 'Mangora draws a bilingual overlay on any page: YOLO detects the text boxes, OCR reads the text (on-device via ExecuTorch, or a cloud endpoint), and Gemini translates it into your language. No pre-translated releases required.',
  },
  {
    q: 'Is my reading private?',
    a: 'Mangora has no account or in-app analytics. Reading requests go to the third-party endpoints used by your installed extension. Free translation sends recognized text to Google; AI translation sends text to Gemini; cloud OCR sends image crops to its configured service. These options and their disclosures are described in the Privacy Policy.',
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