// Filterlist
let _filterlist = $state({});

export const filterlist = {
  get: (filterType) => { return _filterlist[filterType]; },
  getFilters: () => { return Object.keys(_filterlist); },
  // Given a list of keys, create an empty filter for each key
  init: (filterKeys) => {
    _filterlist = filterKeys.reduce(
      (acc, filterName) => ({
        [filterName]: { common: [], quick: "" },
        ...acc
      }),
      {}
    )
  },
  // Only one quick filter can be selected at a time
  updateQuickFilter: (filterType, filterValue) => {
    _filterlist[filterType].quick = filterValue;
  },
  // Multiple common filters can be selected at the same time
  updateCommonFilter: (filterType, filterValue) => {
    _filterlist[filterType].common = _filterlist[filterType].common.includes(filterValue)
      ? _filterlist[filterType].common.filter((e) => e !== filterValue) // Remove
      : [..._filterlist[filterType].common, filterValue]; // Add
  },
  // Reset content of a filter given its type
  resetByType: (filterType) => {
    _filterlist[filterType].common = [];
    _filterlist[filterType].quick = "";
  },
  // Reset all filter types
  reset: () => {
    // Iterate over each filter type and reset their content
    Object.keys(_filterlist).forEach((filterType) => {
      _filterlist[filterType].common = [];
      _filterlist[filterType].quick = "";
    })
  }
};
