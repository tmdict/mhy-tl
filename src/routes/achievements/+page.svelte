<script>
  import Fuse from 'fuse.js';
  import cloneDeep from 'lodash.clonedeep';
  import { slide } from 'svelte/transition';
  import { achievements } from '@store/gamedata';
  import { localData } from '@store/localdata';
  import { l10n, lang } from '@store/site';
  import Achievement from '$lib/components/Achievement.svelte';
  import ManageData from '$lib/components/ManageData.svelte';
  import AchievementFaqEn from '$lib/components/content/AchievementFaq/En.svelte';
  import AchievementFaqZh from '$lib/components/content/AchievementFaq/Zh.svelte';
  import { highlight } from '$lib/util/highlight';

  let searchTerm = '';
  let filters = ['mondstadt', 'liyue', 'inazuma', 'sumeru', 'fontaine', 'natlan'];

  let filteredList = cloneDeep($achievements);
  let currentFilter = { field: '', value: '' };
  let sortByCompletion = false;
  let showFaq = false;

  const faq = { en: AchievementFaqEn, zh: AchievementFaqZh };

  $: {
    // 1. filter by search
    if (searchTerm !== '') {
      // Update what language to search for
      let minMatchCharLen = (searchTerm.length > 3) ? searchTerm.length - 2 : 2
      const fuse = new Fuse($achievements, {
        ...{
          includeMatches: true,
          minMatchCharLength: minMatchCharLen,
          findAllMatches: true,
          shouldSort: true,
          ignoreLocation: true,
          threshold: 0.0,
        },
        keys: [{ name: $lang + '.commission', weight: 2 }, $lang + '.name', $lang + '.description']
      });
      const results = fuse.search(searchTerm);
      if (results.length > 0) {
        // Highlight and return search results
        // Deep clone results so highlight doesn't modify original results
        filteredList = highlight(cloneDeep(results));
      }
    } else {
      filteredList = cloneDeep($achievements);
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
    filteredList = cloneDeep($achievements);
    currentFilter = { field: '', value: '' };
    sortByCompletion = false;
    searchTerm = '';
  }
</script>

<svelte:head>
  <title>{$l10n['achievements'][$lang]}</title>
</svelte:head>

<div class="top">
  <h1>{$l10n['commission-achievements'][$lang]}</h1>

  <div class="content-col">
    <input class="search" bind:value={searchTerm} />

    <div class="menu">
      <a href="/#" on:click|preventDefault={() => (showFaq = !showFaq)}>{$l10n['faq'][$lang]}</a>
      <span class="menu-separator"></span>
      <ManageData />
    </div>

    <div class="menu">
      {#each filters as filter}
        <a
          class:active={filter === currentFilter.value}
          href="/#"
          on:click|preventDefault={() => (currentFilter = { field: 'region', value: filter })}>{$l10n[filter][$lang]}</a>
        >{' · '}
      {/each}
      <a href="/#" on:click|preventDefault={() => (sortByCompletion = !sortByCompletion)}>{$l10n.completed[$lang]}</a>
      <span class="menu-separator"></span>
      <a href="/#" on:click|preventDefault={clearAll}>{$l10n['clear-all'][$lang]}</a>
    </div>
  </div>
</div>

{#if showFaq}
  <div id="faq" transition:slide>
    <svelte:component this={faq[$lang]} />
  </div>
{/if}

{#each filteredList as achievement, i (achievement.achievement)}
  <Achievement
    {achievement}
    content={achievement[$lang] ? achievement[$lang] : achievement[lang.default()]}
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
