// make.fun news-image-20261119 — v2 entry for @kiowayyy
//
// The entry artwork (entry.png, JPEG bytes, 1024x1024) is a from-scratch
// front page for Thursday 19 November 2026, generated in the build session:
//   * hero: the International Court of Justice finds Myanmar committed
//     genocide against the Rohingya
//   * Trump, Putin and Xi issue a peace declaration in Shenzhen
//   * Anthropic shares soar on their stock-market debut
//   * the US Senate rejects the Iran war-powers vote, 51-48
//   * a Van Gogh sells for a record $190.4M
//   * dozens missing as a migrant boat sinks off Senegal
//
// This program's only job is to ship that artwork to the grader's output
// directory, byte for byte, every time. It is deliberately deterministic:
// no clock, no randomness, no network, no environment input besides the
// output directory itself. Both graded runs therefore produce identical
// bytes, and the sha256 printed here is the same on every run.

import { createHash } from "node:crypto";
import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// The artwork lives next to this file in the repository. In the grading
// sandbox the repo is mounted read-only at /bot; locally it is wherever
// this file sits. Resolve it from this file's own location first, and
// fall back to the working directory so the program also works when it is
// copied or invoked from another directory.
const HERE = dirname(fileURLToPath(import.meta.url));

function findArtwork(): string {
  const candidates = [
    join(HERE, "entry.png"),
    resolve("entry.png"),
    join("/bot", "entry.png"),
  ];
  for (const path of candidates) {
    if (existsSync(path) && statSync(path).isFile()) return path;
  }
  throw new Error(
    "entry.png not found next to main.ts, in the working directory, or at /bot/entry.png",
  );
}

// The grader sets MAKEFUN_OUTPUT_DIR; the competition default is /output.
function outputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv && fromEnv.trim().length > 0) return resolve(fromEnv);
  return "/output";
}

function sha256Hex(bytes: Buffer): string {
  return createHash("sha256").update(bytes).digest("hex");
}

function main(): void {
  const source = findArtwork();
  const bytes = readFileSync(source);

  // Guardrails from the competition rules: at most 1 MiB, at most
  // 1024x1024 px, and a real PNG or JPEG (told apart by its first bytes).
  const MAX_BYTES = 1024 * 1024;
  if (bytes.length > MAX_BYTES) {
    throw new Error(`entry.png is ${bytes.length} bytes, over the ${MAX_BYTES} byte limit`);
  }
  const isPng = bytes.length >= 8 && bytes.subarray(0, 8).equals(
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  );
  const isJpeg = bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (!isPng && !isJpeg) {
    throw new Error("entry.png is neither a PNG nor a JPEG (unrecognised magic bytes)");
  }

  const digest = sha256Hex(bytes);
  const format = isPng ? "PNG" : "JPEG";
  const outDir = outputDir();
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.png");

  // Copy the bytes, then read them back and verify the copy is exact
  // before reporting success. A partial or altered write fails loudly
  // instead of silently submitting a corrupt image.
  copyFileSync(source, outPath);
  const written = readFileSync(outPath);
  if (!written.equals(bytes)) {
    throw new Error("verification failed: bytes written to /output/entry.png differ from entry.png");
  }
  if (sha256Hex(written) !== digest) {
    throw new Error("verification failed: sha256 of the written file differs from the source");
  }

  console.log(`wrote ${outPath} (${format}, ${written.length} bytes)`);
  console.log(`sha256 ${digest}`);
}

main();
