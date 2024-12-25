<script>
  import { onMount } from 'svelte';
  import ArtworkCard from '../components/ArtworkCard.svelte';

  let artworks = $state([]);
  let categories = [];

  onMount(async () => {
    try {
      const response = await fetch('/data.json');
      if (!response.ok) throw new Error('Failed to load data');
      const data = await response.json();
      artworks = data.artworks;
      categories = data.artworkCategories;
    } catch (error) {
      console.error(error);
    }
  });
</script>

<!-- <div class="categories-grid">

  {#each categories as category}
    <ArtworkCard
      title={category.title}
      count={category.count}
      imageUrl="https://via.placeholder.com/150"/>
  {/each}
</div> -->

<div class="artworks-grid">
  {#each artworks as artwork}
    <ArtworkCard
      title={artwork.title}
      count={artwork.dimensions}
      imageUrl={artwork.imageUrl}
    />
  {/each}
</div>

<style>
  .categories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    padding: 20px;
    margin-bottom: 20px;
  }
  
  .artworks-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px;
  }
</style>
