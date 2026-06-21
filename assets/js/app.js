/* ==========================================================================
   ROTARY CLUB OF UDAIPUR UDYAM - PROFESSIONAL INTERACTIVE LOGIC
   ========================================================================= */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Navigation Header Scroll Effect & Link Highlighting
    initHeaderScroll();
    initActiveLinkHighlight();

    // 2. Responsive Mobile Menu Drawer Accordion
    initMobileNav();

    // 3. GSAP Scroll Trigger Animations & Numerical counters
    initScrollAnimations();

    // 4. Testimonials Crossfade Slider
    initTestimonialSlider();

    // 5. Portfolio Category Filter (for projects.html)
    initProjectFilters();

    // 6. Immersive Lightbox Zoom
    initMediaLightbox();

    // 7. Form Toast Submissions (for contact.html / newsletter)
    initFormInteractions();
});

/* ==========================================================================
   1. NAVIGATION HEADER ACTIONS
   ========================================================================== */
function initHeaderScroll() {
    const header = document.querySelector(".site-header");
    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 40) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });
    }
}

function initActiveLinkHighlight() {
    let currentPath = window.location.pathname.split("/").pop();
    if (currentPath === "" || currentPath === "/") {
        currentPath = "index.html";
    }

    // Check main links
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        const linkHref = link.getAttribute("href");
        if (linkHref === currentPath) {
            link.classList.add("active");
            
            // Highlight parent if child link is inside active dropdown
            const parentDropdown = link.closest(".nav-item-dropdown");
            if (parentDropdown) {
                const trigger = parentDropdown.querySelector(".nav-link");
                if (trigger) trigger.classList.add("active");
            }
        }
    });

    // Check inner dropdown items
    const dropdownItems = document.querySelectorAll(".dropdown-item");
    dropdownItems.forEach(item => {
        const itemHref = item.getAttribute("href");
        if (itemHref && itemHref === currentPath) {
            const parentDropdown = item.closest(".nav-item-dropdown");
            if (parentDropdown) {
                const trigger = parentDropdown.querySelector(".nav-link");
                if (trigger) trigger.classList.add("active");
            }
        }
    });
}

/* ==========================================================================
   2. MOBILE NAV DRAWER & ACCORDIONS
   ========================================================================== */
function initMobileNav() {
    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".nav-menu");
    const dropdownParents = document.querySelectorAll(".nav-item-dropdown");

    if (toggle && menu) {
        toggle.addEventListener("click", (e) => {
            e.stopPropagation();
            const isActive = toggle.classList.toggle("active");
            menu.classList.toggle("active");
            toggle.setAttribute("aria-expanded", isActive ? "true" : "false");
        });
    }

    // Mobile accordion behavior for submenus
    dropdownParents.forEach(parent => {
        const linkTrigger = parent.querySelector(".nav-link");
        if (linkTrigger) {
            // Click handler
            linkTrigger.addEventListener("click", (e) => {
                if (window.innerWidth < 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const isAlreadyOpen = parent.classList.contains("active-mobile");
                    
                    // Close all other dropdowns
                    dropdownParents.forEach(p => {
                        p.classList.remove("active-mobile");
                        const trigger = p.querySelector(".nav-link");
                        if (trigger) trigger.setAttribute("aria-expanded", "false");
                    });
                    
                    if (!isAlreadyOpen) {
                        parent.classList.add("active-mobile");
                        linkTrigger.setAttribute("aria-expanded", "true");
                    }
                }
            });

            // Keyboard Space/Enter toggle handler
            linkTrigger.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    if (window.innerWidth < 768) {
                        e.preventDefault();
                        e.stopPropagation();
                        linkTrigger.click();
                    }
                }
            });
        }
    });

    // Tap outside closes menu
    document.addEventListener("click", (e) => {
        if (window.innerWidth < 768 && menu && menu.classList.contains("active")) {
            if (!menu.contains(e.target) && !toggle.contains(e.target)) {
                toggle.classList.remove("active");
                menu.classList.remove("active");
                toggle.setAttribute("aria-expanded", "false");
                dropdownParents.forEach(p => {
                    p.classList.remove("active-mobile");
                    const trigger = p.querySelector(".nav-link");
                    if (trigger) trigger.setAttribute("aria-expanded", "false");
                });
            }
        }
    });
}

/* ==========================================================================
   3. GSAP SCROLL TRIGGERS & STATISTICS COUNTER
   ========================================================================== */
function initScrollAnimations() {
    if (typeof gsap === "undefined") {
        console.warn("GSAP is not loaded. Bypassing animation initializations.");
        return;
    }

    if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }

    // A. Soft Scroll Fade-in Reveals
    const reveals = document.querySelectorAll(".reveal-up");
    reveals.forEach(el => {
        gsap.from(el, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none"
            }
        });
    });

    // B. Stats Counter Count-up using GSAP
    const counters = document.querySelectorAll(".stat-number");
    counters.forEach(stat => {
        const targetValue = parseInt(stat.getAttribute("data-target"), 10) || 0;
        const countObj = { val: 0 };

        gsap.to(countObj, {
            val: targetValue,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: stat,
                start: "top 90%",
                toggleActions: "play none none none"
            },
            onUpdate: function() {
                stat.textContent = Math.floor(countObj.val).toLocaleString();
            }
        });
    });
}

