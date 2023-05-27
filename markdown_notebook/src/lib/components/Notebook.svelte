<script lang="ts">
  import NotebookBar from "$lib/components/notebook_bar/NotebookBar.svelte";
  import NotebookContent from "$lib/components/notebook_content/NotebookContent.svelte";

  import type { NotebookType } from "$lib/types/notebook";

  export let notebooks: NotebookType[] = [];

  let selected_notebook = notebooks[0];

  let showMenu = false;

  let editing = false;

  function toggleNavbar() {
    showMenu = !showMenu;
  }

  function selectNotebook(notebook: NotebookType) {
    selected_notebook = notebook;
    toggleEditting(false);
  }

  function updateNotebook(notebook: NotebookType) {
    const i = notebooks.findIndex((t) => t.id === notebook.id);
    notebooks[i] = { ...notebooks[i], ...notebook };

    // reselects notebook due to mutation
    selectNotebook(notebooks[i]);
  }

  function removeNotebook(notebook: NotebookType) {
    notebooks = notebooks.filter((t) => t.id !== notebook.id);

    let reselect_index: number = 0;
    if (notebook.id > 1) {
      // notebook.id increments from 1, array index increments from 0
      reselect_index = notebook.id - 2;
    }

    selectNotebook(notebooks[reselect_index]);
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

  function toggleEditting(editing_state: boolean) {
    editing = editing_state;
  }
</script>

<!-- 
    TODO:
    Use icons instead of names
    Alert/notifications
    Make default notebooks more interesting
    
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
      on:create={() => createNotebook()}
      on:select={(e) => selectNotebook(e.detail)}
      on:update={(e) => updateNotebook(e.detail)}
      on:remove={(e) => removeNotebook(e.detail)}
    />
  </div>
  <div class="mx-4 grow md:w-2/3">
    <NotebookContent
      notebook={selected_notebook}
      {editing}
      on:update={(e) => updateNotebook(e.detail)}
      on:toggleEdit={(e) => toggleEditting(e.detail)}
    />
  </div>
</div>
