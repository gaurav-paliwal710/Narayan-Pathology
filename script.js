// ==========================
// MOBILE MENU
// ==========================

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("active");
});

// ==========================
// CLOSE MENU ON LINK CLICK
// ==========================

document.querySelectorAll("nav a").forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("active");

    });

});

// ==========================
// COUNTER ANIMATION
// ==========================

const counters = document.querySelectorAll(".counter");

const runCounter = () => {

    counters.forEach(counter => {

        const target = Number(counter.dataset.target);

        const updateCounter = () => {

            const current = Number(counter.innerText);

            const increment = target / 100;

            if (current < target) {

                counter.innerText =
                    Math.ceil(current + increment);

                setTimeout(updateCounter, 20);

            } else {

                if (target === 98) {
                    counter.innerText = target + "%";
                } else {
                    counter.innerText = target + "+";
                }

            }

        };

        updateCounter();

    });

};

let counterStarted = false;

window.addEventListener("scroll", () => {

    const statsSection =
        document.querySelector(".stats");

    const position =
        statsSection.getBoundingClientRect().top;

    const screenPosition =
        window.innerHeight;

    if (
        position < screenPosition &&
        !counterStarted
    ) {

        runCounter();
        counterStarted = true;

    }

});

// ==========================
// FAQ ACCORDION
// ==========================

const faqItems =
    document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const button =
        item.querySelector(".faq-question");

    button.addEventListener("click", () => {

        faqItems.forEach(faq => {

            if (faq !== item) {
                faq.classList.remove("active");
            }

        });

        item.classList.toggle("active");

    });

});

// ==========================
// CONTACT FORM
// ==========================

const contactForm =
    document.getElementById("contactForm");

contactForm.addEventListener(
    "submit",
    function (e) {

        e.preventDefault();

        alert(
            "Thank you for contacting Narayan Pathology & Biopsy Centre. We will contact you shortly."
        );

        contactForm.reset();

    }
);

// ==========================
// SMOOTH SCROLL
// ==========================

document.querySelectorAll('a[href^="#"]')
.forEach(anchor => {

    anchor.addEventListener(
        "click",
        function (e) {

            e.preventDefault();

            const target =
                document.querySelector(
                    this.getAttribute("href")
                );

            if (target) {

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }
    );

});

// ==========================
// GALLERY LIGHTBOX
// ==========================

const galleryImages =
    document.querySelectorAll(
        ".gallery-grid img"
    );

const lightbox =
    document.createElement("div");

lightbox.id = "lightbox";

lightbox.innerHTML =
    '<img id="lightbox-img">';

document.body.appendChild(lightbox);

galleryImages.forEach(image => {

    image.addEventListener("click", () => {

        lightbox.classList.add("active");

        document.getElementById(
            "lightbox-img"
        ).src = image.src;

    });

});

lightbox.addEventListener("click", () => {

    lightbox.classList.remove("active");

});

// ==========================
// HEADER SHADOW ON SCROLL
// ==========================

window.addEventListener("scroll", () => {

    const header =
        document.querySelector("header");

    if (window.scrollY > 50) {

        header.style.boxShadow =
            "0 5px 20px rgba(0,0,0,.15)";

    } else {

        header.style.boxShadow =
            "0 3px 20px rgba(0,0,0,.08)";

    }

});

// ==========================
// SCROLL TO TOP BUTTON
// ==========================

const topBtn =
document.createElement("button");

topBtn.innerHTML =
'<i class="fas fa-arrow-up"></i>';

topBtn.id = "topBtn";

document.body.appendChild(topBtn);

topBtn.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        topBtn.style.display = "flex";

    } else {

        topBtn.style.display = "none";

    }

});
