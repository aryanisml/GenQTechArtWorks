<script lang="ts">
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
