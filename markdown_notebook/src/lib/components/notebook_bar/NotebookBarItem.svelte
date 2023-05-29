<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import type { NotebookType } from "$lib/types/notebook";
  import { clickOutside, focusOutside } from "$lib/utils/custom_events";

  import ThreeDotsIcon from "$lib/icons/ThreeDotsIcon.svelte";
  import EditPencilIcon from "$lib/icons/EditPencilIcon.svelte";
  import CancelIcon from "$lib/icons/CancelIcon.svelte";

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
          on:click={toggleDropdown}><ThreeDotsIcon /></button
        >
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
          <EditPencilIcon />

          <p class="pl-2">Rename</p>
        </button>
        <button
          class="flex flex-row px-2 text-red-600 hover:bg-red-600 hover:text-white"
          on:click={onRemove}
          ><CancelIcon />
          <p class="pl-2">Delete</p>
        </button>
      </div>
    </div>
  {/if}
</div>
