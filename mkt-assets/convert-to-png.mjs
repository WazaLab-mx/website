import puppeteer from 'puppeteer';
import { readdir, mkdir } from 'fs/promises';
import { join, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const DIRS_TO_SCAN = [
  'social-media/instagram',
  'social-media/linkedin',
  'social-media/banners',
  'social-media/pfps',
];

const PNG_OUTPUT = join(__dirname, 'png');

// Dimensions per directory
const DIMENSIONS = {
  'instagram': { width: 1080, height: 1080 },
  'linkedin': { width: 1200, height: 627 },
  'banners': null, // read from HTML
  'pfps': { width: 400, height: 400 },
};

function getDimensions(dirName, fileName) {
  if (dirName === 'banners') {
    if (fileName.includes('linkedin')) return { width: 1584, height: 396 };
    if (fileName.includes('twitter')) return { width: 1500, height: 500 };
    if (fileName.includes('instagram-story')) return { width: 1080, height: 1920 };
    return { width: 1080, height: 1080 };
  }
  for (const [key, dims] of Object.entries(DIMENSIONS)) {
    if (dirName.includes(key)) return dims;
  }
  return { width: 1080, height: 1080 };
}

async function main() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  let totalConverted = 0;

  for (const dir of DIRS_TO_SCAN) {
    const fullDir = join(__dirname, dir);
    const dirName = basename(dir);
    const outDir = join(PNG_OUTPUT, dir);

    await mkdir(outDir, { recursive: true });

    let files;
    try {
      files = await readdir(fullDir);
    } catch {
      console.log(`Skipping ${dir} - not found`);
      continue;
    }

    const htmlFiles = files.filter(f => f.endsWith('.html'));

    for (const file of htmlFiles) {
      const filePath = join(fullDir, file);
      const pngName = file.replace('.html', '.png');
      const pngPath = join(outDir, pngName);
      const dims = getDimensions(dirName, file);

      console.log(`Converting: ${dir}/${file} → ${pngName} (${dims.width}x${dims.height})`);

      const page = await browser.newPage();
      await page.setViewport({ width: dims.width, height: dims.height, deviceScaleFactor: 1 });
      await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0', timeout: 15000 });
      await page.screenshot({ path: pngPath, type: 'png', clip: { x: 0, y: 0, width: dims.width, height: dims.height } });
      await page.close();

      totalConverted++;
    }
  }

  await browser.close();
  console.log(`\nDone! Converted ${totalConverted} files to PNG.`);
  console.log(`Output: ${PNG_OUTPUT}`);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
