<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import type { NotebookType } from "$lib/types/notebook";

  const dispatch = createEventDispatcher();

  export let notebook: NotebookType;

  function onEdit() {
    dispatch("toggleEdit", true);
  }
</script>

<div class="flex flex-row justify-between">
  <h1 class="text-xl font-bold">{notebook.name}</h1>
  <button
    class="rounded-lg border border-blue-600 px-4 text-blue-600 hover:bg-blue-600 hover:text-white"
    on:click={onEdit}>Edit</button
  >
</div>
<article class="prose">{notebook.text}</article>
