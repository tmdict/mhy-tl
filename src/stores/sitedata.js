import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export const IMAGES = import.meta.glob(
  "$lib/img/**/*.png", {
    eager: true,
	  import: 'default',
    query: { enhanced: true },
  }
);

function createLocalData() {
  const importedAchievements = import.meta.glob('@data/achievements/*.yml', { eager: true });

  const defaultData = {
    builds: [],
    achievements: Object.values(importedAchievements).reduce((acc, d) => {
      // Defaults all achievement commissions to false
      return {
        ...acc,
        [d.default.achievement]: new Array(d.default.checklist).fill(false)
      };
    }, {}),
    billets: {}
  };

  let local = defaultData;

  if (browser && localStorage.getItem('tmdict.genshin.data')) {
    try {
      local = JSON.parse(localStorage.getItem('tmdict.genshin.data'));
      // Check if any new achievements have been added
      Object.values(importedAchievements).forEach((d) => {
        if (!(d.default.achievement in local['achievements'])) {
          local['achievements'] = {
            ...local['achievements'],
            [d.default.achievement]: new Array(d.default.checklist).fill(false)
          };
        }
      });
      // Add craftable weapon tracker
      if (!('billets' in local)) {
        local['billets'] = {};
      }
    } catch (err) {
      console.log(`[createLocalData] Err parsing localStorage data: ${err}`);
      local = defaultData;
    }
  }

  return writable(local);
}

export const localData = createLocalData();
