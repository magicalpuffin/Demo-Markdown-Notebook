<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";

  import PlusIcon from "$lib/icons/PlusIcon.svelte";
  import BookStackIcon from "$lib/icons/BookStackIcon.svelte";

  const dispatch = createEventDispatcher();

  export let showMenu = true;
</script>

<div
  class="flex shrink-0 flex-row border-b md:w-12 md:flex-col md:items-center md:border-r"
>
  <button
    class="px-2 py-2 text-gray-800 hover:text-blue-400"
    on:click={() => dispatch("clickCreate")}><PlusIcon /></button
  >
  <button
    class="rounded-md px-2 py-2 {showMenu
      ? 'bg-gray-200 text-gray-800 hover:text-blue-400'
      : 'text-gray-800 hover:text-blue-400'} "
    on:click={() => dispatch("clickToggle")}><BookStackIcon /></button
  >
</div>
