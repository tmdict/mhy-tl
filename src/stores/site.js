import { browser } from '$app/environment';
import { readable, writable } from 'svelte/store';
import localeData from '@dataTmp/locale.yml';

// Load images to be enhanced
const img = import.meta.glob(
  "$lib/img/**/*.png", {
    eager: true,
    query: {
      enhanced: true,
    },
  }
);

export const images = readable(img);
