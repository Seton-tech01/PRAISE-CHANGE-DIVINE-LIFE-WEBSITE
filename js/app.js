document.getElementById('prayerForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Stop standard page redirect

    // --- CONFIGURATION ZONE ---
    const whatsappNumber = "2348114054457";
    const formspreeEndpoint = "https://formspree.io/f/xojbonvb";
    // --------------------------

    const submitBtn = document.getElementById('submitBtn');
    const statusDiv = document.getElementById('formStatus');

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerText = "Processing Your Prayer Request...";
    statusDiv.classList.remove('hidden', 'bg-red-50', 'text-red-700', 'bg-emerald-50', 'text-emerald-700');
    statusDiv.classList.add('bg-amber-50', 'text-amber-700');

    // Gather values
    const name = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const request = document.getElementById('request').value;

    // 1. Prepare data structures
    // Create a beautifully formatted raw text string for WhatsApp
    const rawMessage = `
            🔥 *PCDLGM — NEW PRAYER REQUEST*  

            👤 *Client:* ${name}  
            ✉️ *Contact:* ${email}  
            📞 *Phone:* ${phone}  
            📝 *Prayer Request:* ${request}  

            ⚡ Submitted via PCDLGM Web Portal
            `.trim();

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(rawMessage)}`;

    // Create the clean object payload for Formspree
    const emailPayload = {
        "Member Name": name,
        "Email Address": email,
        "Phone Number": phone,
        "Prayer Request": request
    };

    // 2. DISPATCH TO GMAIL VIA AJAX FETCH BACKEND
    const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(emailPayload)
    });

    if (response.ok) {
        // Success State
        submitBtn.classList.add('hidden');
        statusDiv.classList.remove('hidden');
        statusDiv.className =
            'my-4 p-5 rounded-2xl border border-emerald-200 bg-emerald-50 text-emerald-800';

        statusDiv.innerHTML = `
                <div class="text-center">
                    <div class="w-14 h-14 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center">
                        <i class="fas fa-check text-2xl text-emerald-600"></i>
                    </div>

                    <h3 class="text-lg font-bold text-emerald-800">
                        Prayer Request Submitted Successfully!
                    </h3>

                    <p class="text-sm text-emerald-700 mt-2 mb-4">
                        Your prayer request has been received and forwarded to our prayer team.
                        We are standing with you in faith and believing God with you.
                    </p>

                    <a href="${whatsappUrl}"
                    target="_blank"
                    class="inline-flex items-center gap-2 bg-emerald-600 text-white font-semibold px-5 py-3 rounded-xl shadow hover:bg-emerald-700 transition">
                        <i class="fab fa-whatsapp"></i>
                        Continue on WhatsApp
                    </a>
                </div>
`;
        document.getElementById('orderForm').reset();
    } else {
        throw new Error("Email engine rejected payload.");
    }
});


// Hamburger Mobile Navigation Menu Functionality
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    // Toggle icons smoothly between bars and Close X symbol
    if (mobileMenu.classList.contains('hidden')) {
        menuIcon.className = 'fas fa-bars text-2xl';
    } else {
        menuIcon.className = 'fas fa-times text-2xl';
    }
});

// Close mobile menu smoothly whenever a linking element section gets clicked
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIcon.className = 'fas fa-bars text-2xl';
    });
});

// Intercept Prayer Request Handling submission events
document.getElementById('prayerForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Stop page refreshing behavior

    // Show custom elegant system feedback response container alert box
    const successBox = document.getElementById('successMessage');
    successBox.classList.remove('hidden');

    // Reset input values within elements fields ready for standard recycling
    this.reset();

    // Auto scroll container cleanly downwards to put user visibility onto feedback response notification box
    successBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});