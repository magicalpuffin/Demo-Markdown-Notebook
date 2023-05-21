<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { NotebookType } from "$lib/types/notebook";
  import NotebookBarItem from "$lib/components/NotebookBarItem.svelte";

  const dispatch = createEventDispatcher();

  export let notebooks: NotebookType[];
  export let selected_notebook = notebooks[0];

  function updateNotebook(notebook: NotebookType) {
    const i = notebooks.findIndex((t) => t.id === notebook.id);
    notebooks[i] = { ...notebooks[i], ...notebook };
  }

  function selectNotebook(notebook: NotebookType) {
    selected_notebook = notebook;
  }

  function removeNotebook(notebook: NotebookType) {
    notebooks = notebooks.filter((t) => t.id !== notebook.id);
  }
</script>

<!-- 
  TODO:
  Editing names
  Sort by name, or add order number and sortable?
  Deleting
  Overflow text
  Mobile collapse into button
 -->

<div class="flex flex-col bg-gray-100">
  <a
    class="px-6 py-2 text-xl font-bold text-gray-800 hover:text-blue-400 md:text-2xl"
    href="/"
    >Markdown Notebook
  </a>
  {#each notebooks as notebook (notebook.id)}
    {#if notebook === selected_notebook}
      <div class="border bg-blue-100 px-4 text-start font-semibold">
        <NotebookBarItem
          on:select={(e) => selectNotebook(e.detail)}
          on:update={(e) => updateNotebook(e.detail)}
          on:remove={(e) => removeNotebook(e.detail)}
          {notebook}
        />
      </div>
    {:else}
      <button
        class="truncate px-4 text-start hover:bg-blue-100"
        on:click={() => (selected_notebook = notebook)}
      >
        {notebook.name}
      </button>
    {/if}
  {/each}
</div>
