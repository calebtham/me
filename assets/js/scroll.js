window.addEventListener("load", () => {
    const mountain = document.getElementById("grindelwaldMountain");
    const water = document.getElementById("sunsetWater");
    const boat = document.getElementById("sunsetBoat");
    
    document.addEventListener("scroll", parallaxScroll);
    lightSwitch.addEventListener("click", parallaxScroll);

    parallaxScroll()
    
    function parallaxScroll() {
        let scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        let brightness = 100 - 100 * scrollTop / window.innerHeight;
       
        if (document.body.getAttribute("data-theme")) {
            water.style.top = `${Math.min(-Math.floor(scrollTop * 0.5), 0)}px`;

            boat.style.top = `${Math.min(-Math.floor(scrollTop * 0.5), 0)}px`;
            boat.style.left = `${Math.max(Math.floor(scrollTop * 0.25), 0)}px`;
        } else {
            mountain.style.top = `${Math.min(-Math.floor(scrollTop * 0.5), 0)}px`;
            mountain.style.filter = `brightness(${brightness}%)`;
        }

        
    }
});
