<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import type { NotebookType } from "$lib/types/notebook";
  import Editor from "./Editor.svelte";
  import Content from "./Content.svelte";

  const dispatch = createEventDispatcher();

  export let notebook: NotebookType;

  export let editing = false;
</script>

<!-- 
  TODO:
  Add a markdown preview
  Edit focus incorrect, selects all text inside
  Notebook name kind of conflicts with other headers
 -->

<div class="mx-auto flex flex-col md:max-w-screen-md">
  {#if editing}
    <Editor {notebook} on:update on:toggleEdit />
  {:else}
    <Content {notebook} on:toggleEdit />
  {/if}
</div>
