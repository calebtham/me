/**
 * Parallax scroll effect
 */
window.addEventListener("DOMContentLoaded", () => {
    const mountain = document.getElementById("grindelwaldMountain");
    const water = document.getElementById("sunsetWater");
    const boat = document.getElementById("sunsetBoat");
    const arrow = document.getElementById("arrow");
    
    if (window.innerWidth > 991) { // Desktop
        window.addEventListener("scroll", parallaxScroll);
        parallaxScroll();
    } else { // Mobile
        window.addEventListener("scroll", mobileScroll);
    }
    
    /**
     * Change position of elements when scrolling and show/hide arrow
     */
    function parallaxScroll() {
        let translate = Math.max(window.scrollY, 0);
        let brightness = 100 - 100 * translate / window.innerHeight;
       
        if (document.body.getAttribute("data-theme")) { // light mode
            water.style.transform = `translateY(${-translate*0.5}px)`;   
            boat.style.transform = `translate(${translate*0.25}px, ${-translate*0.5}px)`;
            arrow.style.color = (translate === 0) ? "black" : "#00000000";
            
        } else { // dark mode
            mountain.style.transform = `translateY(${-translate*0.5}px)`;
            mountain.style.filter = `brightness(${brightness}%)`;
            arrow.style.color = (translate === 0) ? "white" : "#FFFFFF00";
        }
    }

    /**
     * Show/hide arrow
     */
    function mobileScroll() {
        let translate = Math.max(window.scrollY, 0);
        if (document.body.getAttribute("data-theme")) { // light mode
            arrow.style.color = (translate === 0) ? "black" : "#00000000";
        } else { // dark mode
            arrow.style.color = (translate === 0) ? "white" : "#FFFFFF00";
        }
    }
});
