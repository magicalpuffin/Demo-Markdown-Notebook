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

  function onCancel() {
    notebook_name = notebook.name;
    editing = false;
  }
  function onRemove() {
    dispatch("remove", notebook);
  }
</script>

<div>
  {#if editing}
    <form
      on:submit|preventDefault={onSave}
      on:keydown={(e) => e.key === "Escape" && onCancel()}
      class="flex flex-row justify-between"
    >
      <input type="text" bind:value={notebook_name} />
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
    </div>
  {/if}
</div>
