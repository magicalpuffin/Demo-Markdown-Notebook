<script>
  import "../app.css";
  import Navbar from "$lib/components/Navbar.svelte";
</script>

<div>
  <Navbar />
  <main>
    <slot />
  </main>
</div>
