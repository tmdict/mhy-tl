<script>
  import { IMAGES } from '@store/sitedata';
  import ID from '$lib/util/alias.json';

  let { type, stats } = $props();
</script>

<div class="content-row mainstat">
  <div class="icon">
    <enhanced:img class="piece-img" src={IMAGES[`/src/lib/img/artifact-piece/${type}.png`]} alt={type} />
  </div>
  <div>
    {#each stats as stat, i}
      {i !== 0 ? ' · ' : ''}{ID[stat]}
    {/each}
  </div>
</div>

<style lang="scss">
  .mainstat {
    align-items: center;
    padding: 2px 0;

    .icon {
      margin: 0 5px 0 2px;

      .piece-img {
        width: 17px;
        height: 17px;
      }
    }
  }
</style>
