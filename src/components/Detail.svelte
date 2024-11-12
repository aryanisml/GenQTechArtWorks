<script lang="ts">
  import { onMount } from 'svelte';

  let artwork;
  let artworkId;
  let currentUrl = '';

  onMount(async () => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Get the current URL
    currentUrl = window.location.href;

    const currentRoute = window.location.hash;
    artworkId = currentRoute.split('/').pop(); // Get the last part of the URL
    const response = await fetch('/data.json');
    const data = await response.json();
    artwork = data.artworks.find((a) => a.id.toString() === artworkId);
  });

  // Function to handle back navigation
  function goBack() {
    window.history.length > 1 ? window.history.back() : window.location.href = '/#/artists';
  }
</script>

<div class="container">
  <!-- Breadcrumb -->
  <div class="breadcrumb">
    <a href="/" class="breadcrumb-link">Home</a> /
    <a href="/#/artists" class="breadcrumb-link">Artists</a> /
    <span>{artwork ? artwork.artist : ''}</span>
  </div>

  {#if artwork}
    <div class="detail-container">
      <!-- Image Section -->
      <div class="image-section">
        <img src={artwork.imageUrl} alt={artwork.title} />
      </div>

      <!-- Details Section -->
      <div class="details-section">
        <h1 class="artist">{artwork.artist}</h1>
        <h2 class="title">{artwork.title}</h2>
        <p class="dimensions">{artwork.dimensions}</p>
        <p class="medium">{artwork.medium}</p>
        <p class="style">{artwork.style}</p>

        <div class="availability">
          <span>AVAILABLE</span>
        </div>

        <button class="price-request-btn">Price on Request</button>
        
        <!-- WhatsApp button with dynamic message -->
        <a
          href={`https://wa.me/7021148278?text=${encodeURIComponent(`Hello, I'm interested in this artwork. Here is the link: ${currentUrl}`)}`}
          target="_blank"
          class="whatsapp-button"
          aria-label="Contact via WhatsApp"
        >
          <i class="fab fa-whatsapp"></i> Contact via WhatsApp
        </a>
      </div>
    </div>
  {/if}
</div>

<style>
  /* Container and breadcrumb styling */
  .container {
    max-width: 1200px;
    margin: auto;
    padding: 16px;
  }

  .breadcrumb {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 16px;
  }

  .breadcrumb-link {
    color: #555;
    text-decoration: none;
  }

  .breadcrumb-link:hover {
    text-decoration: underline;
  }

  /* Main layout styling */
  .detail-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
  }

  .image-section img {
    width: 100%;
    max-width: 500px;
    object-fit: cover;
    border-radius: 8px;
  }

  .details-section {
    text-align: center;
    max-width: 500px;
  }

  /* Artist details styling */
  .details-section h1.artist {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 8px 0;
  }

  .details-section h2.title {
    font-size: 1.25rem;
    color: #555;
    margin: 8px 0;
  }

  .details-section p {
    margin: 4px 0;
    color: #666;
  }

  .availability {
    font-size: 1rem;
    color: green;
    margin-top: 8px;
  }

  .price-request-btn {
    background-color: #d63384; /* Pink color */
    color: white;
    border: none;
    padding: 12px;
    cursor: pointer;
    margin-top: 16px;
    border-radius: 4px;
    transition: background-color 0.3s;
  }

  .price-request-btn:hover {
    background-color: #b8296f;
  }

  /* WhatsApp button styling */
  .whatsapp-button {
    display: inline-flex;
    align-items: center;
    background-color: #25d366;
    color: white;
    padding: 12px 16px;
    margin-top: 16px;
    border-radius: 4px;
    text-decoration: none;
    font-weight: bold;
    transition: background-color 0.3s;
  }

  .whatsapp-button:hover {
    background-color: #1ebe5d;
  }

  .whatsapp-button i {
    margin-right: 8px;
    font-size: 1.25rem;
  }

  /* Responsive adjustments */
  @media (min-width: 768px) {
    .detail-container {
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;
      gap: 24px;
    }

    .image-section, .details-section {
      width: 50%;
    }

    .details-section {
      text-align: left;
      padding-left: 16px;
    }
  }
</style>
