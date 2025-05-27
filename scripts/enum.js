import fs from 'fs-extra';
import { fdir } from 'fdir';
import yaml from 'js-yaml';
import path from 'path';

// Builds an ENUM map of id to game terms
const buildIdMap = (src, dest, filename = 'enum.json', overwrite = false) => {
  // Try to load existing map
  let data;
  if (overwrite) {
    data = { id2name: [], name2id: {} };
  } else {
    try {
      let fileContent = fs.readFileSync(path.join(dest, filename), 'utf8');
      data = JSON.parse(fileContent);
    } catch (err) {
      console.log(`[buildIdMap] Error loading file, will default to {}: ${err}`);
      data = { id2name: [], name2id: {} };
    }
  }

  ['character', 'artifact', 'weapon'].forEach((dir) => {
    const api = new fdir().glob('./**/*.json').withFullPaths().crawl(`${src}/${dir}`);
    const files = api.sync();
    files.forEach((f) => {
      const content = yaml.load(fs.readFileSync(f, 'utf8'));

      if ((!overwrite && !(content.id in data.name2id)) || overwrite) {
        // Duplicate when writing new file
        if (content.id in data.name2id) {
          console.log(`[buildIdMap] Duplicate id: ${content.id}`);
        }
        // Character data contains duplicate attributes
        if (dir === 'character') {
          if (!(content.vision in data.name2id)) {
            data.id2name.push(content.vision);
            data.name2id[content.vision] = data.id2name.length - 1;
          }
          if (!(content.weapon in data.name2id)) {
            data.id2name.push(content.weapon);
            data.name2id[content.weapon] = data.id2name.length - 1;
          }
        }
        data.id2name.push(content.id);
        data.name2id[content.id] = data.id2name.length - 1;
        if (!overwrite) {
          console.log(`[buildIdMap] Added content: ${content.id}`);
        }
      }
    });
  });

  fs.outputFile(
    path.join(dest, filename),
    `${JSON.stringify({ id2name: data.id2name, name2id: data.name2id }, 0, 2)}\n`
  );
};

buildIdMap('./src/data/game', './src/lib/util');
