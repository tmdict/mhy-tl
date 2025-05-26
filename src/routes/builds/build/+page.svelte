<script>
  import lzstring from 'lz-string';
  import { browser } from '$app/environment';
  import { characters } from '@store/gamedata';
  import BuildFullPage from '$lib/components/build/BuildFullPage.svelte';
  import { decodeBuild, extractBuild } from '$lib/util/codec';
  import { validator } from '$lib/util/validator';

  let build = {};
  let link = '';

  if (browser) {
    link = window.location.hash.substring(1);
    if (link.length > 0) {
      try {
        build = decodeBuild(extractBuild(lzstring.decompressFromEncodedURIComponent(link)));
      } catch (err) {
        console.log(`Decode failed: ${err}`);
      }
    }
  }
</script>

<svelte:head>
  {#if validator.validateBuild(build, 'en')}
    <title>{$characters[build.character].data.en.name} · {build.name.en}</title>
  {/if}
</svelte:head>

{#if validator.validateBuild(build, 'en')}
  <BuildFullPage {build} {link} />
{/if}
