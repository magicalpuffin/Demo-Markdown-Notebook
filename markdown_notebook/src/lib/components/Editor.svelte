<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";

  const dispatch = createEventDispatcher();

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
  });
</script>

<div bind:this={editorEl} />
