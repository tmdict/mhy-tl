<script>
  import { toast } from '@store/toast';
  import lzstring from 'lz-string';
  import { browser } from '$app/environment';
  import { availableInputs, editor } from '@store/editor.svelte';
  import { CHARACTERS_DATA, WEAPONS_DATA } from '@store/gamedata';
  import { localData } from '@store/sitedata';
  import ID from '$lib/util/alias.json';
  import { compressBuild, decodeBuild, encodeBuild, extractBuild, hash } from '$lib/util/codec';
  import { parser } from '$lib/util/parser';
  import { validator } from '$lib/util/validator';
  import BuildFullPage from '$lib/components/build/BuildFullPage.svelte';
  import Copy from '$lib/svg/copy.svelte';
  import EditorBuildArtifact from '$lib/components/editor/EditorBuildArtifact.svelte';
  import EditorBuildStat from '$lib/components/editor/EditorBuildStat.svelte';
  import EditorBuildType from '$lib/components/editor/EditorBuildType.svelte';
  import EditorBuildWeapon from '$lib/components/editor/EditorBuildWeapon.svelte';
  import EditorDropdownList from '$lib/components/editor/EditorDropdownList.svelte';
  import EditorTextArea from '$lib/components/editor/EditorTextArea.svelte';
  import EditorTextField from '$lib/components/editor/EditorTextField.svelte';

  const preventDefault = fn => e => (e.preventDefault(), fn.call(this, e));
  const debugMode = false;

  editor.reset(); // Reset editor

  // If editing an existing build, parse data from URL
  if (browser) {
    const link = window.location.hash.substring(1);
    if (link.length > 0) {
      try {
        const importedBuild = decodeBuild(extractBuild(lzstring.decompressFromEncodedURIComponent(link)));
        editor.build = parser.importToEditor(importedBuild, editor.getKeys);
      } catch (err) {
        toast.error(`Cannot read build: ${err}`);
      }
    }
  }

  // Re-validate everytime an input changes
  let validated = $derived(validator.validateEditorBuild(editor.build, editor.getKeys, CHARACTERS_DATA, WEAPONS_DATA));
  let parsed = $derived.by(() => {
    return validated.result ? parser.parse(editor.build, editor.getKeys, CHARACTERS_DATA) : {};
  })
  let encoded = $derived.by(() => {
    return validated.result ? lzstring.compressToEncodedURIComponent(compressBuild(encodeBuild(parsed))) : '';
  })

  function copyToClipboard(link) {
    navigator.clipboard.writeText(window.location.hostname + link);
    toast.success('Copied to clipboard!');
  }

  function saveBuild() {
    try {
      const id = hash(JSON.stringify(parsed));
      // Only save if current build ID doesn't already exist
      if (!$localData['builds'].some((b) => b.id === id)) {
        // Update local storage
        $localData = {
          ...$localData,
          builds: [...$localData['builds'], { ...parsed, id: id }]
        };
        if (browser) {
          localStorage.setItem('tmdict.genshin.data', JSON.stringify($localData));
        }
        toast.success('Build saved.');
      } else {
        toast.error('Duplicate build!');
      }
    } catch (err) {
      toast.error(`Something went wrong: ${err}`);
    }
  }
</script>

<svelte:head>
  <title>Build Editor</title>
</svelte:head>

