<script>
  import { availableInputs, editor } from '@store/editor.svelte';
  import { WEAPONS_DATA } from '@store/gamedata';
  import EditorDropdownList from '$lib/components/editor/EditorDropdownList.svelte';

  // Pass in from parent so there's no error when character is changed to '-'
  let { weaponKey, availableWeapons } = $props();
  const keys = editor.getKeys.weapon(weaponKey);

  let l10n = $derived(Object.values(availableWeapons).reduce((acc, w) => {
    const names = w.reduce((wacc, wname) => {
      const name =
        WEAPONS_DATA[wname]['data'] && WEAPONS_DATA[wname]['data'] ? WEAPONS_DATA[wname]['data']['name'] : wname;
      return { ...wacc, [wname]: name };
    }, {});
    return { ...acc, ...names };
  }, {}));
</script>

<div class="content-row">
  <EditorDropdownList
    id={keys.weapon}
    label="Weapon {weaponKey + 1}"
    list={availableWeapons}
    {l10n}
    groups={Object.keys(availableWeapons).reverse()}
    bind:selected={editor.build[keys.weapon]}
  />
  <EditorDropdownList
    id={keys.ref}
    label="Refinement"
    list={availableInputs.refinement}
    inputWidth="60px"
    bind:selected={editor.build[keys.ref]}
  />
</div>
