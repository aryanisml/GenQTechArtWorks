<script lang="ts">
  import { onMount } from 'svelte';
  import Router from 'svelte-spa-router';
  import Navbar from './Navbar.svelte';
  import Home from './routes/Home.svelte';
  import Footer from './components/Footer.svelte';
  import Artworks from './routes/Artworks.svelte';
  import Contact from './components/Contact.svelte';
  import ScrollToTop from './components/ScrollToTop.svelte';
  import Artists from './components/Artists.svelte';
  import Detail from './components/Detail.svelte';
  // Define routes
  const routes = {
    '/': Home,
    '/artworks': Artworks,
    '/contact': Contact,
    '/artists' : Artists,
    '/artists/details/:id': Detail 
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

  <!-- ScrollToTop button with adjusted position -->
  <ScrollToTop />

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

  /* ScrollToTop Button Styling */
  .scroll-to-top {
    position: fixed;
    bottom: 80px; /* Extra space for the Tawk.to icon */
    right: 20px;
    width: 50px;
    height: 50px;
    background-color: #333;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: opacity 0.3s ease;
    z-index: 999; /* Ensure it's above other content */
  }

  .scroll-to-top:hover {
    background-color: #555;
  }
</style>
