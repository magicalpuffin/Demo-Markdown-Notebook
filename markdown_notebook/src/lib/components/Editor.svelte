<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { NotebookType } from "$lib/types/notebook";

  const dispatch = createEventDispatcher();

  export let notebook: NotebookType;
</script>

<div>
  <form>
    <div>toolbarmaybe</div>
    <div>{notebook.name}</div>
    <input type="text" />
  </form>
</div>
