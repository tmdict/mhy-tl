<script>
  import { CHARACTERS_DATA, RARITY } from '@store/gamedata';
  import { IMAGES } from '@store/sitedata';
  import Icon from '$lib/components/Icon.svelte';

  let { character, constellation, size = '50px' } = $props();
</script>

<div class="content-row character">
  <Icon
    id={character}
    title={CHARACTERS_DATA[character] ? CHARACTERS_DATA[character].data.name : character}
    src={IMAGES[`/src/lib/img/character/${character}.png`]}
    rarity={RARITY[character]}
    {size}
    margin="0"
  />
  {#if constellation > 0}<div class="overlay">{constellation}</div>{/if}
</div>

<style lang="scss">
  .character {
    position: relative;
  }

  .overlay {
    top: 37px;
    left: 41px;
  }
</style>
