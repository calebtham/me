/**
 * Parallax scroll effect
 */
 gsap.to("#grindelwaldMountain", {
    yPercent: -50,
    ease: "none",
    scrollTrigger: {
      trigger: "#grindelwaldMountain",
      start: "top", // the default values
      end: "bottom", // the default values
      scrub: true
    }, 
});

gsap.to("#sunsetWater", {
    yPercent: -50,
    ease: "none",
    scrollTrigger: {
      trigger: "#sunsetWater",
      start: "top", // the default values
      end: "bottom", // the default values
      scrub: true
    }, 
});

gsap.to("#sunsetBoat", {
    yPercent: -50,
    xPercent: 25,
    ease: "none",
    scrollTrigger: {
      trigger: "#sunsetBoat",
      start: "top", // the default values
      end: "bottom", // the default values
      scrub: true
    }, 
});

/**
 * Change CSS on scroll
 */
window.addEventListener("DOMContentLoaded", () => {
    const mountain = document.getElementById("grindelwaldMountain");
    const arrow = document.getElementById("arrow");
    
    window.addEventListener("scroll", () => {
        let translate = Math.max(window.scrollY, 0);
        let brightness = 100 - 100 * translate / window.innerHeight;
       
        if (document.body.getAttribute("data-theme")) { // light mode
            arrow.style.color = (translate === 0) ? "black" : "#00000000";
            
        } else { // dark mode
            mountain.style.filter = `brightness(${brightness}%)`;
            arrow.style.color = (translate === 0) ? "white" : "#FFFFFF00";
        }
    }); 
});