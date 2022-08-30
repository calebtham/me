$(document).ready(() => {

    const mountain = $("#mountain")

    $(window).scroll(() => {
        let scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        let brightness = 100 - 100 * scrollTop / window.innerHeight;

        mountain.css({
            top: -Math.floor(scrollTop * 0.5),
            filter: `brightness(${brightness}%)`
        });
    });
});