import { ARTIFACTS_DATA, CHARACTERS_DATA, WEAPONS_DATA } from '@store/gamedata';

// Collection of inputs used to populate dropdown boxes in the editor
export const availableInputs = {
  artifacts: Object.values(ARTIFACTS_DATA).reduce((acc, artifact) => {
    // Return artifacts grouped byrarity
    if (artifact['rarity'] in acc) {
      acc[artifact['rarity']].push(artifact['id']);
      acc[artifact['rarity']].sort();
      return acc;
    } else {
      return { ...acc, [artifact['rarity']]: [artifact['id']] };
    }
  }, {}),
  weapons: Object.values(WEAPONS_DATA).reduce((acc, weapon) => {
    // Return weapons grouped by weapon type and rarity
    const wtype = weapon['weaponType'];
    if (wtype in acc) {
      if (weapon['rarity'] in acc[wtype]) {
        acc[wtype][weapon['rarity']].push(weapon['id']);
        acc[wtype][weapon['rarity']].sort();
        return acc;
      } else {
        return { ...acc, [wtype]: { ...acc[wtype], [weapon['rarity']]: [weapon['id']] } };
      }
    } else {
      return { ...acc, [wtype]: { [weapon['rarity']]: [weapon['id']] } };
    }
  }, {}),
  characters: ['-', ...Object.keys(CHARACTERS_DATA).sort()],
  sand: ['hp', 'atk', 'def', 'er', 'em'],
  goblet: ['hp', 'atk', 'def', 'em', 'pyro', 'cryo', 'dendro', 'hydro', 'electro', 'geo', 'anemo', 'physical'],
  circlet: ['hp', 'atk', 'def', 'crit', 'em', 'heal'],
  stat: ['hp', 'atk', 'crit', 'def', 'er', 'em'],
  talents: ['a', 'e', 'q'],
  const: [...Array(7).keys()],
  refinement: [...Array(6).keys()]
};

let _editor = $state({});

export const editor = {
  get build() { return _editor },
  set build(b) { _editor = b },
  set(k, v) {
    _editor[k] = v 
  },
  // Source of truth for generates keys used by the editor given an index
  // corresponding to the current number of input elements
  getKeys: {
    weapon: (i) => ({ weapon: `weapon${i}`, ref: `weapon${i}ref` }),
    artifact: (i) => ({ artifact1: `artifact${i}-1`, artifact2: `artifact${i}-2`, sets: `artifact${i}set` }),
    stat: (i) => ({ statName: `stat${i}`, statVal: `stat${i}val` }),
    mainstat: (piece, i) => ({ mainstat: 'mainstat' + piece + i })
  },
  reset: () => {
    _editor = {
      // Used to keep track of number of instances of each input
      // and reactively update application state
      num: { weapons: 1, artifacts: 1, mainstat: { sand: 1, goblet: 1, circlet: 1 }, stats: 1 },
      type: []
    }
  },
  addInput: (inputType, max) => {
    _editor['num'][inputType] =
      _editor['num'][inputType] < max ? _editor['num'][inputType] + 1 : _editor['num'][inputType];
  },
  addNestedInput: (inputType, nested, max) => {
    _editor['num'][inputType][nested] =
      _editor['num'][inputType][nested] < max
        ? _editor['num'][inputType][nested] + 1
        : _editor['num'][inputType][nested];
  },
  removeInput: (inputType, keysToRemove) => {
    // Remove keys first since num is not decremented at 0
    keysToRemove.forEach((key) => {
      delete _editor[key];
    });
    // Decrement number of inputs unless there's only one left
    _editor['num'][inputType] =
      _editor['num'][inputType] > 0 ? _editor['num'][inputType] - 1 : _editor['num'][inputType];
  },
  removeNestedInput: (inputType, nested, keysToRemove) => {
    keysToRemove.forEach((key) => {
      delete _editor[key];
    });
    delete _editor[`${inputType}${nested}${_editor['num'][inputType][nested] - 1}`];
    _editor['num'][inputType][nested] =
      _editor['num'][inputType][nested] > 0
        ? _editor['num'][inputType][nested] - 1
        : _editor['num'][inputType][nested];
  }
};
