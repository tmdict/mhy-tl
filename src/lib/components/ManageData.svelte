<script>
  import ExportData from '$lib/components/ExportData.svelte';
  import ImportData from '$lib/components/ImportData.svelte';
  import ManageData from '$lib/components/content/ManageData.svelte';

  let show = false;
</script>

<a href="/#" class="important" on:click|preventDefault={() => (show = !show)}>Manage Data</a>
{#if show}
  <div class="manage-data">
    <p>
      <ImportData /> · <ExportData />
    </p>
    <p class="tip">
      <ManageData />
    </p>
  </div>
{/if}

<style lang="scss">
  .important {
    color: var(--theme-site-secondary-alt);
  }

  .manage-data {
    text-align: center;
    max-width: 600px;
    min-width: 300px;
    margin: 10px auto;

    .tip {
      font-size: 0.9em;
    }
  }
</style>
