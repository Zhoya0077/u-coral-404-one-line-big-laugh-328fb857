// One Line, Big Laugh — program/v1.
// Writes a single hilarious line to $MAKEFUN_OUTPUT_DIR/entry.txt,
// prints it to stdout, then runs a self-checking gate.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My fridge light burned out, so now I eat in the dark like a raccoon with a mortgage and a crippling fear of the electricity bill.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");
console.log(LINE);

// Self-checking gate: the file must hold exactly the line above, on one
// line, 1-200 characters, and not only whitespace.
const written = readFileSync(outPath, "utf8");
if (written !== LINE) {
  console.error("gate failed: entry.txt differs from the printed line");
  process.exit(1);
}
if (written.length < 1 || written.length > 200) {
  console.error(`gate failed: entry is ${written.length} chars, must be 1-200`);
  process.exit(1);
}
if (written.trim().length === 0 || written.includes("\n")) {
  console.error("gate failed: entry must be one non-blank line");
  process.exit(1);
}
const byteLen = Buffer.byteLength(written, "utf8");
if (byteLen > 200) {
  console.error(`gate failed: entry is ${byteLen} bytes, must be at most 200`);
  process.exit(1);
}
if (written.endsWith(" ") || written.startsWith(" ")) {
  console.error("gate failed: entry has leading or trailing spaces");
  process.exit(1);
}
console.log(`gate passed: ${written.length} chars / ${byteLen} bytes, one line, valid`);
