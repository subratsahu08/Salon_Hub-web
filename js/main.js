
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
const loader = document.querySelector(".loader");

const sections = document.querySelectorAll("section");

const faqItems = document.querySelectorAll(".faq-item");

const backToTop = document.querySelector(".back-to-top");

const progressBar = document.querySelector(".progress-bar");

/*==========================================================
                LOADER
==========================================================*/

window.addEventListener("load", () => {

    if(loader){

        loader.classList.add("hide");

        setTimeout(() => {

            loader.remove();

        },700);

    }

});

/*==========================================================
                STICKY HEADER
==========================================================*/

function stickyHeader(){

    if(window.scrollY > 80){

        header.classList.add("sticky");

    }else{

        header.classList.remove("sticky");

    }

}

stickyHeader();

window.addEventListener("scroll", stickyHeader);

/*==========================================================
                MOBILE MENU
==========================================================*/

if(menuBtn){

    menuBtn.addEventListener("click", ()=>{

        nav.classList.toggle("active");

        menuBtn.classList.toggle("active");

        document.body.classList.toggle("menu-open");

    });

}

/*==========================================================
        CLOSE MENU AFTER CLICK
==========================================================*/

navLinks.forEach(link=>{

    link.addEventListener("click",()=>{

        nav.classList.remove("active");

        menuBtn.classList.remove("active");

        document.body.classList.remove("menu-open");

    });

});

/*==========================================================
            SMOOTH SCROLL
==========================================================*/

navLinks.forEach(link=>{

    link.addEventListener("click",(e)=>{

        const targetID=link.getAttribute("href");

        if(targetID.startsWith("#")){

            e.preventDefault();

            const target=document.querySelector(targetID);

            if(target){

                window.scrollTo({

                    top:target.offsetTop-80,

                    behavior:"smooth"

                });

            }

        }

    });

});

/*==========================================================
            FAQ ACCORDION
==========================================================*/

faqItems.forEach(item=>{

    const btn=item.querySelector("button");

    if(btn){

        btn.addEventListener("click",()=>{

            faqItems.forEach(f=>{

                if(f!==item){

                    f.classList.remove("active");

                }

            });

            item.classList.toggle("active");

        });

    }

});

/*==========================================================
            ACTIVE NAV LINK
==========================================================*/

function activeMenu(){

    let current="";

    sections.forEach(section=>{

        const top=section.offsetTop-150;

        const height=section.clientHeight;

        if(window.scrollY>=top){

            current=section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#"+current){

            link.classList.add("active");

        }

    });

}

window.addEventListener("scroll",activeMenu);

activeMenu();

/*==========================================================
            SCROLL PROGRESS BAR
==========================================================*/

function progress(){

    if(!progressBar) return;

    const scrollTop=window.pageYOffset;

    const height=document.documentElement.scrollHeight-window.innerHeight;

    const progressValue=(scrollTop/height)*100;

    progressBar.style.width=progressValue+"%";

}

window.addEventListener("scroll",progress);

progress();

/*==========================================================
                MAIN.JS
                PART 2
==========================================================*/

/*==========================================================
                BACK TO TOP BUTTON
==========================================================*/

function toggleBackToTop(){

    if(!backToTop) return;

    if(window.scrollY > 500){

        backToTop.classList.add("show");

    }else{

        backToTop.classList.remove("show");

    }

}

window.addEventListener("scroll", toggleBackToTop);

toggleBackToTop();

if(backToTop){

    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}

/*==========================================================
                SCROLL REVEAL
==========================================================*/

const revealElements=document.querySelectorAll(

    ".fade-up,.fade-left,.fade-right,.zoom,.rotate-in"

);

const revealObserver=new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

            revealObserver.unobserve(entry.target);

        }

    });

},{

    threshold:0.15

});

revealElements.forEach(el=>{

    revealObserver.observe(el);

});

/*==========================================================
                COUNTER ANIMATION
==========================================================*/

const counters=document.querySelectorAll("[data-count]");

function animateCounter(counter){

    const target=Number(counter.dataset.count);

    const duration=1800;

    const start=performance.now();

    function update(time){

        const progress=Math.min((time-start)/duration,1);

        const value=Math.floor(progress*target);

        counter.textContent=value.toLocaleString();

        if(progress<1){

            requestAnimationFrame(update);

        }else{

            counter.textContent=target.toLocaleString();

        }

    }

    requestAnimationFrame(update);

}

const counterObserver=new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            animateCounter(entry.target);

            counterObserver.unobserve(entry.target);

        }

    });

},{

    threshold:0.5

});

counters.forEach(counter=>{

    counterObserver.observe(counter);

});

/*==========================================================
                PARALLAX EFFECT
==========================================================*/

const heroGlow=document.querySelector(".hero-right");

window.addEventListener("mousemove",(e)=>{

    if(!heroGlow) return;

    const x=(e.clientX/window.innerWidth-.5)*20;

    const y=(e.clientY/window.innerHeight-.5)*20;

    heroGlow.style.transform=

        `translate(${x}px, ${y}px)`;

});

/*==========================================================
                HERO FLOATING IMAGE
==========================================================*/

const heroImage=document.querySelector(".hero-right img");

if(heroImage){

    let angle=0;

    function floatingImage(){

        angle+=0.02;

        heroImage.style.transform=

            `translateY(${Math.sin(angle)*10}px)`;

        requestAnimationFrame(floatingImage);

    }

    floatingImage();

}

/*==========================================================
                DOWNLOAD BUTTON RIPPLE
==========================================================*/

document.querySelectorAll(".btn-primary").forEach(btn=>{

    btn.addEventListener("click",(e)=>{

        const circle=document.createElement("span");

        const size=Math.max(

            btn.clientWidth,

            btn.clientHeight

        );

        const rect=btn.getBoundingClientRect();

        circle.style.width=size+"px";

        circle.style.height=size+"px";

        circle.style.left=

            e.clientX-rect.left-size/2+"px";

        circle.style.top=

            e.clientY-rect.top-size/2+"px";

        circle.className="ripple";

        btn.appendChild(circle);

        setTimeout(()=>{

            circle.remove();

        },600);

    });

});

/*==========================================================
                HEADER SHADOW
==========================================================*/

function updateHeader(){

    if(window.scrollY>30){

        header.classList.add("scrolled");

    }else{

        header.classList.remove("scrolled");

    }

}

window.addEventListener("scroll",updateHeader);

updateHeader();

/*==========================================================
                PAGE READY
==========================================================*/

document.addEventListener("DOMContentLoaded",()=>{

    document.body.classList.add("loaded");

});