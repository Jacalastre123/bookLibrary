

function uplay() {
if (window.matchMedia("(max-width: 750px)").matches) {
    customCheck.style.display = "none"
    bookCheck.style.display = "none"
    settingCheck.style.display = "none"
    document.querySelectorAll(".searching")[0].display = "block"
    searchCheck.style.display = "none"
    mobileForm.style.display = "block"
    searchdiv.style.display = "none"
    searching[0].value = ""
    searching[0].dispatchEvent(new Event("input"))
    document.querySelector("#Mobile").style.display = "block"
}
else {
    bookCheck.style.display = "inline-block"
    customCheck.style.display = "inline-block"
    settingCheck.style.display = "inline-block"
    document.querySelectorAll(".searching")[0].display = "none"
    searchCheck.style.display = "inline-block"
    mobileForm.style.display = "none"
    searching[1].value = ""
    searching[1].dispatchEvent(new Event("input"))
    document.querySelector("#Mobile").style.display = "none"
}
}
window.addEventListener("resize", uplay)
uplay()