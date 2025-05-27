<script>
  import { RARITY, WEAPONS_DATA } from '@store/gamedata';
  import { IMAGES } from '@store/sitedata';
  import Icon from '$lib/components/Icon.svelte';

  let { weapons } = $props();
  
  const data = weapons.reduce((acc, w) => ({ ...acc, [w.name]: WEAPONS_DATA[w.name] }), {});
  let isHover = $state('');
</script>

<div class="content-row align-center">
  {#each weapons as weapon}
    {@const details = data[weapon.name] ? data[weapon.name].data : false}
    <div
      class="weapon"
      role="presentation"
      onclick={(e) => e.stopPropagation()}
      onmouseenter={() => (isHover = weapon.name)}
      onmouseleave={() => (isHover = '')}
    >
      <Icon
        id={weapon.name}
        title={details ? details['name'] : weapon.name}
        src={IMAGES[`/src/lib/img/weapon${isHover === weapon.name ? '-ascension/' : '/'}${weapon.name}.png`]}
        rarity={RARITY[weapon.name]}
        size="50px"
        margin="0 2px"
        hasTooltip={true}
        tooltipContent={`
          <span class="heading">${details ? details['name'] : weapon.name}</span><br />
          <span class="highlight">Sub Stat:</span> ${
          data[weapon.name] ? data[weapon.name].subStat : ''
        }<br />
          ${
            details
              ? details['passiveDescription']
                  .replace(/{{/g, '<span style="color:var(--theme-site-secondary-main)">')
                  .replace(/}}/g, '</span>')
                  .replace(/\/{2}/g, '</span>/<span style="color:var(--theme-site-secondary-main)">')
              : ''
          }
        `}
      />
      {#if weapon.r > 0}<div class="overlay">{weapon.r}</div>{/if}
    </div>
  {/each}
</div>

<style lang="scss">
  .weapon {
    position: relative;

    &:hover {
      cursor: pointer;
    }
  }

  .overlay {
    top: 36px;
    left: 42px;
  }
</style>
