import { CHARACTERS_DATA } from '@store/gamedata';
import { parser } from '$lib/util/parser';

export const buildtypes = [
  'burst',
  'dps',
  'healer',
  'reaction',
  'shield',
  'sub-dps',
  'support'
];

function parseBuilds(buildsData, charactersData) {
  const parsed = Object.values(buildsData).map((d) => {
    d.tags = parser.tags(d, charactersData);
    d.attr = {
      vision: charactersData[d.character].vision,
      weapon: charactersData[d.character].weapon,
      released: charactersData[d.character].released
    };
    return d;
  });
  return parsed.sort(
    (a, b) => b.attr.released.localeCompare(a.attr.released) || b.character.localeCompare(a.character)
  );
}

// Build Data
const buildData = import.meta.glob('@data/builds/*.yml', { eager: true, import: 'default' });
export const BUILDS = parseBuilds(buildData, CHARACTERS_DATA);

// Build Filters
const filters = Object.values(BUILDS).reduce((acc, b) => {
  b['type'].forEach(t => acc.type.filter.add(t)); // Build type
  acc['vision'].filter.add(b.attr.vision); // Vision
  acc['weapon-type'].filter.add(b.attr.weapon); // Weapon type
  b['artifact'].forEach(sets => sets.set.forEach(s => acc.artifact.filter.add(s))); // Artifacts
  return acc;
}, {
  'type': { type: 'text', filter: new Set() },
  'vision': { type: 'icon', filter: new Set() },
  'weapon-type': { type: 'icon', filter: new Set() },
  'artifact': { type: 'icon', filter: new Set() }
});
export const BUILD_FILTERS = filters;
