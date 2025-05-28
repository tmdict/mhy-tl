<script>
  import { filterlist } from "@store/filterlist.svelte"
  import ID from '$lib/util/alias.json';
  import BuildFilterItem from '$lib/components/build/BuildFilterItem.svelte';

  const preventDefault = fn => e => (e.preventDefault(), fn.call(this, e));
  let { filter, showFilter = false } = $props()

  if (['type', 'vision'].includes(filter.name)) {
    showFilter = true;
  }
</script>

<div class="filter">
  <h4>
    <a href="/#" onclick={preventDefault(() => (showFilter = !showFilter))}>  
      {ID[filter.name]}
      <span class="show">{#if showFilter}-{:else}+{/if}</span>
    </a>
  </h4>
  {#if showFilter}
    <div class="content-row">
      {#each filter.filter as item}
        <BuildFilterItem name={filter.name} type={filter.type} {item} />
      {/each}
      <div>
        <a class="clear" href="/#" onclick={preventDefault(() => filterlist.resetByType(filter.name))}>
          Clear
        </a>
        ·
        <a class="clear" href="/#" onclick={preventDefault(() => filterlist.reset())}>
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
