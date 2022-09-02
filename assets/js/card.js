$(".card a.more").click((e) => {
    let a = $(e.currentTarget)
    if (a.html().includes("down")) {
        $(e.currentTarget).html('<i class="fa fa-angle-up"></i>')
    } else {
        $(e.currentTarget).html('<i class="fa fa-angle-down"></i>')
    }
});