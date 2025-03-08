<script>
    import { onMount } from 'svelte';
    import Filter from './Filter.svelte';
    import Pagination from './Pagination.svelte';

    let artworks = [];
    let filters = {
        styles: ["Modern", "Abstract", "Contemporary"],
        mediums: ["Oil", "Acrylic", "Watercolour"],
        sizes: ["Small", "Medium", "Large"],
        layouts: ["Portrait", "Landscape", "Square"]
    };
    let filteredArtworks = $state([]);
    let currentPage = $state(1);
    const itemsPerPage = 12;
    let isLoading = $state(true);

    onMount(async () => {
        try {
            const response = await fetch('/data.json');
            const data = await response.json();
            artworks = data.artworks;
            filteredArtworks = [...artworks]; // Display all artworks by default
        } catch (error) {
            console.error('Failed to fetch artworks:', error);
        } finally {
            isLoading = false;
        }
    });

    function applyFilters(filterCriteria) {
        filteredArtworks = artworks.filter(artwork =>
            (!filterCriteria.style || artwork.style === filterCriteria.style) &&
            (!filterCriteria.medium || artwork.medium.includes(filterCriteria.medium)) &&
            (!filterCriteria.size || artwork.size === filterCriteria.size) &&
            (!filterCriteria.layout || artwork.layout === filterCriteria.layout)
        );
        currentPage = 1; // Reset to the first page after applying filters
    }

    function getCurrentPageItems() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredArtworks.slice(startIndex, endIndex);
    }

    function handlePageChange(event) {
        currentPage = event.detail; // Update current page from pagination event
        // Scroll to top of gallery when page changes
        document.querySelector('.artworks-section').scrollIntoView({ behavior: 'smooth' });
    }

    function handleFilterChange(event) {
        applyFilters(event.detail); // Apply filter criteria from filter component
    }
</script>

<div class="gallery-container">
    <!-- Filter Component with event listener -->
    <!-- <Filter {filters} on:filterChange={handleFilterChange} /> -->

    <!-- Artworks Section -->
    <section class="artworks-section">
        {#if isLoading}
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p>Loading artwork collection...</p>
            </div>
        {:else if filteredArtworks.length === 0}
            <div class="no-results">
                <p>No artworks match your current filters. Please try different criteria.</p>
            </div>
        {:else}
            <div class="artworks-grid">
                {#each getCurrentPageItems() as artwork, i}
                <div class="artwork-card" style="animation-delay: {i * 0.05}s">
                    <div class="card-image-container">
                        <img src={artwork.imageUrl} alt={artwork.title} loading="lazy" />
                        <div class="overlay-content">
                            <a href="#/artists/details/{artwork.id}" class="view-details-btn">View Details</a>
                        </div>
                    </div>
                    <div class="card-info">
                        <h3 class="artist-name">{artwork.artist}</h3>
                        <h4 class="artwork-title">{artwork.title}</h4>
                        <p class="artwork-medium">{artwork.medium}</p>
                        <p class="artwork-dimensions">{artwork.dimensions}</p>
                    </div>
                </div>
                {/each}
            </div>

            <!-- Pagination Component with event listener -->
            <Pagination 
                totalPages={Math.ceil(filteredArtworks.length / itemsPerPage)} 
                {currentPage} 
                on:pageChange={handlePageChange} 
            />
        {/if}
    </section>
</div>

<style>
    .gallery-container {
        padding: 2rem 1rem;
        margin: 0 auto;
        max-width: 1440px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .artworks-section {
        width: 100%;
        margin-top: 2rem;
    }

    .artworks-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 2rem;
        width: 100%;
    }

    .artwork-card {
        background-color: #fff;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        overflow: hidden;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        opacity: 0;
        animation: fadeInUp 0.5s ease forwards;
    }

    .artwork-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 16px 32px rgba(0, 0, 0, 0.12);
    }

    .card-image-container {
        position: relative;
        width: 100%;
        height: 300px; /* Fixed height for all images */
        overflow: hidden;
    }

    .card-image-container img {
        width: 100%;
        height: 100%;
        object-fit: cover; /* This ensures images maintain aspect ratio while filling the container */
        display: block;
        transition: transform 0.5s ease;
    }

    .artwork-card:hover .card-image-container img {
        transform: scale(1.05);
    }

    .card-info {
        padding: 1.25rem;
    }

    .artist-name {
        font-size: 1.1rem;
        font-weight: 600;
        color: #333;
        margin: 0 0 0.5rem 0;
    }

    .artwork-title {
        font-size: 1rem;
        font-weight: 500;
        color: #555;
        margin: 0 0 0.75rem 0;
    }

    .artwork-medium, .artwork-dimensions {
        font-size: 0.9rem;
        color: #777;
        margin: 0.25rem 0;
    }

    /* Overlay styling */
    .overlay-content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.6);
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .artwork-card:hover .overlay-content {
        opacity: 1;
    }

    .view-details-btn {
        color: white;
        background-color: transparent;
        border: 2px solid white;
        padding: 0.75rem 1.5rem;
        border-radius: 50px;
        font-size: 1rem;
        font-weight: 500;
        text-transform: uppercase;
        text-decoration: none;
        letter-spacing: 1px;
        transition: all 0.2s ease;
    }

    .view-details-btn:hover {
        background-color: white;
        color: #333;
        transform: scale(1.05);
    }

    /* Animation keyframes */
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Loading spinner */
    .loading-spinner {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 300px;
        width: 100%;
    }

    .spinner {
        width: 50px;
        height: 50px;
        border: 5px solid #f3f3f3;
        border-top: 5px solid #3498db;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 1rem;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .no-results {
        text-align: center;
        padding: 3rem;
        font-size: 1.1rem;
        color: #666;
    }

    /* Responsive styles */
    @media (max-width: 1200px) {
        .artworks-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 1.5rem;
        }
    }

    @media (max-width: 768px) {
        .gallery-container {
            padding: 1.5rem 1rem;
        }
        
        .artworks-grid {
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: 1.25rem;
        }
        
        .card-image-container {
            height: 250px;
        }
    }

    @media (max-width: 480px) {
        .gallery-container {
            padding: 1rem 0.75rem;
        }
        
        .artworks-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 1rem;
        }
        
        .card-image-container {
            height: 180px;
        }
        
        .card-info {
            padding: 0.75rem;
        }
        
        .artist-name {
            font-size: 0.9rem;
        }
        
        .artwork-title {
            font-size: 0.85rem;
        }
        
        .artwork-medium, .artwork-dimensions {
            font-size: 0.75rem;
        }
        
        .view-details-btn {
            padding: 0.5rem 1rem;
            font-size: 0.8rem;
        }
    }
</style>