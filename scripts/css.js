import fs from 'fs-extra';
import path from 'path';

// Compiles theme colors into importable styles
const buildThemes = (config, src, dest) => {
  for (const theme of config) {
    let fileContent = fs.readFileSync(path.join(src, theme.src), 'utf8');
    const regex = /\$(.*): (.*);\n/g;
    fs.outputFile(
      path.join(dest, theme.name) + '.json',
      `{
        "name": "${theme.name}",
        "colors": {
            ${fileContent.replace(regex, '    "$1": "$2",\n').replace(/,\s*$/, '')}
        }
      }\n`.replace(/ {6}/gm, '')
    );
  }
};

buildThemes([
    { name: 'dark', src: 'theme_dark.scss' },
    { name: 'light', src: 'theme_light.scss' }
  ],
  './src/lib/style/css',
  './src/lib/style/themes'
);
