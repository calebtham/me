window.addEventListener("load", () => {
    const mountain = document.getElementById("grindelwaldMountain");
    const water = document.getElementById("sunsetWater");
    const boat = document.getElementById("sunsetBoat");
    const arrow = document.getElementById("arrow");
    
    document.addEventListener("scroll", parallaxScroll);
    lightSwitch.addEventListener("click", parallaxScroll);

    parallaxScroll()
    
    function parallaxScroll() {
        let scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        let brightness = 100 - 100 * scrollTop / window.innerHeight;
       
        if (document.body.getAttribute("data-theme")) {
            water.style.transform = `translateY(${Math.min(-Math.floor(scrollTop * 0.5), 0)}px)`;

            boat.style.transform = `translate(${Math.max(Math.floor(scrollTop * 0.25), 0)}px, ${Math.min(-Math.floor(scrollTop * 0.5), 0)}px)`;
        } else {
            mountain.style.transform = `translateY(${Math.min(-Math.floor(scrollTop * 0.5), 0)}px)`;
            mountain.style.filter = `brightness(${brightness}%)`;
        }
        
        if (scrollTop === 0) {
            arrow.style.opacity = "100%";
        } else {
            arrow.style.opacity = "0%";
        }
    }
});
