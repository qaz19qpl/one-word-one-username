// SPDX-License-Identifier: MIT
// One Word, One Username, One Reward.
// Writes the entrant's own make.fun username — one word, nothing else —
// to /output/entry.txt, where the judge reads it.
//
// The gate accepts UTF-8 text of 1 to 30 characters, not only whitespace,
// so the program checks the word against those bounds before writing it
// and reads the file back to confirm the judge will see exactly this word.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const USERNAME = "qaz19qpl";
const OUTPUT_PATH = "/output/entry.txt";

if (USERNAME.length < 1 || USERNAME.length > 30) {
  throw new Error(
    `username must be 1-30 characters, got ${USERNAME.length}`,
  );
}
if (/\s/.test(USERNAME)) {
  throw new Error("username must be a single word with no whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, USERNAME, "utf8");

const written = readFileSync(OUTPUT_PATH, "utf8");
if (written !== USERNAME) {
  throw new Error(
    `entry mismatch: expected ${JSON.stringify(USERNAME)}, ` +
      `found ${JSON.stringify(written)}`,
  );
}
console.log(
  `Wrote entry ${JSON.stringify(written)} ` +
    `(${written.length} characters) to ${OUTPUT_PATH}`,
);
