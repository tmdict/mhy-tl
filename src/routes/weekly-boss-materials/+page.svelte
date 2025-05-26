<script>
  import { CHARACTERS_DATA, ENEMIES_DATA, MATERIALS_DATA, RARITY } from '@store/gamedata';
  import { IMAGES } from '@store/sitedata';
  import Icon from '$lib/components/Icon.svelte';

  const bossMaterials = Object.values(ENEMIES_DATA)
    .filter((enemy) => enemy.enemyType === 'weekly-boss')
    .sort((b1, b2) => (b1.order > b2.order ? 1 : -1))
    .reduce(
      (enemies, boss) => ({
        // Add to list of bosses
        [boss.id]: boss.drop.reduce(
          (drops, drop) => ({
            // Add to list of drops
            [drop]: {
              rarity: MATERIALS_DATA[drop].rarity,
              characters: MATERIALS_DATA[drop].characters
            },
            ...drops
          }),
          {}
        ),
        ...enemies
      }),
      {}
    );
</script>

<svelte:head>
  <title>Upgrade Materials</title>
</svelte:head>

<h1>Weekly Boss Materials</h1>

<div id="content">
  {#each Object.entries(bossMaterials) as [boss, bossData], idx}
    <div class="content-row boss" class:alt={idx % 2 === 1}>
      <div class="content-row">
        <Icon id={boss} src={IMAGES[`/src/lib/img/enemy/${boss}.png`]} size="220px" />

        <div class="content-col">
          {#each Object.entries(bossData) as [name, material]}
            <div class="content-row">
              <Icon id={name} src={IMAGES[`/src/lib/img/material-weekly-boss/${name}.png`]} rarity={material.rarity} />
              {#if material.characters.length > 0}
              {#each material.characters as character}
                <Icon
                  id={character}
                  title={CHARACTERS_DATA[character] ? CHARACTERS_DATA[character].data.name : character}
                  src={IMAGES[`/src/lib/img/character/${character}.png`]}
                  rarity={RARITY[character]}
                />
              {/each}
              {/if}
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  #content {
    margin-top: 40px;
    min-width: 260px;
  }

  .boss {
    padding: 10px 0;
    border-top: 1px solid var(--theme-site-primary-main);
  }
</style>
