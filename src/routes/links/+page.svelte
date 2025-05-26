<script>
  const guides = [
    {
      name: 'Keqing Mains',
      lang: ['English'],
      url: 'https://keqingmains.com/',
      description: 'Comprehensive theorycrafting and guides.'
    },
    {
      name: '全角色参考面板',
      lang: ['中文'],
      url: 'https://www.miyoushe.com/ys/collection/10772',
      description: '全角色收益曲线、圣遗物思路推荐、参考面板属性。'
    },
  ];

  const achievements = [
    {
      name: 'Genshin Commissions Cycle Tracking',
      lang: ['English'],
      url: 'https://docs.google.com/spreadsheets/d/1ol6SQfj58ZNPfgGaNAwjv8eBLxAKbbv_Q3t1gh6OFrU/edit',
      description: 'Daily commission and achievement tracker.'
    },
    {
      name: '原神全NPC委托、轮次统计表',
      lang: ['中文'],
      url: 'https://docs.qq.com/sheet/DWG5hT1BlSm90bkF0',
      description: '每日委托任务和成就统计表。'
    }
  ];

  const resource = [
    {
      name: 'Akasha System',
      lang: ['Multi-lingual · 多语言'],
      url: 'https://akasha.cv/',
      description: 'Compare your Genshin characters against others.'
    },
    {
      name: 'Enka.Network',
      lang: ['Multi-lingual · 多语言'],
      url: 'https://enka.network/',
      description: 'Genshin Impact player cards creator.'
    },
    {
      name: 'gcsim',
      lang: ['English', 'Español', '日本語', '中文'],
      url: 'https://gcsim.app/',
      description: 'Team DPS simulator.'
    },
    {
      name: 'Genshin Community Character Builds',
      lang: ['English'],
      url: 'https://tinyurl.com/genshinbuilds',
      description: 'Character builds by Genshin Impact Helper Team.'
    },
    {
      name: 'Genshin Optimizer',
      lang: ['Multi-lingual · 多语言'],
      url: 'https://frzyc.github.io/genshin-optimizer/#/',
      description: 'Builds, artifacts and character recommendation and optmization tool.'
    },
    {
      name: 'Haku.shin',
      lang: ['English', '中文', '한국어'],
      url: 'https://gi.hakush.in/',
      description: 'Genshin Impact database and tools.'
    },
    {
      name: 'Honey Impact',
      lang: ['Multi-lingual · 多语言'],
      url: 'https://genshin.honeyhunterworld.com/',
      description: 'Genshin Impact database and tools.'
    },
    {
      name: 'Paimon.moe',
      lang: ['Multi-lingual · 多语言'],
      url: 'https://paimon.moe/',
      description: 'Genshin database website with a information on builds, a wish history tracker, timelines, and more.'
    },
    {
      name: 'Project Amber',
      lang: ['Multi-lingual · 多语言'],
      url: 'https://ambr.top/',
      description: 'Genshin database and helper.'
    },
    {
      name: 'ShinShin.moe',
      lang: ['Multi-lingual · 多语言'],
      url: 'https://shinshin.moe/',
      description: 'Genshin card generator to create a collage of your Genshin Impact character builds.'
    },
    {
      name: 'Ysin',
      lang: ['中文'],
      url: 'https://yuanshen.xin/',
      description: '角色练度评测。'
    },
    {
      name: '莫娜占卜铺',
      lang: ['中文'],
      url: 'https://www.mona-uranai.com/',
      description: '圣遗物配装。'
    },
    {
      name: '兎老师',
      lang: ['中文'],
      url: 'https://space.bilibili.com/24889090',
      description: '原神角色推荐榜。'
    },
    {
      name: '椰羊cocogoat',
      lang: ['English', '中文'],
      url: 'https://cocogoat.work/',
      description: '网页圣遗物管理·成就扫描。'
    },
    {
      name: '原神冒险团',
      lang: ['中文'],
      url: 'https://mp.weixin.qq.com/s/Yk5mart2PBupmFL2jKQWmA',
      description: '原神角色攻略、探索解谜、入坑指南。'
    }
  ];
</script>

<svelte:head>
  <title>Useful Apps and Links</title>
</svelte:head>

<h1>Useful Apps and Links</h1>

<div id="content">
  <h4>Guides</h4>
  {#each guides as link, i}
    <div class="content-col link" class:alt={i % 2 === 0}>
      <a href={link.url}>
        <div class="content-row">
          <h5>{link.name}</h5>
          {#each link.lang as lang}
            <div class="label">{lang}</div>
          {/each}
        </div>
        <div class="description">{link.description}</div>
      </a>
    </div>
  {/each}

  <h4>Achievements</h4>
  {#each achievements as link, i}
    <div class="content-col link" class:alt={i % 2 === 0}>
      <a href={link.url}>
        <div class="content-row">
          <h5>{link.name}</h5>
          {#each link.lang as lang}
            <div class="label">{lang}</div>
          {/each}
        </div>
        <div class="description">{link.description}</div>
      </a>
    </div>
  {/each}

  <h4>Resources</h4>
  {#each resource as link, i}
    <div class="content-col link" class:alt={i % 2 === 0}>
      <a href={link.url}>
        <div class="content-row">
          <h5>{link.name}</h5>
          {#each link.lang as lang}
            <div class="label">{lang}</div>
          {/each}
        </div>
        <div class="description">{link.description}</div>
      </a>
    </div>
  {/each}
</div>

<style lang="scss">
  h4 {
    color: var(--theme-site-primary-alt);
    margin: 40px 0 5px;
    text-align: center;
  }

  .link {
    padding: 10px 10px 10px 20px;
    color: var(--theme-text-normal);
    line-height: 1.2em;

    &:hover {
      background: var(--theme-bg-highlight);
      cursor: pointer;
      
      a h5 {
        color: var(--theme-site-primary-alt);
      }
    }

    a {
      color: var(--theme-text-normal);

      &:hover {
        text-decoration: none;
      }

      h5 {
        color: var(--theme-site-primary-main);
        padding-top: 2px;
        font-size: 1rem;
        text-transform: none;
        letter-spacing: normal;
        margin: 0;
      }

      .label {
        color: var(--theme-site-secondary-main);
        background: var(--theme-bg-highlight);
        font-size: 0.85rem;
        margin: 0 5px 5px;
        padding: 2px 10px;
        border-radius: 10px;
      }

      .description {
        padding: 5px;
      }
    }
  }
</style>
