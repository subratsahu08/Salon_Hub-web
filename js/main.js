
/*==========================================================
                MAIN.JS
                PART 1
==========================================================*/

"use strict";

/*==========================================================
                DOM ELEMENTS
==========================================================*/

const header = document.querySelector("header");
const nav = document.querySelector("nav");
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelectorAll("nav a");

const sections = document.querySelectorAll("section");

const faqItems = document.querySelectorAll(".faq-item");

const backToTop = document.querySelector(".back-to-top");

const progressBar = document.querySelector(".progress-bar");

/*==========================================================
                LOADER
==========================================================*/

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

    if (!loader) return;

    loader.classList.add("hide");

    setTimeout(() => {

        if (loader.parentNode) {

            loader.remove();

        }

    }, 500);

});

/*==========================================================
                STICKY HEADER
==========================================================*/

function stickyHeader() {

    if (!header) return;

    header.classList.toggle("sticky", window.scrollY > 80);

}

window.addEventListener("scroll", stickyHeader);

/*==========================================================
                MOBILE MENU
==========================================================*/

if (menuBtn) {

    menuBtn.addEventListener("click", () => {

        nav.classList.toggle("active");

        menuBtn.classList.toggle("active");

        document.body.classList.toggle("menu-open");

    });

}

/*==========================================================
        CLOSE MENU AFTER CLICK
==========================================================*/

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                if (nav) nav.classList.remove("active");

                if (menuBtn) menuBtn.classList.remove("active");

                document.body.classList.remove("menu-open");

            });

        });

        document.body.classList.remove("menu-open");

    });

});

/*==========================================================
            SMOOTH SCROLL
==========================================================*/

navLinks.forEach(link => {

    link.addEventListener("click", (e) => {

        const targetID = link.getAttribute("href");

        if (!targetID || !targetID.startsWith("#")) return;

        e.preventDefault();

        const target = document.querySelector(targetID);

        if (target) {

            window.scrollTo({

                top: target.offsetTop - 80,

                behavior: "smooth"

            });

        }

    }, { passive: true });


    /*==========================================================
                    FAQ ACCORDION
    ==========================================================*/

    faqItems.forEach(item => {

        const question = item.querySelector(".faq-question");

        if (!question) return;

        question.addEventListener("click", () => {

            faqItems.forEach(faq => {

                if (faq !== item) {

                    faq.classList.remove("active");

                }

            });

            item.classList.toggle("active");

        });

    });

    /*==========================================================
                ACTIVE NAV LINK
    ==========================================================*/

    function activeMenu() {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 150;

            const height = section.clientHeight;

            if (
                window.scrollY >= top &&
                window.scrollY < top + height
            ) {
                current = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener("scroll", activeMenu);

    activeMenu();

    /*==========================================================
                SCROLL PROGRESS BAR
    ==========================================================*/

    function progress() {

        if (!progressBar) return;

        const scrollTop = window.pageYOffset;

        const height = document.documentElement.scrollHeight - window.innerHeight;

        const progressValue =
            height > 0 ? (scrollTop / height) * 100 : 0;

        progressBar.style.width = progressValue + "%";

    }

    window.addEventListener("scroll", progress);

    progress();

    /*==========================================================
                    MAIN.JS
                    PART 2
    ==========================================================*/

    /*==========================================================
                    BACK TO TOP BUTTON
    ==========================================================*/

    function toggleBackToTop() {

        if (!backToTop) return;

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }

    window.addEventListener("scroll", toggleBackToTop);

    toggleBackToTop();

    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }

    /*==========================================================
                    SCROLL REVEAL
    ==========================================================*/

    const revealElements = document.querySelectorAll(

        ".fade-up,.fade-left,.fade-right,.zoom,.rotate-in"

    );

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                revealObserver.unobserve(entry.target);

            }

        });

    }, {

        threshold: 0.15

    });

    revealElements.forEach(el => {

        revealObserver.observe(el);

    });

    /*==========================================================
                    COUNTER ANIMATION
    ==========================================================*/

    const counters = document.querySelectorAll("[data-count]");

    function animateCounter(counter) {

        const target =
            parseInt(counter.dataset.count) || 0;

        const duration = 1800;

        const start = performance.now();

        function update(time) {

            const progress = Math.min((time - start) / duration, 1);

            const value = Math.floor(progress * target);

            counter.textContent = value.toLocaleString();

            if (progress < 1) {

                requestAnimationFrame(update);

            } else {

                counter.textContent = target.toLocaleString();

            }

        }

        requestAnimationFrame(update);

    }

    const counterObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                animateCounter(entry.target);

                counterObserver.unobserve(entry.target);

            }

        });

    }, {

        threshold: 0.5

    });

    counters.forEach(counter => {

        counterObserver.observe(counter);

    });

    /*==========================================================
                    HERO PARALLAX
    ==========================================================*/

    const heroGlow = document.querySelector(".hero-right");

    if (heroGlow) {

        document.addEventListener("mousemove", e => {

            const x = (e.clientX / window.innerWidth - 0.5) * 12;
            const y = (e.clientY / window.innerHeight - 0.5) * 12;

            heroGlow.style.transform =
                `translate(${x}px, ${y}px)`;

        }, { passive: true });

    }

    /*==========================================================
                    HERO FLOAT
    ==========================================================*/

    const heroImage = document.querySelector(".hero-right img");

    if (heroImage) {

        let t = 0;

        function animate() {

            t += 0.02;

            heroImage.style.transform =
                `translateY(${Math.sin(t) * 8}px)`;

            requestAnimationFrame(animate);

        }

        animate();

    }

    /*==========================================================
                    BUTTON RIPPLE
    ==========================================================*/

    document.querySelectorAll(".btn-primary,.btn-secondary").forEach(btn => {

        btn.addEventListener("click", e => {

            const ripple = document.createElement("span");

            ripple.className = "ripple";

            const rect = btn.getBoundingClientRect();

            const size = Math.max(rect.width, rect.height);

            ripple.style.width = ripple.style.height = `${size}px`;

            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;

            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

            btn.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);

        });

    });
    /*==========================================================
                    HEADER SHADOW
    ==========================================================*/
    function updateHeader() {

        if (!header) return;

        header.classList.toggle(
            "scrolled",
            window.scrollY > 30
        );

    }

    window.addEventListener("scroll", updateHeader);

    updateHeader();

    /*==========================================================
                    PAGE READY
    ==========================================================*/

    document.addEventListener("DOMContentLoaded", () => {

        document.body.classList.add("loaded");

    });
})