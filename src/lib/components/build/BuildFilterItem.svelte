<script>
  import { filterlist } from "@store/filterlist.svelte.js"
  import { images } from '@store/site';
  import Icon from '$lib/components/Icon.svelte';

  let { name, type, item } = $props();
</script>

<div class="filter-item"
  class:active={filterlist.get(name).quick === item || filterlist.get(name).common.includes(item)}
  role="presentation"
>
  <div
    class="quick content-row list-{type === 'icon' ? 'icon' : 'text'}"
    class:active={filterlist.get(name).quick === item}
    role="button"
    tabindex="0"
    onclick={() => filterlist.updateQuickFilter(name, item)}
    onkeydown={() => filterlist.updateQuickFilter(name, item)}
  >
    {#if type === 'icon' && name === 'artifact'}
      <Icon
        id={item}
        src={$images[`/src/lib/img/artifact/${item}.png`]}
        size="45px"
        margin="0 5px 0 0"
      />
    {:else if type === 'icon' && name === 'weapon-type'}
      <Icon
        id={item}
        src={$images[`/src/lib/img/weapon-type/${item}.png`]}
        size="25px"
        margin="0 5px 0 0"
      />
      {#if ['vision', 'weapon-type'].includes(name)}
        {item}
      {/if}
    {:else if type === 'icon' && name === 'vision'}
      <Icon
        enhance={false}
        id={item}
        src="/img/{name}/{item}.svg"
        size="25px"
        margin="0 5px 0 0"
      />
      {#if ['vision', 'weapon-type'].includes(name)}
        {item}
      {/if}
    {:else}
      {item}
    {/if}
  </div>
  <div
    class="common list-{type}"
    class:active={filterlist.get(name).common.includes(item)}
    role="button"
    tabindex="0"
    onclick={() => filterlist.updateCommonFilter(name, item)}
    onkeydown={() => filterlist.updateCommonFilter(name, item)}
  ></div>
</div>

<style lang="scss">
  .filter-item {
    display: flex;
    font-size: 0.8em;
    margin: 5px;
    align-items: stretch;
    border: 1px solid var(--theme-border-light);

    &.active {
      font-weight: bold;
      color: var(--theme-site-primary-main);
      border: 1px solid var(--theme-site-primary-main);
    }

    .quick {
      padding: 2px 10px 2px 5px;
      min-width: 60px;
      overflow-wrap: anywhere;
      align-items: center;

      &:hover {
        color: var(--theme-site-primary-alt);
        background: var(--theme-bg-highlight);
        cursor: pointer;
      }

      &.active {
        background: var(--theme-bg-highlight);

        &:hover {
          background: var(--theme-bg-highlight);
        }
      }
    }

    .common {
      width: 35px;
      border-left: 1px dotted var(--theme-border-light);

      &:hover {
        background: var(--theme-bg-highlight);
        cursor: pointer;
      }

      &.active {
        background: var(--theme-site-primary-main);
        border: 2px var(--theme-bg-container-main) solid;
      }
    }
  }
</style>
