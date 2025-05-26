<script>
  import { slide, fade } from 'svelte/transition';
  import { charScalingFilters } from '@store/filterlist';
  import { characters, misc } from '@store/gamedata';
  import ScalingFilter from '$lib/components/scaling/ScalingFilter.svelte';
  import ScalingStatCol from '$lib/components/scaling/ScalingStatCol.svelte';
  import ScalingFaqEn from '$lib/components/content/ScalingFaq/En.svelte';

  const statFilter = [
    'hp',
    'atk',
    'def',
    'em',
    'crit-abbr',
    'cr',
    'cdmg',
    'er',
    'pyro',
    'cryo',
    'hydro',
    'electro',
    'geo',
    'anemo',
    'dendro',
    'physical',
    'heal',
    'base-atk',
    'normal-attack',
    'elemental-skill',
    'elemental-burst'
  ];

  const baseFilter = ['base-stat', 'a', 'e', 'q', 'a1', 'a4', 'constellation', 'sand', 'goblet', 'circlet'];

  const faq = { en: ScalingFaqEn };

  const allScalings = Object.keys($misc.scaling.data)
    .sort((a, b) => $characters[b].released.localeCompare($characters[a].released) || b.localeCompare(a))
    .map((char) => ({ ...$misc.scaling.data[char], id: char }));

  let showFilter = true;
  let showFaq = false;
  let filteredScalings = allScalings;

  charScalingFilters.init(['stat', 'base']);
  charScalingFilters.updateCommonFilter('base', 'base-stat');
  statFilter.forEach((stat) => charScalingFilters.updateCommonFilter('stat', stat));

  $: filteredScalings = filterScalings(allScalings, $charScalingFilters);

  function filterScalings(list, filters) {
    return list.filter((item) => {
      for (const base of baseFilter) {
        // Go through each base filter and check if it is selected
        if (!filters.base.common.includes(base)) {
          continue;
        }
        if (base === 'constellation') {
          // constellation is an array of Object
          for (const c of item[base]) {
            if (
              Object.values(c)
                .flat()
                .some((e) => filters.stat.common.includes(e))
            ) {
              return true;
            }
          }
        } else {
          // If at least one element in current scaling base is selected in stats filter
          if (item[base].some((e) => filters.stat.common.includes(e))) {
            return true;
          }
        }
      }
      // Selected filters not found in current character scaling
      return false;
    });
  }
</script>

<svelte:head>
  <title>Character Stat Scaling</title>
</svelte:head>

<h1>Character Stat Scaling</h1>

<div class="menu">
  <a href="/#" on:click|preventDefault={() => (showFilter = !showFilter)}
    >Filters
    {#if showFilter}-{:else}+{/if}</a
  >
  <span class="menu-separator"></span>
  <a href="/#" on:click|preventDefault={() => (showFaq = !showFaq)}>FAQ</a>
</div>

{#if showFaq}
  <div id="faq" transition:slide>
    <svelte:component this={faq.en} />
  </div>
{/if}

{#if showFilter}
  <div class="filters" transition:slide>
    <ScalingFilter filterHeader={'keys'} filterKey={'base'} filter={baseFilter} />
    <ScalingFilter filterHeader={'stats'} filterKey={'stat'} filter={statFilter} />
  </div>
{/if}

<div id="content">
  <div class="header sticky">
    <div class="content-row top">
      <div class="col empty separator"></div>
      <div class="col mainstat separator">Recommended Main Stats</div>
      <div class="col charscaling">Character Stat Scaling</div>
    </div>
    <div class="content-row">
      <div class="col name">Name</div>
      <div class="col base-stat separator">Base Stat</div>
      <div class="col sand">Sand</div>
      <div class="col goblet">Goblet</div>
      <div class="col circlet separator">Circlet</div>
      <div class="col normal-attack">A</div>
      <div class="col elemental-skill">E</div>
      <div class="col elemental-burst">Q</div>
      <div class="col ascension-1">Ascend 1</div>
      <div class="col ascension-4">Ascend 4</div>
      <div class="col constellation">Const</div>
    </div>
  </div>

  {#each filteredScalings as data, n (data.id)}
    <div class="content-row row" class:alt={n % 2 === 1} transition:fade>
      <div class="content-row group basic separator">
        <ScalingStatCol {data} baseKey="icon" icon={true} />
        <ScalingStatCol {data} baseKey="name" />
        <ScalingStatCol {data} baseKey="base-stat" />
      </div>

      <div class="content-row group artifact separator">
        <ScalingStatCol {data} baseKey="sand" />
        <ScalingStatCol {data} baseKey="goblet" />
        <ScalingStatCol {data} baseKey="circlet" />
      </div>

      <div class="content-row group talent">
        <ScalingStatCol {data} baseKey="a" isRecommended={true} />
        <ScalingStatCol {data} baseKey="e" isRecommended={true} />
        <ScalingStatCol {data} baseKey="q" isRecommended={true} />
      </div>

      <div class="content-row group ascension">
        <ScalingStatCol {data} baseKey="a1" />
        <ScalingStatCol {data} baseKey="a4" />
        <ScalingStatCol {data} baseKey="constellation" fill={true} />
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  #content {
    font-size: 0.9em;
    margin-bottom: 20px;
  }

  .sticky {
    position: -webkit-sticky; /* for Safari */
    position: sticky;
    top: 0;
    align-self: flex-start;
    background: var(--theme-bg-container-main);
  }

  .header {
    font-size: 0.9em;
    font-weight: bold;
    border-bottom: 1px solid var(--theme-site-primary-main);

    @media only screen and (max-width: 960px) {
      display: none;
    }

    .top {
      border-top: 1px solid var(--theme-site-primary-main);
      border-bottom: 1px dotted var(--theme-border-light);
      color: #777;
    }

    .col {
      width: 75px;
      padding: 3px 5px 3px 0;
    }

    .empty {
      width: 216px;
    }

    .mainstat {
      width: 226px;
      text-align: center;
    }

    .charscaling {
      width: 485px;
      text-align: center;
    }

    .name {
      margin-left: 65px;
    }

    .base-stat,
    .circlet {
      width: 76px;
    }
  }

  .row {
    font-size: 0.9em;
    border-bottom: 1px dotted var(--theme-border-light);

    @media only screen and (max-width: 960px) {
      border-bottom: 0;
    }

    &:hover {
      background: var(--theme-bg-highlight);
    }
  }

  .group {
    display: inline-flex;
    align-items: center;
    font-size: 0.96em;

    @media only screen and (max-width: 960px) {
      width: 100%;
      border-bottom: 1px dotted var(--theme-border-light);
    }
  }

  .separator {
    border-right: 1px dotted var(--theme-border-light);
    margin-right: 10px;

    @media only screen and (max-width: 960px) {
      border-right: 0;
      margin-right: 0;
    }
  }
</style>
