<script lang="ts">
  let showMenu = false;

  function toggleNavbar() {
    showMenu = !showMenu;
  }
</script>

<nav
  class="container mx-4 max-w-xl py-4 md:flex md:items-start md:justify-start"
>
  <div class="flex items-start justify-start">
    <!-- Logo -->
    <a
      class="px-6 text-xl font-bold text-gray-800 hover:text-blue-400 md:text-2xl"
      href="/"
      >Markdown Notebook
    </a>
    <!-- Mobile menu button -->
    <button
      on:click={toggleNavbar}
      class="flex text-gray-800 hover:text-gray-400 focus:text-gray-400 focus:outline-none md:hidden"
      type="button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-6 w-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </button>
  </div>
  <!-- Nav Links -->
  <div
    class="mt-8 flex-col space-y-4 md:mt-0 md:flex md:flex-row md:items-center md:space-x-10 md:space-y-0 {showMenu
      ? 'flex'
      : 'hidden'}"
  >
    <a class="text-gray-800 hover:text-blue-400" href="/">Home</a>
  </div>
</nav>
