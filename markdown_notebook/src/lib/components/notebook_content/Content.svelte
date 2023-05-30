<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import type { NotebookType } from "$lib/types/notebook";

  import { markdown_to_html } from "$lib/utils/markdown_to_html";

  const dispatch = createEventDispatcher();

  export let notebook: NotebookType;

  $: html_notebook_content = markdown_to_html(notebook.text);
</script>

<article class="prose">{@html html_notebook_content}</article>
