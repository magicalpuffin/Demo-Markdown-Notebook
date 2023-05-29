<script lang="ts">
  import PlusIcon from "$lib/icons/PlusIcon.svelte";
  import BookStackIcon from "$lib/icons/BookStackIcon.svelte";
</script>

<div
  class="flex shrink-0 flex-row border-b md:w-12 md:flex-col md:items-center md:border-r"
>
  <button
    class="px-2 py-2 text-gray-800 hover:text-blue-400"
    on:click={onCreate}><PlusIcon /></button
  >
  <button
    class="rounded-md px-2 py-2 {showMenu
      ? 'bg-gray-200 text-gray-800 hover:text-blue-400'
      : 'text-gray-800 hover:text-blue-400'} "
    on:click={toggleMenu}><BookStackIcon /></button
  >
</div>
