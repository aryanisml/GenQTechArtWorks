<script lang="ts">
    import { onMount } from 'svelte';
    import Swiper from 'swiper/bundle';
    import 'swiper/swiper-bundle.css';
  
    export let artworks = [];
  
    let swiperInstance;
  
    // Initialize Swiper in the `onMount` lifecycle hook
    onMount(() => {
      swiperInstance = new Swiper('.swiper', {
        slidesPerView: 1,
        spaceBetween: 5, // Reduce space between slides to a smaller value
        loop: true,
        autoplay: { delay: 3000 },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        pagination: { el: '.swiper-pagination', clickable: true },
        breakpoints: {
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }
      });
    });
</script>
  
<section class="slider-container bg-gray-800 p-8 text-white" role="region" aria-label="New Artworks Slider">
  <h2 class="text-3xl font-bold mb-6 text-center" id="slider-title">New Artworks</h2>
  
  <div class="swiper" aria-labelledby="slider-title">
    <div class="swiper-wrapper">
      {#each artworks as artwork (artwork.title)}
        <div class="swiper-slide" role="group" aria-roledescription="slide" aria-label={`Slide for ${artwork.title}`}>
          <div class="artwork-card relative bg-gray-900 rounded-lg overflow-hidden shadow-lg">
            <div class="relative group">
              <img loading="lazy" src={artwork.imageUrl} alt={`Artwork titled ${artwork.title}`} class="w-full h-72 object-cover" />
  
              <!-- Hover overlay with 'View Details' text -->
              <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true">
                <span class="text-lg font-semibold text-white">View Details</span>
              </div>
            </div>
  
            <div class="p-4 text-center">
              <h3 class="text-xl font-semibold mb-2" aria-label={`Artist: ${artwork.artist}`}>{artwork.artist}</h3>
              <p class="text-sm italic" aria-label={`Title: ${artwork.title}`}>{artwork.title}</p>
              <p class="text-sm" aria-label={`Medium: ${artwork.medium}`}>{artwork.medium}</p>
              <p class="text-sm" aria-label={`Dimensions: ${artwork.dimensions}`}>{artwork.dimensions}</p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  
    <!-- Optional Swiper Pagination -->
    <div class="swiper-pagination" aria-label="Slide pagination"></div>
  
    <!-- Optional Swiper Navigation -->
    <button class="swiper-button-next" aria-label="Next slide" aria-controls="slider-title"></button>
    <button class="swiper-button-prev" aria-label="Previous slide" aria-controls="slider-title"></button>
  </div>
</section>

<style>
  .slider-container {
    max-width: 100%;
  }

  /* Adjust the shadow to have a higher opacity */
  .artwork-card {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5); /* Increased shadow opacity */
  }

  /* Adjust spacing within the Swiper slider */
  .swiper-slide {
    margin: 0 5px; /* Reduce the side margin to decrease the space between cards */
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
