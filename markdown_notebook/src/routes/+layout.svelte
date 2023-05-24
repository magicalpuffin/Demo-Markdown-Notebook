<script>
  import "../app.css";
  import Navbar from "$lib/components/Navbar.svelte";
</script>

<div class="flex h-screen flex-col">
  <Navbar />
  <main class="flex flex-1">
    <slot />
  </main>
</div>
