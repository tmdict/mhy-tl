class Parser {
  weapon(build, getKeys) {
    // Iterate based on number of weapons entered
    return [...Array(build.num.weapons).keys()].map((i) => ({
      name: build[getKeys.weapon(i).weapon],
      r: build[getKeys.weapon(i).ref]
    }));
  }

  artifact(build, getKeys) {
    // Iterate based on number of artifacts entered
    return [...Array(build.num.artifacts).keys()].map((i) => {
      const keys = getKeys.artifact(i);
      // Initiate array with one artifact set
      let artifacts = [build[keys.artifact1]];
      if (build[keys.sets] === 4) {
        // 4 set
        return { set: artifacts, p: build[keys.sets] };
      } else if (build[keys.sets] === 2 && build[keys.artifact2]) {
        // 2 set, add 2nd set to array
        artifacts.push(build[keys.artifact2]);
        return { set: artifacts, p: build[keys.sets] };
      }
    });
  }

  mainstat(build, type, getKeys) {
    // Iterate based on number of stats entered for the given mainstat type
    return [...Array(build.num.mainstat[type]).keys()].map((i) => build[getKeys.mainstat(type, i).mainstat]);
  }

  stats(build, getKeys) {
    return [...Array(build.num.stats).keys()].map((i) => ({
      [build[getKeys.stat(i).statName]]: build[getKeys.stat(i).statVal]
    }));
  }

  source(build) {
    return build.source ? [{ custom: build.source }] : [{ custom: 'Anonymous' }];
  }

  tags(build, characters) {
    const tags = new Set();
    build.type.forEach((t) => tags.add(t));
    tags.add(characters[build.character].vision);
    tags.add(characters[build.character].weapon);
    build.artifact.forEach((sets) => sets.set.forEach((s) => tags.add(s)));
    build.weapon.forEach((w) => tags.add(w.name));
    return [...tags];
  }

  // Parse build editor input into a valid build
  parse(build, getKeys, characters) {
    try {
      const parsedBuild = {
        attr: {
          vision: characters[build.character].vision,
          weapon: characters[build.character].weapon,
          released: characters[build.character].released
        },
        character: build.character,
        type: build.type,
        c: parseInt(build.constellation),
        name: build.name,
        weapon: this.weapon(build, getKeys),
        artifact: this.artifact(build, getKeys),
        mainstat: {
          sand: this.mainstat(build, 'sand', getKeys),
          goblet: this.mainstat(build, 'goblet', getKeys),
          circlet: this.mainstat(build, 'circlet', getKeys)
        },
        stats: this.stats(build, getKeys),
        source: this.source(build),
        // Optional inputs
        ...(build['talent'] && { talent: build['talent'] }),
        ...(build['notes'] && { notes: build['notes'] })
      };

      return { ...parsedBuild, tags: this.tags(parsedBuild, characters) };
    } catch (err) {
      console.log(`[parse] Error parsing editor build for ${build.character}: ${err}`);
    }
  }

  // Populate editor with imported build
  importToEditor(build, getKeys) {
    // Basic info
    let extracted = {
      character: build.character,
      constellation: parseInt(build.c),
      name: build.name,
      type: build.type,
      // Optional inputs
      ...(build.talent && { talent: build.talent }),
      ...(build.notes && { notes: build.notes })
    };
    // Weapons
    build.weapon.forEach((weapon, i) => {
      const keys = getKeys.weapon(i);
      extracted[keys.weapon] = weapon.name;
      extracted[keys.ref] = parseInt(weapon.r);
    });
    // Artifacts
    build.artifact.forEach((artifact, i) => {
      const keys = getKeys.artifact(i);
      extracted[keys.sets] = parseInt(artifact.p);
      artifact.set.forEach((piece, j) => {
        extracted[keys[`artifact${j + 1}`]] = piece;
      });
    });
    // Main stats
    Object.keys(build.mainstat).forEach((mainstat) => {
      build.mainstat[mainstat].forEach((stat, i) => {
        // Main stat object keys (sand, goblet, circlet)
        const key = getKeys.mainstat(mainstat, i);
        extracted[key.mainstat] = stat;
      });
    });
    // Stats
    build.stats.forEach((stat, i) => {
      const keys = getKeys.stat(i);
      extracted[keys.statName] = Object.entries(stat).flat()[0];
      extracted[keys.statVal] = Object.entries(stat).flat()[1];
    });

    return {
      ...extracted, // Extracted build
      num: {
        weapons: build.weapon.length,
        artifacts: build.artifact.length,
        mainstat: {
          sand: build.mainstat.sand.length,
          goblet: build.mainstat.goblet.length,
          circlet: build.mainstat.circlet.length
        },
        stats: build.stats.length
      }
    };
  }
}

export const parser = new Parser();
