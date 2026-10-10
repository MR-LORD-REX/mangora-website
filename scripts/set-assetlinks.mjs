#!/usr/bin/env node
/**
 * set-assetlinks.mjs
 * ---------------------------------------------------------------------------
 * Writes mangora-website/public/.well-known/assetlinks.json with the Android
 * release signing certificate SHA-256 (plan S14.2). Listing only the release
 * cert is deliberate: a debug cert here would let anyone sign an app that
 * claims this domain.
 *
 *   # From a fingerprint you already have:
 *   node scripts/set-assetlinks.mjs --fingerprint "AA:BB:...:FF"
 *
 *   # Straight from the release keystore (password via env; lists every alias):
 *   $env:MANGORA_KEYSTORE_PASSWORD = "<keystore password>"
 *   node scripts/set-assetlinks.mjs --keystore "$env:USERPROFILE\keys\mangora-release.keystore"
 *   # ...add --alias mangora to target one entry.
 * ---------------------------------------------------------------------------
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PACKAGE_NAME = "com.mangora.app";
const here = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(here, "..", "public", ".well-known", "assetlinks.json");

function arg(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function findKeytool() {
  const candidates = [
    process.env.JAVA_HOME
      ? path.join(process.env.JAVA_HOME, "bin", "keytool.exe")
      : null,
    "C:/Program Files/Android/Android Studio/jbr/bin/keytool.exe",
    "C:/Program Files/Java/jdk-21.0.12/bin/keytool.exe",
    "keytool",
  ].filter(Boolean);
  for (const candidate of candidates) {
    try {
      execFileSync(candidate, ["-help"], { stdio: "ignore" });
      return candidate;
    } catch {
      // try the next candidate
    }
  }
  throw new Error(
    "keytool not found. Set JAVA_HOME, or pass --fingerprint directly.",
  );
}

/** "aa:bb..." / "AABB..." / "SHA256: AA BB .." -> "AA:BB:..". */
function normalizeFingerprint(raw) {
  const hex = raw.replace(/[^0-9a-fA-F]/g, "").toUpperCase();
  if (hex.length !== 64) {
    throw new Error(
      "Expected a SHA-256 fingerprint of 64 hex chars, got " + hex.length + ".",
    );
  }
  return hex.match(/.{2}/g).join(":");
}

function fingerprintFromKeystore(keystore) {
  const password = process.env.MANGORA_KEYSTORE_PASSWORD;
  if (!password) {
    throw new Error(
      "Set MANGORA_KEYSTORE_PASSWORD before using --keystore (or use --fingerprint).",
    );
  }
  const args = [
    "-list",
    "-v",
    "-storetype",
    "PKCS12",
    "-keystore",
    keystore,
    "-storepass",
    password,
  ];
  const alias = arg("--alias");
  if (alias) args.push("-alias", alias);

  const output = execFileSync(findKeytool(), args, { encoding: "utf8" });
  const match = output.match(/SHA256:\s*([0-9A-Fa-f:]+)/);
  if (!match) {
    throw new Error("No SHA256 line in the keytool output.");
  }
  return normalizeFingerprint(match[1]);
}

const fingerprintArg = arg("--fingerprint");
const keystoreArg = arg("--keystore");

let fingerprint;
if (fingerprintArg) {
  fingerprint = normalizeFingerprint(fingerprintArg);
} else if (keystoreArg) {
  fingerprint = fingerprintFromKeystore(keystoreArg);
} else {
  throw new Error(
    'Pass --fingerprint "AA:..:FF" or --keystore <path> (with MANGORA_KEYSTORE_PASSWORD).',
  );
}

const payload = [
  {
    relation: ["delegate_permission/common.handle_all_urls"],
    target: {
      namespace: "android_app",
      package_name: PACKAGE_NAME,
      sha256_cert_fingerprints: [fingerprint],
    },
  },
];

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(payload, null, 2) + "\n", { encoding: "utf8" });

console.log("Wrote " + path.relative(process.cwd(), OUT));
console.log("  package_name : " + PACKAGE_NAME);
console.log("  sha256       : " + fingerprint);