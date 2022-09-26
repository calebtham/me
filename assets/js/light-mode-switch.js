/**
 * Toggle light/dark mode
 */
$(() => {
    var lightMode = !isDarkMode()

    // Initial mode
    if (lightMode) {
        switchMode(lightMode)
    } else { // force double switch so window is ready for animation
        toggleMode()
        toggleMode()
    }
    $(document.body).css("display","block")

    // Change when press button
    $("#lightSwitch").click(toggleMode);

    // Change when device changes dark mode
    $(window.matchMedia('(prefers-color-scheme: dark)')).change(() => {
        switchMode(!isDarkMode())
    })

    /**
     * Gets whether device is in dark mode
     */
    function isDarkMode() {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    }

    /**
     * Toggles the website dark/light mode
     */
    function toggleMode() {
        switchMode(!lightMode)
    }

    /**
     * Sets website dark/light mode according to parameter
     * @param {boolean} isLightMode True iff switching to light mode
     */
    function switchMode(isLightMode) {
        lightMode = isLightMode
        if (isLightMode) {
            document.body.setAttribute("data-theme", "light");
            $("#lightSwitch").children().addClass("fa-moon-o");
            $("#lightSwitch").children().removeClass("fa-sun-o");
        } else {
            document.body.removeAttribute("data-theme");
            $("#lightSwitch").children().addClass("fa-sun-o");
            $("#lightSwitch").children().removeClass("fa-moon-o");
        }
        window.dispatchEvent(new CustomEvent('scroll')); // Trigger scroll handler
    }
});

