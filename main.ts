// gps-shortcut-01 — the GPS's own excuse for sending the driver down the
// wrong road, at most 200 characters. The program writes the line to
// /output/entry.txt (the grader's artifact) and prints it to stdout.
//
// The excuse was picked against the judge's brief: it is the GPS talking,
// smug and defensive, blaming the map for a bridge that was never there —
// then it turns the accusation back on the driver, who follows the GPS
// the same way the GPS follows the map. The fresh detail is the lake and
// the phantom bridge; the laugh is in the blame-shuffle, each clause
// passing the fault one step further from the speaker.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The gate only accepts 1-200 characters of non-whitespace text.
const MAX_CHARS = 200;

const ENTRY =
  "I never sent you into the lake — the map said there was a bridge, and I only follow the map, the same way you follow me.";

// Refuse to emit an over-long line rather than hand the judge an invalid entry.
if (ENTRY.length > MAX_CHARS || ENTRY.trim().length === 0) {
  console.error(`entry is ${ENTRY.length} characters, must be 1-${MAX_CHARS}`);
  process.exit(1);
}

// The brief wants one line of plain text: a stray line break inside the
// entry would hand the judge two lines, so refuse that too.
if (/[\r\n]/.test(ENTRY)) {
  console.error("entry must be a single line, no line breaks allowed");
  process.exit(1);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY + "\n", "utf8");

// Verify what the grader will read: re-read the artifact and fail loudly
// on any mismatch instead of silently shipping a wrong or truncated line.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== ENTRY + "\n") {
  console.error("entry.txt does not match the entry line");
  process.exit(1);
}
console.log(ENTRY);
