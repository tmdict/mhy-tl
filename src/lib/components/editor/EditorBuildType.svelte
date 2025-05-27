<script>
  import { buildtypes } from '@store/builds';
  import { editor } from '@store/editor.svelte';
  import ID from '$lib/util/alias.json';
  import EditorAutoComplete from '$lib/components/editor/EditorAutoComplete.svelte';

  let selectedOptions = editor.build['type'] ? editor.build['type'] : [];

  const handleSubmit = (selectedValue) => {
    if (selectedOptions.indexOf(selectedValue) === -1) {
      selectedOptions = [...selectedOptions, selectedValue];
    }
    editor.set('type', selectedOptions);
  };

  const clearAll = () => {
    selectedOptions = [];
    editor.set('type', []);
  };
</script>

<div class="content-col">
  <EditorAutoComplete
    id="build-type"
    label="Build Type"
    placeholder="Select build type"
    options={buildtypes}
    l10n={buildtypes.reduce((acc, t) => ({ ...acc, [t]: ID[t] }), {})}
    onSubmit={handleSubmit}
  />

  <div class="type-label content-row">
    {#each selectedOptions as option}
      <span class="label">{ID[option]}</span>
    {/each}
    {#if selectedOptions.length > 0}
      <a class="clear" on:click|preventDefault={clearAll} href="/#">Clear All</a>
    {/if}
  </div>
</div>

<style lang="scss">
  .type-label {
    margin: 0 8px;
    max-width: 240px;
  }

  .label {
    color: var(--theme-text-normal);
    font-size: 0.85rem;
    background: var(--theme-bg-highlight);
    border: 1px dotted var(--theme-border-light);
    margin: 0 5px 5px;
    padding: 5px;
    border-radius: 10px;
  }

  .clear {
    font-size: 0.8rem;
    margin: 5px 10px;
  }
</style>
