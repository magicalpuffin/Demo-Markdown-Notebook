<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";

  import type { NotebookType } from "$lib/types/notebook";

  const dispatch = createEventDispatcher();

  export let notebook: NotebookType;

  let editing = false;

  let editorEl: HTMLElement;

  let ace;

  // Custom implementation, similar to: https://github.com/nateshmbhat/svelte-ace
  onMount(async () => {
    // Dynamic loading from: https://github.com/sveltejs/kit/issues/2814
    ace = (await import("ace-builds")).default;
    // (await import("ace-builds/src/mode-markdown")).default;
    // ace = (await import("ace-builds/src-noconflict/ace")).default;
    (await import("ace-builds/src-noconflict/mode-markdown")).default;
    // (await import("ace-builds/src-noconflict/ext-language_tools")).default;

    let editor = ace.edit(editorEl);
    editor.setOptions({
      fontSize: 16,
      minLines: 5,
      maxLines: 100,
      mode: "ace/mode/markdown",
      printMargin: false,
      wrap: true,
    });
    editor.getSession().setMode("ace/mode/python");
  });
</script>

<div class="flex flex-col px-4">
  <div class="flex flex-row justify-between">
    <h1 class="text-lg font-bold">{notebook.name}</h1>
    {#if editing}
      <button
        class="rounded-lg border border-blue-600 px-4 text-blue-600 hover:bg-blue-600 hover:text-white"
        on:click={() => (editing = false)}>Save</button
      >
    {:else}
      <button
        class="rounded-lg border border-blue-600 px-4 text-blue-600 hover:bg-blue-600 hover:text-white"
        on:click={() => (editing = true)}>Edit</button
      >
    {/if}
  </div>
  {#if editing}
    <input type="text" />
  {:else}
    <article class="prose">{notebook.text}</article>
  {/if}
  <div bind:this={editorEl} />

  <!-- <input type="text" /> -->
</div>
