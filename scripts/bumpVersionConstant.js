const fs = require('fs').promises;
const path = require('path');
const { version } = require('../package.json');

const BASE_DIR = path.join(__dirname, '..');
const APP_CONSTANT_PATH = path.join(BASE_DIR, 'src/constants.ts');

(async () => {
  try {
    const file = await fs.readFile(APP_CONSTANT_PATH, 'utf8');
    const updated = file.replace(/[0-9]\.[0-9]\.[0-9]/g, `${version}`);
    await fs.writeFile(APP_CONSTANT_PATH, updated);
  } catch (error) {
    console.error(error);
  }
})();
