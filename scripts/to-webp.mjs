/**
 * One-shot WebP conversion for everything under /public/images.
 *
 *   npm i -D sharp
 *   node scripts/to-webp.mjs                   # convert, keep originals, report savings
 *   node scripts/to-webp.mjs --write           # also rewrite code references to .webp
 *   node scripts/to-webp.mjs --write --clean   # ...and delete the originals
 *
 * Note: next/image already serves WebP at request time now that the optimizer
 * is enabled. This script shrinks the *sources*, which cuts repo size, deploy
 * size and cold-start transcode time. It is not a substitute for the optimizer.
 */
import { readdir, readFile, writeFile, stat, unlink, access } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const IMAGES = path.join(ROOT, "public", "images");
const CODE_DIRS = ["app", "components", "constants"];

const CONVERTIBLE = new Set([".png", ".jpg", ".jpeg"]);
const CODE_EXT = new Set([".ts", ".tsx", ".js", ".jsx", ".css"]);

const args = new Set(process.argv.slice(2));
const WRITE_CODE = args.has("--write");
const CLEAN = args.has("--clean");
const FORCE = args.has("--force");

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

const exists = async (p) =>
  access(p).then(
    () => true,
    () => false
  );

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

/* ---------- 1. Convert the images ---------- */

const files = (await walk(IMAGES)).filter((f) =>
  CONVERTIBLE.has(path.extname(f).toLowerCase())
);

let before = 0;
let after = 0;
const converted = [];

for (const file of files) {
  const target = file.replace(/\.(png|jpe?g)$/i, ".webp");

  /* Never clobber an existing .webp — it may be a hand-made asset that has
     nothing to do with the same-named PNG sitting beside it. */
  if (!FORCE && (await exists(target))) {
    console.log(
      `  skipped ${path.relative(ROOT, file)} — ${path.basename(target)} already exists`
    );
    continue;
  }

  try {
    // Lossless for PNGs (product cut-outs, logos), lossy for photographs.
    const isPng = /\.png$/i.test(file);
    await sharp(file)
      .webp(isPng ? { lossless: true, effort: 5 } : { quality: 82, effort: 5 })
      .toFile(target);

    const [src, dst] = await Promise.all([stat(file), stat(target)]);
    before += src.size;
    after += dst.size;
    converted.push({ file, target, src: src.size, dst: dst.size });

    const pct = (100 - (dst.size / src.size) * 100).toFixed(0);
    console.log(
      `  ${path.relative(ROOT, file)}  ${kb(src.size)} -> ${kb(dst.size)}  (-${pct}%)`
    );
  } catch (err) {
    console.error(`  ! failed: ${path.relative(ROOT, file)} - ${err.message}`);
  }
}

console.log(
  `\n${converted.length} images: ${kb(before)} -> ${kb(after)} ` +
    `(saved ${kb(before - after)}, -${(100 - (after / before) * 100).toFixed(0)}%)\n`
);

/* ---------- 2. Point the code at the new files ---------- */

if (WRITE_CODE) {
  const codeFiles = (
    await Promise.all(CODE_DIRS.map((d) => walk(path.join(ROOT, d))))
  )
    .flat()
    .filter((f) => CODE_EXT.has(path.extname(f)));

  let touched = 0;

  for (const file of codeFiles) {
    const source = await readFile(file, "utf8");
    // Only rewrite paths that live under /images/ — leaves everything else alone.
    const next = source.replace(
      /(\/images\/[^"'`)\s]+?)\.(png|jpe?g)\b/gi,
      "$1.webp"
    );

    if (next !== source) {
      await writeFile(file, next, "utf8");
      touched++;
      console.log(`  updated ${path.relative(ROOT, file)}`);
    }
  }

  console.log(`\n${touched} source files updated.\n`);
} else {
  console.log("Run again with --write to update code references.\n");
}

/* ---------- 3. Optionally drop the originals ---------- */

if (CLEAN) {
  if (!WRITE_CODE) {
    console.error("Refusing to --clean without --write: references would break.\n");
    process.exit(1);
  }
  for (const { file } of converted) await unlink(file);
  console.log(`${converted.length} originals deleted.\n`);
}
