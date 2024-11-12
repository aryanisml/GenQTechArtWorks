<script lang="ts">
  import { onMount } from 'svelte';
  import Router from 'svelte-spa-router';
  import Navbar from './Navbar.svelte';
  import Home from './routes/Home.svelte';
  import Footer from './components/Footer.svelte';
  import Artworks from './routes/Artworks.svelte';

  // Define routes
  const routes = {
    '/': Home,
    '/artworks': Artworks
  };

  onMount(() => {
    // Tawk.to script integration
    var Tawk_API = Tawk_API || {};
    var Tawk_LoadStart = new Date();
    (function () {
      var s1 = document.createElement("script");
      var s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = 'https://embed.tawk.to/6732dc9f2480f5b4f59c0f61/1icfark8u';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
    })();
  });
</script>

<div class="app-container">
  <Navbar />

  <!-- Main content area that pushes the footer down if content is short -->
  <main class="content">
    <Router {routes} />
  </main>

  <!-- Footer remains at the bottom -->
  <Footer />
</div>

<style>
  /* Ensure the container takes up full viewport height */
  .app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  /* Main content takes remaining space to push footer to bottom */
  .content {
    flex: 1;
    padding-top: 5rem; /* adjust based on Navbar height */
    width: 100%;
  }

  /* Footer styling to keep it at the bottom */
  footer {
    width: 100%;
  }
</style>
