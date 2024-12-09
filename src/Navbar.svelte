<script lang="ts">
  import { onMount } from 'svelte';
  import { theme } from './store';
  import { link } from 'svelte-spa-router';

  let menuOpen = false;
  let menuList :any=[];

  // Toggle theme between light and dark modes
  function toggleTheme() {
    theme.update((currentTheme) => {
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark', newTheme === 'dark'); // Apply `dark` class to `html`
      return newTheme;
    });
  }

  // Toggle mobile menu
  function toggleMenu() {
    menuOpen = !menuOpen;
  }

  onMount(async () => {
        const response = await fetch('/data.json');
        const data = await response.json();
        menuList = data.menu;
    });
</script>

<nav class="fixed top-0 left-0 right-0 bg-light-bg dark:bg-dark-bg shadow-md z-50 font-sans" aria-label="Main Navigation">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
    <!-- Brand / Logo -->
    <a use:link href="/" class="text-2xl font-bold text-light-text dark:text-dark-text" aria-label="GenQTech Home">GenQTech</a>

    <!-- Hamburger Icon for Mobile with accessible toggle button -->
    <button 
      class="md:hidden text-light-text dark:text-dark-text focus:outline-none" 
      onclick={toggleMenu} 
      aria-expanded={menuOpen} 
      aria-controls="mobile-menu" 
      aria-label="Toggle menu"
    >
      <i class="fas fa-bars fa-lg" aria-hidden="true"></i>
    </button>

    <!-- Desktop Navigation Links -->
    <div class="hidden md:flex space-x-8">
      {#each menuList as menu}
      <a use:link href="/{menu.name.toLowerCase()}" class="menu-item" aria-label="Artworks">{menu.name}</a>
      {/each}
    </div>

    <!-- Theme Toggle Button -->
    <button 
      onclick={toggleTheme} 
      class="hidden md:block focus:outline-none ml-4 text-xl" 
      aria-label="Toggle Theme"
    >
      {#if $theme === 'light'}
        <i class="fas fa-moon text-gray-600" aria-hidden="true"></i>
      {:else}
        <i class="fas fa-sun text-yellow-400" aria-hidden="true"></i>
      {/if}
    </button>
  </div>

  <!-- Mobile Menu with accessible link structure -->
  {#if menuOpen}
    <div class="md:hidden bg-light-bg dark:bg-dark-bg shadow-lg" id="mobile-menu" role="menu">
      <div class="flex flex-col items-start space-y-4 px-4 py-4">
        <a use:link href="/" class="menu-item-mobile" onclick={() => (menuOpen = false)} role="menuitem" aria-label="Home">Home</a>
        <a use:link href="/artworks" class="menu-item-mobile" onclick={() => (menuOpen = false)} role="menuitem" aria-label="Artworks">Artworks</a>
        <a use:link href="/artists" class="menu-item-mobile" onclick={() => (menuOpen = false)} role="menuitem" aria-label="Artists">Artists</a>
        <a use:link href="/contact" class="menu-item-mobile" onclick={() => (menuOpen = false)} role="menuitem" aria-label="Contact">Contact</a>
      </div>
    </div>
  {/if}
</nav>

<style>
  /* Background colors for light and dark themes */
  .bg-light-bg {
    background-color: #ffffff;
  }
  .dark .bg-dark-bg {
    background-color: #1a1a2e; /* Dark background for dark theme */
  }

  /* Text colors for light and dark themes */
  .text-light-text {
    color: #000000; /* Black text for light theme */
  }
  .dark .text-dark-text {
    color: #e0e0e0; /* Light gray for dark theme */
  }

  /* Menu item styles with animations */
  .menu-item {
    font-size: 1rem;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--menu-color);
    transition: color 0.3s, transform 0.3s;
    position: relative;
    outline-offset: 2px;
  }
  .menu-item:hover, .menu-item:focus {
    color: var(--menu-hover-color);
    transform: translateY(-2px);
  }

  /* Underline animation on hover */
  .menu-item::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--menu-hover-color);
    transition: width 0.3s;
  }
  .menu-item:hover::after, .menu-item:focus::after {
    width: 100%;
  }

  /* Light theme variables */
  :root {
    --menu-color: #000000; /* Black for light theme */
    --menu-hover-color: #4a90e2; /* Blue for hover */
  }

  /* Dark theme variables */
  .dark {
    --menu-color: #e0e0e0; /* Light gray for dark theme */
    --menu-hover-color: #d55bb0; /* Soft pink hover effect */
  }

  /* Mobile menu items */
  .menu-item-mobile {
    font-size: 1rem;
    color: var(--menu-color);
    font-weight: 600;
    outline-offset: 2px;
  }
</style>
