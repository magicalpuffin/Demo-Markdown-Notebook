<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import type { NotebookType } from "$lib/types/notebook";
  import Editor from "./Editor.svelte";
  import Content from "./Content.svelte";

  const dispatch = createEventDispatcher();

  export let notebook: NotebookType;

  function updateNotebook(new_notebook: NotebookType) {
    notebook = { ...notebook, ...new_notebook };
    editing = false;
  }

  let editing = false;
</script>

{#if editing}
  <Editor {notebook} on:update={(e) => updateNotebook(e.detail)} />
{:else}
  <Content {notebook} on:edit={() => (editing = true)} />
{/if}
