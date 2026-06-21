/* ==========================================
   CENTRAL JAVASCRIPT - LOGIC MANAGEMENT
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
    initHeroSlider();
    initMobileNavigation();
    initNavigationHighlighter();
    initContactFormHandler();
    initCareerTabToggler();
});

// 1. Crash-Proof Hero Slider System Configuration
function initHeroSlider() {
    const sliderImg = ["page1_img1.webp", "page1_img2.webp", "page2_img1.webp"];
    const slider = document.querySelector(".brochure-img-container img");
    
    if (slider) {
        let index = 0;
        setInterval(() => {
            index++;
            if (index >= sliderImg.length) {
                index = 0;
            }
            slider.src = `images/${sliderImg[index]}`;
        }, 3000);
    }
}

// 2. Fixed Mobile Responsive Navigation & Dropdown Accordion Toggler
function initMobileNavigation() {
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const dropdownParents = document.querySelectorAll(".nav-item-dropdown");

    // Toggle Mobile Navigation Drawer Box Open/Close
    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            menuToggle.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
    }

    // Capture standard touch operations for sub-navigation items on mobile interfaces
    dropdownParents.forEach(parent => {
        const trigger = parent.querySelector(".nav-link");
        
        if (trigger) {
            trigger.addEventListener("click", (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation(); // Shield child operations bubble loops
                    
                    const isActive = parent.classList.contains("active-mobile");
                    
                    // Collapse any other conflicting drawer tabs open state
                    dropdownParents.forEach(p => p.classList.remove("active-mobile"));
                    
                    if (!isActive) {
                        parent.classList.add("active-mobile");
                    }
                }
            });
        }
    });

    // Close mobile layout when user triggers screen viewport boundary touch actions
    document.addEventListener("click", (e) => {
        if (window.innerWidth <= 768 && navMenu && navMenu.classList.contains("active")) {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove("active");
                navMenu.classList.remove("active");
                dropdownParents.forEach(p => p.classList.remove("active-mobile"));
            }
        }
    });
}

// 3. Current active execution path link highlighter system 
function initNavigationHighlighter() {
    let currentPath = window.location.pathname.split("/").pop();
    if (currentPath === "" || currentPath === "/") {
        currentPath = "index.html";
    }
    
    const navLinks = document.querySelectorAll(".nav-link");
    
    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPath) {
            link.classList.add("active");
            
            // Highlight parent if child link is inside an active dropdown menu
            const closestDropdown = link.closest(".nav-item-dropdown");
            if (closestDropdown) {
                const parentTrigger = closestDropdown.querySelector(".nav-link");
                if (parentTrigger) {
                    parentTrigger.classList.add("active");
                }
            }
        }
    });
}

// 4. Basic dynamic UI management for switching between positions on Career tab
function initCareerTabToggler() {
    const tabButtons = document.querySelectorAll(".tab-btn");
    const dynamicHeading = document.getElementById("career-dynamic-heading");

    if (tabButtons.length > 0 && dynamicHeading) {
        tabButtons.forEach(btn => {
            btn.addEventListener("click", (e) => {
                tabButtons.forEach(b => b.classList.remove("active-tab"));
                e.target.classList.add("active-tab");
                
                if (e.target.dataset.tab === "future") {
                    dynamicHeading.textContent = "Future System Openings";
                } else {
                    dynamicHeading.textContent = "Current Active Openings";
                }
            });
        });
    }
}

// 5. Contact Form Handler Submission Interceptor
function initContactFormHandler() {
    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Thank you! Your information has been registered smoothly.");
            form.reset();
        });
    }
}