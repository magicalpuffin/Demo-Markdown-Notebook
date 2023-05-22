<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import type { NotebookType } from "$lib/types/notebook";

  const dispatch = createEventDispatcher();

  export let notebook: NotebookType;
  export let selected = false;

  let editing = false;

  let notebook_name = notebook.name;

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

<div
  class={selected
    ? "border bg-blue-100 px-4 font-semibold"
    : "px-4 hover:bg-blue-100"}
>
  {#if editing}
    <form
      on:submit|preventDefault={onSave}
      on:keydown={(e) => e.key === "Escape" && onCancel()}
      class="flex flex-row justify-between"
    >
      <input type="text" bind:value={notebook_name} use:focusOnInit />
      <button
        class="rounded-lg border border-blue-600 px-2 text-blue-600 enabled:hover:bg-blue-600 enabled:hover:text-white disabled:opacity-50"
        type="submit"
        disabled={!notebook_name}>Save</button
      >
    </form>
  {:else}
    <div class="flex flex-row justify-between">
      <button class="grow truncate text-start" on:click={onSelect}
        >{notebook.name}</button
      >
      {#if selected}
        <div class="flex flex-row flex-nowrap">
          <button
            class="rounded-lg border border-blue-600 px-2 text-blue-600 hover:bg-blue-600 hover:text-white"
            on:click={() => (editing = true)}
            >Edit
          </button>
          <button
            class="rounded-lg border border-red-600 px-2 text-red-600 hover:bg-red-600 hover:text-white"
            on:click={onRemove}
          >
            X
          </button>
        </div>
      {/if}
    </div>
  {/if}
</div>
