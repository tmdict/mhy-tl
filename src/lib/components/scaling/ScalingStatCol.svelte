<script>
  import { charScalingFilters } from '@store/filterlist';
  import { characters, rarity } from '@store/gamedata';
  import { images } from '@store/site';
  import Icon from '$lib/components/Icon.svelte';

  export let data;
  export let baseKey;
  export let isRecommended = false;
  export let icon = false;
  export let fill = false;

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

  let windowWidth;
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div class="col" class:icon class:fill>
  {#if baseKey === 'icon'}
    <Icon
      id={data.id}
      title={$characters[data.id] ? $characters[data.id].data.en.name : data.id}
      src={$images[`/src/lib/img/character/${data.id}.png`]}
      rarity={$rarity[data.id]}
      size="50px"
      margin="0"
    />
  {:else if baseKey === 'name'}
    <b>{$characters[data.id].data.en.name}</b>
  {:else}
    {#if (windowWidth < 960 && baseKey !== 'constellation') || (windowWidth < 960 && baseKey == 'constellation' && !data[baseKey].length)}<b
        >{baseKey}:</b
      >
      {#if windowWidth < 960 && !data[baseKey].length}-{/if}
    {/if}

    {#each data[baseKey] as base, i}
      {#if baseKey === 'constellation'}
        {#each Object.entries(base) as [cname, cstats]}
          {#if i}<br />{/if}
          <b>{cname}:</b>
          {#each cstats as cstat, j}
            {j > 0 ? ', ' : ''}
            <span
              class:highlight={$charScalingFilters.stat.common.includes(cstat) &&
                $charScalingFilters.base.common.includes(baseKey)}
              class={colors[cstat]}>{cstat}</span
            >
          {/each}
        {/each}
      {:else}
        {i > 0 ? ', ' : ''}
        <span
          class={colors[base]}
          class:highlight={$charScalingFilters.stat.common.includes(base) &&
            $charScalingFilters.base.common.includes(baseKey)}
          class:recommended={isRecommended &&
            data['recommended-talent'] &&
            data['recommended-talent'].includes(baseKey)}>{base}</span
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
