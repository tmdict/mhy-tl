<script>
  import { browser } from '$app/environment';
  import { onMount, setContext } from 'svelte';
  import dark from '$lib/style/themes/dark.json';
  import light from '$lib/style/themes/light.json';

  let { children } = $props();

  // Reference: https://dev.to/josef/theming-in-svelte-with-css-variables-53kd
  const availableThemes = { [dark.name]: dark, [light.name]: light };
  const defaultTheme = dark.name;
  let currentTheme = $state(browser ? localStorage.getItem('tmdict.mhy.theme') || defaultTheme : defaultTheme);
  let theme = $derived(availableThemes[currentTheme]);

  setContext('theme', {
    getTheme: () => theme,
    toggle: () => {
      currentTheme = currentTheme === dark.name ? light.name : dark.name;
      browser && localStorage.setItem('tmdict.mhy.theme', currentTheme);
      setRootColors(availableThemes[currentTheme]);
    }
  });

  // Set CSS vars on mount
  onMount(() => {
    setRootColors(availableThemes[currentTheme]);
  });

  // Sets CSS vars for easy use in components
  // ex: var(--theme-background)
  const setRootColors = (theme) => {
    for (let [prop, color] of Object.entries(theme.colors)) {
      let varString = `--theme-${prop}`;
      document.documentElement.style.setProperty(varString, color);
    }
  };
</script>

{@render children?.()}
