<script>
  import { filterlist } from "@store/filterlist.svelte"
  import { CHARACTERS_DATA, RARITY } from '@store/gamedata';
  import { IMAGES } from '@store/sitedata';
  import ID from '$lib/util/alias.json';
  import Icon from '$lib/components/Icon.svelte';

  let { data, baseKey, isRecommended = false, icon = false, fill = false } = $props();

  const colors = {
    anemo: 'anemo',
    cryo: 'cryo',
    dendro: 'dendro',
    electro: 'electro',
    geo: 'geo',
    hydro: 'hydro',
    physical: 'physical',
    pyro: 'pyro'
  };

  let windowWidth = $state(0);
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div class="col" class:icon class:fill>
  {#if baseKey === 'icon'}
    <Icon
      id={data.id}
      title={CHARACTERS_DATA[data.id] ? CHARACTERS_DATA[data.id].data.name : data.id}
      src={IMAGES[`/src/lib/img/character/${data.id}.png`]}
      rarity={RARITY[data.id]}
      size="50px"
      margin="0"
    />
  {:else if baseKey === 'name'}
    <strong>{CHARACTERS_DATA[data.id].data.name}</strong>
  {:else}
    {#if (windowWidth < 960 && baseKey !== 'constellation') || (windowWidth < 960 && baseKey == 'constellation' && !data[baseKey].length)}
      <strong>{ID[baseKey]}:</strong>
      {#if windowWidth < 960 && !data[baseKey].length}-{/if}
    {/if}

    {#each data[baseKey] as base, i}
      {#if baseKey === 'constellation'}
        {#each Object.entries(base) as [cname, cstats]}
          {#if i}<br />{/if}
          <strong>{cname}:</strong>
          {#each cstats as cstat, j}
            {j > 0 ? ', ' : ''}
            <span
              class:highlight={
                filterlist.get('stat').common.includes(cstat)
                && filterlist.get('base').common.includes(baseKey)
              }
              class={colors[cstat]}>
              {ID[cstat]}
            </span>
          {/each}
        {/each}
      {:else}
        {i > 0 ? ', ' : ''}
        <span
          class={colors[base]}
          class:highlight={filterlist.get('stat').common.includes(base) &&
            filterlist.get('base').common.includes(baseKey)}
          class:recommended={isRecommended &&
            data['recommended-talent'] &&
            data['recommended-talent'].includes(baseKey)}>{ID[base]}</span
        >
      {/if}
    {/each}
  {/if}
</div>

<style lang="scss">
  .col {
    width: 75px;
    padding: 5px 2px;
    overflow-wrap: break-word;

    @media only screen and (max-width: 960px) {
      width: 100%;
    }
  }

  .highlight {
    color: var(--theme-site-primary-main);
    font-weight: bold;
  }

  .recommended {
    color: var(--theme-site-primary-sub);
  }

  .icon {
    width: 65px;
    border: 0;
  }

  .fill {
    min-width: 110px;
  }
</style>
