<script>
  export let build;
</script>

<div class="notes">
  {#if build.talent}
    <span class="build-heading">Talent Priority:</span>
    {build.talent}
    <br />
  {/if}
  {#if build.notes && build.notes.en}
    <br />
    <div class="build-heading">Notes</div>
    {build.notes.en}
  {/if}
</div>
