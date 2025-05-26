const raw = import.meta.glob('../../data/game/**/*.json', { eager: true });
const grouped = Object.values(raw).reduce((acc, d) => {
  acc[d.default.type] = acc[d.default.type] || {};
  acc[d.default.type] = { [d.default.id]: d.default, ...acc[d.default.type] };
  return acc;
}, {});

export const ARTIFACTS_DATA = grouped.artifact;
export const CHARACTERS_DATA = grouped.character;
export const ENEMIES_DATA = grouped.enemy;
export const MATERIALS_DATA = grouped.material;
export const WEAPONS_DATA = grouped.weapon;
export const MISC_DATA = grouped.misc;

export const RARITY = Object.values(grouped)
  .flatMap(data => Object.values(data))
  .reduce((acc, item) => {
    acc[item.id] = item.rarity;
    return acc;
  }, {});
