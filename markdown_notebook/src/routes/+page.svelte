<script lang="ts">
  import NotebookBar from "$lib/components/notebook_bar/NotebookBar.svelte";
  import NotebookContent from "$lib/components/notebook_content/NotebookContent.svelte";

  import type { NotebookType } from "$lib/types/notebook";

  let notebooks: NotebookType[] = [
    {
      id: 1,
      name: "Notebook Name 1",
      text: "This is the content inside of notebook 1",
    },
    {
      id: 2,
      name: "Notebook Name 2",
      text: "This is the content inside notebook 2",
    },
    {
      id: 3,
      name: "Notebook Name 3",
      text: "This is the content inside notebook 3",
    },
  ];

  let selected_notebook = notebooks[0];
</script>

<!-- 
  TODO:
  Use stores
  Use local storage
  Use dispatch instead of bind?
  
 -->
<div class="flex flex-row">
  <div class="max-w-sm grow">
    <NotebookBar {notebooks} bind:selected_notebook />
  </div>
  <div class="grow">
    <NotebookContent bind:notebook={selected_notebook} />
  </div>
</div>
