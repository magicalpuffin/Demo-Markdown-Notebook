<script lang="ts">
  import NotebookBar from "$lib/components/notebook_bar/NotebookBar.svelte";
  import NotebookContent from "$lib/components/notebook_content/NotebookContent.svelte";

  import {
    updateNotebook,
    removeNotebook,
    createNotebook,
  } from "$lib/utils/manage_notebook";
  import type { NotebookType } from "$lib/types/notebook";

  import PlusIcon from "$lib/icons/PlusIcon.svelte";
  import BookStackIcon from "$lib/icons/BookStackIcon.svelte";

  export let notebooks: NotebookType[] = [];

  let selected_notebook: NotebookType | null = notebooks[0];
  let showMenu = true;
  let editing = false;

  function toggleMenu() {
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
    Use icons instead of names
    Alert/notifications
    Make default notebooks more interesting
    Add unit testing
    Two scroll bars, one on content, one on editor bar

    BUG:
    When creating multiple blank notebooks in edit mode, focus is not set. This is such a uncommon edge case
   -->

<div class="flex w-full flex-col md:flex-row">
  <div
    class="flex shrink-0 flex-row border-b md:w-12 md:flex-col md:items-center md:border-r"
  >
    <button
      class="px-2 py-2 text-gray-800 hover:text-blue-400"
      on:click={onCreate}><PlusIcon /></button
    >
    <button
      class="rounded-md px-2 py-2 {showMenu
        ? 'bg-gray-200 text-gray-800 hover:text-blue-400'
        : 'text-gray-800 hover:text-blue-400'} "
      on:click={toggleMenu}><BookStackIcon /></button
    >
  </div>
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
