<script>
    export let title;
    export let count;
    export let imageUrl;
  </script>
  
  <section class="card">
    <img loading="lazy" src={imageUrl} alt={title} class="card-image" />
    <div class="card-info">
      <h2 class="card-title">{title}</h2>
      {#if count}
        <p class="card-count">{count}</p>
      {/if}
    </div>
</section>
  
  <style>
    .card {
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s ease-in-out;
    }
    
    .card:hover {
      transform: translateY(-5px);
    }
  
    .card-image {
      width: 100%;
      height: 180px;
      object-fit: cover;
    }
  
    .card-info {
      padding: 10px;
      text-align: center;
    }
  
    .card-title {
      font-size: 1.2rem;
      font-weight: 600;
      margin: 5px 0;
    }
  
    .card-count {
      color: #6b7280; /* Gray color for the count */
      font-size: 0.9rem;
    }
  </style>
  