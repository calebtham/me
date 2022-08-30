$(() => {

    const mountain = $("#mountain")

    $(window).scroll(() => {
        let scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        let brightness = 100 - 100 * scrollTop / window.innerHeight;

        mountain.css({
            top: Math.min(-Math.floor(scrollTop * 0.5), 0),
            filter: `brightness(${brightness}%)`
        });
    });

});