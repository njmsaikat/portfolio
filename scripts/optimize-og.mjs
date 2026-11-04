// Post-build: shrink the generated Open Graph images in out/.
// next/og writes lossless PNGs (~300 KB each because they embed a photo);
// re-encoding them as palette PNGs keeps the same path, format and
// dimensions at a fraction of the size. Runs automatically after
// `npm run build` (npm "postbuild"); never touches anything else.
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const OUT = path.join(process.cwd(), "out");

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (entry.name === "opengraph-image") yield full;
  }
}

let before = 0;
let after = 0;
let count = 0;
for await (const file of walk(OUT)) {
  const input = await readFile(file);
  const output = await sharp(input)
    .png({ palette: true, quality: 90, effort: 10, compressionLevel: 9 })
    .toBuffer();
  before += input.length;
  // Keep the original if quantizing didn't actually help.
  if (output.length < input.length) {
    await writeFile(file, output);
    after += output.length;
  } else {
    after += input.length;
  }
  count++;
}

const kb = (n) => `${Math.round(n / 1024)} KB`;
console.log(`optimize-og: ${count} images, ${kb(before)} → ${kb(after)}`);
