<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import type { NotebookType } from "$lib/types/notebook";
  import Editor from "$lib/components/Editor.svelte";

  const dispatch = createEventDispatcher();

  export let notebook: NotebookType;

  let editing = false;
</script>

<div class="flex flex-col px-4 py-2">
  <div class="flex flex-row justify-between">
    <h1 class="text-xl font-bold">{notebook.name}</h1>
    {#if editing}
      <button
        class="rounded-lg border border-blue-600 px-4 text-blue-600 hover:bg-blue-600 hover:text-white"
        on:click={() => (editing = false)}>Save</button
      >
    {:else}
      <button
        class="rounded-lg border border-blue-600 px-4 text-blue-600 hover:bg-blue-600 hover:text-white"
        on:click={() => (editing = true)}>Edit</button
      >
    {/if}
  </div>
  {#if editing}
    <Editor />
  {:else}
    <article class="prose">{notebook.text}</article>
  {/if}
</div>
