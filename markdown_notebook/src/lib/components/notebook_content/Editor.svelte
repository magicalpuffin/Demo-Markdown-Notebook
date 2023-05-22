<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import type { NotebookType } from "$lib/types/notebook";

  const dispatch = createEventDispatcher();

  export let notebook: NotebookType;

  let notebook_text = notebook.text;
  let editorEl: HTMLElement;

  let ace;
  let editorsession: any = null;

  // Custom implementation, similar to: https://github.com/nateshmbhat/svelte-ace
  onMount(async () => {
    // Dynamic loading from: https://github.com/sveltejs/kit/issues/2814
    ace = (await import("ace-builds")).default;
    (await import("ace-builds/src-noconflict/mode-markdown")).default;
    // ace = (await import("ace-builds/src-noconflict/ace")).default;
    // (await import("ace-builds/src/mode-markdown")).default;
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
    editor.setValue(notebook_text);
    editorsession = editor.getSession();
  });

  function update(notebook_changes: Partial<NotebookType>) {
    notebook = { ...notebook, ...notebook_changes };
    dispatch("update", notebook);
  }

  function onSave() {
    if (editorsession != null) {
      notebook_text = editorsession.getValue();
    }
    update({ text: notebook_text });
    dispatch("toggleEdit", false);
  }

  function onCancel() {
    dispatch("toggleEdit", false);
  }
</script>

<div class="flex flex-col px-4 py-2">
  <form on:submit|preventDefault={onSave}>
    <div class="flex flex-row justify-between">
      <h1 class="text-xl font-bold">{notebook.name}</h1>
      <div>
        <button
          class="rounded-lg border border-blue-600 px-4 text-blue-600 hover:bg-blue-600 hover:text-white"
          type="submit">Save</button
        >
        <button
          class="rounded-lg border border-red-600 px-4 text-red-600 hover:bg-red-600 hover:text-white"
          type="button"
          on:click={onCancel}>Cancel</button
        >
      </div>
    </div>
    <div bind:this={editorEl} />
  </form>
</div>
