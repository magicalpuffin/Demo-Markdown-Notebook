<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { NotebookType } from "$lib/types/notebook";
  import NotebookBarItem from "$lib/components/notebook_bar/NotebookBarItem.svelte";

  const dispatch = createEventDispatcher();

  export let notebooks: NotebookType[];
  export let selected_notebook = notebooks[0];

  function updateNotebook(notebook: NotebookType) {
    const i = notebooks.findIndex((t) => t.id === notebook.id);
    notebooks[i] = { ...notebooks[i], ...notebook };

    // reselects notebook due to mutation
    selectNotebook(notebooks[i]);
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
      on:select={(e) => selectNotebook(e.detail)}
      on:update={(e) => updateNotebook(e.detail)}
      on:remove={(e) => removeNotebook(e.detail)}
      selected={notebook === selected_notebook}
      {notebook}
    />
  {/each}
</div>
