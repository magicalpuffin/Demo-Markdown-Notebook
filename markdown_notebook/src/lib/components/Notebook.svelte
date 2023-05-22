<script lang="ts">
  import NotebookBar from "$lib/components/notebook_bar/NotebookBar.svelte";
  import NotebookContent from "$lib/components/notebook_content/NotebookContent.svelte";

  import type { NotebookType } from "$lib/types/notebook";

  export let notebooks: NotebookType[] = [];

  let selected_notebook = notebooks[0];

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
    selectNotebook(notebooks[0]);
  }
</script>

<!-- 
    TODO:
    Use stores
    Use local storage
    Use dispatch instead of bind?
    
   -->
<div class="flex flex-row">
  <div class="max-w-sm grow">
    <NotebookBar
      {notebooks}
      {selected_notebook}
      on:select={(e) => selectNotebook(e.detail)}
      on:update={(e) => updateNotebook(e.detail)}
      on:remove={(e) => removeNotebook(e.detail)}
    />
  </div>
  <div class="grow">
    <NotebookContent
      notebook={selected_notebook}
      on:update={(e) => updateNotebook(e.detail)}
    />
  </div>
</div>
