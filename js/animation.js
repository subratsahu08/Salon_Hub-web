/*==========================================================
                ANIMATION.JS
==========================================================*/

"use strict";

/*==========================================================
                MOUSE GLOW
==========================================================*/

const glow = document.createElement("div");
glow.className = "mouse-glow";
document.body.appendChild(glow);

document.addEventListener("mousemove", (e) => {

    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";

});

/*==========================================================
                PARALLAX
==========================================================*/

const parallaxItems = document.querySelectorAll("[data-speed]");

window.addEventListener("scroll", () => {

    const scroll = window.pageYOffset;

    parallaxItems.forEach(item => {

        const speed = item.dataset.speed;

        item.style.transform =
            `translateY(${scroll * speed}px)`;

    });

});

/*==========================================================
                FLOATING PARTICLES
==========================================================*/

const particleContainer = document.createElement("div");
particleContainer.className = "particles";

document.body.appendChild(particleContainer);

for(let i=0;i<25;i++){

    const particle = document.createElement("span");

    particle.className="particle";

    particle.style.left=Math.random()*100+"%";

    particle.style.animationDuration=
        (8+Math.random()*8)+"s";

    particle.style.animationDelay=
        Math.random()*5+"s";

    particle.style.opacity=
        Math.random();

    particleContainer.appendChild(particle);

}

/*==========================================================
                CARD TILT
==========================================================*/

document.querySelectorAll(".card").forEach(card=>{

    card.addEventListener("mousemove",(e)=>{

        const rect=card.getBoundingClientRect();

        const x=e.clientX-rect.left;

        const y=e.clientY-rect.top;

        const rotateY=((x/rect.width)-0.5)*18;

        const rotateX=((y/rect.height)-0.5)*-18;

        card.style.transform=

            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform=

            "perspective(1000px) rotateX(0) rotateY(0)";

    });

});

/*==========================================================
                MAGNET BUTTON
==========================================================*/

document.querySelectorAll(".btn-primary,.btn-secondary").forEach(btn=>{

    btn.addEventListener("mousemove",(e)=>{

        const rect=btn.getBoundingClientRect();

        const x=e.clientX-rect.left;

        const y=e.clientY-rect.top;

        btn.style.transform=

            `translate(
            ${(x-rect.width/2)/8}px,
            ${(y-rect.height/2)/8}px
            )`;

    });

    btn.addEventListener("mouseleave",()=>{

        btn.style.transform="translate(0,0)";

    });

});

/*==========================================================
                HERO IMAGE ROTATION
==========================================================*/

const heroImage=document.querySelector(".hero-right img");

if(heroImage){

    let angle=0;

    function animateHero(){

        angle+=0.01;

        heroImage.style.transform=

            `translateY(${Math.sin(angle)*10}px)
             rotate(${Math.sin(angle)*2}deg)`;

        requestAnimationFrame(animateHero);

    }

    animateHero();

}

/*==========================================================
                SECTION REVEAL
==========================================================*/

const sections=document.querySelectorAll("section");

const observer=new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("visible");

        }

    });

},{

    threshold:.2

});

sections.forEach(section=>{

    observer.observe(section);

});

/*==========================================================
                TEXT TYPING
==========================================================*/

const typing=document.querySelector(".typing");

if(typing){

    const text=typing.dataset.text;

    typing.innerHTML="";

    let index=0;

    function type(){

        if(index<text.length){

            typing.innerHTML+=text.charAt(index);

            index++;

            setTimeout(type,60);

        }

    }

    type();

}

/*==========================================================
                BUTTON RIPPLE
==========================================================*/

document.querySelectorAll("button,a.btn-primary").forEach(btn=>{

    btn.addEventListener("click",(e)=>{

        const ripple=document.createElement("span");

        ripple.className="ripple";

        const rect=btn.getBoundingClientRect();

        const size=Math.max(rect.width,rect.height);

        ripple.style.width=size+"px";
        ripple.style.height=size+"px";

        ripple.style.left=
            (e.clientX-rect.left-size/2)+"px";

        ripple.style.top=
            (e.clientY-rect.top-size/2)+"px";

        btn.appendChild(ripple);

        setTimeout(()=>{

            ripple.remove();

        },600);

    });

});

/*==========================================================
                FPS OPTIMIZATION
==========================================================*/

let ticking=false;

window.addEventListener("scroll",()=>{

    if(!ticking){

        window.requestAnimationFrame(()=>{

            ticking=false;

        });

        ticking=true;

    }

});

/*==========================================================
                PAGE LOADED
==========================================================*/

window.addEventListener("load",()=>{

    document.body.classList.add("page-loaded");

});

console.log(
"%cSalonHub Premium Website Loaded",
"color:#D4AF37;font-size:18px;font-weight:bold;"
);