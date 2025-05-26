<script>
  import { availableInputs, buildEditor } from '@store/editor';
  import { weapons } from '@store/gamedata';
  import EditorDropdownList from '$lib/components/editor/EditorDropdownList.svelte';

  export let weaponKey;
  export let availableWeapons; // Pass in from parent so there's no error when character is chanegd to '-'
  const keys = buildEditor.getKeys.weapon(weaponKey);

  $: l10n = Object.values(availableWeapons).reduce((acc, w) => {
    const names = w.reduce((wacc, wname) => {
      const name =
        $weapons[wname]['data'] && $weapons[wname]['data'].en ? $weapons[wname]['data'].en['name'] : wname;
      return { ...wacc, [wname]: name };
    }, {});
    return { ...acc, ...names };
  }, {});
</script>

<div class="content-row">
  <EditorDropdownList
    id={keys.weapon}
    label="Weapon {weaponKey + 1}"
    list={availableWeapons}
    {l10n}
    groups={Object.keys(availableWeapons).reverse()}
    bind:selected={$buildEditor[keys.weapon]}
  />
  <EditorDropdownList
    id={keys.ref}
    label="Refinement"
    list={$availableInputs.refinement}
    inputWidth="60px"
    bind:selected={$buildEditor[keys.ref]}
  />
</div>
