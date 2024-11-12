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
    let filteredArtworks = [];
    let currentPage = 1;
    const itemsPerPage = 12;

    onMount(async () => {
        const response = await fetch('/data.json');
        const data = await response.json();
        artworks = data.artworks;
        filteredArtworks = [...artworks]; // Display all artworks by default
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
    }

    function handleFilterChange(event) {
        applyFilters(event.detail); // Apply filter criteria from filter component
    }
</script>

<div class="container">
    <!-- Filter Component with event listener -->
    <Filter {filters} on:filterChange={handleFilterChange} />

    <!-- Artwork Cards Grid -->
    <div class="artworks-grid">
        {#each getCurrentPageItems() as artwork}
        <div class="artwork-card fade-in">
            <div class="card-overlay">
                <img src={artwork.imageUrl} alt={artwork.title} />
                <div class="overlay-content">
                    <a href="#/artists/details/{artwork.id}" class="view-details-link">View Details</a>
                </div>
            </div>
            <h3>{artwork.artist}</h3>
            <p>{artwork.title}</p>
            <p>{artwork.medium}</p>
            <p>{artwork.dimensions}</p>
        </div>
        
        {/each}
    </div>

    <!-- Pagination Component with event listener -->
    <Pagination totalPages={Math.ceil(filteredArtworks.length / itemsPerPage)} {currentPage} on:pageChange={handlePageChange} />
</div>

<style>
    .container {
        padding: 16px;
        margin: 0 auto;
        max-width: 1200px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .artworks-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1.5rem;
        margin-top: 1rem;
        width: 100%;
    }

    .artwork-card {
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        padding: 1rem;
        text-align: center;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .artwork-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }

    .artwork-card img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 4px;
        margin-bottom: 0.75rem;
    }

    .title {
        font-weight: 600;
        color: #333;
        margin: 0.5rem 0;
    }

    .fade-in {
        opacity: 0;
        animation: fadeIn 0.5s ease forwards;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }

    @media (max-width: 768px) {
        .artworks-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        }
    }

    @media (max-width: 480px) {
        .artworks-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        }
    }
    /* Overlay styling */
.card-overlay {
    position: relative;
    overflow: hidden;
}

.card-overlay img {
    width: 100%;
    height: auto;
    display: block;
}

.overlay-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    font-size: 1.2rem;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.artwork-card:hover .overlay-content {
    opacity: 1;
}

.overlay-content span {
    text-transform: uppercase;
    font-weight: bold;
}

.view-details-link {
    color: white;
    font-size: 1.2rem;
    text-transform: uppercase;
    font-weight: bold;
    text-decoration: none;
}

.view-details-link:hover {
    text-decoration: underline;
}
</style>
