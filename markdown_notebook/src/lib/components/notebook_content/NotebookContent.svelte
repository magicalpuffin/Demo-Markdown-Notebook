<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import type { NotebookType } from "$lib/types/notebook";
  import Editor from "./Editor.svelte";
  import Content from "./Content.svelte";

  const dispatch = createEventDispatcher();

  export let notebook: NotebookType;

  let editing = false;
</script>

{#if editing}
  <Editor {notebook} on:update on:toggleEdit={(e) => (editing = e.detail)} />
{:else}
  <Content {notebook} on:toggleEdit={(e) => (editing = e.detail)} />
{/if}
