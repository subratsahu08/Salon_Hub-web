/*==========================================================
                MOUSE GLOW
==========================================================*/

const glow = document.createElement("div");
glow.className = "mouse-glow";
document.body.appendChild(glow);

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
}, { passive: true });

function animateGlow() {
    glow.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    requestAnimationFrame(animateGlow);
}

animateGlow();
/*==========================================================
                PARALLAX
==========================================================*/

const parallaxItems = document.querySelectorAll("[data-speed]");

if (parallaxItems.length) {

    window.addEventListener("scroll", () => {

        const scroll = window.scrollY;

        parallaxItems.forEach(item => {

            const speed = parseFloat(item.dataset.speed) || 0;

            item.style.transform =
                `translateY(${scroll * speed}px)`;

        });

    }, { passive: true });

}
/*==========================================================
                CARD TILT
==========================================================*/

document.querySelectorAll(".card").forEach(card => {

    card.addEventListener("mousemove", e => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 12;
        const rotateX = ((y / rect.height) - 0.5) * -12;

        card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-6px)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});
/*==========================================================
                MAGNET BUTTON
==========================================================*/

document.querySelectorAll(".btn-primary,.btn-secondary").forEach(btn => {

    btn.addEventListener("mousemove", e => {

        const rect = btn.getBoundingClientRect();

        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform =
            `translate(${x / 12}px, ${y / 12}px)`;

    });

    btn.addEventListener("mouseleave", () => {

        btn.style.transform = "";

    });

});
/*==========================================================
                HERO FLOAT
==========================================================*/

const heroImage = document.querySelector(".hero-right img");

if (heroImage) {

    let t = 0;

    function floatHero() {

        t += 0.02;

        heroImage.style.transform =
            `translateY(${Math.sin(t) * 8}px)`;

        requestAnimationFrame(floatHero);

    }

    floatHero();

}
/*==========================================================
                SECTION REVEAL
==========================================================*/

const sections = document.querySelectorAll("section");

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.15
    });

    sections.forEach(section => observer.observe(section));

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