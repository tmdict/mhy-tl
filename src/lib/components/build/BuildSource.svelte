<script>
  let { references } = $props();
  const sources = {
    ysmxt: { name: '原神冒险团', url: 'https://www.miyoushe.com/ys/collection/10772' },
    ysytl: { name: '原神角色一图流攻略', url: 'https://www.miyoushe.com/ys/collection/2558464' },
    kqm: { name: 'Keqing Mains', url: 'https://keqingmains.com/' }
  };

  function parseSource(source) {
    const [id, src] = Object.entries(source).flat();
    return {
      id: id,
      name: sources[id] ? sources[id].name : id,
      src: src === 'default' ? sources[id].url : src
    };
  }
</script>

{#if references && references.length > 0}
  <div class="source">
    <div class="build-heading">Sources</div>
    <ul>
      {#each references as source}
        <li>
          {#if parseSource(source).id === 'custom'}
            {#if parseSource(source).src.slice(0, 8) === 'https://'}
              <a href={parseSource(source).src}>{parseSource(source).src}</a>
            {:else}
              {parseSource(source).src}
            {/if}
          {:else}
            <a
              onclick={(e) => e.stopPropagation()}
              href={parseSource(source).src}
              alt={parseSource(source).id}
            >
              {parseSource(source).name}
            </a>
          {/if}
        </li>
      {/each}
    </ul>
  </div>
{/if}

<style lang="scss">
  .source {
    line-height: 1.5em;

    ul {
      margin: 0;
      padding: 0 16px 5px;
      font-size: 0.9em;
    }
  }
</style>
