<script lang="ts">
  import { onMount } from 'svelte';

  let artwork = $state();
  let artworkId;
  let currentUrl = $state('');
  let mobileNumber = $state('');

  onMount(async () => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Get the current URL
    currentUrl = window.location.href;

    const currentRoute = window.location.hash;
    artworkId = currentRoute.split('/').pop(); // Get the last part of the URL
    const response = await fetch('/data.json');
    const data = await response.json();
    mobileNumber = data?.whatsappMobileNumber;
    artwork = data.artworks.find((a) => a.id.toString() === artworkId);
  });
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

        <!-- Availability and WhatsApp -->
        <!-- <div class="availability">
          <span>AVAILABLE</span>
          <a
            href={`https://wa.me/${mobileNumber}?text=${encodeURIComponent(`Hello, I'm interested in this artwork. Here is the link: ${currentUrl}`)}`}
            target="_blank"
            class="whatsapp-icon"
            aria-label="Contact via WhatsApp"
          >
            <i class="fab fa-whatsapp"></i>
          </a>
        </div> -->

        <!-- Button Group -->
        <!-- <div class="button-group"> -->
          <!-- Price on Request Button -->
          <!-- <button class="btn-price">
            <i class="fas fa-tag"></i> Price on Request
          </button> -->

          <!-- Pay Now Button -->
          <!-- <form><script src="https://checkout.razorpay.com/v1/payment-button.js" data-payment_button_id="pl_PUzyKBL0X0oBkT" async> </script> </form> -->
        <!-- </div> -->
      </div>
    </div>
  {/if}
</div>

<style>
  /* Import modern font */
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

  /* General styles */
  body {
    font-family: 'Poppins', sans-serif;
  }

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

  .detail-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
  }

  @media (min-width: 768px) {
    .detail-container {
      flex-direction: row; /* Align image and details side by side */
      align-items: flex-start;
      justify-content: space-between;
    }

    .image-section {
      flex: 1;
      max-width: 50%;
    }

    .details-section {
      flex: 1;
      max-width: 50%;
    }
  }

  .image-section img {
    width: 100%;
    object-fit: cover;
    border-radius: 8px;
  }

  .details-section {
    text-align: left;
  }

  .details-section h1.artist {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 8px 0;
  }

  .details-section h2.title {
    font-size: 1.25rem;
    color: #555;
    margin: 8px 0;
  }

  .availability {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1rem;
    color: green;
    margin-bottom: 16px;
  }

  /* WhatsApp circular button */
  .whatsapp-icon {
    width: 36px;
    height: 36px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #25d366;
    color: white;
    text-decoration: none;
    font-size: 1.25rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s;
  }

  .whatsapp-icon:hover {
    background-color: #1ebe5d;
  }

  /* Button group */
  .button-group {
    display: flex;
    justify-content: flex-start;
    gap: 16px;
    margin-top: 16px;
  }

  /* Price Request Button */
  .btn-price {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px 24px;
    font-size: 1rem;
    font-weight: 600;
    color: white;
    background: linear-gradient(90deg, #0070f3, #005bb5); /* Gradient background */
    border: none;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }

  .btn-price:hover {
    background: linear-gradient(90deg, #005bb5, #003f8a); /* Darker gradient on hover */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }

  .btn-price i {
    margin-right: 8px;
    font-size: 1.2rem;
  }

  /* Pay Now Button */
  .pay-now-button {
    margin: 0; /* Ensure proper alignment */
  }

  @media (max-width: 768px) {
    .details-section {
      text-align: center;
    }

    .button-group {
      flex-direction: column; /* Stack buttons on mobile */
      align-items: center;
    }
  }
</style>
