$(".card a.more").click((e) => {
    let a = $(e.currentTarget)
    if (a.html().includes("down")) {
        $(e.currentTarget).html('<i class="fa fa-angle-up"></i>')
    } else {
        $(e.currentTarget).html('<i class="fa fa-angle-down"></i>')
    }
});

$(".card .btn-carousel").click((e) => {
    let btn = $(e.currentTarget)
    let div = btn.parent().parent()
    let total = div.find(".carousel-inner").children().length
    let current = div.find(".active")
    let increment;

    if (btn.attr("data-bs-slide") === "next") {
        increment = 1;
        let next = (current.index() === total - 1) ? current.parent().children().first() : current.next()
        next.addClass("active")
    } else {
        increment = -1;
        let prev = (current.index() === 0) ? current.parent().children().last() : current.prev()
        prev.addClass("active")
    } 

    current.removeClass("active")
    div.find(".more").text(`${(current.index() + increment + total) % total + 1} / ${total}`)
});