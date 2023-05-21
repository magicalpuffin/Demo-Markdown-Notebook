<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import type { NotebookType } from "$lib/types/notebook";

  const dispatch = createEventDispatcher();

  export let notebook: NotebookType;

  let editing = false;

  let notebook_name = notebook.name;

  function update(updated_notebook: Partial<NotebookType>) {
    notebook = { ...notebook, ...updated_notebook };
    dispatch("update", notebook);
  }

  function onSelect() {
    dispatch("select", notebook);
  }

  function onSave() {
    update({ name: notebook_name });
    editing = false;
  }
</script>

<div>
  {#if editing}
    <form
      on:submit|preventDefault={onSave}
      class="flex flex-row justify-between"
    >
      <input type="text" bind:value={notebook_name} />
      <button
        class="rounded-lg border border-blue-600 px-4 text-blue-600 hover:bg-blue-600 hover:text-white"
        type="submit">Save</button
      >
    </form>
  {:else}
    <div class="flex flex-row justify-between">
      <button on:click={onSelect}>{notebook.name}</button>
      <button
        class="rounded-lg border border-blue-600 px-4 text-blue-600 hover:bg-blue-600 hover:text-white"
        on:click={() => (editing = true)}>Edit</button
      >
    </div>
  {/if}
</div>
