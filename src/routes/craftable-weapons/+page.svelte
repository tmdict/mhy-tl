<script>
  import { browser } from '$app/environment';
  import { slide } from 'svelte/transition';
  import { MISC_DATA, RARITY, WEAPONS_DATA } from '@store/gamedata';
  import { localData } from '@store/sitedata';
  import { IMAGES } from '@store/sitedata';
  import CraftableWeaponsFaq from '$lib/components/content/CraftableWeaponsFaq.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import ManageData from '$lib/components/ManageData.svelte';

  let showFaq = false;

  // Initialize craftable weapon data
  if ($localData['billets']) {
    if (Object.keys($localData['billets']).length === 0) {
      $localData = { ...$localData, billets: MISC_DATA['craftable-weapons'].data };
    } else {
      Object.keys(MISC_DATA['craftable-weapons'].data).forEach((billetType) => {
        // If new billet group
        if (!(billetType in $localData['billets'])) {
          $localData['billets'] = {
            ...$localData['billets'],
            [billetType]: MISC_DATA['craftable-weapons'].data[billetType]
          };
        }
        // If new weapon
        Object.keys(MISC_DATA['craftable-weapons'].data[billetType]).forEach((weaponType) => {
          Object.keys(MISC_DATA['craftable-weapons'].data[billetType][weaponType]).forEach((weapon) => {
            if (!(weapon in $localData['billets'][billetType][weaponType])) {
              $localData['billets'][billetType][weaponType] = {
                ...$localData['billets'][billetType][weaponType],
                [weapon]: 0
              };
            }
          });
        });
      });
    }
    browser && localStorage.setItem('tmdict.genshin.data', JSON.stringify($localData));
  }

  function preventDefault(fn) {
    return function (event) {
      event.preventDefault();
      fn.call(this, event);
    };
  }

  function updateCount(billet, type, name, count) {
    const updated = $localData['billets'][billet][type][name] + count;
    $localData['billets'][billet][type][name] = (updated < 0) ? 0 : ((updated > 5) ? 5 : updated);
    browser && localStorage.setItem('tmdict.genshin.data', JSON.stringify($localData));
  }
</script>

<svelte:head>
  <title>Craftable Weapons</title>
</svelte:head>

<h1>Craftable Weapons</h1>

<div class="menu">
  <a href="/#" onclick={preventDefault(() => (showFaq = !showFaq))}>FAQ</a>
  <span class="menu-separator"></span>
  <ManageData />
</div>

{#if showFaq}
  <div id="faq" transition:slide>
    <CraftableWeaponsFaq />
  </div>
{/if}

<div id="content">
  {#each Object.entries($localData['billets']) as [billet, craftables]}
    <div class="content-row billet">
      {#each Object.entries(craftables) as [type, weapons]}
        <div class="content-col type">
          <div class="header">
            <Icon id="{billet}-{type}" src={IMAGES[`/src/lib/img/billet/${billet}-${type}.png`]} />
          </div>
          {#each Object.entries(weapons) as [weapon, count]}
            {@const details = WEAPONS_DATA[weapon] ? WEAPONS_DATA[weapon].data : false}
            <div class="content-row weapon">
              <div class="weapon-icon" role="presentation">
                <Icon
                  id={weapon}
                  src={IMAGES[`/src/lib/img/weapon-ascension/${weapon}.png`]}
                  rarity={RARITY[weapon]}
                  hasTooltip={true}
                  tooltipContent={`
                    <span class="heading">${details ? details['name'] : weapon}</span><br />
                    <span class="highlight">Sub Stat:</span> ${
                      WEAPONS_DATA[weapon] ? WEAPONS_DATA[weapon].subStat : ''
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
              </div>
              <div class="content-col info">
                <div class="name">{details ? details['name'] : weapon}</div>

                <div class="content-row">
                  <span
                    class="remove-input"
                    role="button"
                    tabindex="0"
                    onclick={() => updateCount(billet, type, weapon, -1)}
                    onkeydown={() => updateCount(billet, type, weapon, -1)}>-</span
                  >
                  <div class="count r{count}">{count}</div>
                  <span
                    class="add-input"
                    role="button"
                    tabindex="0"
                    onclick={() => updateCount(billet, type, weapon, 1)}
                    onkeydown={() => updateCount(billet, type, weapon, 1)}>+</span
                  >
                </div>
              </div>
            </div>
          {/each}
        </div>
      {/each}
    </div>
  {/each}
</div>

<style lang="scss">
  #content {
    margin: 20px 0;
    min-width: 260px;
  }

  .billet {
    border-top: 1px solid var(--theme-site-primary-main);
    justify-content: center;

    .type {
      flex: 1 1 0;
      margin-bottom: 40px;

      .header {
        border-bottom: 1px dashed var(--theme-border-gold);
        background: var(--theme-bg-highlight);
        margin-bottom: 15px;
        padding-bottom: 15px;
      }

      .weapon {
        flex-wrap: nowrap;
        margin-bottom: 15px;

        .weapon-icon:hover {
          cursor: pointer;
        }

        .info {
          margin-top: 10px;
          min-width: 65px;

          .name {
            font-size: 0.8em;
            font-weight: bold;
          }

          .count {
            color: var(--theme-site-primary-alt);
            font-size: 1.2em;
            font-weight: bold;
            margin: 5px;
          }

          .r0 {
            color: var(--theme-text-normal);
          }

          .r5 {
            color: var(--theme-site-primary-main);
          }

          .add-input,
          .remove-input {
            width: 30px;
            height: 20px;
            border-radius: 10px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin: 5px;
            background-color: var(--theme-bg-highlight-alt);

            &:hover {
              cursor: pointer;
              color: var(--theme-site-primary-alt);
              background-color: var(--theme-bg-highlight);
            }
          }
        }
      }
    }
  }
</style>
