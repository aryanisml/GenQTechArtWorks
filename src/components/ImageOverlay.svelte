<script lang="ts">
    export let imageUrl: string;
    export let mobileImageUrl: string;
    export let title: string;
    export let description: string;
</script>
  
<div class="relative w-screen h-screen overflow-hidden overlay-container" role="img" aria-label={title}>
    <!-- Responsive image loading with srcset -->
    <img
      loading="lazy"
      src={imageUrl}
      srcset={`${mobileImageUrl} 600w, ${imageUrl} 1200w`}
      sizes="(max-width: 600px) 100vw, 100vw"
      alt="" 
      class="absolute top-0 left-0 w-full h-full object-cover fade-in" 
      aria-hidden="true"
    />
  
    <!-- Overlay text at the bottom of the image -->
    <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 px-4 py-6 text-center">
      <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">{title}</h2>
      <p class="text-white text-sm md:text-base lg:text-lg max-w-3xl mx-auto">{description}</p>
    </div>
</div>
  
<style>
    .fade-in {
        opacity: 0;
        animation: fadeIn 1.5s ease-in-out forwards; /* Duration of 1.5 seconds */
    }
  
    @keyframes fadeIn {
        0% {
            opacity: 0;
            transform: translateY(20px); /* Start slightly below */
        }
        100% {
            opacity: 1;
            transform: translateY(0); /* End at normal position */
        }
    }
  
    /* Ensure that the container takes up full width */
    .overlay-container {
        width: 100%;
        position: relative;
    }
</style>
