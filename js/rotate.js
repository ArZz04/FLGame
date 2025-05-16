function detectOrientation() {
    const warning = document.getElementById('rotate-warning');
    if (window.innerHeight > window.innerWidth) {
        warning.classList.add('active');
        game.scene.pause(); // Pausa todas las escenas o la que quieras
    } else {
        warning.classList.remove('active');
        game.scene.resume(); // Reanuda las escenas
    }
}


window.addEventListener("resize", detectOrientation);
window.addEventListener("orientationchange", detectOrientation);
window.addEventListener("load", detectOrientation);
