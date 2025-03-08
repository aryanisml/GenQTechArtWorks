<script>
    // Remove TypeScript annotations if causing issues
    export let address = "Mumbai";
    
    // Form data state
    let name = "";
    let email = "";
    let message = "";
    
    // Form validation - simplified
    $: isFormValid = name.trim() !== "" && 
                    email.trim() !== "" && 
                    message.trim() !== "" && 
                    email.includes('@') && 
                    email.includes('.');
    
    // Modal state
    let showModal = false;
    
    // Handle form submission
    function handleSubmit(e) {
      e.preventDefault();
      
      // Show thank you modal
      showModal = true;
      
      // Clear form
      name = "";
      email = "";
      message = "";
      
      // Auto-hide modal after 3 seconds
      setTimeout(() => {
        showModal = false;
      }, 3000);
    }
    
    // Close modal function
    function closeModal() {
      showModal = false;
    }
  </script>
  
  <section class="contact-container bg-white p-8 rounded-lg shadow-md">
    <h2 class="text-3xl font-bold text-black mb-6">Contact Us</h2>
    
    <div class="contact-info">
      <p class="flex items-center mb-4">
        <span class="mr-2">📧</span>
        <a href="mailto:SampaPaul.sp@gmail.com" class="text-pink-600">SampaPaul.sp@gmail.com</a>
      </p>
      
      <p class="flex items-center mb-4">
        <span class="mr-2">📍</span>
        <span class="text-black">{address}</span>
      </p>
    </div>
    
    <div class="mt-6">
      <form on:submit={handleSubmit}>
        <div class="mb-4">
          <label for="name" class="block text-black mb-2">Name</label>
          <input 
            type="text" 
            id="name" 
            class="w-full p-2 border border-gray-300 rounded" 
            placeholder="Your name"
            bind:value={name}
          />
        </div>
        
        <div class="mb-4">
          <label for="email" class="block text-black mb-2">Email</label>
          <input 
            type="email" 
            id="email" 
            class="w-full p-2 border border-gray-300 rounded" 
            placeholder="Your email"
            bind:value={email}
          />
        </div>
        
        <div class="mb-4">
          <label for="message" class="block text-black mb-2">Message</label>
          <textarea 
            id="message" 
            rows="4" 
            class="w-full p-2 border border-gray-300 rounded" 
            placeholder="Your message"
            bind:value={message}
          ></textarea>
        </div>
        
        <button 
          type="submit" 
          class="py-2 px-4 rounded {isFormValid ? 'bg-pink-500 hover:bg-pink-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}"
          disabled={!isFormValid}
        >
          Send Message
        </button>
      </form>
    </div>
    
    <!-- Thank You Modal -->
    {#if showModal}
    <div class="modal-overlay">
      <div class="modal-container">
        <div class="modal-content">
          <button class="modal-close" on:click={closeModal}>×</button>
          <div class="modal-icon" style="color: #ec4899;">✓</div>
          <h3 class="modal-title">Thank You!</h3>
          <p class="modal-message">We will connect with you shortly.</p>
        </div>
      </div>
    </div>
    {/if}
  </section>
  
  <style>
    .contact-container {
      max-width: 800px;
      margin: 0 auto;
      position: relative;
    }
    
    /* Modal Styles */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
    
    .modal-container {
      background-color: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(236, 72, 153, 0.2);
      max-width: 400px;
      width: 100%;
      animation: slideIn 0.3s ease-out;
      border-top: 4px solid #ec4899;
    }
    
    .modal-content {
      text-align: center;
      padding: 20px;
      position: relative;
    }
    
    .modal-close {
      position: absolute;
      top: -10px;
      right: -10px;
      background-color: #e5e5e5;
      border: none;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      font-size: 18px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .modal-icon {
      font-size: 48px;
      margin-bottom: 16px;
    }
    
    .modal-title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 8px;
      color: #ec4899;
    }
    
    .modal-message {
      font-size: 16px;
      color: #666;
    }
    
    @keyframes slideIn {
      from {
        transform: translateY(-20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  </style>