<script>
  import { slide } from 'svelte/transition';

  let {
    id,
    name = id,
    label = '',
    value = $bindable(),
    placeholder = '',
    width = '200px'
  } = $props();
</script>

<div transition:slide class="input-field" style="--input-width: {width}">
  <label for={id}>{label}</label>
  <input class="input" type="text" {placeholder} {id} {name} bind:value={value} />
</div>

<style lang="scss">
  .input-field {
    width: var(--input-width);
  }

  label {
    padding: 6px 0 0 13px;
  }
</style>
