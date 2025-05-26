<script>
  import { toast } from '@store/toast';
  import lzstring from 'lz-string';
  import { browser } from '$app/environment';
  import { localData } from '@store/sitedata';
  import { compressBuild, encodeBuild } from '$lib/util/codec';

  export let build;
  let encoded = '';
  try {
    encoded = lzstring.compressToEncodedURIComponent(compressBuild(encodeBuild(build)));
  } catch (err) {
    console.log(`Failed to generate build link: ${err}`);
  }

  function deleteBuild() {
    try {
      const afterDeletion = $localData['builds'].filter((b) => b.id != build.id);
      $localData = { ...$localData, builds: afterDeletion };
      browser && localStorage.setItem('tmdict.genshin.data', JSON.stringify($localData));
      toast.success('Build deleted.');
    } catch (err) {
      toast.error(`Something went wrong: ${err}`);
    }
  }
</script>

<div class="menu manage">
  <a on:click|stopPropagation href="/builds/build#{encoded}">Link</a>
  <span class="menu-separator"></span>
  <a on:click|stopPropagation href="/builds/edit#{encoded}">Edit</a>
  {#if 'id' in build}
    <span class="menu-separator"></span>
    <a href="/#" on:click|stopPropagation|preventDefault={deleteBuild}>Delete</a>
  {/if}
</div>

<style lang="scss">
  .manage {
    width: 100%;
    border-top: 1px dotted var(--theme-border-light);
  }
</style>
