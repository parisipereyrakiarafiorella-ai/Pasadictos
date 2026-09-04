/**
 * Inicializador de la aplicación
 * Punto de entrada que carga la pantalla inicial
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Aplicación iniciada');
    
    const contenedorAplicacion = document.getElementById('aplicacion');
    const gestorPantallas = new GestorPantallas(contenedorAplicacion);
    
    gestorPantallas.cambiarPantalla('MenuPrincipal');
});