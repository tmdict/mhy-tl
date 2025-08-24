import tippy from "tippy.js";

export function tooltip(node, params = {}) {
  if (!tippy || !params.enabled) return;

  // Determine the title to show. We want to prefer the custom content
  // passed in first, then the HTML title attribute in that order
  const custom = params.tippy.content;
  const title = node.title;
  const content = custom || title;

  // Clear out the HTML title attribute since we don't want the default
  // behavior of it showing up on hover.
  node.title = "";
  const tip = tippy(node, { content, ...params.tippy });

  return {
    // If the props change, update the Tippy instance:
    update: (newParams) => tip.setProps({ content, ...newParams.tippy }),

    // Clean up the Tippy instance on unmount:
    destroy: () => tip.destroy(),
  };
}
