
/**
 * Inicializador de la aplicación
 * Punto de entrada que carga la pantalla inicial
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Aplicación iniciada');

    // 1. Cargar y aplicar el brillo guardado antes de mostrar cualquier pantalla
    const brilloGuardado = localStorage.getItem('opciones_brillo') || 90;
    const factorBrillo = 0.35 + (parseInt(brilloGuardado) / 100) * 0.95;
    document.body.style.filter = `brightness(${factorBrillo})`;
    
    const contenedorAplicacion = document.getElementById('aplicacion');
    const gestorPantallas = new GestorPantallas(contenedorAplicacion);
    
    gestorPantallas.cambiarPantalla('MenuPrincipal');
});

document.addEventListener('click', (evento) => {
    const boton = evento.target.closest('button');
    if (boton) {
        const sonidoClick = new Audio('src/assets/click.mp3');
        sonidoClick.volume = 0.6;
        sonidoClick.play().catch(() => {});
    }
});

// MÚSICA GLOBAL PARA TODO EL JUEGO (musica2.mp3)
const musicaGlobal = new Audio('src/assets/musica2.mp3');
musicaGlobal.loop = true;
musicaGlobal.volume = 0.3; // Volumen suave de fondo

// Arranca sola al hacer el primer clic en el juego
document.addEventListener('click', () => {
    if (musicaGlobal.paused) {
        musicaGlobal.play().catch(() => {});
    }
}, { once: true });