<h1>Build Editor</h1>
{#if debugMode}
  <div style="margin: 20px">
    raw: {JSON.stringify(editor.build, null, 2)}<br /><br />
    validate: {JSON.stringify(validated, null, 2)}<br /><br />
    parsed: {JSON.stringify(parsed, null, 2)}<br /><br />
    num: {JSON.stringify(editor.build['num'], null, 2)}<br /><br />
  </div>
{/if}

{#if validator.character(editor.build)}
  <h4>Preview</h4>
  <div class="content-row">
    {#if !validated.result}
      <div class="warning">
        <p>Missing Required Fields:</p>
        <ul>
          {#each validated.missing as missing}
            <li>{missing.en}</li>
          {/each}
        </ul>
      </div>
    {:else if encoded != ''}
      <BuildFullPage build={parsed} link={encoded} allowEdit={false} />

      <div class="share">
        <a href="/#" onclick={preventDefault(saveBuild)}>Save</a> ·
        <a href="/builds/build#{encoded}">Share</a> ·
        <span
          class="copy"
          title="Copy to clipboard"
          role="button"
          tabindex="0"
          onclick={() => copyToClipboard(`/builds/build#${encoded}`)}
          onkeydown={() => copyToClipboard(`/builds/build#${encoded}`)}><Copy /></span
        >
      </div>
    {/if}
  </div>
{/if}

<div id="build-editor">
  <h4>Basic Info</h4>
  <div class="content-row edit-section">
    <EditorDropdownList
      id="character"
      label="Character"
      list={availableInputs.characters}
      l10n={Object.values(CHARACTERS_DATA).reduce(
        (acc, c) => ({ ...acc, [c.id]: c.data ? c.data['name'] : c.id }),
        { '-': '-' }
      )}
      bind:selected={editor.build['character']}
    />
    {#if validator.character(editor.build)}
      <EditorDropdownList
        id="character-const"
        label="Constellation"
        list={availableInputs.const}
        inputWidth="60px"
        bind:selected={editor.build['constellation']}
      />
      <EditorTextField id="build-name" label="Name" bind:value={editor.build['name']} />
      <EditorBuildType />
    {/if}
  </div>

  {#if validator.character(editor.build)}
    <h4>Equipments</h4>
    <div class="content-row edit-section">
      <div class="content-col ">
        {#each Array(editor.build['num'].weapons) as _, i}
          <EditorBuildWeapon
            weaponKey={i}
            availableWeapons={availableInputs.weapons[CHARACTERS_DATA[editor.build['character']].weapon]}
          />
        {/each}
        <div class="content-row add-remove">
          {#if editor.build['num'].weapons > 1}
            <span
              class="remove-input"
              role="button"
              tabindex="0"
              onclick={() =>
                editor.removeInput(
                  'weapons',
                  Object.values(editor.getKeys.weapon(editor.build['num']['weapons'] - 1))
                )}
              onkeydown={() =>
                editor.removeInput(
                  'weapons',
                  Object.values(editor.getKeys.weapon(editor.build['num']['weapons'] - 1))
                )}>-</span
            >
          {/if}
          {#if editor.build['num'].weapons < 2}
            <span
              class="add-input"
              role="button"
              tabindex="0"
              onclick={() => editor.addInput('weapons', 2)}
              onkeydown={() => editor.addInput('weapons', 2)}>+</span
            >
          {/if}
        </div>
      </div>

      <div class="content-col">
        {#each Array(editor.build['num'].artifacts) as _, i}
          <EditorBuildArtifact artifactKey={i} />
        {/each}
        <div class="content-row add-remove">
          {#if editor.build['num'].artifacts > 1}
            <span
              class="remove-input"
              role="button"
              tabindex="0"
              onclick={() =>
                editor.removeInput(
                  'artifacts',
                  Object.values(editor.getKeys.artifact(editor.build['num']['artifacts'] - 1))
                )}
              onkeydown={() =>
                editor.removeInput(
                  'artifacts',
                  Object.values(editor.getKeys.artifact(editor.build['num']['artifacts'] - 1))
                )}>-</span
            >
          {/if}
          {#if editor.build['num'].artifacts < 2}
            <span
              class="add-input"
              role="button"
              tabindex="0"
              onclick={() => editor.addInput('artifacts', 2)}
              onkeydown={() => editor.addInput('artifacts', 2)}>+</span
            >
          {/if}
        </div>
      </div>
    </div>

    <h4>Stats</h4>
    <div class="content-row edit-section">
      <div class="content-col edit-mainstat">
        {#each ['sand', 'goblet', 'circlet'] as piece}
          <div class="content-row">
            <div class="content-col">
              {#each Array(editor.build['num']['mainstat'][piece]) as _, i}
                {@const mainstatKey = editor.getKeys.mainstat(piece, i).mainstat}
                <EditorDropdownList
                  id={mainstatKey}
                  label={i === 0 ? `${ID[piece]} Main Stats` : ''}
                  list={availableInputs[piece]}
                  l10n={availableInputs[piece].reduce((acc, c) => ({ ...acc, [c]: ID[c] }), {})}
                  width="200px"
                  bind:selected={editor.build[mainstatKey]}
                />
              {/each}
            </div>
            <div class="content-row add-remove">
              {#if editor.build['num']['mainstat'][piece] > 1}
                <span
                  class="remove-input"
                  role="button"
                  tabindex="0"
                  onclick={() =>
                    editor.removeNestedInput('mainstat', piece, [
                      editor.getKeys.mainstat(piece, editor.build['num']['mainstat'][piece] - 1).mainstat
                    ])}
                  onkeydown={() =>
                    editor.removeNestedInput('mainstat', piece, [
                      editor.getKeys.mainstat(piece, editor.build['num']['mainstat'][piece] - 1).mainstat
                    ])}>-</span
                >
              {/if}
              {#if editor.build['num']['mainstat'][piece] < 2}
                <span
                  class="add-input"
                  role="button"
                  tabindex="0"
                  onclick={() => editor.addNestedInput('mainstat', piece, 2)}
                  onkeydown={() => editor.addNestedInput('mainstat', piece, 2)}>+</span
                >
              {/if}
            </div>
          </div>
          <br />
        {/each}
      </div>

      <div class="content-col">
        {#each Array(editor.build['num'].stats) as _, i}
          <EditorBuildStat statKey={i} />
        {/each}
        <div class="content-row add-remove">
          {#if editor.build['num'].stats > 1}
            <span
              class="remove-input"
              role="button"
              tabindex="0"
              onclick={() =>
                editor.removeInput(
                  'stats',
                  Object.values(editor.getKeys.stat(editor.build['num']['stats'] - 1))
                )}
              onkeydown={() =>
                editor.removeInput(
                  'stats',
                  Object.values(editor.getKeys.stat(editor.build['num']['stats'] - 1))
                )}>-</span
            >
          {/if}
          {#if editor.build['num'].stats < 4}
            <span
              class="add-input"
              role="button"
              tabindex="0"
              onclick={() => editor.addInput('stats', 4)}
              onkeydown={() => editor.addInput('stats', 4)}>+</span
            >
          {/if}
        </div>
      </div>
    </div>

    <h4>Misc</h4>
    <div class="content-row edit-section">
      <div class="content-col">
        <EditorTextField
          id="talent"
          label="Talent Priority"
          placeholder="A > E > Q"
          width="300px"
          bind:value={editor.build['talent']}
        />
        <EditorTextField
          id="source"
          label="Sources"
          placeholder="Optional"
          width="300px"
          bind:value={editor.build['source']}
        />
      </div>
      <div class="content-col" style="flex: 1;">
        <EditorTextArea id="notes" label="Notes" bind:value={editor.build['notes']} />
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  h4 {
    margin: 0 20px;
    padding: 0px 4px 4px;
  }

  .warning {
    width: 100%;
    color: var(--theme-site-primary-alt);
    margin: 20px;
    padding: 10px 20px;
    border: 2px dashed var(--theme-site-primary-alt);
    border-radius: 10px;
  }

  .share {
    margin: 10px auto 40px;
    padding: 10px 10px;
    text-align: center;
    border-top: 1px solid var(--theme-site-primary-main);
    border-bottom: 1px solid var(--theme-site-primary-main);

    a,
    .copy {
      font-size: 1.4rem;
      margin: 0 10px;
    }

    .copy {
      &:hover {
        cursor: pointer;
      }
    }
  }

  #build-editor {
    .edit-section {
      padding: 20px 10px;
      border-top: 1px dotted var(--theme-border-light);
    }

    .add-remove {
      margin: 0 10px 20px;
    }

    .edit-mainstat {
      .add-remove {
        margin: 29px 150px 0 0;

        @media only screen and (max-width: 460px) {
          margin-right: 0;
        }
      }
    }

    .add-input,
    .remove-input {
      width: 40px;
      height: 25px;
      border-radius: 10px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin: 5px;
      background-color: var(--theme-bg-highlight-alt);

      &:hover {
        cursor: pointer;
        color: var(--theme-site-primary-alt);
        background-color: var(--theme-bg-highlight);
      }
    }
  }
</style>
