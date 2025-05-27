<script>
  import { tooltip } from '$lib/util/tooltip';

  let {
    enhance = true,
    src,
    id,
    title = id,
    rarity = -1,
    size = '60px',
    margin = '10px',
    hasTooltip = false,
    tooltipContent = ''
  } = $props();
</script>

<div
  class="icon {rarity === -1 ? '' : `rarity-${rarity}`}"
  style="--icon-margin: {margin}"
  use:tooltip={{
    enabled: hasTooltip,
    tippy: {
      content: tooltipContent,
      trigger: 'click',
      theme: 'custom',
      animation: 'scale-subtle',
      allowHTML: true
    }
  }}
>
  {#if enhance}
    <enhanced:img class="icon-img" {src} {title} alt={id} style="--icon-size: {size}" loading="lazy"/>
  {:else}
    <img class="icon-img" {src} {title} alt={id} style="--icon-size: {size}" loading="lazy" />
  {/if}
</div>

<style lang="scss">
  .icon {
    margin: var(--icon-margin, 10px);

    &.rarity-1 .icon-img,
    &.rarity-2 .icon-img,
    &.rarity-3 .icon-img,
    &.rarity-4 .icon-img,
    &.rarity-5 .icon-img,
    &.rarity-sp .icon-img {
      background-size: var(--icon-size, 60px);
    }

    .icon-img {
      width: var(--icon-size, 60px);
      height: var(--icon-size, 60px);
    }
  }
</style>
