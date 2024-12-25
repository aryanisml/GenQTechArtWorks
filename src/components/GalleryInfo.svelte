<script lang="ts">
  interface Props {
    title?: string;
    subtitle?: string;
    description?: string;
    buttonText?: string;
    imageUrl?: string;
  }

  let {
    title = '',
    subtitle = '',
    description = '',
    buttonText = 'Learn More',
    imageUrl = ''
  }: Props = $props();
</script>
  
<section 
    class="gallery-info-container flex flex-col lg:flex-row items-center lg:items-start p-6 lg:p-12 bg-gray-100 rounded-lg shadow-lg" 
    aria-labelledby="gallery-info-title" 
    aria-describedby="gallery-info-description"
>
    <!-- Left Section: Text Content -->
    <div class="text-content lg:w-1/2 p-4 lg:p-6">
      <h1 id="gallery-info-title" class="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
      <h2 class="text-xl text-gray-600 italic mb-4">{subtitle}</h2>
      <p id="gallery-info-description" class="text-gray-700 mb-6 leading-relaxed">{description}</p>
      <a 
          href="/" 
          class="inline-block bg-pink-500 text-white font-semibold px-6 py-3 rounded-full transition duration-200 hover:bg-pink-600 focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50" 
          aria-label={`Learn more about ${title}`}
      >
          {buttonText}
      </a>
    </div>
  
    <!-- Right Section: Image -->
    <figure class="image-content lg:w-1/2 p-4 lg:p-6">
      <img 
         loading="lazy"
          src={imageUrl} 
          alt={`Image of ${title}`} 
          class="rounded-lg shadow-md object-cover w-full h-full max-h-96" 
      />
      <figcaption class="sr-only">{`Image depicting ${title}`}</figcaption>
    </figure>
</section>
  
<style>
    .gallery-info-container {
      background-color: #f9fafb;
    }
  
    .text-content {
      max-width: 600px;
    }
  
    .image-content img {
      transition: transform 0.3s ease;
    }
  
    .image-content img:hover {
      transform: scale(1.05); /* Slight zoom effect on hover */
    }

    /* Accessible focus state for interactive elements */
    a:focus {
      outline: none;
    }
</style>
