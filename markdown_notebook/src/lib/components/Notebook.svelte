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

  let showMenu = false;

  function toggleNavbar() {
    showMenu = !showMenu;
  }
</script>

<!-- 
    TODO:
    Use icons instead of names
    Account for when there are no notebooks
    Alert/notifications
   -->

<nav class="flex flex-row items-center justify-between border-b">
  <a
    class="px-4 py-2 text-xl font-bold text-gray-800 hover:text-blue-400 md:text-2xl"
    href="/"
    >Markdown Notebook
  </a>
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
</nav>

<div class="my-2 flex flex-col md:flex-row">
  <div
    class="grow flex-col md:flex md:w-1/3 md:max-w-sm {showMenu
      ? 'flex'
      : 'hidden'}"
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
      on:update={(e) => updateNotebook(e.detail)}
    />
  </div>
</div>
