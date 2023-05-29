<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import type { NotebookType } from "$lib/types/notebook";
  import NotebookHeader from "./NotebookHeader.svelte";
  import Editor from "./Editor.svelte";
  import Content from "./Content.svelte";

  const dispatch = createEventDispatcher();

  export let notebook: NotebookType | null;

  export let editing = false;

  let editor_component: Editor;
</script>

<!-- 
  TODO:
  Add a markdown preview
  Edit focus incorrect, selects all text inside
  Notebook name kind of conflicts with other headers
 -->

<div class="mx-auto flex flex-col md:max-w-screen-md">
  {#if notebook}
    <NotebookHeader on:toggleEdit {notebook} {editing} {editor_component} />
    {#if editing}
      <Editor {notebook} on:update on:toggleEdit bind:this={editor_component} />
    {:else}
      <Content {notebook} />
    {/if}
  {:else}
    <p>No notebook to display</p>
  {/if}
</div>
