import { writable } from "svelte/store";

import type { JsonValue } from "$lib/types/json";

export const localStore = <T extends JsonValue>(key: string, initial: T) => {
  // receives the key of the local storage and an initial value

  // helper function
  const toString = (value: T) => JSON.stringify(value, null, 2);

  if (localStorage.getItem(key) === null) {
    // item not present in local storage, use initial value
    localStorage.setItem(key, toString(initial));
  }

  // convert to object
  const saved = JSON.parse(String(localStorage.getItem(key)));

  // create the underlying writable store
  const { subscribe, set, update } = writable<T>(saved);

  return {
    subscribe,
    set: (value: T) => {
      // save also to local storage as a string
      localStorage.setItem(key, toString(value));
      return set(value);
    },
    update,
  };
};
