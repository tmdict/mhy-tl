import * as data from '$lib/util/enum.json';

const delimiter = '\0';
const typeReplacer = [
  'burst',
  'dps',
  'healer',
  'reaction',
  'shield',
  'sub-dps',
  'support'
];
const sourceReplacer = ['ysmxt', 'ysjsgl', 'ysytl', 'kqm', 'custom'];
const statReplacer = [
  'atk',
  'crit',
  'cr',
  'cdmg',
  'hp',
  'er',
  'em',
  'def',
  'heal',
  'anemo',
  'cryo',
  'electro',
  'geo',
  'hydro',
  'pyro',
  'dendro',
  'physical'
];

// Given an input , determine if it is a string or enum, and convert it to/from string/integer
// using provided dictionary, using negative enum so it doesn't conflict with game tag enum
function parseEnum(n, dict) {
  if (Number.isInteger(n) && n < 0) {
    // Negative integer, convert it back to dict index and retrieve string
    return dict[-1 * n - 1];
  }
  // Attempt to get index of it in the map: enum = -1 * (string index + 1)
  // If not in map result will be -1, which is converted to 0 for false conditional
  const index = dict.indexOf(n) + 1;
  // If can't find index, return input back, else convert to positive index
  return index ? -1 * index : n;
}

// Convert game data to/from enum id
function processBuild(build, codec) {
  try {
    // Characters
    const character = codec[build.character];
    // Convert build type to negative enum
    const type = build.type.map((t) => parseEnum(t, typeReplacer));
    // Weapons
    const weapons = build.weapon.map((w) => ({ name: codec[w.name], r: w.r }));
    // Artifacts
    const artifacts = build.artifact.map((a) => {
      const sets = a.set.map((s) => codec[s]);
      return { set: sets, p: a.p };
    });
    // Tags
    const tags = build.tags.map((t) => (t in codec ? codec[t] : t));
    // Attributes
    const attr = {
      ...build.attr,
      vision: codec[build.attr.vision],
      weapon: codec[build.attr.weapon]
    };

    return {
      ...build,
      character: character,
      type: type,
      weapon: weapons,
      artifact: artifacts,
      tags: tags.map((t) => parseEnum(t, typeReplacer)),
      attr: attr
    };
  } catch (err) {
    console.log(`[processBuild] Error processing build for ${build.character}: ${err}`);
  }
}

export function compressBuild(build) {
  try {
    // 0 - character, 1 - const, 2 - build type, 3 - build name
    const info =
      build.character +
      delimiter +
      build.c +
      delimiter +
      JSON.stringify(build.type) +
      delimiter +
      JSON.stringify(build.name);

    // 4 - weapon: [{"_n":1,"r":0},{"_n":2,"r":6},...]
    // Encode format: 1|0,2|6,...
    const weapon = delimiter + build.weapon.map((w) => `${w.name}|${w.r}`).join(',');

    // 5 - artifact: [{"set":[1],"p":4},{"set":[1,2],"p":2},...]
    // Encode format: 73|4,73/62|2,...
    const artifact = delimiter + build.artifact.map((a) => a.set.join('/') + '|' + a.p);

    // 6 - main Stats: "mainstat":{"sand":["atk","hp"],"goblet":["pyro"],"circlet":["crit"]},
    // Encode format: 0,1|2|3
    const mainstat =
      delimiter +
      build.mainstat.sand.map((s) => parseEnum(s, statReplacer)).join(',') +
      '|' +
      build.mainstat.goblet.map((s) => parseEnum(s, statReplacer)).join(',') +
      '|' +
      build.mainstat.circlet.map((s) => parseEnum(s, statReplacer)).join(',');

    // 7 - stats: [{"atk":"..."},{"crit":"..."},{"er":"..."},...]
    // Encoding format: 1:..._!2:..._!3:...,...
    const stats =
      delimiter +
      build.stats
        .map((s) => {
          const stat = Object.entries(s).flat();
          return `${parseEnum(stat[0], statReplacer)}:${stat[1]}`;
        })
        .join('_!');

    // 8 - sources, for now required
    const sources =
      delimiter +
      build.source
        .map((s) => {
          const source = Object.entries(s).flat();
          return `${parseEnum(source[0], sourceReplacer)}|${source[1]}`;
        })
        .join('_!')
        .replace(/default/g, '_d')
        .replace('https://keqingmains.com/', '_km');

    // Optional details
    const talent = delimiter + (build.talent ? build.talent : '');
    const notes = delimiter + (build.notes ? JSON.stringify(build.notes) : '');

    const tags = delimiter + JSON.stringify(build.tags);
    const attr =
      delimiter +
      JSON.stringify({
        v: build.attr.vision,
        w: build.attr.weapon,
        r: build.attr.released
      });
    return info + weapon + artifact + mainstat + stats + sources + tags + attr + talent + notes;
  } catch (err) {
    console.log(`[compressBuild] Error compressing data for ${build.character}: ${err}`);
  }
}

export function extractBuild(raw) {
  try {
    const arr = raw.split(delimiter);
    return {
      character: arr[0],
      c: arr[1],
      type: JSON.parse(arr[2]),
      name: JSON.parse(arr[3]),
      weapon: arr[4].split(',').map((w) => ({ name: w.split('|')[0], r: w.split('|')[1] })),
      artifact: arr[5].split(',').map((a) => ({ set: a.split('|')[0].split('/'), p: a.split('|')[1] })),
      mainstat: {
        sand: arr[6]
          .split('|')[0]
          .split(',')
          .map((s) => parseEnum(parseInt(s), statReplacer)),
        goblet: arr[6]
          .split('|')[1]
          .split(',')
          .map((s) => parseEnum(parseInt(s), statReplacer)),
        circlet: arr[6]
          .split('|')[2]
          .split(',')
          .map((s) => parseEnum(parseInt(s), statReplacer))
      },
      stats: arr[7].split('_!').map((s) => {
        const stat = s.split(':');
        const key = parseEnum(parseInt(stat[0]), statReplacer);
        return { [key]: stat[1] };
      }),
      source: arr[8].split('_!').map((s) => {
        const source = s.split('|');
        const key = parseEnum(parseInt(source[0]), sourceReplacer);
        return { [key]: source[1].replace(/_d/g, 'default').replace(/_km/g, 'https://keqingmains.com/') };
      }),
      tags: JSON.parse(arr[9]),
      attr: {
        vision: JSON.parse(arr[10]).v,
        weapon: JSON.parse(arr[10]).w,
        released: JSON.parse(arr[10]).r
      },
      ...(arr[11] !== '' && { talent: arr[11] }),
      ...(arr[12] !== '' && { notes: JSON.parse(arr[12]) })
    };
  } catch (err) {
    console.log(`[extractBuild] Error extracting build: ${err}`);
  }
}

export function encodeBuild(build) {
  return processBuild(build, data.name2id);
}

export function decodeBuild(build) {
  return processBuild(build, data.id2name);
}

export const hash = (input) =>
  Array.from(input)
    .reduce((hash, char) => 0 | (31 * hash + char.charCodeAt(0)), 0)
    .toString();
