<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { NotebookType } from "$lib/types/notebook";
  import NotebookBarItem from "$lib/components/notebook_bar/NotebookBarItem.svelte";

  const dispatch = createEventDispatcher();

  export let notebooks: NotebookType[];
  export let selected_notebook: NotebookType | null = notebooks[0];
</script>

<!-- 
  TODO:
  Sort by name, or add order number and sortable?
  Bulk edit, bulk delete?
  Button to collapse, allways visible
  Dropdown menu should be a separate component  
 -->

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
