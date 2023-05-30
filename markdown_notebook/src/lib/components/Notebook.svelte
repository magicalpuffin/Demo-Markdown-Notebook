<script lang="ts">
  import SideBar from "$lib/components/SideBar.svelte";
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
  let showMenu = true;
  let editing = false;

  function toggleMenu() {
    // should have a better name for this button/menu
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
    showMenu = true;

    // Selects last notebook in list, should be the newest notebook
    selectNotebook(notebooks[notebooks.length - 1]);
    toggleEditting(true);
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
    Alert/notifications
    Make default notebooks more interesting
    Add unit testing
    Two scroll bars, one on content, one on editor bar
    Top Navbar should compact better when in mobile view

    BUG:
    When creating multiple blank notebooks in edit mode, focus is not set. This is such a uncommon edge case
    Investigate some weird mobile view fat finger menu selection weirdness?
   -->

<div class="flex w-full flex-col md:flex-row">
  <SideBar {showMenu} on:clickCreate={onCreate} on:clickToggle={toggleMenu} />
  <div
    class="flex-col border-b md:w-1/3 md:max-w-sm md:border-r {showMenu
      ? 'flex'
      : 'hidden'}"
  >
    <NotebookBar
      {notebooks}
      {selected_notebook}
      on:select={(e) => selectNotebook(e.detail)}
      on:update={(e) => onUpdate(e.detail)}
      on:remove={(e) => onRemove(e.detail)}
    />
  </div>
  <div class="mx-4 mt-2 grow md:w-2/3">
    <NotebookContent
      notebook={selected_notebook}
      {editing}
      on:update={(e) => onUpdate(e.detail)}
      on:toggleEdit={(e) => toggleEditting(e.detail)}
    />
  </div>
</div>
