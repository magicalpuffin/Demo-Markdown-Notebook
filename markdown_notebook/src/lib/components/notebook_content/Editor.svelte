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

  export function onSave() {
    if (editorsession != null) {
      notebook_text = editorsession.getValue();
    }
    update({ text: notebook_text });
    dispatch("toggleEdit", false);
  }

  export function onCancel() {
    dispatch("toggleEdit", false);
  }
</script>

<form
  on:submit|preventDefault={onSave}
  on:keydown={(e) => e.key === "Escape" && onCancel()}
  on:keydown={(e) => e.key === "Enter" && e.ctrlKey && onSave()}
>
  <div bind:this={editorEl} />
</form>
