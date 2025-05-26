<script>
  import { ARTIFACTS_DATA, RARITY } from '@store/gamedata';
  import { IMAGES } from '@store/sitedata';
  import Icon from '$lib/components/Icon.svelte';

  export let artifacts;
  const data = artifacts.reduce((acc, a) => {
    const aSet = a.set.reduce((aAcc, aname) => ({ ...aAcc, [aname]: ARTIFACTS_DATA[aname] }), {});
    return { ...acc, ...aSet };
  }, {});
</script>

{#each artifacts as artifact, i}
  <div class="content-row" class:divider={i !== 0}>
    {#each artifact.set as set}
      {@const details = data[set] ? data[set].data : false}
      <div class="artifact" role="button" tabindex="0" on:click|stopPropagation on:keydown|stopPropagation>
        <Icon
          id={set}
          title={details ? details['name'] : set}
          src={IMAGES[`/src/lib/img/artifact/${set}.png`]}
          rarity={RARITY[set]}
          size="50px"
          margin="0 2px"
          hasTooltip={true}
          tooltipContent={`
          <span class="heading">${details ? details['name'] : set}</span><br />
          ${
            details
              ? '<span class="highlight">2-Piece Bonus:</span> ' +
                details['2p'] +
                '<br /><span class="highlight">4-Piece Bonus:</span> ' +
                details['4p']
              : ''
          }
        `}
        />
        <div class="overlay">{artifact.p}</div>
      </div>
    {/each}
  </div>
{/each}

<style lang="scss">
  .divider {
    border-left: 1px dashed var(--theme-border-gold);
    margin-left: 15px;
    padding-left: 15px;

    @media only screen and (max-width: 570px) {
      margin-left: 5px;
      padding-left: 5px;
    }
  }

  .artifact {
    position: relative;

    &:hover {
      cursor: pointer;
    }
  }

  .overlay {
    top: 37px;
    left: 42px;
  }
</style>
