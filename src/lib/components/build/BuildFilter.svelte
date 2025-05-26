<script>
  import { buildsFilters } from '@store/filterlist';
  import BuildFilterItem from '$lib/components/build/BuildFilterItem.svelte';

  export let filter;
  export let showFilter = false;
  if (['type', 'vision'].includes(filter.name)) {
    showFilter = true;
  }
</script>

<div class="filter">
  <h4>
    <a href="/#" on:click|preventDefault={() => (showFilter = !showFilter)}>  
      {filter.name}
      <span class="show">{#if showFilter}-{:else}+{/if}</span>
    </a
  ></h4>
  {#if showFilter}
    <div class="content-row">
      {#each filter.filter as item}
        <BuildFilterItem name={filter.name} type={filter.type} {item} />
      {/each}
      <div>
        <a class="clear" href="/#" on:click|preventDefault={() => buildsFilters.resetByType(filter.name)}>
          Clear
        </a>
        ·
        <a class="clear" href="/#" on:click|preventDefault={() => buildsFilters.reset()}>
          Clear All
        </a>
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  h4 {
    font-size: 0.85em;
    margin-left: 5px;
    
    a {
      color: var(--theme-site-primary-main);

      &:hover {
        color: var(--theme-site-primary-alt);
        text-decoration: none;
      }

      .show {
        color: var(--theme-site-primary-alt);
      }
    }
  }

  .filter {
    margin-bottom: 25px;

    .content-row {
      align-items: center;
    }

    .clear {
      font-size: 0.9em;
      margin: 0 5px;
    }
  }
</style>
