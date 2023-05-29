<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { NotebookType } from "$lib/types/notebook";
  import NotebookBarItem from "$lib/components/notebook_bar/NotebookBarItem.svelte";

  const dispatch = createEventDispatcher();

  export let notebooks: NotebookType[];
  export let selected_notebook: NotebookType | null = notebooks[0];

  function onCreate() {
    dispatch("create");
  }
</script>

<!-- 
  TODO:
  Sort by name, or add order number and sortable?
  Bulk edit, bulk delete?
  Create new notebooks, icon, on different menu
  Button to collapse, allways visible
  Dropdown menu should be a separate component
 -->

<button
  class="rounded-lg border border-blue-600 px-4 text-blue-600 hover:bg-blue-600 hover:text-white"
  on:click={onCreate}>Create</button
>
<div class="h-full bg-gray-100">
  {#if notebooks.length < 1}
    <p>No notebooks to display</p>
  {:else}
    {#each notebooks as notebook (notebook.id)}
      <NotebookBarItem
        on:select
        on:update
        on:remove
        selected={notebook === selected_notebook}
        {notebook}
      />
    {/each}
  {/if}
</div>
