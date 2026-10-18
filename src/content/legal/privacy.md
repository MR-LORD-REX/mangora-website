# Privacy Policy

**Last updated: October 18, 2026**

This Privacy Policy explains how the Mangora Android application and website handle information. Mangora has no user-account system. Core library, reading-progress, settings, download-index, and translation-cache data are stored on your device. Using extensions, checking releases, or enabling online OCR or translation also makes network requests to remote endpoints operated by the project or external services.

This policy describes the current implementation, not the separate policies of external operators. Review those operators' notices before sending them information. Features and endpoints can change; this policy will be updated when the project's data practices materially change.

## 1. Who this policy covers

"Mangora," "we," or "the project" refers to the maintainers of the Mangora application and website. This policy covers data handled by the application and website under project control. It does not govern an extension repository, an installed extension, a content website, Google, GitHub, Hugging Face Spaces, Firebase Hosting, your Android device manufacturer, or your network provider.

## 2. Accounts, advertising, and analytics

The Android app does not require a Mangora account, and the project does not operate an account database for app users. The current app and website source do not include a Mangora analytics, advertising, or cross-site tracking SDK. The project does not operate an account backend or central database for your library, reading history, downloads, or settings.

This does not mean network requests are anonymous. A remote endpoint receiving a request can ordinarily observe technical request information such as your IP address, request time, requested URL, user-agent or client details, and information included in request headers. Hosting platforms may also maintain their own operational logs.

## 3. Information stored on your device

The Android app stores information needed for its features in app-private files, SQLite, and cache directories. Depending on your use, this can include:

- Library names and membership, series and chapter metadata, cover URLs, reading history, reading progress, and source/extension identifiers.
- App settings, including selected extension repository URLs, reader preferences, OCR/translation modes, and the Gemini API key you choose to save.
- Download queue status and metadata, local page caches, downloaded `.cbz` archives, and the storage-folder permission you grant through Android's system file picker.
- Translation-cache data, including OCR/source text, translated text, language choices, page identifiers, and overlay coordinates.
- Translation usage counters used to display Gemini quota estimates.

Settings are stored in an app-private JSON file and mirrored in the local database. The Gemini key is stored on the device; Mangora does not upload it to a Mangora-operated server. The key is sent to Google when you validate it or use Gemini translation. The key is sensitive: keep your device and exported backups secure.

The app may retain downloaded archives in the folder you selected even if you clear app data or uninstall Mangora. App-private data and caches may be removed when you clear app storage or uninstall, subject to Android behavior. You can delete downloads, library/history entries, and translation-cache entries in the app where those controls are available.

## 4. Backups and file access

If you create a backup, Mangora serializes its local SQLite database to a `.db` file in the folder you select using Android's document picker. The database can include the information listed above, including settings mirrored into SQLite and translation text. The project does not automatically upload this file. A backup may not be encrypted by Mangora; store it somewhere you trust and do not share it unless intended.

Mangora accesses folders and files for which you grant Android's system file-picker permission. This includes the selected folder for downloads and backups, and selected backup files for restore. Mangora does not need broad access to all files for those operations.

## 5. Information sent by reading extensions

You choose whether to add an extension repository and install an extension. When you add or refresh a repository, the app requests its catalog metadata and may request extension icons or APK files. When you browse, search, open a series, read pages, or download a chapter, the installed extension can make requests to the endpoints it implements or selects.

Those requests can reveal your IP address, request times, requested titles or page URLs, app/client headers, and other request details to the repository, extension, content website, CDN, or network service involved. Depending on the extension and service, requests may include cookies or other headers used for sessions or access checks. Mangora does not control those recipients' collection, retention, or use of information.

Mangora does not provide or curate a universal content catalog. Removing a repository from your settings does not necessarily delete extension software already installed or files already downloaded. Manage extensions and downloaded files in Android and in the app as appropriate.

## 6. OCR and translation

Translation is off by default. Text recognition and translation happen only when you start or enable those reader features. The app may download an OCR model the first time you use it; that model download is a network request to the model's distribution host.

### On-device OCR

