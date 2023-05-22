<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { NotebookType } from "$lib/types/notebook";
  import NotebookBarItem from "$lib/components/notebook_bar/NotebookBarItem.svelte";

  const dispatch = createEventDispatcher();

  export let notebooks: NotebookType[];
  export let selected_notebook = notebooks[0];
</script>

<!-- 
  TODO:
  Sort by name, or add order number and sortable?
  Mobile collapse into button
 -->

<div class="flex flex-col bg-gray-100">
  <a
    class="px-6 py-2 text-xl font-bold text-gray-800 hover:text-blue-400 md:text-2xl"
    href="/"
    >Markdown Notebook
  </a>
  {#each notebooks as notebook (notebook.id)}
    <NotebookBarItem
      on:select
      on:update
      on:remove
      selected={notebook === selected_notebook}
      {notebook}
    />
  {/each}
</div>
