<script>
    export let address = "410, Conwood Paragaon, Opp Indian Oil Petrol Pump, Near Cam Industrial Estate, Goregaon East, Mumbai 400063";
</script>

<section class="contact-container bg-gray-100 p-8 rounded-lg shadow-lg">
    <h2 class="text-3xl font-bold text-gray-800 mb-6">Contact Us</h2>

    <div class="contact-details mb-8">
        <h3 class="text-xl font-semibold">Our Address</h3>
        <p>{address}</p>
    </div>

    <!-- OpenStreetMap Embed -->
    <div class="map-container rounded-lg overflow-hidden shadow-lg">
        <iframe 
            src="https://www.openstreetmap.org/export/embed.html?bbox=72.8654,19.152,72.9867,19.2566&layer=mapnik&marker=19.2183,72.9250" 
            width="100%" 
            height="400" 
            style="border:0;" 
            allowfullscreen=""
            loading="lazy"
            title="OpenStreetMap of GenQTech Location"
        ></iframe>
    </div>
</section>

<style>
    .contact-container {
        max-width: 800px;
        margin: 0 auto;
    }

    .map-container iframe {
        width: 100%;
        height: 400px;
        border: 0;
    }
</style>
