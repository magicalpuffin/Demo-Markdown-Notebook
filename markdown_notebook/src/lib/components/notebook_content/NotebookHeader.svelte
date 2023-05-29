<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import type { NotebookType } from "$lib/types/notebook";
  import type Editor from "./Editor.svelte";

  const dispatch = createEventDispatcher();

  export let notebook: NotebookType;
  export let editing = false;

  export let editorInstance: Editor;

  function onEdit() {
    dispatch("toggleEdit", true);
  }
</script>

<div class="flex flex-row justify-between">
  <h1 class="text-sm text-gray-600">My Notebooks / {notebook.name}</h1>
  {#if editing}
    <div>
      <button
        class="rounded-lg border border-blue-600 px-4 text-blue-600 hover:bg-blue-600 hover:text-white"
        type="button"
        on:click={editorInstance.onSave}>Save</button
      >
      <button
        class="rounded-lg border border-red-600 px-4 text-red-600 hover:bg-red-600 hover:text-white"
        type="button"
        on:click={editorInstance.onCancel}>Cancel</button
      >
    </div>
  {:else}
    <button
      class="rounded-lg border border-blue-600 px-4 text-blue-600 hover:bg-blue-600 hover:text-white"
      on:click={onEdit}>Edit</button
    >
  {/if}
</div>
