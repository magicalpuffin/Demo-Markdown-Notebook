<script lang="ts">
  import NotebookBar from "$lib/components/notebook_bar/NotebookBar.svelte";
  import NotebookContent from "$lib/components/notebook_content/NotebookContent.svelte";

  import {
    updateNotebook,
    removeNotebook,
    createNotebook,
  } from "$lib/utils/manage_notebook";
  import type { NotebookType } from "$lib/types/notebook";

  export let notebooks: NotebookType[] = [];

  let selected_notebook: NotebookType | null = notebooks[0];
  let showMenu = false;
  let editing = false;

  function toggleNavbar() {
    showMenu = !showMenu;
  }

  function toggleEditting(editing_state: boolean) {
    editing = editing_state;
  }

  function selectNotebook(notebook: NotebookType | null) {
    selected_notebook = notebook;
    toggleEditting(false);
  }

  function onCreate() {
    notebooks = createNotebook(notebooks);

    // Selects last notebook in list, should be the newest notebook
    selectNotebook(notebooks[notebooks.length - 1]);
  }

  function onUpdate(notebook: NotebookType) {
    notebooks = updateNotebook(notebooks, notebook);

    // Selects notebook that was updated
    const i = notebooks.findIndex((t) => t.id === notebook.id);
    selectNotebook(notebooks[i]);
  }

  function onRemove(notebook: NotebookType) {
    let i = notebooks.findIndex((t) => t.id === notebook.id);
    if (i > 0) {
      i = i - 1;
    }

    notebooks = removeNotebook(notebooks, notebook);

    // Selects notebook before or first notebook. Selects null if no notebooks
    if (notebooks.length < 1) {
      selectNotebook(null);
    } else {
      selectNotebook(notebooks[i]);
    }
  }
</script>

<!-- 
    TODO:
    Use icons instead of names
    Alert/notifications
    Make default notebooks more interesting
    Add unit testing
    Two scroll bars, one on content, one on editor bar
   -->

<div class="mt-2 flex w-full flex-col md:flex-row">
  <button
    on:click={toggleNavbar}
    class="flex px-4 text-gray-800 hover:text-gray-400 focus:text-gray-400 focus:outline-none md:hidden"
    type="button"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="h-6 w-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  </button>
  <div
    class="flex-col md:flex md:w-1/3 md:max-w-sm {showMenu ? 'flex' : 'hidden'}"
  >
    <NotebookBar
      {notebooks}
      {selected_notebook}
      on:create={() => onCreate()}
      on:select={(e) => selectNotebook(e.detail)}
      on:update={(e) => onUpdate(e.detail)}
      on:remove={(e) => onRemove(e.detail)}
    />
  </div>
  <div class="mx-4 grow md:w-2/3">
    <NotebookContent
      notebook={selected_notebook}
      {editing}
      on:update={(e) => onUpdate(e.detail)}
      on:toggleEdit={(e) => toggleEditting(e.detail)}
    />
  </div>
</div>
