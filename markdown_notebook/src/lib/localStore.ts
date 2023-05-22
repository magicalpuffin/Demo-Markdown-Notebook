// Adapted from: https://github.com/opensas/mdn-svelte-tutorial/blob/master/08-next-steps/src/localStore.ts
import { writable } from "svelte/store";

import type { JsonValue } from "$lib/types/json";

export const localStore = <T extends JsonValue>(key: string, initial: T) => {
  // helper function
  const toString = (value: T) => JSON.stringify(value, null, 2);

  let saved: T;

  if (
    typeof localStorage !== "undefined" &&
    localStorage.getItem(key) !== null
  ) {
    // item not present in local storage, use initial value
    saved = JSON.parse(String(localStorage.getItem(key)));
  } else {
    saved = initial;
  }

  // create the underlying writable store
  const { subscribe, set, update } = writable<T>(saved);

  return {
    subscribe,
    set: (value: T) => {
      if (typeof localStorage != "undefined") {
        // save also to local storage as a string
        localStorage.setItem(key, toString(value));
      }
      return set(value);
    },
    update,
  };
};
