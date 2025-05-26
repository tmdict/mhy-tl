<script>
  import { availableInputs, buildEditor } from '@store/editor';
  import { artifacts } from '@store/gamedata';
  import EditorDropdownList from '$lib/components/editor/EditorDropdownList.svelte';

  export let artifactKey;
  const keys = buildEditor.getKeys.artifact(artifactKey);

  $: l10n = Object.values($artifacts).reduce((acc, a) => {
    const name = a['data'] && a['data'].en ? a['data'].en['name'] : a.id;
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
    bind:selected={$buildEditor[keys.sets]}
  />
  <EditorDropdownList
    id={keys.artifact1}
    label="Artifact Set 1"
    list={$availableInputs.artifacts}
    {l10n}
    groups={Object.keys($availableInputs.artifacts).reverse()}
    bind:selected={$buildEditor[keys.artifact1]}
  />
  {#if $buildEditor[keys.sets] === 2}
    <EditorDropdownList
      id={keys.artifact2}
      label="Artifact Set 2"
      list={$availableInputs.artifacts}
      {l10n}
      groups={Object.keys($availableInputs.artifacts).reverse()}
      bind:selected={$buildEditor[keys.artifact2]}
    />
  {/if}
</div>
