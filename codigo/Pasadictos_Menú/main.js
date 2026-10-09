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
