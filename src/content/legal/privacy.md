# Privacy Policy

**Last updated: 2026-10-10**

Mangora is a reader. This policy covers the Android app and this website. It is short because the app collects
almost nothing.

> Draft text — pending review. Replace with counsel-approved wording before the public launch.

## What Mangora does not do

- No account and no sign-in.
- No telemetry, no analytics and no crash reporting.
- No advertising and no ad identifiers.
- No tracking cookies on this website.

## Data the app handles

**Library and history.** Your libraries, reading progress, downloads and settings are stored locally on your
device in a SQLite database. They are never uploaded by Mangora. Exporting a backup writes that database to a
folder you choose as a single `.db` file.

**Downloads.** Chapters are written as `.cbz` archives into a folder you pick through the system file picker.
Mangora reads and writes only what you ask it to.

## Third parties, only when you turn them on

**Cloud OCR.** If you select cloud OCR instead of the on-device engine, page crops are sent to the
third-party OCR endpoint you configure. Those images leave your device.

**AI translation.** When AI translation is enabled, page content and the OCR text are sent to Google's Gemini
API using **your own API key**. The request goes from your device using your key; Mangora does not proxy it
through any server of ours.

**Providers.** Reading a series fetches pages live from the source you selected. That provider sees requests
from your device, as it would from any browser.

If you leave cloud OCR and AI translation off, none of the above happens.

## This website

The website is static. It loads no analytics, sets no tracking cookies, and fetches release notes and release
metadata directly from GitHub. Your browser may store a short-lived cache of that metadata locally.

## Children

Mangora is not directed at children. An opt-in age gate for adult-oriented sources is planned and off by
default.

## Changes

This policy may be updated as the app changes. The date at the top reflects the latest revision.

## Contact

Open an issue in the project repository, or reach the community on Telegram or Reddit.