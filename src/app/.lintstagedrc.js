const path = require('path');

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

module.exports = {
  '{src,scripts,data}/**/*.{ts,tsx,js,jsx}': [
    buildEslintCommand,
    'pretty-quick --staged --pattern "src/app/**/*.*{ts,tsx,js,jsx}"',
  ],
  'src/**/*.{scss,css}': 'pretty-quick --staged --pattern "src/app/**/*.*{scss,css}"',
};
