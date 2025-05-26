<script>
  import { toast } from '@store/toast';
  import lzstring from 'lz-string';
  import { browser } from '$app/environment';
  import { availableInputs, buildEditor } from '@store/editor';
  import { characters, weapons } from '@store/gamedata';
  import { localData } from '@store/localdata';
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

  let parsed;
  let encoded;
  let validated;
  let debugMode = false;

  buildEditor.reset(); // Reset editor

  // If editing an existing build, parse data from URL
  if (browser) {
    const link = window.location.hash.substring(1);
    if (link.length > 0) {
      try {
        const importedBuild = decodeBuild(extractBuild(lzstring.decompressFromEncodedURIComponent(link)));
        $buildEditor = parser.importToEditor(importedBuild, buildEditor.getKeys, 'en');
      } catch (err) {
        toast.error(`Cannot read build: ${err}`);
      }
    }
  }

  $: {
    // Re-validate everytime an input chamges
    validated = validator.validateEditorBuild($buildEditor, buildEditor.getKeys, $characters, $weapons);
    if (validated.result) {
      parsed = parser.parse($buildEditor, buildEditor.getKeys, $characters, 'en');
      encoded = lzstring.compressToEncodedURIComponent(compressBuild(encodeBuild(parsed)));
    } else {
      parsed = {};
      encoded = '';
    }
  }

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
    raw: {JSON.stringify($buildEditor, null, 2)}<br /><br />
    validate: {JSON.stringify(validated, null, 2)}<br /><br />
    parsed: {JSON.stringify(parsed, null, 2)}<br /><br />
    num: {JSON.stringify($buildEditor['num'], null, 2)}<br /><br />
  </div>
{/if}

