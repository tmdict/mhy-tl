<script>
  import { browser } from '$app/environment';
  import { slide } from 'svelte/transition';
  import { localData } from '@store/sitedata';
  import { marked } from 'marked';
  import ID from '$lib/util/alias.json';

  export let achievement;
  export let alt = false;
  let expand = false;

  // Update local storage
  function updateChecklist(achievementName, todo) {
    $localData['achievements'][achievementName][todo] = !$localData['achievements'][achievementName][todo];
    browser && localStorage.setItem('tmdict.genshin.data', JSON.stringify($localData));
    // Update achievement completion status
    complete = Object.values($localData['achievements'][achievementName]).every((c) => c === true);
  }

  function trueUpChecklist(achievement) {
    // Compare number of todo's between local storage and achievement data
    if (Object.keys($localData['achievements'][achievement.achievement]).length !== achievement.checklist) {
      let updated = new Array(achievement.checklist).fill(false);
      for (let i = 0; i < $localData['achievements'][achievement.achievement].length; i++) {
        if (i < achievement.checklist) {
          updated[i] = $localData['achievements'][achievement.achievement][i];
        }
      }
      $localData['achievements'][achievement.achievement] = updated;
      browser && localStorage.setItem('tmdict.genshin.data', JSON.stringify($localData));
      console.log(`Achievement checklist updated: ${achievement.achievement}`);
    }
  }

  // Update outdated achievement checklist
  trueUpChecklist(achievement);

  // Go through checklist to determine achievement completion status
  $: complete = Object.values($localData['achievements'][achievement.achievement]).every((c) => c === true);
</script>

<div
  class="content-col achievement"
  class:alt
  role="button"
  tabindex="0"
  on:click={() => (expand = !expand)}
  on:keydown={() => (expand = !expand)}
>
  <div class="content-row">
    <h4 class:complete>{@html achievement.name}</h4>
    <div class="label region">{ID[achievement.region]}</div>
    <div class="label version">v{achievement.version}</div>
    {#each achievement.commission as commission}
      <span class="label commission">{@html commission}</span>
    {/each}
  </div>
  <div class="description" role="presentation" on:click|stopPropagation on:keydown|stopPropagation>
    {@html achievement.description}
  </div>
  {#if expand}
    <div transition:slide class="notes-checklist">
      <span class="notes" role="presentation" on:click|stopPropagation on:keydown|stopPropagation>{@html marked(achievement.notes)}</span>
      <h5>Checklist</h5>
      <ul>
        {#each [...Array(achievement.checklist).keys()] as todo}
          <li>
            <input
              on:click|stopPropagation={() => updateChecklist(achievement.achievement, todo)}
              class="checklist"
              type="checkbox"
              id="{achievement.achievement}-{todo}"
              name="{achievement.achievement}-{todo}"
              value={achievement.checklistItem[todo + 1]}
              checked={$localData['achievements'][achievement.achievement][todo]}
            />
            <label role="presentation" on:click|stopPropagation on:keydown|stopPropagation for="{achievement.achievement}-{todo}">{achievement.checklistItem[todo + 1]}</label>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div>

<style lang="scss">
  .achievement {
    padding: 20px;
    color: var(--theme-text-normal);
    line-height: 1.2em;
    align-items: flex-start;

    &:hover {
      background: var(--theme-bg-highlight);
      cursor: pointer;
    }

    h4 {
      font-size: 1.2rem;
      text-transform: none;
      letter-spacing: normal;
      padding-top: 2px;

      &.complete {
        color: #aaa;
        text-decoration: line-through;
      }
    }

    .label {
      color: var(--theme-text-normal);
      font-size: 0.85rem;
      background: var(--theme-bg-highlight);
      margin: 0 5px 5px;
      padding: 5px 10px;
      border-radius: 10px;
    }

    .commission {
      color: var(--theme-site-secondary-main);
      background: var(--theme-bg-highlight);
    }

    .description {
      padding: 5px;

      &:hover {
        cursor: text;
      }
    }

    .notes-checklist {
      padding: 15px 5px;

      .notes:hover {
        cursor: text;
      }

      ul {
        list-style: none;
        padding: 0 5px;

        li {
          padding: 2px 0;
          display: flex;
          align-items: center;
        }

        input.checklist {
          margin: 2px 10px;
          padding: 5px;
          width: 20px;
          height: 20px;
        }

        label {
          min-width: 300px;

          &:hover {
            cursor: pointer;
            color: var(--theme-text-highlight);
          }

          @media only screen and (max-width: 540px) {
            min-width: auto;
          }
        }
      }
    }
  }
</style>
