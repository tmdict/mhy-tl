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
    charname: 'Kaedehara Kazuha',
    c: 6,
    name: 'DPS',
    type: ['dps'],
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
    notes: 'Some notes.'
  };
</script>

<div transition:slide>
  <h5>About</h5>

  <p>
    When trying to answer questions like <em>"which stat should I focus on?"</em> or
    <em>"which artifact set is good on this character?"</em> One often finds themselves flipping through long articles or videos, which can be quite time consuming. The intention of the information here is to provide a quick answer that's just "good enough".
  </p>

  <p>
    The reference build list is similar to infographics, providing summary-style information while offering some of the interactivity and accessibility of a proper guide. Build data are primarily aggregated and condensed from <a href="https://www.miyoushe.com/ys/collection/10772">原神冒险团</a> and <a href="https://www.miyoushe.com/ys/collection/2558464">原神角色一图流攻略</a>, supplemented by <a href="https://keqingmains.com/">KQM</a>.
  </p>

  <p>
    Due to these being aggregated, information and context can be lost, not to mention all the caveats involved, <strong>we do not guarantee what you find here to be 100% accurate!</strong> The intention is to provide a "good enough" approximation of what's needed, all in one place. For accurate, in-depth guide, we recommend spending time to read the individual referenced guides, all of which are linked as resource.
  </p>

  <h5>How to Use the Guide</h5>

  <div class="container">
    <div class="character-example example">
      <div class="box">
        <BuildCharacter character={exampleBuild.character} constellation={exampleBuild.c} />
        <div class="content-col names">
          <div class="character-name">
            {exampleBuild.charname}
          </div>
          <div class="build-name">
            {exampleBuild.name}
          </div>
        </div>
      </div>
    </div>
    <div class="character-content content">
      <p>Build character, name, and type indicator. Some notes about build types:</p>

      <p>
        <span class="highlight">Constellation:</span> Recommended constellation to aim for. This
        information is either gathered from the source guide.
      </p>
    </div>
    <div class="weapon-example example">
      <div class="box">
        <BuildWeapons weapons={exampleBuild.weapon} />
      </div>
    </div>
    <div class="weapon-content content">
      <p>
        Top 2 recommended weapons, with the first being BIS for the build. One of the 2 is guaranteed to be a non-5-star weapon.
      </p>
    </div>
    <div class="artifact-example example">
      <div class="box">
        <BuildArtifactSet artifacts={exampleBuild.artifact} />
      </div>
    </div>
    <div class="artifact-content content">
      <p>
        Top 2 recommended artifact sets for the character.
      </p>

      <p>
        In case of conflicting recommendations from different guides, the recommendation from <a
          href="https://www.miyoushe.com/ys/accountCenter/postList?id=160367110">原神冒险团</a
        > is favored due to the optimal stat value recommendations also coming from their guide.
      </p>
    </div>
    <div class="mainstat-example example">
      <div class="box">
        <BuildMainStats mainstat={exampleBuild.mainstat} />
      </div>
    </div>
    <div class="mainstat-content content">
      <p>
        Recommended main stats for each artifact slot. A maximum of 2 main stats are recommended to keep the information
        concise.
      </p>      
    </div>
    <div class="stat-example example">
      <div class="box">
        <BuildSubStats stats={exampleBuild.stats} />
      </div>
    </div>
    <div class="stat-content content">
      <p>Stats to focus on as well as a reference value to aim for. This is a combination of:</p>

      <ol>
        <li><a href="https://www.miyoushe.com/ys/accountCenter/postList?id=160367110">原神冒险团</a>'s optimal stats value calculation</li>
        <li><a href="https://keqingmains.com/">KQM</a>'s artifact substat ranking</li>
      </ol>

      <p>
        Recommended stats are rounded using the following criteria:
      </p>
      
      <ul>
        <li>Rounded to nearest 5: Crit Rate%, Crit Dmg%, Energy Recharge%, EM, Heal%</li>
        <li>Rounded to nearest 100: Attack, Defense</li>
        <li>Rounded to nearest 1,000: HP</li>
      </ul>
      
      <p>
        Note these values are meant to be optimal endgame values based on a character's damage curve and can be very difficult to reach, we recommend using them as a reference, or as a long term goal to aim for. Due to these being aggregated data, accuracy may be lost, use linked source materials for accurate, in-depth analysis.
      </p>      
    </div>
    <div class="notes-example example">
      <div class="box">
        <BuildNotes build={exampleBuild} />
      </div>
    </div>
    <div class="notes-content content">
      <p>Optional notes for a build's talent priority as well as play style.</p>

      <ul>
        <li>A or NA: Normal Attack</li>
        <li>E: Elemental Skill</li>
        <li>Q: Elemental Burst</li>
        <li>CA: Charged Attack</li>
        <li>xN (where N is a number): repeat for N times</li>
      </ul>

      <p>
        In talent priority, "A > E > Q" means to focus on upgrading normal attack, then elemental skill, and finally burst.
      </p>

      <p>
        In notes, a "NAx4 > CA > Q" is for a rotation in which you would use that character with 4 normal attacks (normal attack x 4), followed by a charge attack, followed by a burst.
      </p>      
    </div>
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
