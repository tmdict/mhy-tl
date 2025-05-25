<script>
  import { l10n, lang } from '@store/site';
  import En from '$lib/components/content/Top/En.svelte';
  import Zh from '$lib/components/content/Top/Zh.svelte';

  const links = [
    {
      new: true,
      name: 'character-builds',
      url: 'builds',
      updated: '2025-05-22'
    },
    {
      new: true,
      name: 'character-stat-scaling',
      url: 'character-scaling',
      updated: '2025-05-22'
    },
    {
      name: 'commission-achievements',
      url: 'achievements',
      updated: '2025-01-19'
    },
    {
      name: 'craftable-weapons',
      url: 'craftable-weapons',
      updated: '2024-09-14'
    },
    {
      name: 'leveling-cost',
      url: 'leveling-cost',
      updated: '2022-12-02'
    },
    {
      new: true,
      name: 'talent-materials',
      url: 'talent-materials',
      updated: '2025-05-22'
    },
    {
      name: 'links',
      url: 'links',
      updated: '2024-02-11'
    },
    {
      new: true,
      name: 'weekly-boss-mat',
      url: 'weekly-boss-materials',
      updated: '2025-05-22'
    }
  ].sort((a, b) => b.updated.localeCompare(a.updated));

  const top = { en: En, zh: Zh };
</script>

<svelte:head>
  <title>mHY一图流</title>
</svelte:head>

<svelte:component this={top[$lang]} />

{#each links as link, i}
  <a class:first={i === 0} href="/{link.url}">
    <div class="content-col link" class:alt={i % 2 === 0}>
      <div class="content-row">
        <div class="name">{$l10n[link.name][$lang]}</div>
        <div class="label">{link.updated}</div>
        {#if link.new}<div class="new">Updated</div>{/if}
      </div>
    </div>
  </a>
{/each}

<style lang="scss">
  a {
    color: var(--theme-text-normal);
      
    &:hover {
      text-decoration: none;
    }

    &.first .link {
      border-top: 2px solid var(--theme-site-primary-main);
    }

    .link {
      padding: 10px 10px 10px 20px;
      line-height: 1.2em;

      &:hover {
        background: var(--theme-bg-highlight);
        cursor: pointer;

        .name {
          color: var(--theme-site-primary-main);
        }
      }

      .content-row {
        align-items: start;
      }

      .name {
        color: var(--theme-text-normal);
        font: 2.2rem var(--theme-header-font);
        margin: 10px 5px;

        @media only screen and (max-width: 540px) {
          font-size: 1.6rem;
          width: 100%;
        }
      }

      .label,
      .new {
        background: var(--theme-bg-site);
        font-size: 0.85rem;
        margin: 0 5px 5px;
        padding: 2px 10px;
        border-radius: 10px;

        @media only screen and (max-width: 540px) {
          font-size: 0.7rem;
          padding: 2px 10px;
        }
      }

      .label {
        color: #f7d87c;
      }

      .new {
        color: #72a6c0;
      }
    }
  }
</style>