{#if validator.character($buildEditor)}
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
        <a href="/#" on:click|preventDefault={saveBuild}>Save</a> ·
        <a href="/builds/build#{encoded}">Share</a> ·
        <span
          class="copy"
          title="Copy to clipboard"
          role="button"
          tabindex="0"
          on:click={() => copyToClipboard(`/builds/build#${encoded}`)}
          on:keydown={() => copyToClipboard(`/builds/build#${encoded}`)}><Copy /></span
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
      list={$availableInputs.characters}
      l10n={Object.values($characters).reduce(
        (acc, c) => ({ ...acc, [c.id]: c.data && c.data.en ? c.data.en['name'] : c.id }),
        { '-': '-' }
      )}
      bind:selected={$buildEditor['character']}
    />
    {#if validator.character($buildEditor)}
      <EditorDropdownList
        id="character-const"
        label="Constellation"
        list={$availableInputs.const}
        inputWidth="60px"
        bind:selected={$buildEditor['constellation']}
      />
      <EditorTextField id="build-name" label="Name" bind:value={$buildEditor['name']} />
      <EditorBuildType />
    {/if}
  </div>

  {#if validator.character($buildEditor)}
    <h4>Equipments</h4>
    <div class="content-row edit-section">
      <div class="content-col ">
        {#each Array($buildEditor['num'].weapons) as _, i}
          <EditorBuildWeapon
            weaponKey={i}
            availableWeapons={$availableInputs.weapons[$characters[$buildEditor['character']].weapon]}
          />
        {/each}
        <div class="content-row add-remove">
          {#if $buildEditor['num'].weapons > 1}
            <span
              class="remove-input"
              role="button"
              tabindex="0"
              on:click={() =>
                buildEditor.removeInput(
                  'weapons',
                  Object.values(buildEditor.getKeys.weapon($buildEditor['num']['weapons'] - 1))
                )}
              on:keydown={() =>
                buildEditor.removeInput(
                  'weapons',
                  Object.values(buildEditor.getKeys.weapon($buildEditor['num']['weapons'] - 1))
                )}>-</span
            >
          {/if}
          {#if $buildEditor['num'].weapons < 2}
            <span
              class="add-input"
              role="button"
              tabindex="0"
              on:click={() => buildEditor.addInput('weapons', 2)}
              on:keydown={() => buildEditor.addInput('weapons', 2)}>+</span
            >
          {/if}
        </div>
      </div>

      <div class="content-col">
        {#each Array($buildEditor['num'].artifacts) as _, i}
          <EditorBuildArtifact artifactKey={i} />
        {/each}
        <div class="content-row add-remove">
          {#if $buildEditor['num'].artifacts > 1}
            <span
              class="remove-input"
              role="button"
              tabindex="0"
              on:click={() =>
                buildEditor.removeInput(
                  'artifacts',
                  Object.values(buildEditor.getKeys.artifact($buildEditor['num']['artifacts'] - 1))
                )}
              on:keydown={() =>
                buildEditor.removeInput(
                  'artifacts',
                  Object.values(buildEditor.getKeys.artifact($buildEditor['num']['artifacts'] - 1))
                )}>-</span
            >
          {/if}
          {#if $buildEditor['num'].artifacts < 2}
            <span
              class="add-input"
              role="button"
              tabindex="0"
              on:click={() => buildEditor.addInput('artifacts', 2)}
              on:keydown={() => buildEditor.addInput('artifacts', 2)}>+</span
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
              {#each Array($buildEditor['num']['mainstat'][piece]) as _, i}
                {@const mainstatKey = buildEditor.getKeys.mainstat(piece, i).mainstat}
                <EditorDropdownList
                  id={mainstatKey}
                  label={i === 0 ? `${piece} Main Stats` : ''}
                  list={$availableInputs[piece]}
                  l10n={$availableInputs[piece].reduce((acc, c) => ({ ...acc, [c]: c }), {})}
                  width="200px"
                  bind:selected={$buildEditor[mainstatKey]}
                />
              {/each}
            </div>
            <div class="content-row add-remove">
              {#if $buildEditor['num']['mainstat'][piece] > 1}
                <span
                  class="remove-input"
                  role="button"
                  tabindex="0"
                  on:click={() =>
                    buildEditor.removeNestedInput('mainstat', piece, [
                      buildEditor.getKeys.mainstat(piece, $buildEditor['num']['mainstat'][piece] - 1).mainstat
                    ])}
                  on:keydown={() =>
                    buildEditor.removeNestedInput('mainstat', piece, [
                      buildEditor.getKeys.mainstat(piece, $buildEditor['num']['mainstat'][piece] - 1).mainstat
                    ])}>-</span
                >
              {/if}
              {#if $buildEditor['num']['mainstat'][piece] < 2}
                <span
                  class="add-input"
                  role="button"
                  tabindex="0"
                  on:click={() => buildEditor.addNestedInput('mainstat', piece, 2)}
                  on:keydown={() => buildEditor.addNestedInput('mainstat', piece, 2)}>+</span
                >
              {/if}
            </div>
          </div>
          <br />
        {/each}
      </div>

      <div class="content-col">
        {#each Array($buildEditor['num'].stats) as _, i}
          <EditorBuildStat statKey={i} />
        {/each}
        <div class="content-row add-remove">
          {#if $buildEditor['num'].stats > 1}
            <span
              class="remove-input"
              role="button"
              tabindex="0"
              on:click={() =>
                buildEditor.removeInput(
                  'stats',
                  Object.values(buildEditor.getKeys.stat($buildEditor['num']['stats'] - 1))
                )}
              on:keydown={() =>
                buildEditor.removeInput(
                  'stats',
                  Object.values(buildEditor.getKeys.stat($buildEditor['num']['stats'] - 1))
                )}>-</span
            >
          {/if}
          {#if $buildEditor['num'].stats < 4}
            <span
              class="add-input"
              role="button"
              tabindex="0"
              on:click={() => buildEditor.addInput('stats', 4)}
              on:keydown={() => buildEditor.addInput('stats', 4)}>+</span
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
          bind:value={$buildEditor['talent']}
        />
        <EditorTextField
          id="source"
          label="Sources"
          placeholder="Optional"
          width="300px"
          bind:value={$buildEditor['source']}
        />
      </div>
      <div class="content-col" style="flex: 1;">
        <EditorTextArea id="notes" label="Notes" bind:value={$buildEditor['notes']} />
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
