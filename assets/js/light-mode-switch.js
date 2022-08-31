var lightMode = false

var lightSwitch = document.getElementById("lightSwitch");
lightSwitch.addEventListener("click", () => {
    lightMode = !lightMode
    if (lightMode) {
        document.body.setAttribute("data-theme", "light");
        $("#lightSwitch").children().addClass("fa-moon-o");
        $("#lightSwitch").children().removeClass("fa-sun-o");
    } else {
        document.body.removeAttribute("data-theme");
        $("#lightSwitch").children().addClass("fa-sun-o");
        $("#lightSwitch").children().removeClass("fa-moon-o");
    }
});