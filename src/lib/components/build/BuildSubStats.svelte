<script>
  import ID from '$lib/util/alias.json';

  let { stats, showHeader = true } = $props();
</script>

<div class="content-col substats">
  <div class="build-heading" class:hidden={!showHeader}>
    Sub Stats Priority <span class="highlight">(Reference)</span>
  </div>
  <ol>
    {#each stats as stat}
      {@const [id, value] = Object.entries(stat).flat()}
      <li>
        {ID[id]}{#if value !== ''}: <span class="highlight">{value}</span>{/if}
      </li>
    {/each}
  </ol>
</div>

<style lang="scss">
  .substats {
    width: 220px;

    @media only screen and (max-width: 460px) {
      width: 200px;
    }
  }

  ol {
    margin: 0;
    padding: 0 0 0 25px;

    li:not(:last-child) {
      padding: 1px 0;
      border-bottom: 1px dotted var(--theme-border-light);
    }
  }

  .hidden {
    display: none;
  }

  .highlight {
    color: var(--theme-site-secondary-main);
  }

  @media only screen and (max-width: 390px) {
    .build-heading .highlight {
      display: none;
    }
  }
</style>
