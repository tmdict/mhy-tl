<script>
  import { availableInputs, editor } from '@store/editor.svelte';
  import ID from '$lib/util/alias.json';
  import EditorDropdownList from '$lib/components/editor/EditorDropdownList.svelte';
  import EditorTextField from '$lib/components/editor/EditorTextField.svelte';

  let { statKey }  = $props();
  const keys = editor.getKeys.stat(statKey);
</script>

<div class="content-row">
  <EditorDropdownList
    id={keys.statName}
    label="Sub Stats Priority"
    list={availableInputs.stat}
    l10n={availableInputs.stat.reduce((acc, c) => ({ ...acc, [c]: ID[c] }), {})}
    width="160px"
    bind:selected={editor.build[keys.statName]}
  />
  <EditorTextField
    id={keys.statVal}
    label="Reference"
    placeholder="Optional"
    width="260px"
    bind:value={editor.build[keys.statVal]}
  />
</div>
