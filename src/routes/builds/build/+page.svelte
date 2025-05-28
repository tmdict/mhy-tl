<script>
  import lzstring from 'lz-string';
  import { browser } from '$app/environment';
  import { CHARACTERS_DATA } from '@store/gamedata';
  import BuildFullPage from '$lib/components/build/BuildFullPage.svelte';
  import { decodeBuild, extractBuild } from '$lib/util/codec';
  import { validator } from '$lib/util/validator';

  const link = browser ? window.location.hash.substring(1) : '';
  let build = $state({});
  try {
    build = (link.length > 0)
      ? decodeBuild(extractBuild(lzstring.decompressFromEncodedURIComponent(link)))
      : {};
  } catch (err) {
    console.log(`Failed to generate build link: ${err}`);
  }
</script>

<svelte:head>
  {#if validator.validateBuild(build)}
    <title>{CHARACTERS_DATA[build.character].data.name} · {build.name}</title>
  {/if}
</svelte:head>

{#if validator.validateBuild(build)}
  <BuildFullPage {build} {link} />
{:else}
  <h1>Cannot load build :-(</h1>
{/if}
