<script>
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/content/Footer.svelte';
  import ThemeContext from '$lib/components/ThemeContext.svelte';

  let { children } = $props();
</script>

<ThemeContext>
  <main>
    <div id="container">
      <div id="header">
        <Header />
      </div>

      <div id="main">
        {@render children?.()}
      </div>
      <div id="footer">
        <Footer />
      </div>
    </div>
  </main>
</ThemeContext>

<style lang="scss" global>
  @import 'normalize.css';

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  body,
  html {
    font-size: 16px;
    background-color: var(--theme-bg-site);
    color: var(--theme-text-normal);
  }

  #container {
    display: flex;
    flex-direction: column;
  }

  #header {
    display: flex;
    align-items: flex-start;
    width: 100%;
    min-width: 320px;
    height: 270px;
    background-color: #111;
    margin: 0 auto;
    padding: 20px 0;
    font-family: var(--theme-main-font);
    border-bottom: 4px var(--theme-site-primary-main) solid;

    @media only screen and (max-width: 960px) {
      height: 100%;
      padding-bottom: 5px;
    }
  }

  #main {
    width: 960px;
    min-width: 320px;
    min-height: 200px;
    background: var(--theme-bg-container-main);
    margin: -60px auto 0;
    border: 2px solid var(--theme-bg-container-alt);
    border-radius: 5px;
    font: 1rem normal var(--theme-main-font);
    box-shadow: 0 4px 8px 0 rgb(0 0 0 / 90%), 0 6px 20px 0 rgb(0 0 0 / 20%);

    @media only screen and (max-width: 960px) {
      width: auto;
      margin: 0 auto;
    }
  }

  #content {
    margin-top: 20px;
  }

  #footer {
    color: #bfbfbf;
    margin: 20px auto;
    font-family: var(--theme-main-font);
    font-size: 0.8rem;
  }

  p {
    line-height: 1.5em;

    .highlight {
      color: var(--theme-site-primary-alt);
      font-weight: bold;
    }
  }

  a {
    color: var(--theme-site-secondary-main);
    text-decoration: none;

    &:hover {
      color: var(--theme-site-primary-alt);
      text-decoration: underline dotted;
    }
  }

  ul,
  ol {
    line-height: 1.5em;
  }

  h1 {
    color: var(--theme-site-primary-main);
    font: 2.4em var(--theme-header-font);
    text-align: center;
    margin-bottom: 10px;
  }

  h2 {
    color: var(--theme-text-highlight);
    font: 2em var(--theme-header-font);
  }

  h3 {
    color: var(--theme-text-normal);
    font: 1.5em var(--theme-header-font);
  }

  h4 {
    color: var(--theme-site-primary-main);
    font: bold 1em var(--theme-main-font);
    text-transform: uppercase;
    letter-spacing: 0.15em;
    margin: 0;
  }

  h5 {
    color: var(--theme-site-primary-alt);
    font: bold 1.1em var(--theme-main-font);
    margin: 15px 0;
  }

  .content-row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    &.alt {
      background: var(--theme-bg-container-alt);
    }
  }

  .content-col {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    &.alt {
      background: var(--theme-bg-container-alt);
    }
  }

  .align-center {
    align-items: center;
  }

  .icon img {
    display: block;
    float: left;
    border-radius: 5px;
  }

  .menu {
    text-align: center;
    min-width: 300px;
    margin: 0 auto 10px;
    padding: 5px 20px;
  }

  .menu-separator {
    margin-left: 5px;
    padding-left: 10px;
    border-left: 1px dotted var(--theme-border-light);
  }

  .build-heading {
    color: var(--theme-site-primary-alt);
    font-size: 0.9rem;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .rarity-1 img {
    background: url('/img/rarity/1.png');
  }

  .rarity-2 img {
    background: url('/img/rarity/2.png');
  }

  .rarity-3 img {
    background: url('/img/rarity/3.png');
  }

  .rarity-4 img {
    background: url('/img/rarity/4.png');
  }

  .rarity-5 img {
    background: url('/img/rarity/5.png');
  }

  .rarity-sp img {
    background: url('/img/rarity/sp.png');
  }

  .rarity-na img {
    background: none;
  }

  .anemo {
    color: #33ccb3;
    font-weight: bold;
  }

  .cryo {
    color: #98c8e8;
    font-weight: bold;
  }

  .dendro {
    color: #7bb42d;
    font-weight: bold;
  }

  .electro {
    color: #d376f0;
    font-weight: bold;
  }

  .geo {
    color: #cfa726;
    font-weight: bold;
  }

  .hydro {
    color: #1c72fd;
    font-weight: bold;
  }

  .physical {
    color: var(--theme-text-highlight);
    font-weight: bold;
  }

  .pyro {
    color: #e2311d;
    font-weight: bold;
  }

  .overlay {
    position: absolute;
    text-align: right;
    font-size: 12px;
    color: var(--theme-bg-highlight);
    font-weight: bold;
    text-shadow: -1px -1px 0 var(--theme-text-highlight), 1px -1px 0 var(--theme-text-highlight),
      -1px 1px 0 var(--theme-text-highlight), 1px 1px 0 var(--theme-text-highlight),
      -2px -2px 4px var(--theme-text-highlight), 2px -2px 4px var(--theme-text-highlight),
      -2px 2px 4px var(--theme-text-highlight), 2px 2px 4px var(--theme-text-highlight);
  }

  .input-field {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    width: 200px;
  }

  .input {
    height: 34px;
    margin: 5px 10px 10px;
    padding: 0px 12px;
    color: var(--theme-text-highlight);
    background-color: var(--theme-bg-highlight-alt);
    font-size: 1em;
    line-height: 1.4;
    border: 2px solid var(--theme-bg-container-main);
    border-radius: 6px;
    box-shadow: none;

    &:focus {
      outline: none !important;
      border: 2px solid var(--theme-site-primary-alt);
    }
  }

  .search-highlight {
    color: var(--theme-site-primary-alt);
    background-color: var(--theme-bg-highlight-alt);
  }

  #faq {
    padding: 0 20px 20px;

    h5 {
      text-align: center;
    }
  }

  ._toastMsg {
    font: 1rem normal var(--theme-main-font);
    margin-left: 5px;
    margin-right: 5px;
  }

  @import 'tippy.js/animations/scale-subtle.css';

  .tippy-box[data-theme~='custom'] {
    background-color: var(--theme-bg-highlight-alt);
    border: 1px solid #555;
    border-radius: 5px;
    font: 1rem normal var(--theme-main-font);
    box-shadow: 0 4px 8px 0 rgb(0 0 0 / 90%), 0 6px 20px 0 rgb(0 0 0 / 20%);
    padding: 15px;
  }

  .tippy-content {
    font-size: 0.9rem;
    line-height: 1.5em;
    overflow-wrap: anywhere;

    .heading {
      color: var(--theme-site-primary-main);
      font-weight: bold;
    }

    .highlight {
      color: var(--theme-site-primary-alt);
      font-weight: bold;
    }
  }
</style>
