<script>
  import { slide } from 'svelte/transition';
  import { CHARACTERS_DATA } from '@store/gamedata';
  import BuildArtifactSet from '$lib/components/build/BuildArtifactSet.svelte';
  import BuildCharacter from '$lib/components/build/BuildCharacter.svelte';
  import BuildMainStats from '$lib/components/build/BuildMainStats.svelte';
  import BuildManage from '$lib/components/build/BuildManage.svelte';
  import BuildNotes from '$lib/components/build/BuildNotes.svelte';
  import BuildSource from '$lib/components/build/BuildSource.svelte';
  import BuildSubStats from '$lib/components/build/BuildSubStats.svelte';
  import BuildWeapons from '$lib/components/build/BuildWeapons.svelte';

  let { build, alt = false, showDetail = false } = $props();

  function toggleDetails() {
    showDetail = !showDetail;
  }
</script>

<div
  class="content-row build"
  class:alt
  role="button"
  tabindex="0"
  onclick={toggleDetails}
  onkeydown={toggleDetails}
>
  <div
    class="content-row build-info"
    style="--text-size: 0.8rem"
  >
    <div class="content-row build-character">
      <BuildCharacter
        character={build.character}
        constellation={build.c}
      />
      <div class="content-col names">
        <div class="character-name">
          {CHARACTERS_DATA[build.character].data.name}
        </div>
        <div class="build-name">
          {build.name}
        </div>
      </div>
    </div>
    <div class="content-row weapons">
      <BuildWeapons weapons={build.weapon}
      />
    </div>
    <div class="content-row build-stat">
      <div class="mainstats">
        <BuildMainStats mainstat={build.mainstat} showHeader={false} />
      </div>
      <div class="substats">
        <BuildSubStats stats={build.stats} showHeader={false} />
      </div>
    </div>
    <div class="content-row artifacts">
      <BuildArtifactSet artifacts={build.artifact} />
    </div>
  </div>
  {#if showDetail}
    <div transition:slide={{ duration: 200 }} class="content-row build-details">
      <div
        class="notes"
        role="button"
        tabindex="0"
        onclick={(e) => e.stopPropagation()}
        onkeydown={(e) => e.stopPropagation()}
      >
        <BuildNotes {build} />
      </div>
      <div class="sources">
        <BuildSource references={build.source} />
      </div>
      <BuildManage {build} />
    </div>
  {/if}
</div>

<style lang="scss">
  .build {
    @media only screen and (max-width: 940px) {
      border-top: 1px solid var(--theme-border-strong);
    }
  }

  .build:hover {
    background: var(--theme-bg-highlight);
    cursor: pointer;
  }

  .build-info {
    min-height: 70px;
    align-items: center;
    font-size: var(--text-size, 0.8rem);
    flex-wrap: wrap;

    .build-character {
      padding: 10px;
      flex-wrap: wrap;

      .names {
        width: 80px;
        padding-left: 10px;
        justify-content: center;
        
        .character-name {
          font-weight: bold;
          margin-bottom: 5px;
          overflow-wrap: anywhere;

          @media only screen and (max-width: 460px) {
            overflow-wrap: normal;
          }
        }

        .build-name {
          color: var(--theme-site-secondary-main);
        }
      
        @media only screen and (max-width: 940px) {
          width: 70px;
        }
      }
    }

    .weapons {
      width: 135px;
      height: 70px;
      padding: 10px;
    }

    .build-stat {
      min-width: 380px;
      border-left: 1px dotted var(--theme-border-light);
      border-right: 1px dotted var(--theme-border-light);
      padding: 0 10px;
      flex-wrap: wrap;
      align-items: center;
      font-size: 0.95em;
      
      @media only screen and (max-width: 940px) {
        width: 100%;
        border-left: 0;
        border-top: 1px dotted var(--theme-border-light);
        font-size: 1em;
      }

      .mainstats {
        width: 130px;
        padding: 5px 0;
      
        @media only screen and (max-width: 940px) {
          width: 135px;
        }
      }

      .substats {
        width: 220px;
        padding: 5px 10px;
      
        @media only screen and (max-width: 940px) {
          padding: 5px 0;
        }
      }
    }

    .artifacts {
      min-width: 230px;
      height: 70px;
      margin-left: 10px;
      padding: 10px;
      
      @media only screen and (max-width: 940px) {
        width: 100%;
        border-top: 1px dotted var(--theme-border-light);
        margin-left: 150px;
        padding: 10px 0;
      }
    }
  }

  .build-details {
    width: 100%;
    height: auto;
    font-size: 0.9rem;
    padding-bottom: 10px;
    border-top: 1px dotted var(--theme-border-light);

    .notes {
      width: 100%;
      padding: 10px;

      &:hover {
        cursor: default;
      }
    }

    .sources {
      width: 100%;
      padding: 10px;
    }
  }
</style>
