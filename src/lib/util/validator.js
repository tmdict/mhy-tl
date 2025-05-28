class Validator {
  name(build) {
    return build.name !== '';
  }

  character(build) {
    return build.character && build.character !== '-';
  }

  type(build) {
    let invalid = '';
    if (build.type && build.type.some((t) => t.length > 20)) {
      invalid = 'Build Type length too long';
    }
    if (build.type && build.type.length > 10) {
      invalid = 'Too many Build Type';
    }
    if (build.type && build.type.length === 0) {
      invalid = 'Build Type';
    }
    return invalid;
  }

  weapons(build, getKeys, characters, weapons) {
    let invalid = '';
    let selected = [];
    [...Array(build.num.weapons).keys()].forEach((i) => {
      const keys = getKeys.weapon(i);
      if (characters[build['character']] && weapons[build[keys.weapon]]) {
        // Check if current selected weapon matches character's weapon type
        if (characters[build['character']].weapon !== weapons[build[keys.weapon]].weaponType) {
          invalid = 'Invalid weapon type';
        }
      }
      // If selected weapon is already present in another input
      if (selected.includes(build[keys.weapon])) {
        invalid = `Duplicate weapon selected in row ${i + 1}`;
      }
      // Keep track of weapons
      selected.push(build[keys.weapon]);
    });
    return invalid;
  }

  artifacts(build, getKeys) {
    let invalid = '';
    [...Array(build.num.artifacts).keys()].forEach((i) => {
      const keys = getKeys.artifact(i);
      // If artifact is not set (i.e. on instantiation)
      if (!build[keys.artifact1]) {
        invalid = `No primary artifact selected in row ${i + 1}`;
      }
      // If 2 sets and second set is not set
      if (build[keys.sets] === 2 && !build[keys.artifact2]) {
        invalid = `No secondary artifact selected in row ${i + 1}`;
      }
      // If 2 sets and first and second sets are the same set
      if (build[keys.sets] === 2 && build[keys.artifact1] === build[keys.artifact2]) {
        invalid = `Duplicate artifact selected in row ${i + 1}`;
      }
    });
    return invalid;
  }

  mainstat(build, mainstat, keys) {
    let invalid = '';
    const key1 = keys.mainstat(mainstat, 0).mainstat;
    const key2 = keys.mainstat(mainstat, 1).mainstat;
    // If both mainstats are the same
    if (build.num.mainstat[mainstat] > 1 && build[key1] === build[key2]) {
      invalid = `Duplicate main stat for ${mainstat}`;
    }
    return invalid;
  }

  stats(build, getKeys) {
    let invalid = '';
    let selected = [];
    [...Array(build.num.stats).keys()].forEach((i) => {
      const keys = getKeys.stat(i);
      // If same stats are selected
      if (selected.includes(build[keys.statName])) {
        invalid = `Duplicate stats: ${build[keys.statName]}`;
      }
      // Keep track of stats encountered so far
      selected.push(build[keys.statName]);
    });
    return invalid;
  }

  validateEditorBuild(build, keys, characters, weapons) {
    try {
      let missing = [];
      let result = true;
      if (!validator.name(build)) {
        result = false;
        missing.push('Build Name');
      }
      if (!validator.character(build)) {
        result = false;
        missing.push('Character');
      }
      const typeResult = validator.type(build);
      if (typeResult !== '') {
        result = false;
        missing.push(typeResult);
      }
      const weaponResult = validator.weapons(build, keys, characters, weapons);
      if (weaponResult !== '') {
        result = false;
        missing.push(weaponResult);
      }
      const artifactResult = validator.artifacts(build, keys);
      if (artifactResult !== '') {
        result = false;
        missing.push(artifactResult);
      }
      ['sand', 'goblet', 'circlet'].forEach((mainstat) => {
        const mainstatResult = validator.mainstat(build, mainstat, keys);
        if (mainstatResult !== '') {
          result = false;
          missing.push(mainstatResult);
        }
      });
      const statsResult = validator.stats(build, keys);
      if (statsResult !== '') {
        result = false;
        missing.push(statsResult);
      }

      return {
        result: result,
        missing: missing
      };
    } catch (err) {
      console.log(`[validateEditorBuild] Error validating build for: ${err}`);
    }
  }

  validateBuild(build) {
    try {
      if (!build.character) {
        return false;
      }
      return (
        'attr' in build &&
        build.id !== '' &&
        build.type.length > 0 &&
        build.name &&
        build.name !== '' &&
        build.weapon &&
        build.weapon.length > 0 &&
        build.artifact &&
        build.artifact.length > 0 &&
        build.stats &&
        build.stats.length > 0
      );
    } catch (err) {
      console.log(`[validateBuild] Error parsing build for ${build.character}: ${err}`);
    }
  }
}

export const validator = new Validator();
