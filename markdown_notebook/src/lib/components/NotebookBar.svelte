<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { NotebookType } from "$lib/types/notebook";

  const dispatch = createEventDispatcher();

  export let notebooks: NotebookType[];
  export let selected_notebook = notebooks[0];
</script>

<!-- 
  TODO:
  Editing names
  Sort by name, or add order number and sortable?
  Deleting
  Overflow text
  Mobile collapse into 
 -->

<div class="flex flex-col rounded-lg bg-gray-100">
  {#each notebooks as notebook (notebook.id)}
    {#if notebook === selected_notebook}
      <button
        class="bg-blue-100 px-4 text-start font-semibold"
        on:click={() => (selected_notebook = notebook)}
      >
        {notebook.name}
      </button>
    {:else}
      <button
        class="px-4 text-start hover:bg-blue-100"
        on:click={() => (selected_notebook = notebook)}
      >
        {notebook.name}
      </button>
    {/if}
  {/each}
</div>
