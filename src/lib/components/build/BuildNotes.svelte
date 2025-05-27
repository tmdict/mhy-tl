<script>
  let { build } = $props();
</script>

<div class="notes">
  {#if build.talent}
    <span class="build-heading">Talent Priority:</span>
    {build.talent}
    <br />
  {/if}
  {#if build.notes}
    <br />
    <div class="build-heading">Notes</div>
    {build.notes}
  {/if}
</div>
