/*==========================================================
                SLIDER.JS
==========================================================*/

"use strict";

/*==========================================================
                DOM ELEMENTS
==========================================================*/

const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slider img");

const prevBtn = document.querySelector(".slider-prev");
const nextBtn = document.querySelector(".slider-next");

const dotsContainer = document.querySelector(".slider-dots");

if(slider && slides.length){

    let currentIndex = 0;

    let autoSlide;

    let startX = 0;

    let endX = 0;

    /*======================================================
                    CREATE DOTS
    ======================================================*/

    if(dotsContainer){

        slides.forEach((_,index)=>{

            const dot = document.createElement("span");

            dot.classList.add("dot");

            if(index===0){

                dot.classList.add("active");

            }

            dot.addEventListener("click",()=>{

                goToSlide(index);

            });

            dotsContainer.appendChild(dot);

        });

    }

    const dots=document.querySelectorAll(".dot");

    /*======================================================
                    UPDATE
    ======================================================*/

    function updateSlider(){

        const slideWidth=slides[0].offsetWidth+20;

        slider.style.transform=

            `translateX(-${currentIndex*slideWidth}px)`;

        dots.forEach(dot=>dot.classList.remove("active"));

        if(dots[currentIndex]){

            dots[currentIndex].classList.add("active");

        }

    }

    /*======================================================
                    NEXT
    ======================================================*/

    function nextSlide(){

        currentIndex++;

        if(currentIndex>=slides.length){

            currentIndex=0;

        }

        updateSlider();

    }

    /*======================================================
                    PREVIOUS
    ======================================================*/

    function previousSlide(){

        currentIndex--;

        if(currentIndex<0){

            currentIndex=slides.length-1;

        }

        updateSlider();

    }

    /*======================================================
                    GOTO
    ======================================================*/

    function goToSlide(index){

        currentIndex=index;

        updateSlider();

        restartAuto();

    }

    /*======================================================
                    AUTO
    ======================================================*/

    function startAuto(){

        autoSlide=setInterval(nextSlide,3000);

    }

    function stopAuto(){

        clearInterval(autoSlide);

    }

    function restartAuto(){

        stopAuto();

        startAuto();

    }

    startAuto();

    /*======================================================
                    BUTTONS
    ======================================================*/

    if(nextBtn){

        nextBtn.addEventListener("click",()=>{

            nextSlide();

            restartAuto();

        });

    }

    if(prevBtn){

        prevBtn.addEventListener("click",()=>{

            previousSlide();

            restartAuto();

        });

    }

    /*======================================================
                    HOVER
    ======================================================*/

    slider.addEventListener("mouseenter",stopAuto);

    slider.addEventListener("mouseleave",startAuto);

    /*======================================================
                    TOUCH
    ======================================================*/

    slider.addEventListener("touchstart",(e)=>{

        startX=e.touches[0].clientX;

    });

    slider.addEventListener("touchmove",(e)=>{

        endX=e.touches[0].clientX;

    });

    slider.addEventListener("touchend",()=>{

        if(startX-endX>50){

            nextSlide();

        }

        if(endX-startX>50){

            previousSlide();

        }

        restartAuto();

    });

    /*======================================================
                    KEYBOARD
    ======================================================*/

    document.addEventListener("keydown",(e)=>{

        if(e.key==="ArrowRight"){

            nextSlide();

            restartAuto();

        }

        if(e.key==="ArrowLeft"){

            previousSlide();

            restartAuto();

        }

    });

    /*======================================================
                    RESIZE
    ======================================================*/

    window.addEventListener("resize",updateSlider);

    updateSlider();

}