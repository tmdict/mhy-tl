<script>
  import Fuse from 'fuse.js';
  import cloneDeep from 'lodash.clonedeep';
  import { slide } from 'svelte/transition';
  import { localData } from '@store/sitedata';
  import Achievement from '$lib/components/Achievement.svelte';
  import AchievementFaq from '$lib/components/content/AchievementFaq.svelte';
  import ManageData from '$lib/components/ManageData.svelte';
  import { highlight } from '$lib/util/highlight';

  const achievementData = import.meta.glob('@data/achievements/*.yml', { eager: true });
  const achievements = Object.values(achievementData).map((d) => d.default);

  let searchTerm = '';
  let filters = ['mondstadt', 'liyue', 'inazuma', 'sumeru', 'fontaine', 'natlan'];

  let filteredList = cloneDeep(achievements);
  let currentFilter = { field: '', value: '' };
  let sortByCompletion = false;
  let showFaq = false;

  $: {
    // 1. filter by search
    if (searchTerm !== '') {
      // Update what language to search for
      let minMatchCharLen = (searchTerm.length > 3) ? searchTerm.length - 2 : 2
      const fuse = new Fuse(achievements, {
        ...{
          includeMatches: true,
          minMatchCharLength: minMatchCharLen,
          findAllMatches: true,
          shouldSort: true,
          ignoreLocation: true,
          threshold: 0.0,
        },
        keys: [{ name: 'commission', weight: 2 }, 'name', 'description']
      });
      const results = fuse.search(searchTerm);
      if (results.length > 0) {
        // Highlight and return search results
        // Deep clone results so highlight doesn't modify original results
        filteredList = highlight(cloneDeep(results));
      }
    } else {
      filteredList = cloneDeep(achievements);
    }
    // 2. filter by static filters
    filteredList =
      currentFilter.field == ''
        ? filteredList
        : cloneDeep(filteredList.filter((achievement) => achievement[currentFilter.field] === currentFilter.value));
    // 3. Sort
    filteredList = sortByCompletion ? sortBy(filteredList, 'achievements') : sortBy(filteredList, 'version');
  }

  function sortBy(list, sortField) {
    if (sortField === 'achievements') {
      return list.sort((b, a) => {
        const aComplete = Object.values($localData['achievements'][a.achievement]).every((c) => c === true);
        const bComplete = Object.values($localData['achievements'][b.achievement]).every((c) => c === true);
        return aComplete === bComplete ? 0 : aComplete ? -1 : 1;
      });
    } else {
      return list.sort((a, b) => b[sortField] - a[sortField]);
    }
  }

  function clearAll() {
    filteredList = cloneDeep(achievements);
    currentFilter = { field: '', value: '' };
    sortByCompletion = false;
    searchTerm = '';
  }
</script>

<svelte:head>
  <title>Achievements</title>
</svelte:head>

<div class="top">
  <h1>Daily Commission Achievements</h1>

  <div class="content-col">
    <input class="search" bind:value={searchTerm} />

    <div class="menu">
      <a href="/#" on:click|preventDefault={() => (showFaq = !showFaq)}>FAQ</a>
      <span class="menu-separator"></span>
      <ManageData />
    </div>

    <div class="menu">
      {#each filters as filter}
        <a
          class:active={filter === currentFilter.value}
          href="/#"
          on:click|preventDefault={() => (currentFilter = { field: 'region', value: filter })}>{filter}</a>
        >{' · '}
      {/each}
      <a href="/#" on:click|preventDefault={() => (sortByCompletion = !sortByCompletion)}>Incomplete</a>
      <span class="menu-separator"></span>
      <a href="/#" on:click|preventDefault={clearAll}>Clear All</a>
    </div>
  </div>
</div>

{#if showFaq}
  <div id="faq" transition:slide>
    <AchievementFaq />
  </div>
{/if}

{#each filteredList as achievement, i (achievement.achievement)}
  <Achievement
    {achievement}
    alt={i % 2 != 0}
  />
{/each}

<style lang="scss">
  .top {
    input {
      width: 90%;
      margin: 10px auto 20px;
      padding: 10px;
      flex: 1 1 auto;
      font-size: 1.4rem;
      line-height: 2rem;
      border-radius: 10px;
      border: 1px solid #aaa;
    }

    .active {
      color: var(--theme-site-primary-alt);
    }
  }
</style>