/* ==========================================================================
   4. TESTIMONIALS SLIDER
   ========================================================================== */
function initTestimonialSlider() {
    const slides = document.querySelectorAll(".testimonial-slide");
    const dots = document.querySelectorAll(".testimonial-dot");
    
    if (slides.length === 0) return;

    let currentIndex = 0;
    let slideTimer;

    function showSlide(index) {
        slides.forEach(s => s.classList.remove("active"));
        dots.forEach(d => d.classList.remove("active"));

        slides[index].classList.add("active");
        if (dots[index]) dots[index].classList.add("active");
        currentIndex = index;
    }

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            showSlide(index);
            resetTimer();
        });
    });

    function nextSlide() {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= slides.length) nextIndex = 0;
        showSlide(nextIndex);
    }

    function startTimer() {
        slideTimer = setInterval(nextSlide, 5000);
    }

    function resetTimer() {
        clearInterval(slideTimer);
        startTimer();
    }

    showSlide(0);
    startTimer();
}

/* ==========================================================================
   5. PORTFOLIO FILTERS (projects.html)
   ========================================================================== */
function initProjectFilters() {
    const tabs = document.querySelectorAll(".filter-tab");
    const cards = document.querySelectorAll(".project-card");

    if (tabs.length === 0 || cards.length === 0) return;

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            const filterValue = tab.getAttribute("data-filter");

            cards.forEach(card => {
                const category = card.getAttribute("data-category");
                if (filterValue === "all" || category === filterValue) {
                    card.style.display = "flex";
                    // Soft fade in using GSAP
                    if (typeof gsap !== "undefined") {
                        gsap.fromTo(card,
                            { opacity: 0, y: 15 },
                            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
                        );
                    }
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
}

/* ==========================================================================
   6. IMMERSIVE MEDIA LIGHTBOX SYSTEM
   ========================================================================== */
function initMediaLightbox() {
    const galleryCards = document.querySelectorAll(".gallery-card, .lightbox-trigger");
    if (galleryCards.length === 0) return;

    let lightbox = document.querySelector(".lightbox-modal");
    if (!lightbox) {
        lightbox = document.createElement("div");
        lightbox.className = "lightbox-modal";
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close"><i class="fa-solid fa-xmark"></i></span>
                <img src="" alt="Lightbox Zoomed Asset">
            </div>
        `;
        document.body.appendChild(lightbox);
    }

    const lightboxImg = lightbox.querySelector("img");
    const lightboxClose = lightbox.querySelector(".lightbox-close");

    galleryCards.forEach(card => {
        card.addEventListener("click", () => {
            let src = "";
            if (card.tagName === "IMG") {
                src = card.getAttribute("src");
            } else {
                const img = card.querySelector("img");
                if (img) src = img.getAttribute("src");
            }

            if (src) {
                lightboxImg.setAttribute("src", src);
                lightbox.classList.add("active");
                document.body.style.overflow = "hidden"; // Disable scroll
            }
        });
    });

    const closeActions = () => {
        lightbox.classList.remove("active");
        document.body.style.overflow = ""; // Re-enable scroll
    };

    lightboxClose.addEventListener("click", closeActions);
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox || e.target.classList.contains("lightbox-content")) {
            closeActions();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && lightbox.classList.contains("active")) {
            closeActions();
        }
    });
}

/* ==========================================================================
   7. FORM INTERACTION TOASTS
   ========================================================================== */
function initFormInteractions() {
    const contactForm = document.getElementById("contactForm");
    const newsletterForm = document.querySelector(".newsletter-form");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            showToast("Success", "Your query has been recorded. Our team will get back to you shortly.", "success");
            contactForm.reset();
        });
    }

    if (newsletterForm) {
        newsletterForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector("input[type='email']");
            if (input && input.value.trim() !== "") {
                showToast("Subscribed", "You have successfully subscribed to our newsletter.", "success");
                input.value = "";
            }
        });
    }
}

// Custom professional toast alert
function showToast(title, message, type = "success") {
    let container = document.querySelector(".toast-container");
    if (!container) {
        container = document.createElement("div");
        container.className = "toast-container";
        container.style.cssText = `
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 10005;
            display: flex;
            flex-direction: column;
            gap: 12px;
            max-width: 380px;
            width: 100%;
        `;
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = "toast-message";
    toast.style.cssText = `
        padding: 16px 20px;
        border-radius: 8px;
        background-color: #FFFFFF;
        border: 1px solid var(--border-color);
        border-left: 4px solid ${type === "success" ? "var(--primary-orange)" : "var(--primary-orange)"};
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        transform: translateX(120%);
        transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.4s;
        opacity: 0;
    `;

    toast.innerHTML = `
        <h4 style="font-size: 0.95rem; margin-bottom: 4px; color: var(--text-primary); font-weight: 700;">
            ${title}
        </h4>
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0;">
            ${message}
        </p>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.transform = "translateX(0)";
        toast.style.opacity = "1";
    }, 50);

    setTimeout(() => {
        toast.style.transform = "translateX(120%)";
        toast.style.opacity = "0";
        setTimeout(() => {
            toast.remove();
            if (container.children.length === 0) {
                container.remove();
            }
        }, 400);
    }, 4000);
}
