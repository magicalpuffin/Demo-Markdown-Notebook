<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import type { NotebookType } from "$lib/types/notebook";

  const dispatch = createEventDispatcher();

  export let notebook: NotebookType;

  $: notebook_text = notebook.text;
  let editorEl: HTMLElement;

  let ace;
  let editor: any = null;

  // Custom implementation, similar to: https://github.com/nateshmbhat/svelte-ace
  onMount(async () => {
    // Dynamic loading from: https://github.com/sveltejs/kit/issues/2814
    ace = (await import("ace-builds")).default;
    (await import("ace-builds/src-noconflict/mode-markdown")).default;
    // ace = (await import("ace-builds/src-noconflict/ace")).default;
    // (await import("ace-builds/src/mode-markdown")).default;
    // (await import("ace-builds/src-noconflict/ext-language_tools")).default;

    editor = ace.edit(editorEl);
    editor.setOptions({
      fontSize: 16,
      minLines: 5,
      maxLines: 999,
      mode: "ace/mode/markdown",
      printMargin: false,
      wrap: true,
    });
    editor.setValue(notebook_text);
    editor.moveCursorTo(0, 0);
    editor.focus();
  });

  $: updateEditorValue(notebook_text);

  function updateEditorValue(new_value: string) {
    // If the notebook changes, and component is not destroyed, set to new notebook text
    if (editor != null) {
      editor.setValue(new_value);
      editor.moveCursorTo(0, 0);
      editor.focus();
    }
  }

  function update(notebook_changes: Partial<NotebookType>) {
    notebook = { ...notebook, ...notebook_changes };
    dispatch("update", notebook);
  }

  export function onSave() {
    if (editor != null) {
      notebook_text = editor.getSession().getValue();
    }
    update({ text: notebook_text });
    dispatch("toggleEdit", false);
  }

  export function onCancel() {
    dispatch("toggleEdit", false);
  }
</script>

<form
  class="rounded-lg border shadow-lg"
  on:submit|preventDefault={onSave}
  on:keydown={(e) => e.key === "Escape" && onCancel()}
  on:keydown={(e) => e.key === "Enter" && e.ctrlKey && onSave()}
>
  <div bind:this={editorEl} class="rounded-[inherit]" />
</form>
