<script>
  import { rarity, weapons as weaponsData } from '@store/gamedata';
  import { images, l10n, lang } from '@store/site';
  import Icon from '$lib/components/Icon.svelte';

  export let weapons;
  const data = weapons.reduce((acc, w) => ({ ...acc, [w.name]: $weaponsData[w.name] }), {});
  let isHover = '';
</script>

<div class="content-row align-center">
  {#each weapons as weapon}
    {@const details = data[weapon.name] ? data[weapon.name].data[$lang] : false}
    <div
      class="weapon"
      role="presentation"
      on:click|stopPropagation
      on:mouseenter={() => (isHover = weapon.name)}
      on:mouseleave={() => (isHover = '')}
    >
      <Icon
        id={weapon.name}
        title={details ? details['name'] : weapon.name}
        src={$images[`/src/lib/img/weapon${isHover === weapon.name ? '-ascension/' : '/'}${weapon.name}.png`]}
        rarity={$rarity[weapon.name]}
        size="50px"
        margin="0 2px"
        hasTooltip={true}
        tooltipContent={`
          <span class="heading">${details ? details['name'] : weapon.name}</span><br />
          <span class="highlight">${$l10n['sub-stat'][$lang]}:</span> ${
          data[weapon.name] ? $l10n[data[weapon.name].subStat][$lang] : ''
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
