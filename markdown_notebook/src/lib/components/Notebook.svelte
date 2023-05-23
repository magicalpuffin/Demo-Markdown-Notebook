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

  function createNotebook() {
    let new_notebook_id = 1;

    if (notebooks.length > 0) {
      new_notebook_id = Math.max(...notebooks.map((t) => t.id)) + 1;
    }

    let new_notebook: NotebookType = {
      id: new_notebook_id,
      name: "new notebook",
      text: "",
    };
    notebooks = [...notebooks, new_notebook];
  }
</script>

<!-- 
    TODO:
    Use icons instead of names
    Account for when there are no notebooks
    Alert/notifications
   -->

<div class="flex flex-col md:flex-row">
  <div class="grow md:max-w-sm">
    <NotebookBar
      {notebooks}
      {selected_notebook}
      on:create={() => createNotebook()}
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
