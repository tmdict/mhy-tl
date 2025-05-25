import { writable } from 'svelte/store';

function createFilters() {
  const { subscribe, set, update } = writable({});

  return {
    subscribe,
    // Given a list of keys, create an empty filter for each key
    init: (filterKeys) =>
      set(
        filterKeys.reduce(
          (acc, filterName) => ({
            [filterName]: { common: [], quick: '' },
            ...acc
          }),
          {}
        )
      ),
    // Only one quick filter can be selected at a time
    updateQuickFilter: (filterType, filterValue) =>
      update((filters) => {
        let updated = filters;
        updated[filterType].quick = filterValue;
        return updated;
      }),
    // Multiple common filters can be selected at the same time
    updateCommonFilter: (filterType, filterValue) =>
      update((filters) => {
        let updated = filters;
        updated[filterType].common = updated[filterType].common.includes(filterValue)
          ? updated[filterType].common.filter((e) => e !== filterValue) // Remove
          : [...updated[filterType].common, filterValue]; // Add
        return updated;
      }),
    // Reset content of a filter given its type
    resetByType: (filterType) =>
      update((filters) => {
        let updated = filters;
        updated[filterType].common = [];
        updated[filterType].quick = '';
        return updated;
      }),
    // Reset all filter types
    reset: () =>
      update((filter) =>
        // Iterate over each filter type and reset their content
        Object.keys(filter).reduce(
          (acc, filterName) => ({
            [filterName]: { common: [], quick: '' },
            ...acc
          }),
          {}
        )
      )
  };
}

export const buildsFilters = createFilters();
export const charScalingFilters = createFilters();
