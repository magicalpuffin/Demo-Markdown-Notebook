<script lang="ts">
  import { markdown_to_html } from "$lib/utils/markdown_to_html";

  let markdown_text: string = `
  # Info
  This markdown notebook demo created in svelte. The objective of this was
  to a create a basic static site which allows users to edit and render
  markdown.

  ## How to Use
  - Navigate to Notebooks using the top navbar.
  - Click the plus button on the left menu to create a new notebook.
  - Write markdown using the editor. Click the save button to save changes.
  - Use the notebook bar to navigate between created notebooks.
  - Click the notebook stack button to hide or show the notebook bar.
  - Delete or rename notebooks using the three dot menu.

  ## Packages
  
  ### tailwindcss
  Used to create the css for all elements. The typography
  plugin was used to format the rendered markdown text. It was customized to
  use smaller margins.

  ### iconoir
  Used for icons.

  ### ace
  Used to editor for writing markdown text.

  ### marked
  Used to convert markdown strings into html.

  ### dompurify
  Used to sanitize the html generated by marked.
  `;

  let html_text: string = markdown_to_html(markdown_text);
</script>

<div class="container mx-auto max-w-xl px-2 pt-2">
  <article class="prose">{@html html_text}</article>
</div>
