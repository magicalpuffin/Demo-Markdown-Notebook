<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import type { NotebookType } from "$lib/types/notebook";

  import { marked } from "marked";
  import createDOMPurify from "dompurify";

  const dispatch = createEventDispatcher();

  export let notebook: NotebookType;

  $: html_notebook_content = text_to_html(notebook.text);

  function text_to_html(text: string): string {
    let html_text = text;

    if (!html_text) {
      html_text = "*This notebook is empty. Edit to add text.*";
    }

    if (typeof window !== "undefined") {
      let DOMPurify = createDOMPurify(window);

      html_text = DOMPurify.sanitize(
        marked(html_text, {
          mangle: false,
          headerIds: false,
        })
      );
    }

    return html_text;
  }
</script>

<article class="prose">{@html html_notebook_content}</article>
