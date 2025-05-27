<script>
  import { availableInputs, editor } from '@store/editor.svelte';
  import { ARTIFACTS_DATA } from '@store/gamedata';
  import EditorDropdownList from '$lib/components/editor/EditorDropdownList.svelte';

  export let artifactKey;
  const keys = editor.getKeys.artifact(artifactKey);

  $: l10n = Object.values(ARTIFACTS_DATA).reduce((acc, a) => {
    const name = a['data'] ? a['data']['name'] : a.id;
    return { ...acc, [a.id]: name };
  }, {});
</script>

<div class="content-row">
  <EditorDropdownList
    id={keys.sets}
    label="Sets"
    list={[4, 2]}
    width="80px"
    inputWidth="60px"
    bind:selected={editor.build[keys.sets]}
  />
  <EditorDropdownList
    id={keys.artifact1}
    label="Artifact Set 1"
    list={availableInputs.artifacts}
    {l10n}
    groups={Object.keys(availableInputs.artifacts).reverse()}
    bind:selected={editor.build[keys.artifact1]}
  />
  {#if editor.build[keys.sets] === 2}
    <EditorDropdownList
      id={keys.artifact2}
      label="Artifact Set 2"
      list={availableInputs.artifacts}
      {l10n}
      groups={Object.keys(availableInputs.artifacts).reverse()}
      bind:selected={editor.build[keys.artifact2]}
    />
  {/if}
</div>
