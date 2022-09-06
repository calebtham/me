window.addEventListener("DOMContentLoaded", () => {
    const mountain = document.getElementById("grindelwaldMountain");
    const water = document.getElementById("sunsetWater");
    const boat = document.getElementById("sunsetBoat");
    const arrow = document.getElementById("arrow");
    
    lightSwitch.addEventListener("click", parallaxScroll);
    
    window.addEventListener("scroll", parallaxScroll);

    parallaxScroll()
    
    function parallaxScroll() {
        let translate = Math.max(window.scrollY, 0);
        let brightness = 100 - 100 * translate / window.innerHeight;
       
        if (document.body.getAttribute("data-theme")) {
            water.style.transform = `translateY(${-translate*0.5}px)`;   
            boat.style.transform = `translate(${translate*0.25}px, ${-translate*0.5}px)`;
        } else {
            mountain.style.transform = `translateY(${-translate*0.5}px)`;
            mountain.style.filter = `brightness(${brightness}%)`;
        }
        
        arrow.style.opacity = (translate === 0) ? "100%" : "0%";
    }
});
