<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import type { NotebookType } from "$lib/types/notebook";
  import { clickOutside, focusOutside } from "$lib/utils/custom_events";

  const dispatch = createEventDispatcher();

  export let notebook: NotebookType;
  export let selected = false;

  let editing = false;

  let notebook_name = notebook.name;

  let showMenu = false;

  function toggleDropdown() {
    showMenu = !showMenu;
  }

  function update(notebook_changes: Partial<NotebookType>) {
    notebook = { ...notebook, ...notebook_changes };
    dispatch("update", notebook);
  }

  function onSelect() {
    // selection managed by parent
    dispatch("select", notebook);
  }

  function onSave() {
    update({ name: notebook_name });
    editing = false;
  }

  function onCancel() {
    notebook_name = notebook.name;
    editing = false;
  }

  function onRemove() {
    dispatch("remove", notebook);
  }

  function focusOnInit(node: HTMLElement) {
    if (node && typeof node.focus === "function") {
      node.focus();
    }
  }
</script>

<div class="relative {selected ? 'border bg-blue-100' : ' hover:bg-blue-100'}">
  <div class="mx-4 flex flex-row justify-between">
    {#if editing}
      <form
        on:submit|preventDefault={onSave}
        on:keydown={(e) => e.key === "Escape" && onCancel()}
      >
        <input
          type="text"
          bind:value={notebook_name}
          use:focusOnInit
          on:blur={onCancel}
        />
      </form>
    {:else}
      <button
        class="grow truncate text-start {selected ? 'font-semibold' : ''}"
        on:click={onSelect}>{notebook.name}</button
      >
      {#if selected}
        <button
          class="px-2 text-gray-800 hover:text-gray-400 focus:text-gray-400 focus:outline-none"
          type="button"
          on:click={toggleDropdown}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
            />
          </svg>
        </button>
      {/if}
    {/if}
  </div>
  {#if showMenu}
    <div
      class="absolute right-0 z-10 rounded-md bg-white shadow-md"
      tabindex="-1"
      use:focusOnInit
      use:clickOutside
      use:focusOutside
      on:keydown={(e) => e.key === "Escape" && (showMenu = false)}
      on:click_outside={() => (showMenu = false)}
      on:focusin_outside={() => (showMenu = false)}
    >
      <div class="my-2 flex flex-col flex-nowrap">
        <button
          class="flex flex-row px-2 text-blue-600 hover:bg-blue-600 hover:text-white"
          on:click={() => (editing = true)}
        >
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            ><path
              d="M14.363 5.652l1.48-1.48a2 2 0 012.829 0l1.414 1.414a2 2 0 010 2.828l-1.48 1.48m-4.243-4.242l-9.616 9.615a2 2 0 00-.578 1.238l-.242 2.74a1 1 0 001.084 1.085l2.74-.242a2 2 0 001.24-.578l9.615-9.616m-4.243-4.242l4.243 4.242"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            /></svg
          >
          <p class="pl-2">Rename</p>
        </button>
        <button
          class="flex flex-row px-2 text-red-600 hover:bg-red-600 hover:text-white"
          on:click={onRemove}
        >
          <p class="flex h-6 w-6 items-center justify-center text-xl font-bold">
            X
          </p>
          <p class="pl-2">Delete</p>
        </button>
      </div>
    </div>
  {/if}
</div>
