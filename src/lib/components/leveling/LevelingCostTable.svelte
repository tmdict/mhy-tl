<script>
  import { slide } from 'svelte/transition';
  import LevelingCostItem from '$lib/components/leveling/LevelingCostItem.svelte';

  export let tableData;
  export let keys;
  export let total;

  let showDetail = false;

  function toggleDetails() {
    showDetail = !showDetail;
  }
</script>

<div class="content-row row total" role="button" tabindex="0" on:click={toggleDetails} on:keydown={toggleDetails}>
  <div class="content-row group separator">
    <div class="content-row level">Total</div>
  </div>
  {#each Object.values(keys) as characterKeys, n}
    <div class="content-row group" class:separator={n < Object.keys(keys).length - 1}>
      {#each characterKeys as key}
        <div class="content-col">
          {#each Object.entries(total[key]) as [id, data]}
            <LevelingCostItem {id} count={data.count} rarity={data.rarity} />
          {/each}
        </div>
      {/each}
    </div>
  {/each}
</div>
{#if showDetail}
  <div transition:slide={{ duration: 200 }}>
    {#each Object.values(tableData) as data}
      <div class="content-row row">
        <div class="content-row group separator">
          <div class="content-row level"><span class="from">{data.from}</span> > <span class="to">{data.to}</span></div>
        </div>
        {#each Object.values(keys) as characterKeys, n}
          <div class="content-row group" class:separator={n < Object.keys(keys).length - 1}>
            {#each characterKeys as key}
              <LevelingCostItem id={data.cost[key].id} count={data.cost[key].count} rarity={data.cost[key].rarity} />
            {/each}
          </div>
        {/each}
      </div>
    {/each}
  </div>
{/if}

<style lang="scss">
  .total:hover {
    cursor: pointer;
  }

  .row {
    font-size: 0.9em;
    background: var(--theme-bg-highlight);
    border-bottom: 1px dotted var(--theme-border-light);

    @media only screen and (max-width: 960px) {
    }

    &:hover {
      background: var(--theme-bg-container-main);
    }
  }

  .group {
    display: inline-flex;
    padding: 5px 0 10px;

    @media only screen and (max-width: 960px) {
      width: 100%;
      border-top: 1px dotted var(--theme-border-light);
    }

    .level {
      width: 80px;
      font: bold 1em var(--theme-main-font);
      align-items: center;
      justify-content: center;

      .from {
        color: var(--theme-text-highlight);
        margin-right: 5px;
      }

      .to {
        color: var(--theme-site-primary-main);
        margin-left: 5px;
      }
    }
  }

  .separator {
    border-right: 1px dotted var(--theme-border-light);
    margin-right: 1px;

    @media only screen and (max-width: 960px) {
      border-right: 0;
      margin-right: 0;
    }
  }
</style>
