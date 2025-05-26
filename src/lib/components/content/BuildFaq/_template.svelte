<script>
  import { slide } from 'svelte/transition';
  import BuildArtifactSet from '$lib/components/build/BuildArtifactSet.svelte';
  import BuildCharacter from '$lib/components/build/BuildCharacter.svelte';
  import BuildMainStats from '$lib/components/build/BuildMainStats.svelte';
  import BuildNotes from '$lib/components/build/BuildNotes.svelte';
  import BuildSubStats from '$lib/components/build/BuildSubStats.svelte';
  import BuildWeapons from '$lib/components/build/BuildWeapons.svelte';

  const exampleBuild = {
    character: 'kaedehara-kazuha',
    charname: { en: 'Kaedehara Kazuha' },
    c: 6,
    type: ['dps'],
    name: { en: 'DPS' },
    weapon: [
      { name: 'primordial-jade-cutter', r: 0 },
      { name: 'iron-sting', r: 5 }
    ],
    artifact: [
      { set: ['viridescent-venerer'], p: 4 },
      { set: ['viridescent-venerer', 'gladiators-finale'], p: 2 }
    ],
    mainstat: { sand: ['em', 'atk'], goblet: ['anemo'], circlet: ['crit'] },
    stats: [{ crit: '70% / 150%' }, { em: '800' }, { atk: '2,000' }, { er: '140%' }],
    talent: 'E = A > Q',
    notes: { en: 'Some notes.' }
  };
</script>

<div transition:slide>
  <slot name="about" />

  <slot name="how-to" />

  <div class="container">
    <div class="character-example example">
      <div class="box">
        <BuildCharacter character={exampleBuild.character} constellation={exampleBuild.c} />
        <div class="content-col names">
          <div class="character-name">
            {exampleBuild.charname.en}
          </div>
          <div class="build-name">
            {exampleBuild.name.en}
          </div>
        </div>
      </div>
    </div>
    <div class="character-content content"><slot name="character" /></div>
    <div class="weapon-example example">
      <div class="box">
        <BuildWeapons weapons={exampleBuild.weapon} />
      </div>
    </div>
    <div class="weapon-content content"><slot name="weapon" /></div>
    <div class="artifact-example example">
      <div class="box">
        <BuildArtifactSet artifacts={exampleBuild.artifact} />
      </div>
    </div>
    <div class="artifact-content content"><slot name="artifact" /></div>
    <div class="mainstat-example example">
      <div class="box">
        <BuildMainStats mainstat={exampleBuild.mainstat} />
      </div>
    </div>
    <div class="mainstat-content content"><slot name="mainstat" /></div>
    <div class="stat-example example">
      <div class="box">
        <BuildSubStats stats={exampleBuild.stats} />
      </div>
    </div>
    <div class="stat-content content"><slot name="stat" /></div>
    <div class="notes-example example">
      <div class="box">
        <BuildNotes build={exampleBuild} />
      </div>
    </div>
    <div class="notes-content content"><slot name="notes" /></div>
  </div>
</div>

<style lang="scss">
  .example {
    min-width: 200px;
    border-top: 1px dotted var(--theme-border-gold);

    @media only screen and (max-width: 600px) {
      min-width: 200px;
      margin: 0 auto;
    }
  }

  .box {
    width: 100%;
    padding: 10px;
    display: inline-flex;
    align-items: center;
    border-left: 1px dotted var(--theme-border-gold);
    border-bottom: 1px dotted var(--theme-border-gold);

    @media only screen and (max-width: 600px) {
      border: 1px dashed var(--theme-border-gold);
    }
  }

  .content {
    padding: 0 20px;
    border-top: 1px dotted var(--theme-border-gold);
    border-left: 1px dotted var(--theme-border-gold);
    margin-left: -1px;

    @media only screen and (max-width: 600px) {
      border-top: 0;
      border-left: 0;
    }
  }

  .container {
    display: grid;
    grid-template-columns: 250px 1fr;
    grid-template-rows: auto auto auto auto auto auto;
    grid-template-areas:
      'character-example character-content'
      'weapon-example weapon-content'
      'artifact-example artifact-content'
      'mainstat-example mainstat-content'
      'stat-example stat-content'
      'notes-example notes-content';

    @media only screen and (max-width: 600px) {
      grid-template-columns: 1fr;
      grid-template-rows: auto auto auto auto auto auto auto auto auto auto auto auto;
      grid-auto-flow: row;
      grid-template-areas:
        'character-example'
        'character-content'
        'weapon-example'
        'weapon-content'
        'artifact-example'
        'artifact-content'
        'mainstat-example'
        'mainstat-content'
        'stat-example'
        'stat-content'
        'notes-example'
        'notes-content';
    }
  }

  .character-example {
    grid-area: character-example;

    .names {
      font-size: var(--text-size, 0.8rem);
      width: 80px;
      padding-left: 10px;
      justify-content: center;
      
      .character-name {
        font-weight: bold;
        margin-bottom: 5px;
        overflow-wrap: anywhere;
      }

      .build-name {
        color: var(--theme-site-secondary-main);
      }
    }
  }

  .character-content {
    grid-area: character-content;
  }

  .weapon-example {
    grid-area: weapon-example;
  }

  .weapon-content {
    grid-area: weapon-content;
  }

  .artifact-example {
    grid-area: artifact-example;
  }

  .artifact-content {
    grid-area: artifact-content;
  }

  .mainstat-example {
    grid-area: mainstat-example;
  }

  .mainstat-content {
    grid-area: mainstat-content;
  }

  .stat-example {
    grid-area: stat-example;
  }

  .stat-content {
    grid-area: stat-content;
  }

  .notes-example {
    grid-area: notes-example;
  }

  .notes-content {
    grid-area: notes-content;
  }
</style>
