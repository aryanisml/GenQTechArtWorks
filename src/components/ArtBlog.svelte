<script>
    import { onMount, onDestroy } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import { spring } from 'svelte/motion';
    
    // Props for the component
    export let title = "Hidden Beauty";
    export let artist = "Sampa Paul";
    export let size = "48\" x 72\"";
    export let year = "2023";
    export let imageUrl = "/asset/HiddenBeauty5.jpeg"; // Replace with actual image path
    
    // Responsive state
    let isMobile = false;
    let isTablet = false;
    let windowWidth;
    
    // Handle window resize for responsive layout
    function handleResize() {
      isMobile = windowWidth < 768;
      isTablet = windowWidth >= 768 && windowWidth < 1024;
    }
    
    onMount(() => {
      // Add resize listener
      window.addEventListener('resize', handleResize);
      // Initial size check
      handleResize();
    });
    
    onDestroy(() => {
      // Clean up event listener
      window.removeEventListener('resize', handleResize);
    });
    
    // Text content for the blog - split into paragraphs for easier management
    const blogParagraphs = [
      "Humans are a product of patent memories from ancestral and evolutionary past which explains similar modes of functioning or patterns of behaviors that occur across the globe. The world which one is born into already exist within personality is present in potential, from the time of birth. For the reason of adaption or personal convenience only a part comes to the surface to suit the life situation.",
      "The real person hides behind the persona/mask, just like the actors in olden days would use a mask to live a specific effect or influence on the audience- hiding the rest of themselves. The understanding of women personality always fascinated me. As a student of Art College I was drawn into painting masks.",
      "Fathoming various complexities of the human mind in diverse and challenging situations – my drawings were a narrative of innumerable shades of personality. From dark, heavy, mysterious, scary to happy, joyful, compassionate, serene; a diverse spectrum.",
      "With passage of time, I experienced a shift in my sensibilities attributed to diverse life experiences and social situations that demanded specific skillset & behavior. Amidst of all the events, becoming a mother was a special life event. I was reborn with the birth of my children. I experienced the \"Power of Creating\" that mother nature has bestowed.",
      "Upon Women, this ability to create shift in my role and new duties as a human – a woman –a mother gave a fresh perspective and new dimension to my canvas. Along with other artistic techniques, flowers as usual element embody aesthetic experiences that have healing qualities. They reconnect to positive social experiences by stimulating the mind, body & senses to interact positively to oneself & others, making the woman in my paintings strong & complete in herself."
    ];
  </script>
  
  <svelte:window bind:innerWidth={windowWidth}/>
  
  <div class="art-blog">
    <div class="art-blog-container" class:mobile={isMobile}>
      <!-- Left side - Image with overlay effect -->
      <div class="image-section" in:fade={{ duration: 800 }}>
        <div class="image-wrapper">
          <img src={imageUrl} alt="{title} by {artist}" />
        </div>
      </div>
      
      <!-- Right side - Content card -->
      <div 
        class="content-card"
        class:mobile-content={isMobile}
        in:fly={{ x: 20, duration: 600, delay: 200 }}
      >
        <div class="content-wrapper">
          <div class="artwork-details">
            <h1>{title}</h1>
            <div class="artwork-meta">
              <span><strong>Artist:</strong> {artist}</span>
              <span><strong>Size:</strong> {size}</span>
              <span><strong>Year:</strong> {year}</span>
            </div>
          </div>
          
          <div class="blog-content">
            {#each blogParagraphs as paragraph, i}
              <p in:fly={{ y: 10, duration: 300, delay: 300 + (i * 100) }}>{paragraph}</p>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <style>
    .art-blog {
      font-family: 'Poppins', sans-serif;
      min-height: 100vh;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f8f9fa;
      padding: 1rem;
    }
    
    .art-blog-container {
      position: relative;
      display: flex;
      max-width: 1400px;
      width: 100%;
      height: calc(100vh - 2rem);
      max-height: 800px;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
    }
    
    .art-blog-container.mobile {
      flex-direction: column;
      height: auto;
      max-height: none;
    }
    
    /* Image Section - Left Side */
    .image-section {
      flex: 1;
      position: relative;
      min-width: 45%;
      background-color: #000;
    }
    
    .image-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
    
    .image-wrapper img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
    
    /* Content Card - Right Side */
    .content-card {
      flex: 1;
      position: relative;
      z-index: 2;
      background-color: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(8px);
      padding: 3rem;
      overflow-y: auto;
      max-height: 100%;
    }
    
    .content-wrapper {
      max-width: 650px;
      margin: 0 auto;
    }
    
    .artwork-details {
      margin-bottom: 2.5rem;
      border-bottom: 1px solid #eaeaea;
      padding-bottom: 1.5rem;
    }
    
    .artwork-details h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #222;
      margin-bottom: 1rem;
    }
    
    .artwork-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      color: #555;
      font-size: 0.95rem;
    }
    
    .blog-content {
      color: #333;
      line-height: 1.8;
    }
    
    .blog-content p {
      margin-bottom: 1.5rem;
      font-size: 1.05rem;
    }
    
    /* Mobile Styles */
    .mobile-content {
      padding: 2rem 1.5rem;
    }
    
    /* Media queries for responsive behavior */
    @media (max-width: 767px) {
      .art-blog-container {
        flex-direction: column;
        height: auto;
      }
      
      .image-section {
        height: 40vh;
        min-height: 300px;
        position: relative;
      }
      
      .image-wrapper {
        position: relative;
      }
      
      .content-card {
        padding: 2rem 1.5rem;
      }
      
      .artwork-details h1 {
        font-size: 2rem;
      }
      
      .blog-content p {
        font-size: 1rem;
      }
    }
    
    /* Tablet styles */
    @media (min-width: 768px) and (max-width: 1023px) {
      .content-card {
        padding: 2.5rem;
      }
      
      .artwork-details h1 {
        font-size: 2.2rem;
      }
    }
  </style>