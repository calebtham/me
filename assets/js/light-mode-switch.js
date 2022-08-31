var lightMode = false

var lightSwitch = document.getElementById("lightSwitch");
lightSwitch.addEventListener("click", () => {
    lightMode = !lightMode
    if (lightMode) {
        document.body.setAttribute("data-theme", "light");
    } else {
        document.body.removeAttribute("data-theme");
    }
});