const fs = require('fs').promises;
const path = require('path');
const { version } = require('../package.json');

const BASE_DIR = path.join(__dirname, '..');
const README_PATH = path.join(BASE_DIR, 'README.md');

(async () => {
  try {
    const file = await fs.readFile(README_PATH, 'utf8');
    const re = /(\(https:\/\/github\.com\/icelam\/tints-and-shades\/releases\/download\/v)[0-9]+\.[0-9]+\.[0-9]+(\/.*)[0-9]+\.[0-9]+\.[0-9]+(.*\))/gm;
    const updated = file.replace(re, `$1${version}$2${version}$3`);
    await fs.writeFile(README_PATH, updated);
  } catch (error) {
    console.error(error);
  }
})();
