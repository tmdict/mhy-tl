<script>
  import { slide } from 'svelte/transition';

  let {
    id,
    name = id,
    label = '',
    list,
    selected = $bindable(),
    width = '200px',
    inputWidth = 'auto',
    exclude = [],
    groups = [],
    l10n = {} // For overriding display value
  } = $props();

  if (selected === undefined && list.length > 0) {
    selected = list[0];
  }
</script>

<div transition:slide class="input-field" style="--input-width: {width}">
  <label for={id}>{label}</label>
  <select class="input" style="--input-box-width: {inputWidth}" bind:value={selected} {id} {name}>
    {#if groups.length > 0}
      {#each groups as group}
        <optgroup label={group}>
          {#each list[group] as item}
            <option disabled={exclude.includes(item)} value={item}>
              {Object.keys(l10n).length === 0 ? item : l10n[item]}
            </option>
          {/each}
        </optgroup>
      {/each}
    {:else}
      {#each list as item}
        <option disabled={exclude.includes(item)} value={item}>
          {Object.keys(l10n).length === 0 ? item : l10n[item]}
        </option>
      {/each}
    {/if}
  </select>
</div>

<style lang="scss">
  .input-field {
    width: var(--input-width);
  }

  .input:hover {
    cursor: pointer;
    color: var(--theme-site-primary-alt);
  }

  select {
    width: var(--input-box-width);
  }

  label {
    padding: 6px 0 0 13px;
  }
</style>
