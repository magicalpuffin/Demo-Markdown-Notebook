<script lang="ts">
  import Notebook from "$lib/components/Notebook.svelte";

  import { notebooks } from "$lib/store";
</script>

<Notebook bind:notebooks={$notebooks} />
