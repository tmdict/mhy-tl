<script>
  let {
    id,
    name = id,
    label = '',
    value = $bindable(),
    width = '520px',
    height = '200px'
  } = $props();

  if (value === undefined) {
    value = '';
  }
</script>

<div class="input-field" style="--input-width: {width}; --input-height: {height}">
  <label for={id}>{label}</label>
  <textarea class="input" type="textarea" {id} {name} bind:value={value}></textarea>
</div>

<style lang="scss">
  .input-field {
    width: 100%;
  }

  textarea.input {
    height: var(--input-height);
    padding: 10px;
  }

  label {
    padding: 6px 0 0 13px;
  }
</style>
