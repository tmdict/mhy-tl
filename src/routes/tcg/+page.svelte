<script>
  const cards = [
    {
      name: "Asmo's Bow",
      description: 'The correct card name is <b class="correct">Amos’ Bow</b>.',
    },
    {
      name: "Controlled Directional Blast",
      description:
        "The name is wrong in Chinese but the English translation shows the correct name.",
    },
    {
      name: "Delicious Macarons",
      description: 'The correct card name is <b class="correct">Rainbow Macarons</b>.',
    },
    {
      name: "Favonius Cathedral",
      description:
        "The name is wrong in Chinese but the English translation shows the correct name.",
    },
    {
      name: "Former Site of the Central Laboratory",
      description: 'The correct card name is <b class="correct">Central Laboratory Ruins</b>.',
    },
    {
      name: "Gilded Dreams",
      description:
        'The card depicted is actually <b class="correct">Shadow of the Sand King</b>, not Gilded Dreams. The cost is also wrong.',
    },
    {
      name: "King's Valet",
      description: 'The correct card name is <b class="correct">King’s Squire</b>.',
    },
    {
      name: "Laurel Coronet",
      description: "Probably a translation error.",
    },
    {
      name: "Lumenarystone",
      description: 'The correct card name is <b class="correct">Lumenstone</b>.',
    },
    {
      name: "Skyward Sword",
      description: 'The correct card name is <b class="correct">Skyward Blade</b>.',
    },
    {
      name: "Sweet Ma'am",
      description: 'The correct card name is <b class="correct">Sweet Madame</b>.',
    },
    {
      name: "Tandoori Grilled Chicken",
      description: 'The correct card name is <b class="correct">Tandoori Roast Chicken</b>.',
    },
    {
      name: "Tenacity of the Millelith",
      description:
        'The card depicted is actually <b class="correct">General’s Ancient Helm</b>, not Tenacity of the Millelith.',
    },
    {
      name: "The Tale of Vennessa",
      description: 'The correct card name is <b class="correct">The Legend of Vennessa</b>.',
    },
    {
      name: "Tomb of the Eternal Flow",
      description: 'The correct card name is <b class="correct">Tome of the Eternal Flow</b>.',
    },
    {
      name: "Underwater Treasure Hunt",
      description:
        "The name is wrong in Chinese but the English translation shows the correct name.",
    },
  ];
</script>

<svelte:head>
  <title>TCG Masterful Mimicry</title>
</svelte:head>

<h1>TCG Masterful Mimicry</h1>

<div id="content">
  <div id="intro">
    <div class="img-container">
      <enhanced:img src="$lib/img/tcg/whopperflower.png" alt="Pyro Whopperflower" />
    </div>
    <p>
      In some TCG challenges, the Pyro Whopperflower has a passive skill called
      <strong>Masterful Mimicry</strong>:
      <em
        >"At the start of the Round: The opponent must Select 1 of 3 random cards. If they choose
        the Whopperflower's Disguise, the Whopperflower gains 1 Energy."</em
      >
    </p>
    <p>
      Choosing a real card lets you keep it, while choosing a disguise gives you an unusable card.
      The disguised cards have subtly wrong names or artwork, below is a list of them for reference.
    </p>
  </div>

  {#each cards as card, i}
    <div class="content-col card" class:alt={i % 2 === 0}>
      <div class="content-row">
        <h5>{card.name}</h5>
      </div>
      <div class="description">{@html card.description}</div>
    </div>
  {/each}
</div>

<style lang="scss">
  #intro {
    font-size: 1.1em;
    padding: 20px 40px;

    .img-container {
      text-align: center;
      margin-bottom: 10px;

      img {
        max-width: 600px;
        width: 100%;
        height: auto;
      }
    }

    @media only screen and (max-width: 540px) {
      font-size: 1em;
      padding: 10px 15px;
    }
  }

  .card {
    padding: 10px 10px 10px 20px;
    color: var(--theme-text-normal);
    line-height: 1.2em;

    h5 {
      color: var(--theme-site-primary-main);
      padding-top: 2px;
      font-size: 1rem;
      text-transform: none;
      letter-spacing: normal;
      margin: 0;
    }

    .description {
      padding: 5px;

      :global(.correct) {
        color: var(--theme-site-primary-sub);
      }
    }
  }
</style>
