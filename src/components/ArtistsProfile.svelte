<!-- ArtistsProfile.svelte -->
<script>
    import { onMount } from 'svelte';
    import { fade, fly, scale } from 'svelte/transition';
    
    let visible = false;
    let imageVisible = false;
    
    // Artist info
    const artist = {
      name: "Sampa Paul",
      bio: "A midst of all the events, becoming a mother was a very special life event. I was reborn with the birth of my children. I experienced the power of creating that mother nature has bestowed. Flowers did the magic Flowers did the magic of bridging the gap between the feelings of power and un-masked emotions – strength and vulnerability. They helped me cover and uncover the emotions and speak my heart bigger.",
      personality: "personality, from dark, mysterious, sensuous, scary to happy, joyful, compassionate, serene to a diverse spectrum."
    };
    
    // Timeline achievements and exhibitions
    const achievements = [
      { year: 2005, title: "Awarded by Bombay Art Society" },
      { year: 2006, title: "Awarded by Bombay Art Society" },
      { year: 2024, title: "Awarded with Maharashtra Gaurav Puraskar" }
    ];
    
    // Complete artist information
    const artistInfo = {
      birthYear: 1980,
      education: "Indian Artist from Government college of Arts & Crafts",
      careerStart: {
        year: 2004,
        location: "Mumbai"
      },
      exhibitions: [
        "Academy of Fine Arts",
        "Birla Academy", 
        "Lalitkala Academy", 
        "Nehru Centre Art Gallery",
        "College Exhibitions"
      ],
      series: [
        { name: "Mask series", period: "early career", popularity: "very popular" },
        { name: "HIDDEN BEAUTY", period: "recent", status: "currently being exhibited in various famous galleries in India & Abroad" }
      ],
      participation: {
        range: "2003 to 2024",
        scope: "various group shows all over India & Abroad"
      }
    };
    
    onMount(() => {
      visible = true;
      // Delay the image animation to create a sequence effect
      setTimeout(() => {
        imageVisible = true;
      }, 200);
    });
  </script>
  
  <style>
    /* Full-height container */
    .profile-container {
      display: flex;
      height: 100vh;
      width: 100%;
      overflow: hidden;
      font-family: 'Poppins', sans-serif;
      background-color: #ffffff;
      color: #333;
    }
    
    /* Left column with sticky image */
    .image-column {
      flex: 0 0 40%;
      position: relative;
      overflow: hidden;
      background-color: #f9f9f9;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .image-container {
      width: 90%;
      height: 85%;
      position: relative;
      overflow: hidden;
      border-radius: 8px;
      box-shadow: 0 15px 30px rgba(0,0,0,0.15);
    }
    
    .artist-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    
    .image-container:hover .artist-image {
      transform: scale(1.03);
    }
    
    .image-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 20px;
      background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
      color: white;
    }
    
    .artist-name {
      font-size: 2rem;
      font-weight: 600;
      margin: 0;
    }
    
    /* Right column with scrollable content */
    .content-column {
      flex: 0 0 60%;
      overflow-y: auto;
      padding: 40px;
      scrollbar-width: thin;
      scrollbar-color: #d1357a #f0f0f0;
      background-color: #f8fcff;
    }
    
    /* Custom scrollbar */
    .content-column::-webkit-scrollbar {
      width: 6px;
    }
    
    .content-column::-webkit-scrollbar-track {
      background: #f0f0f0;
    }
    
    .content-column::-webkit-scrollbar-thumb {
      background-color: #d1357a;
      border-radius: 10px;
    }
    
    /* Content sections */
    .section {
      margin-bottom: 30px;
    }
    
    .section-title {
      font-size: 1.5rem;
      color: #d1357a;
      margin-bottom: 15px;
      border-bottom: 2px solid #d1357a;
      padding-bottom: 5px;
      display: inline-block;
    }
    
    .section-content {
      background: white;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.05);
    }
    
    /* Bio section */
    .bio-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 15px;
    }
    
    .bio-item {
      margin-bottom: 10px;
    }
    
    .bio-label {
      font-weight: 600;
      color: #d1357a;
      margin-bottom: 5px;
    }
    
    .bio-list {
      padding-left: 20px;
      margin-top: 5px;
    }
    
    /* Timeline */
    .timeline {
      position: relative;
      padding-left: 20px;
      margin-left: 10px;
    }
    
    .timeline-line {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 2px;
      background: linear-gradient(to bottom, #d1357a, #feb47b);
    }
    
    .timeline-item {
      position: relative;
      margin-bottom: 15px;
      padding-left: 20px;
    }
    
    .timeline-item::before {
      content: '';
      position: absolute;
      left: -8px;
      top: 6px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: linear-gradient(135deg, #d1357a, #feb47b);
      box-shadow: 0 0 0 4px rgba(209, 53, 122, 0.2);
    }
    
    .timeline-year {
      font-weight: 700;
      color: #d1357a;
      font-size: 1.2rem;
      margin-bottom: 5px;
    }
    
    /* Quote styling */
    .quote-content {
      font-size: 1rem;
      line-height: 1.6;
      position: relative;
    }
    
    .quote-content p {
      margin-bottom: 10px;
    }
    
    /* Mobile header bar */
    .mobile-header {
      display: none;
      position: sticky;
      top: 0;
      width: 100%;
      background: white;
      z-index: 20;
      padding: 15px 20px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .mobile-title {
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0;
    }
    
    .mobile-menu {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 24px;
      height: 20px;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0;
    }
    
    .menu-line {
      width: 100%;
      height: 3px;
      background-color: #333;
      border-radius: 2px;
      transition: all 0.3s ease;
    }
    
    /* Image animation placeholder */
    .image-placeholder {
      width: 100%;
      height: 100%;
      background-color: #f0f0f0;
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .placeholder-circle {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 4px solid #d1357a;
      border-top-color: transparent;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    /* Animation wrapper */
    .animation-wrapper {
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
    }
  
    /* Responsive adjustments */
    @media (max-width: 992px) {
      .profile-container {
        flex-direction: column;
        height: auto;
        overflow: visible;
      }
      
      .mobile-header {
        display: flex;
      }
      
      .image-column {
        position: relative;
        flex: none;
        height: auto;
        width: 100%;
        z-index: 10;
      }
      
      .image-container {
        position: relative;
        width: 100%;
        height: auto;
        aspect-ratio: 1/1;
        border-radius: 0;
        box-shadow: none;
      }
      
      .artist-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      
      .image-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background: linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.3) 70%, transparent);
        padding: 15px;
      }
      
      .content-column {
        flex: 1;
        padding: 0;
      }
      
      .bio-grid {
        grid-template-columns: 1fr;
      }
      
      /* Style the section titles to match your screenshot */
      .section-title {
        color: #d1357a;
        border-bottom: none;
        padding: 15px;
        margin: 0;
        font-size: 1.4rem;
        font-weight: 500;
      }
      
      /* Style the section content to match your screenshot */
      .section-content {
        background: #fff;
        border-radius: 0;
        margin-bottom: 20px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        padding: 20px;
      }
      
      /* Add a white background behind the section title */
      .section {
        margin-bottom: 0;
        background-color: #f8fcff;
      }
    }
    
    @media (max-width: 576px) {
      .section-title {
        font-size: 1.3rem;
      }
      
      .artist-name {
        font-size: 1.8rem;
      }
    }
  </style>
  
  <div class="profile-container">
    <!-- Mobile header (only visible on mobile) -->
  
  
    <!-- Left Column - Artist Image -->
    <div class="image-column">
      <div class="image-container">
        <!-- Image placeholder shown before image loads -->
        {#if !imageVisible}
          <div class="image-placeholder">
            <div class="placeholder-circle"></div>
          </div>
        {/if}
        
        <!-- Image with animation -->
        {#if imageVisible}
          <div class="animation-wrapper" in:scale={{ duration: 800, delay: 200, start: 0.8, opacity: 0 }}>
            <img class="artist-image" src="/asset/sampa.jpeg" alt="Sampa Paul" 
                in:fade={{ duration: 1000 }} />
          </div>
        {/if}
        
        <!-- Overlay with name -->
        <div class="image-overlay" in:fade={{ duration: 1200, delay: imageVisible ? 600 : 0 }}>
          <h1 class="artist-name">{artist.name}</h1>
        </div>
      </div>
    </div>
    
    <!-- Right Column - Content -->
    <div class="content-column">
      <!-- Artist Quote -->
      {#if visible}
        <div class="section" in:fade={{ duration: 800, delay: 300 }}>
          <h2 class="section-title">The Artist</h2>
          <div class="section-content">
            <div class="quote-content">
              <p>{artist.personality}</p>
              <p>{artist.bio}</p>
            </div>
          </div>
        </div>
      {/if}
      
      <!-- Artist Bio -->
      {#if visible}
        <div class="section" in:fade={{ duration: 800, delay: 500 }}>
          <h2 class="section-title">Biography</h2>
          <div class="section-content">
            <div class="bio-grid">
              <div class="bio-item">
                <div class="bio-label">Born</div>
                <div>{artistInfo.birthYear}</div>
              </div>
              
              <div class="bio-item">
                <div class="bio-label">Education</div>
                <div>{artistInfo.education}</div>
              </div>
              
              <div class="bio-item">
                <div class="bio-label">Career Start</div>
                <div>{artistInfo.careerStart.year} from {artistInfo.careerStart.location}</div>
              </div>
            </div>
            
            <div class="bio-item">
              <div class="bio-label">Exhibitions</div>
              <ul class="bio-list">
                {#each artistInfo.exhibitions as exhibition}
                  <li>{exhibition}</li>
                {/each}
              </ul>
            </div>
            
            <div class="bio-item">
              <div class="bio-label">Participation</div>
              <div>Participated in {artistInfo.participation.scope} between {artistInfo.participation.range}</div>
            </div>
            
            <div class="bio-item">
              <div class="bio-label">Series</div>
              <ul class="bio-list">
                <li><strong>{artistInfo.series[0].name}</strong> was {artistInfo.series[0].popularity} at the beginning of her career</li>
                <li><strong>{artistInfo.series[1].name}</strong> series which sounds very mysterious is {artistInfo.series[1].status}</li>
              </ul>
            </div>
          </div>
        </div>
      {/if}
      
      <!-- Timeline -->
      {#if visible}
        <div class="section" in:fade={{ duration: 800, delay: 700 }}>
          <h2 class="section-title">Awards & Recognition</h2>
          <div class="section-content">
            <div class="timeline">
              <div class="timeline-line"></div>
              
              {#each achievements as achievement, i}
                <div class="timeline-item" in:fly={{ x: -20, duration: 500, delay: 900 + (i * 200) }}>
                  <div class="timeline-year">{achievement.year}</div>
                  <div class="timeline-content">{achievement.title}</div>
                </div>
              {/each}
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>