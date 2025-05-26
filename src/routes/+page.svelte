<script>
  import En from '$lib/components/content/Top/En.svelte';

  const links = [
    {
      new: true,
      name: 'Character Builds',
      url: 'builds',
      updated: '2025-05-22'
    },
    {
      new: true,
      name: 'Character Stat Scaling',
      url: 'character-scaling',
      updated: '2025-05-22'
    },
    {
      name: 'Commission Achievements',
      url: 'achievements',
      updated: '2025-01-19'
    },
    {
      name: 'Craftable Weapons',
      url: 'craftable-weapons',
      updated: '2024-09-14'
    },
    {
      name: 'Leveling Cost',
      url: 'leveling-cost',
      updated: '2022-12-02'
    },
    {
      new: true,
      name: 'Talent Materials',
      url: 'talent-materials',
      updated: '2025-05-22'
    },
    {
      name: 'Links',
      url: 'links',
      updated: '2024-02-11'
    },
    {
      new: true,
      name: 'Weekly Boss Materials',
      url: 'weekly-boss-materials',
      updated: '2025-05-22'
    }
  ].sort((a, b) => b.updated.localeCompare(a.updated));
</script>

<svelte:head>
  <title>mHY一图流</title>
</svelte:head>

<En />

{#each links as link, i}
  <a class:first={i === 0} href="/{link.url}">
    <div class="content-col link" class:alt={i % 2 === 0}>
      <div class="content-row">
        <div class="name">{link.name}</div>
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
