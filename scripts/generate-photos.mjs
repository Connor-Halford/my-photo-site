import { readdir, readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import exifr from 'exifr';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = path.join(__dirname, '../public/images');
const PHOTOS_TS = path.join(__dirname, '../app/data/photos.ts');

// --- Tag guessing logic ---
const TAG_RULES = [
  { keywords: ['iceland', 'norway', 'alaska', 'patagonia', 'chile', 'fjord'], tags: ['landscape', 'nature'] },
  { keywords: ['rome', 'paris', 'london', 'chicago', 'new york', 'city', 'urban', 'street'], tags: ['architecture', 'urban'] },
  { keywords: ['beach', 'coast', 'ocean', 'sea', 'shore', 'diamond beach'], tags: ['landscape', 'nature', 'water'] },
  { keywords: ['mountain', 'mountains', 'peak', 'summit', 'paine', 'alps', 'rockies'], tags: ['landscape', 'mountains', 'nature'] },
  { keywords: ['forest', 'jungle', 'woods', 'trees'], tags: ['nature', 'forest'] },
  { keywords: ['desert', 'canyon', 'utah', 'arizona', 'sahara'], tags: ['landscape', 'nature'] },
  { keywords: ['wildlife', 'bird', 'puffin', 'whale', 'bear', 'animal'], tags: ['wildlife', 'nature'] },
  { keywords: ['eclipse', 'sky', 'stars', 'aurora', 'northern lights', 'sunset', 'sunrise'], tags: ['sky', 'nature'] },
  { keywords: ['temple', 'church', 'cathedral', 'mosque'], tags: ['architecture', 'travel'] },
  { keywords: ['columbus', 'ohio', 'indiana', 'midwest'], tags: ['urban'] },
];

function guessTags(locationName) {
  if (!locationName) return [];
  const lower = locationName.toLowerCase();
  const matched = new Set();
  for (const rule of TAG_RULES) {
    if (rule.keywords.some(k => lower.includes(k))) {
      rule.tags.forEach(t => matched.add(t));
    }
  }
  return Array.from(matched);
}

// --- Reverse geocode via OpenStreetMap (free, no API key) ---
async function reverseGeocode(lat, lon) {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
    const res = await fetch(url, {
      headers: { 'User-Agent': 'connorhalford.com photo script' }
    });
    const data = await res.json();
    const a = data.address || {};

    // Build a clean "City, Country" or "Park, Country" style string
    const place =
      a.tourism || a.leisure || a.natural ||
      a.village || a.town || a.city || a.county || a.state_district || a.state || '';
    const country = a.country || '';
    return [place, country].filter(Boolean).join(', ');
  } catch {
    return null;
  }
}

// --- Read existing photo IDs from photos.ts so we don't duplicate ---
async function getExistingIds() {
  if (!existsSync(PHOTOS_TS)) return new Set();
  const content = await readFile(PHOTOS_TS, 'utf-8');
  const matches = [...content.matchAll(/id:\s*'([^']+)'/g)];
  return new Set(matches.map(m => m[1]));
}

// --- Generate a clean ID from filename ---
function makeId(filename) {
  return path.basename(filename, path.extname(filename))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// --- Format date as YYYY-MM ---
function formatExifDate(date) {
  if (!date) return null;
  const d = new Date(date);
  if (isNaN(d)) return null;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
}

// --- Main ---
async function main() {
  const existingIds = await getExistingIds();

  const EXCLUDE = ['landing.jpg'];
  const files = (await readdir(IMAGES_DIR))
    .filter(f => /\.(jpe?g|png)$/i.test(f) && !EXCLUDE.includes(f));

  const newEntries = [];

  for (const file of files) {
    const id = makeId(file);
    if (existingIds.has(id)) {
      console.log(`  skipping (already exists): ${file}`);
      continue;
    }

    console.log(`  processing: ${file}`);
    const filePath = path.join(IMAGES_DIR, file);

    let exif = {};
    try {
      exif = await exifr.parse(filePath, {
        pick: ['DateTimeOriginal', 'GPSLatitude', 'GPSLongitude', 'ExifImageWidth', 'ExifImageHeight', 'ImageWidth', 'ImageHeight']
      }) || {};
    } catch {
      console.log(`    could not read EXIF for ${file}`);
    }

    const date = formatExifDate(exif.DateTimeOriginal);
    const lat = exif.GPSLatitude;
    const lon = exif.GPSLongitude;
    const width = exif.ExifImageWidth || exif.ImageWidth || 4752;
    const height = exif.ExifImageHeight || exif.ImageHeight || 3168;

    let location = null;
    if (lat && lon) {
      console.log(`    reverse geocoding (${lat.toFixed(4)}, ${lon.toFixed(4)})...`);
      location = await reverseGeocode(lat, lon);
      // Be polite to Nominatim — max 1 req/sec
      await new Promise(r => setTimeout(r, 1100));
    }

    const guessedTags = guessTags(location);

    newEntries.push({ id, src: `/images/${file}`, width, height, date, location, guessedTags });
  }

  if (newEntries.length === 0) {
    console.log('\nNo new photos found.');
    return;
  }

  // Build the new photo entry strings
  const newPhotoStrings = newEntries.map(({ id, src, width, height, date, location, guessedTags }) => {
    const tagsStr = guessedTags.length > 0
      ? `[${guessedTags.map(t => `'${t}'`).join(', ')}]`
      : `[]`;
    return `  {
    id: '${id}',
    src: '${src}',
    width: ${width},
    height: ${height},${location ? `\n    location: '${location}',` : `\n    location: undefined, // TODO: add location`}${date ? `\n    date: '${date}',` : `\n    date: undefined, // TODO: add date`}
    tags: ${tagsStr}, // TODO: review tags
    caption: undefined, // TODO: add caption
    lat: undefined, // TODO: add latitude
    lng: undefined, // TODO: add longitude
  }`;
  });

  // Append to photos.ts before the closing ];
  const existing = await readFile(PHOTOS_TS, 'utf-8');
  const insertPoint = existing.lastIndexOf('];');
  if (insertPoint === -1) {
    console.error('Could not find end of photos array in photos.ts');
    process.exit(1);
  }

  const updated =
    existing.slice(0, insertPoint) +
    newPhotoStrings.join(',\n') +
    ',\n' +
    existing.slice(insertPoint);

  await writeFile(PHOTOS_TS, updated, 'utf-8');
  console.log(`\nDone. Added ${newEntries.length} new photo${newEntries.length > 1 ? 's' : ''} to photos.ts`);
  console.log('Search for "// TODO" in photos.ts to review captions and tags.');
}

main().catch(console.error);