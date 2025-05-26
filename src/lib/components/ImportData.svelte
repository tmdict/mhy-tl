<script>
  import { toast } from '@store/toast';
  import { browser } from '$app/environment';
  import { localData } from '@store/localdata';

  // Support drag and drop in the future
  function getFilesFromInputEvent({ target }) {
    const files = target.files ? [...target.files] : [];
    target.value = ''; // Reset value so file can be uploaded again
    return files;
  }

  const onFile = (getFilesFunction) => (event) => {
    const files = getFilesFunction(event);
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const imported = JSON.parse(reader.result);
        $localData = imported;
        browser && localStorage.setItem('tmdict.genshin.data', reader.result);
        toast.success('Import successful!');
      } catch (err) {
        toast.error(`Import failed: ${err}`);
      }
    };
    reader.readAsText(files[0]);
  };
</script>

<span class="file-upload">
  <label for="file-import">
    <span class="import">Import Data</span>
  </label>

  <input
    type="file"
    name="file-import"
    id="file-import"
    accept="application/json"
    required
    on:input={onFile(getFilesFromInputEvent)}
  />
</span>

<style lang="scss">
  .file-upload {
    .import {
      color: var(--theme-site-secondary-main);

      &:hover {
        cursor: pointer;
        color: var(--theme-site-primary-alt);
        text-decoration: underline dotted;
      }
    }

    input {
      display: none;
    }
  }
</style>
