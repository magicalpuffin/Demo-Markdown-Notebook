<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { NotebookType } from "$lib/types/notebook";
  import NotebookBarItem from "$lib/components/notebook_bar/NotebookBarItem.svelte";

  const dispatch = createEventDispatcher();

  export let notebooks: NotebookType[];
  export let selected_notebook = notebooks[0];

  function onCreate() {
    dispatch("create");
  }
</script>

<!-- 
  TODO:
  Sort by name, or add order number and sortable?
  Bulk edit, bulk delete?
  Mobile collapse into button
  Create new notebooks
  Auto select nearest id creating/deleting

  BUG:
  Resizing issues when selecting items, being pushed by content
 -->

<button
  class="rounded-lg border border-blue-600 px-4 text-blue-600 hover:bg-blue-600 hover:text-white"
  on:click={onCreate}>Create</button
>
<div class="h-full bg-gray-100">
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
