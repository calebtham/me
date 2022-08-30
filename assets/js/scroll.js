window.addEventListener("load", () => {
    const mountain = document.getElementById("mountain");
    
    document.addEventListener("scroll", parallaxScroll);

    parallaxScroll()
    
    function parallaxScroll() {
        let scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        let brightness = 100 - 100 * scrollTop / window.innerHeight;
        mountain.style.top = `${Math.min(-Math.floor(scrollTop * 0.5), 0)}px`;
        mountain.style.filter = `brightness(${brightness}%)`;
    }
});
