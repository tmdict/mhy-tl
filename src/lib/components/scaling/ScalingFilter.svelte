<script>
  import { charScalingFilters } from '@store/filterlist';

  export let filterHeader;
  export let filterKey;
  export let filter;

  function addAll(filters, type) {
    charScalingFilters.resetByType(type);
    filters.forEach((item) => charScalingFilters.updateCommonFilter(type, item));
  }
</script>

<div class="filter">
  <h4>{filterHeader}</h4>
  <ul>
    {#each filter as key}
      <li>
        <a
          class:active={$charScalingFilters[filterKey].common.includes(key)}
          href="/#"
          on:click|preventDefault={() => charScalingFilters.updateCommonFilter(filterKey, key)}>{key}</a
        >
      </li>
    {/each}
    <li><a href="/#" on:click|preventDefault={() => addAll(filter, filterKey)}>All</a></li>
    <li>
      <a href="/#" on:click|preventDefault={() => charScalingFilters.resetByType(filterKey)}
        >Clear All</a
      >
    </li>
  </ul>
</div>

<style lang="scss">
  .filter {
    margin: 15px 40px;
    align-items: flex-start;
    justify-content: space-between;
    font-size: 0.95em;

    @media only screen and (max-width: 960px) {
      margin: 5px 0;
      font-size: 0.8em;
    }

    h4 {
      text-align: center;
    }

    ul {
      display: flex;
      flex-wrap: wrap;
      list-style: none;
      justify-content: center;
      padding: 0;

      li {
        display: list-item;
        margin: 0 5px 5px 0;

        a {
          display: block;
          padding: 5px 10px;
          border: 1px solid var(--theme-border-light);

          &:hover {
            text-decoration: none;
            color: var(--theme-site-secondary-alt);
          }

          &.active {
            background-color: var(--theme-bg-container-alt);
            border: 1px solid var(--theme-site-primary-main);

            &:hover {
              background: var(--theme-bg-container-main);
            }
          }
        }
      }
    }
  }
</style>
