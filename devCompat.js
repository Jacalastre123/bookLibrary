

function uplay() {
if (window.matchMedia("(max-width: 700px)").matches) {
    customCheck.style.display = "none"
    bookCheck.style.display = "none"
    settingCheck.style.display = "none"
    document.querySelector("#Mobile").style.display = "block"
}
else {
    bookCheck.style.display = "inline-block"
    customCheck.style.display = "inline-block"
    settingCheck.style.display = "inline-block"
    document.querySelector("#Mobile").style.display = "none"
}
}
window.addEventListener("resize", uplay)
uplay()