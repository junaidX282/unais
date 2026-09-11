document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 0. SOPHISTICATED TEXT ANIMATION FOR HERO NAMES
    // ==========================================
    // const nameEl = document.querySelector(".couple-names");
    // if (nameEl) {
    //     const text = nameEl.textContent.trim();
    //     nameEl.setAttribute("aria-label", text);
    //     nameEl.innerHTML = text.split("").map((char, index) => {
    //         const displayChar = char === " " ? "&nbsp;" : char;
    //         return `<span style="--char-index: ${index};" aria-hidden="true">${displayChar}</span>`;
    //     }).join("");
    // }




    // ==========================================
    // 1. COUNTDOWN TIMER
    // ==========================================
    const targetDate = new Date("september 20, 2026 16:00:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            document.getElementById("days").innerText = "00";
            document.getElementById("hours").innerText = "00";
            document.getElementById("minutes").innerText = "00";
            document.getElementById("seconds").innerText = "00";
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = String(days).padStart(2, '0');
        document.getElementById("hours").innerText = String(hours).padStart(2, '0');
        document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
        document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
    }

    // Run immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);


    // ==========================================
    // 2. SCROLL REVEAL (INTERSECTION OBSERVER)
    // ==========================================
    const revealElements = document.querySelectorAll(
        ".reveal-fade, .reveal-slide-up, .reveal-slide-left, .reveal-slide-right"
    );

    const observerOptions = {
        root: null, // Viewport
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: "0px 0px -50px 0px" // Slight offset for better feel
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    // ==========================================
    // 3. SAKURA PETAL FALLING EFFECT
    // ==========================================
    const sakuraContainer = document.getElementById("sakura-container");
    const maxPetals = 25; // Good balance of visual density & performance

    function createPetal() {
        if (sakuraContainer.childElementCount >= maxPetals) return;

        const petal = document.createElement("div");
        petal.classList.add("sakura-petal");

        // Random sizing (between 10px and 20px)
        const size = Math.random() * 10 + 10;
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;

        // Random horizontal start position
        petal.style.left = `${Math.random() * 100}%`;

        // Random falling speed (animation duration between 6s and 12s)
        const fallDuration = Math.random() * 6 + 6;
        petal.style.animationName = "fall, drift";
        petal.style.animationDuration = `${fallDuration}s, ${Math.random() * 4 + 4}s`;
        petal.style.animationTimingFunction = "linear, ease-in-out";
        petal.style.animationIterationCount = "infinite, infinite";

        // Random opacity to create depth
        petal.style.opacity = Math.random() * 0.6 + 0.3;

        // Random tilt angle
        petal.style.transform = `rotate(${Math.random() * 360}deg)`;

        // Append to container
        sakuraContainer.appendChild(petal);

        // Remove petal after it completes its cycle to refresh layout
        setTimeout(() => {
            petal.remove();
            createPetal(); // spawn a new one
        }, fallDuration * 1000);
    }

    // Initialize petals with a staggered delay
    for (let i = 0; i < maxPetals; i++) {
        setTimeout(createPetal, Math.random() * 10000);
    }

    // Shrink navbar on scroll
    window.addEventListener("scroll", () => {
        const navbar = document.querySelector("header.navbar");
        if (window.scrollY > 50) {
            navbar.style.paddingTop = "10px";
            navbar.style.paddingBottom = "10px";
            navbar.style.boxShadow = "0 5px 20px rgba(94, 11, 27, 0.08)";
        } else {
            navbar.style.paddingTop = "20px";
            navbar.style.paddingBottom = "20px";
            navbar.style.boxShadow = "none";
            navbar.style.borderBottom = "1px solid rgba(197, 168, 128, 0.15)";
        }
    });

    // Close mobile nav when clicking a link
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
    const navbarCollapse = document.querySelector(".navbar-collapse");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navbarCollapse.classList.contains("show")) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        });
    });
});
