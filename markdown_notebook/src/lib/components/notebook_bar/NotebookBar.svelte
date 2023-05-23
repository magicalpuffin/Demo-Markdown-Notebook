<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { NotebookType } from "$lib/types/notebook";
  import NotebookBarItem from "$lib/components/notebook_bar/NotebookBarItem.svelte";

  const dispatch = createEventDispatcher();

  export let notebooks: NotebookType[];
  export let selected_notebook = notebooks[0];

  let showMenu = false;

  function toggleNavbar() {
    showMenu = !showMenu;
  }

  function onCreate() {
    dispatch("create");
  }
</script>

<!-- 
  TODO:
  Sort by name, or add order number and sortable?
  Bulk edit, bulk delete?
  Mobile collapse into button
  Create new notebooks
  Auto select nearest id creating/deleting

  BUG:
  Resizing issues when selecting items, being pushed by content
 -->

<div class="flex flex-col bg-gray-100 md:h-screen">
  <div class="flex flex-row items-center">
    <a
      class="px-6 py-2 text-xl font-bold text-gray-800 hover:text-blue-400 md:text-2xl"
      href="/"
      >Markdown Notebook
    </a>
    <button
      on:click={toggleNavbar}
      class="flex text-gray-800 hover:text-gray-400 focus:text-gray-400 focus:outline-none md:hidden"
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
  </div>
  <div class="flex-col md:flex {showMenu ? 'flex' : 'hidden'}">
    <button
      class="rounded-lg border border-blue-600 px-4 text-blue-600 hover:bg-blue-600 hover:text-white"
      on:click={onCreate}>Create</button
    >
    {#each notebooks as notebook (notebook.id)}
      <NotebookBarItem
        on:select
        on:update
        on:remove
        selected={notebook === selected_notebook}
        {notebook}
      />
    {/each}
  </div>
</div>
