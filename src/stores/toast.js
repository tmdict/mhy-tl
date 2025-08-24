import { browser } from "$app/environment";
import { Notyf } from "notyf";

import "notyf/notyf.min.css";

let notyf;

if (browser) {
  notyf = new Notyf({
    duration: 1500,
    position: { x: "right", y: "top" },
    types: [
      {
        type: "success",
        background: "var(--theme-site-secondary-main)",
        icon: false,
      },
      {
        type: "error",
        background: "var(--theme-site-primary-alt)",
        icon: false,
      },
    ],
  });
}

export const toast = {
  success: (message) => notyf?.success(message),
  error: (message) => notyf?.error(message),
};