When the local OCR backend is selected, Mangora downloads the page image through the relevant extension/service as needed, then detects and recognizes text on the device. The OCR crop is not sent to the cloud OCR endpoint in this mode. The underlying page request still goes to the extension or content endpoint, and the downloaded image may be stored temporarily in the app cache.

### Cloud OCR

When cloud OCR is selected, Mangora crops detected page regions on the device and posts those image crops, along with the selected language information, to the cloud OCR endpoint currently configured in the app: `https://ilcapitano01-manga-tr-api.hf.space`. The endpoint operator and the hosting platform may receive and process the crops and request metadata under their own practices. The project cannot guarantee their retention or handling. Do not use cloud OCR for material you are not comfortable transmitting to that service.

### Free translation

When the free translation mode is selected, Mangora sends recognized text and source/target language information to Google's public translation endpoints. The request is made from your device; it does not pass through a Mangora server. Google may process the text and request metadata under Google's terms and privacy policy.

### Gemini AI translation

When AI translation is selected and you start translation, Mangora sends OCR text for the current batch and, if configured, text from previous pages as context to the Gemini API using the API key stored on your device. A key-validation request also contacts Google. Image crops are not included in the Gemini translation request by this implementation; cloud OCR, if selected, separately sends its crops as described above. Google receives the request and may process it under the terms and settings applicable to your API account.

## 7. Updates and the Mangora website

The Android app can contact GitHub to check for release metadata and download an APK when you use the updater. The website is hosted on Firebase Hosting and requests release metadata and project release notes directly from GitHub APIs or raw-content endpoints in your browser. The website temporarily caches some release responses in browser `sessionStorage`; this cache is session-scoped and is not a Mangora account or server-side profile.

GitHub and Firebase Hosting may receive standard request information, including IP address, user-agent, requested URLs, and request times, and may maintain service logs or security records under their own policies. Download links may take you to GitHub or Telegram, whose policies apply to your use of those services.

The current website source does not include an analytics or advertising SDK. No statement here prevents the hosting platform, browser, or an external destination from using its own operational storage, cookies, or logs.

## 8. How long information is kept

Mangora does not receive or centrally retain the app data described as local in this policy. Local data remains until you delete it, clear app storage, uninstall the app, or remove the relevant files. Cache cleanup and Android storage behavior can vary by device. Files saved to your chosen external folder may remain after app data is cleared.

External repositories, OCR/translation operators, GitHub, Firebase Hosting, and content services determine their own retention periods. Contact the relevant operator for information about its data practices or requests.

## 9. Sharing and sale

The project does not sell personal information and does not operate a Mangora server that routinely receives the local reading library or history. Information is sent to external endpoints when required for a feature you use, as explained above. External operators may disclose information under their own terms, legal obligations, or service arrangements; Mangora cannot control those disclosures.

## 10. Security

Mangora uses Android app-private storage for app-managed settings and database files, but it does not promise that local storage or network transmission is completely secure. The app does not claim that API keys or database backups are encrypted by Mangora. Protect your device, selected storage folders, backups, and credentials. External services are responsible for their own security practices.

## 11. Children and age-restricted material

Mangora is not directed to children. Third-party extensions may expose mature or age-restricted material; app filters cannot guarantee that all such material is blocked. Parents and guardians should supervise use and assess whether the app and extensions are appropriate.

## 12. Your choices and requests

You can choose whether to add repositories, install extensions, download chapters, enable cloud OCR, or use online translation. You can select local OCR, turn translation off, clear translation-cache entries, delete app records, or uninstall the app. Removing app data does not necessarily remove files saved in a user-selected folder or data held by an external service.

Because the project has no user account system and does not maintain a central reading-history database, it generally cannot retrieve or delete data held only on your device. For information or deletion requests about data held by a repository, extension, content site, OCR/translation provider, or hosting platform, contact that operator directly.

## 13. Changes and contact

We may update this Privacy Policy when the app, website, or data practices change. The date at the beginning identifies the latest revision. Questions about Mangora's own practices can be raised through official project channels linked from the [Mangora website](/). Do not include API keys or sensitive personal information in a public report.

---

**Mangora — reader and translation software**  
**Last updated: October 18, 2026**
