<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { NotebookType } from "$lib/types/notebook";

  const dispatch = createEventDispatcher();

  export let notebook: NotebookType;
</script>

<form class="flex flex-col px-4">
  <div class="flex flex-row justify-between">
    <h1 class="text-lg font-bold">{notebook.name}</h1>
    <button
      class="rounded-lg border border-blue-600 px-4 text-blue-600 hover:bg-blue-600 hover:text-white"
      >Edit</button
    >
  </div>
  <article class="prose">{notebook.text}</article>

  <!-- <input type="text" /> -->
</form>
