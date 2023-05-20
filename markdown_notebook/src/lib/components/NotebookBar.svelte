<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { NotebookType } from "$lib/types/notebook";

  const dispatch = createEventDispatcher();

  export let notebooks: NotebookType[];
</script>

{#each notebooks as notebook (notebook.id)}
  <div>{notebook.name}</div>
{/each}
