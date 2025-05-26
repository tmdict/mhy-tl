<script>
  import { availableInputs, buildEditor } from '@store/editor';
  import EditorDropdownList from '$lib/components/editor/EditorDropdownList.svelte';
  import EditorTextField from '$lib/components/editor/EditorTextField.svelte';

  export let statKey;
  const keys = buildEditor.getKeys.stat(statKey);
</script>

<div class="content-row">
  <EditorDropdownList
    id={keys.statName}
    label="Stats Priority"
    list={$availableInputs.stat}
    l10n={$availableInputs.stat.reduce((acc, c) => ({ ...acc, [c]: c }), {})}
    width="160px"
    bind:selected={$buildEditor[keys.statName]}
  />
  <EditorTextField
    id={keys.statVal}
    label="Stats Reference"
    placeholder="Optional"
    width="260px"
    bind:value={$buildEditor[keys.statVal]}
  />
</div>
