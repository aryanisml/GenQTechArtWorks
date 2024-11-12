<script>
    import { onMount } from 'svelte';
    let isVisible = false;
  
    // Show the button only after scrolling down a bit
    const checkScroll = () => {
      isVisible = window.scrollY > 300;
    };
  
    // Scroll to the top smoothly
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  
    // Add a scroll event listener
    onMount(() => {
      window.addEventListener('scroll', checkScroll);
      return () => window.removeEventListener('scroll', checkScroll); // Clean up on component unmount
    });
  </script>
  
  <style>
    .scroll-to-top {
      position: fixed;
      bottom: 87px; /* Positioned above potential chat icon */
      right: 20px;
      width: 50px;
      height: 50px;
      background-color: #ff5e5e; /* Match the red color of the chat icon */
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      transition: background-color 0.3s ease, opacity 0.3s ease;
      z-index: 999; /* Ensure it stays above most elements */
    }
  
    .scroll-to-top:hover {
      background-color: #ff7878; /* Slightly lighter red on hover */
    }
  
    .scroll-to-top svg {
      width: 24px;
      height: 24px;
    }
  
    /* Hidden class for visibility toggle */
    .hidden {
      opacity: 0;
      pointer-events: none;
    }
  </style>
  
  <!-- Scroll-to-top button -->
  <div
    class="scroll-to-top {isVisible ? '' : 'hidden'}"
    on:click={scrollToTop}
    aria-label="Scroll to top"
  >
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 4l-8 8h6v8h4v-8h6z"></path>
    </svg>
  </div>
  