<script>
  import BuildMainStat from '$lib/components/build/BuildMainStat.svelte';

  let { mainstat, showHeader = true } = $props();
</script>

<div class="content-col mainstats">
  <div class="build-heading" class:hidden={!showHeader}>Artifact Main Stats</div>
  <BuildMainStat type="sands-of-eon" stats={mainstat.sand} />
  <BuildMainStat type="goblet-of-eonothem" stats={mainstat.goblet} />
  <BuildMainStat type="circlet-of-logos" stats={mainstat.circlet} />
</div>

<style lang="scss">
  .mainstats {
    width: 150px;
  }

  .hidden {
    display: none;
  }
</style>
