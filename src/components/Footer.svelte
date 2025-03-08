<script>
    // Any required props or imports if needed
</script>

<footer class="bg-black text-white py-8">
    <div class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 text-sm text-center md:text-left">
        
        <!-- Company Info and Address -->
        <div class="space-y-2">
            <h1 class="text-xl font-bold">Sampa Paul</h1>
            <address class="not-italic">
                <p>Mumbai</p>
                <!-- <p class="flex justify-center md:justify-start items-center">
                    <span class="material-icons" aria-hidden="true">phone</span> 
                    <a href="tel:+91224013888" aria-label="Phone number">+91 – 22 40139922</a>
                </p> -->
                <p class="flex justify-center md:justify-start items-center">
                    <span class="material-icons" aria-hidden="true">email</span> 
                    <a href="mailto:SampaPaul.sp@gmail.com" aria-label="Email contact">SampaPaul.sp@gmail.com</a>
                </p>
            </address>
        </div>

        <!-- Quick Links -->
        <div class="space-y-2">
            <h2 class="font-semibold mb-2">Quick Links</h2>
            <ul class="space-y-1" role="list">
                <li><a href="#/profile" class="hover:underline focus:underline" aria-label="About Sampa Paul">About Us</a></li>
                <li><a href="about#/writeup" class="hover:underline focus:underline" aria-label="Sampa Paul Blog">Blog</a></li>
                <li><a href="/press" class="hover:underline focus:underline" aria-label="Sampa Paul Press Coverage">Press Coverage</a></li>
                <!-- <li><a href="/testimonials" class="hover:underline focus:underline" aria-label="Sampa Paul Testimonials">Testimonials</a></li>
                <li><a href="/work-with-us" class="hover:underline focus:underline" aria-label="Work With Sampa Paul">Work With Us</a></li>
                <li><a href="#/contact" class="hover:underline focus:underline" aria-label="Contact Sampa Paul">Contact Us</a></li> -->
            </ul>
        </div>

        <!-- Follow Us and Payment Options -->
        <div class="space-y-4">
            <h2 class="font-semibold mb-2">Follow Us</h2>
            <div class="flex justify-center md:justify-start space-x-4">
                <a href="https://www.facebook.com/share/14yRF78Zvo/?mibextid=LQQJ4d" target="_blank" aria-label="Visit Sampa Paul on Facebook" rel="noopener noreferrer">
                    <span class="material-icons" aria-hidden="true">facebook</span>
                </a>
                <a href="https://www.instagram.com/sampa7730?igsh=aHVnZ245dW03eHhq" target="_blank" aria-label="Visit Sampa Paul on Instagram" rel="noopener noreferrer">
                    <span class="material-icons" aria-hidden="true">instagram</span>
                </a>
            </div>
            <div class="mt-4">
                <!-- <h2 class="font-semibold mb-2">Payment Options</h2>
                <div class="flex justify-center md:justify-start space-x-2">
                    <img loading="lazy" src="https://www.gallerienvya.com/wp-content/uploads/2019/02/visa.png" alt="Visa payment accepted" class="w-8 h-auto" />
                    <img loading="lazy" src="https://www.gallerienvya.com/wp-content/uploads/2019/02/mastro-card.png" alt="MasterCard payment accepted" class="w-8 h-auto" />
                    <img  loading="lazy" src="https://www.gallerienvya.com/wp-content/uploads/2019/02/mastro.png" alt="Maestro payment accepted" class="w-8 h-auto" />
                </div> -->
            </div>
        </div>
    </div>

    <!-- Footer Bottom -->
    <div class="container mx-auto mt-8 border-t border-gray-700 pt-4 text-center text-xs">
        <p>&copy; 2024 Sampa Paul. Website Maintenance by www.genqtech.com</p>
    </div>
</footer>

<style>
    .material-icons {
        font-size: 1rem;
        margin-right: 0.25rem;
    }

    .container {
        max-width: 1100px;
    }

    @media (max-width: 640px) {
        .container {
            padding: 0 1rem;
        }

        .material-icons {
            font-size: 1rem;
            margin-right: 0.5rem;
        }
    }

    a:focus {
        outline: 2px solid #ffffff;
        outline-offset: 2px;
    }
</style>
