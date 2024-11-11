<script>
  import { onMount, tick } from 'svelte';
  import ImageOverlay from '../components/ImageOverlay.svelte';
  import ArtworksSlider from '../components/ArtworksSlider.svelte';
  import GalleryInfo from '../components/GalleryInfo.svelte';

  let heroData = {
    imageUrl: '',
    mobileImageUrl: '',
    title: '',
    description: ''
  };

  let artworks = [];
  let galleryInfo = {
    title: '',
    subtitle: '',
    description: '',
    buttonText: '',
    imageUrl: ''
  };

  let dataLoaded = false; // Track when data is loaded

  // Fetch data from data.json file located in the public folder
  onMount(async () => {
    try {
      const response = await fetch('/data.json', { cache: 'no-store' });
      if (!response.ok) throw new Error(`Error fetching data: ${response.statusText}`);
      const data = await response.json();
      heroData = data.heroSection;
      artworks = data.artworks;
      galleryInfo = data.galleryInfo; // Add galleryInfo data from JSON
      dataLoaded = true; 
      console.log('Artworks loaded:', artworks);  // Log the data to ensure it is loaded
      console.log('Gallery Info loaded:', galleryInfo); // Log the galleryInfo to ensure it is loaded
      await tick(); // Wait for the DOM to update
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  });
</script>

<div class="w-full">
  {#if heroData.imageUrl}
    <ImageOverlay
      imageUrl={heroData.imageUrl}
      mobileImageUrl={heroData.mobileImageUrl}
      title={heroData.title}
      description={heroData.description}
    />
  {/if}

 

  {#if dataLoaded && artworks.length > 0}
    <ArtworksSlider {artworks} />
  {/if}

  {#if dataLoaded && galleryInfo.title}
  <GalleryInfo 
    title={galleryInfo.title} 
    subtitle={galleryInfo.subtitle}
    description={galleryInfo.description}
    buttonText={galleryInfo.buttonText}
    imageUrl={galleryInfo.imageUrl}
  />
{/if}
</div>

<style>
  .w-full {
    width: 100vw;
    overflow-x: hidden;
  }
</style>
