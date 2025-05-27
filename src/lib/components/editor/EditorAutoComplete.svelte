<script>
  import { slide } from 'svelte/transition';

  let {
    id,
    name = id,
    label = '',
    options = [],
    selectedValue = '',
    placeholder = '',
    l10n = {}, // For overriding display value
    onSubmit = (value) => {}
  } = $props();

  let results = $state([...options]);
  let showAutocompleteResults = $state(false);
  let highlightIndex = $state(0);

  const showResults = () => {
    highlightIndex = 0;
    showAutocompleteResults = true;
  };

  const findMatches = (options, searchTerm) =>
    options.filter((option) => {
      const foundIndex = option.toLowerCase().indexOf(searchTerm.toLowerCase());
      return foundIndex > -1;
    });

  const hideResults = () => (showAutocompleteResults = false);

  const handleInput = () => showResults();

  const handleKeyDown = ({ key }) => {
    switch (key) {
      case 'Escape':
        hideResults();
        break;
      case 'ArrowUp':
        if (showAutocompleteResults && highlightIndex === 0) {
          highlightIndex = matches.length - 1;
        } else {
          highlightIndex -= 1;
        }
        break;
      case 'ArrowDown':
        if (!selectedValue && !showAutocompleteResults) {
          showResults();
          break;
        }
        if (showAutocompleteResults && highlightIndex === matches.length - 1) {
          highlightIndex = 0;
        } else {
          highlightIndex += 1;
        }
        break;
      case 'Tab':
        hideResults();
        break;
      case 'Enter':
        const highlightedOption = matches[highlightIndex];
        const value = highlightedOption || selectedValue;

        handleSubmit(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = (value) => {
    if (!value) return;
    onSubmit(value);
    selectedValue = '';
    hideResults();
  };

  let matches = $derived(findMatches(results, selectedValue));
</script>

<div transition:slide class="input-field">
  <label for={id}>{label}</label>
  <div class="autocomplete">
    <input
      class="input"
      {id}
      {name}
      bind:value={selectedValue}
      onkeydown={handleKeyDown}
      oninput={handleInput}
      onclick={showResults}
      {placeholder}
      autocomplete="off"
    />
    <div class:showAutocompleteResults class="autocomplete-results-container" autocomplete="off">
      <div class="click-catcher" role="button" tabindex="0" onclick={hideResults} onkeydown={hideResults}></div>
      <ul class="results-list" class:border-none={!matches.length}>
        {#each matches as match, index (match)}
          <li
            class:highlight={index === highlightIndex}
            role="presentation"
            onclick={() => handleSubmit(match)}
            onkeydown={() => handleSubmit(match)}
          >
            {Object.keys(l10n).length === 0 ? match : l10n[match] ? l10n[match] : match}
          </li>
        {/each}
      </ul>
    </div>
  </div>
</div>

<style lang="scss">
  label {
    padding: 6px 0 0 13px;
  }

  .autocomplete {
    display: inline-block;
    position: relative;
  }

  .autocomplete-results-container {
    display: none;

    &.showAutocompleteResults {
      display: block;
    }
  }

  .click-catcher {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .results-list {
    width: 190px;
    position: absolute;
    left: 12px;
    top: 37px;
    list-style-type: none;
    background-color: #fff;
    color: #595959;
    border-radius: 5px;
    padding-left: 0;
    margin: 0;
    z-index: 10;
    text-align: left;
    cursor: pointer;

    li {
      padding: 0.5rem;
      user-select: none;
    }
  }

  .highlight,
  .results-list li:hover {
    background: #333;
    color: #fff;
    font-weight: normal;
  }
</style>
