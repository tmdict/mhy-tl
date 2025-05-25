<script>
  import { characters, materials, rarity } from '@store/gamedata';
  import { images, l10n, lang } from '@store/site';
  import Icon from '$lib/components/Icon.svelte';

  const weekdays = [$l10n['day1'], $l10n['day2'], $l10n['day3']];

  const weaponMaterials = Object.values($materials)
    .filter((material) => material.materialType === 'weapon-ascension')
    // Group materials by region, day and rarity
    .sort((m1, m2) => m1.region - m2.region || m1.day - m2.day || m1.rarity - m2.rarity)
    .reduce((weapons, weapon) => {
      weapons[weapon.region] = weapons[weapon.region] || {};
      weapons[weapon.region][weapon.day] = weapons[weapon.region][weapon.day] || [];
      weapons[weapon.region][weapon.day].push(weapon.id);
      return weapons;
    }, {});

  const talentMaterials = Object.values($materials)
    .filter((material) => material.materialType === 'talent-book')
    .sort((m1, m2) => m1.region - m2.region || m1.day - m2.day)
    .reduce((talents, talent) => {
      // Group materials by region, day and rarity
      talents[talent.region] = talents[talent.region] || {};
      talents[talent.region][talent.day] = talents[talent.region][talent.day] || {};
      talents[talent.region][talent.day].id = talents[talent.region][talent.day].id || talent.id;
      talents[talent.region][talent.day].characters =
        talents[talent.region][talent.day].characters || talent.characters;
      talents[talent.region][talent.day].group = talents[talent.region][talent.day].group || talent.group;
      return talents;
    }, {});
</script>

<svelte:head>
  <title>{$l10n['upgrade-material'][$lang]}</title>
</svelte:head>

<h1>{$l10n['weekly-talent-mat'][$lang]}</h1>

<div id="content">
  <div class="content-row days">
    {#each weekdays as day, i}
      <div class="content-col medium-col" class:alt={i % 2 === 1}><h2>{day[$lang]}</h2></div>
    {/each}
  </div>

  {#each Object.entries(talentMaterials).reverse() as [region, regionByDay]}
    <div class="content-row">
      {#each Object.entries(regionByDay) as [weekday, material]}
        <div class="content-col medium-col" class:alt={parseInt(weekday) % 2 === 0}>
          <div class="content-col days-small-col"><h2>{weekdays[parseInt(weekday) - 1][$lang]}</h2></div>
          <div class="content-row divider">
            {#each weaponMaterials[region][weekday] as weaponMat}
              <Icon
                id={weaponMat}
                src={$images[`/src/lib/img/material-weapon-ascension/${weaponMat}.png`]}
                rarity={$rarity[weaponMat]}
                size="40px"
              />
            {/each}
          </div>
          <h3>{$l10n[material.id][$lang]}</h3>
          <div class="content-row divider">
            {#each material.group as book}
              <Icon
                id="{book.id}-{material.id}"
                src={$images[`/src/lib/img/material-talent-book/${book.id}-${material.id}.png`]}
                rarity={book.rarity}
              />
            {/each}
          </div>
          <div class="content-row">
            {#each material.characters as character}
              <Icon
                id={character}
                title={$characters[character] ? $characters[character].data[$lang].name : character}
                src={$images[`/src/lib/img/character/${character}.png`]}
                rarity={$rarity[character]}
              />
            {/each}
          </div>
        </div>
      {/each}
    </div>
  {/each}
</div>

<style lang="scss">
  #content {
    margin-top: 40px;
  }

  h2 {
    margin: 10px;
  }

  h3 {
    margin: 5px auto;

    @media only screen and (max-width: 760px) {
      margin: 5px 10px;
    }
  }

  .medium-col {
    flex: 1 1 0;
    padding: 0 35px 15px;

    @media only screen and (max-width: 960px) {
      flex: 1 0 0;
      padding: 0 5px 15px;
    }

    @media only screen and (max-width: 760px) {
      min-width: 370px;
    }

    @media only screen and (max-width: 460px) {
      min-width: 240px;
    }
  }

  .days .medium-col {
    align-items: center;

    @media only screen and (max-width: 960px) {
      display: none;
    }
  }

  .days-small-col {
    display: none;

    @media only screen and (max-width: 960px) {
      display: inline;
    }
  }

  .divider {
    border-top: 1px solid var(--theme-site-primary-main);
    border-bottom: 1px dotted var(--theme-site-primary-main);
    margin-bottom: 10px;
  }
</style>
