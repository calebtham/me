/**
 * Event handlers for card class
 */
$(() => {
    /**
     * Change icon on collapse
     */
    $(".card a.more").click((e) => {
        let a = $(e.currentTarget)
        if (a.html().includes("down")) {
            $(e.currentTarget).html('<i class="fa fa-angle-up"></i>')
        } else {
            $(e.currentTarget).html('<i class="fa fa-angle-down"></i>')
        }
    });

    /**
     * Change page number on carousels
     */
    $(".card .btn-carousel").click((e) => {
        let btn = $(e.currentTarget)
        let div = btn.parent().parent()
        let total = div.find(".carousel-inner").children().length
        let current = div.find(".active")
        let increment;

        // Next clicked
        if (btn.attr("data-bs-slide") === "next") {
            increment = 1;
            let next = (current.index() === total - 1) ? current.parent().children().first() : current.next()
            next.addClass("active")

        // Prev clicked
        } else {
            increment = -1;
            let prev = (current.index() === 0) ? current.parent().children().last() : current.prev()
            prev.addClass("active")
        } 

        current.removeClass("active")
        div.find(".more").text(`${(current.index() + increment + total) % total + 1} / ${total}`)
    });
});