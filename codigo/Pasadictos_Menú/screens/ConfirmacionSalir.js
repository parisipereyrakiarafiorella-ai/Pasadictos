/**
 * Modal de Confirmación de Salida
 * Solicita confirmación antes de cerrar la aplicación
 * Previene salidas accidentales del juego
 */

class ConfirmacionSalir {
    constructor(gestorPantallas, datos = {}) {
        this.gestorPantallas = gestorPantallas;
        this.contenedor = gestorPantallas.obtenerContenedor();
        this.datos = datos;
    }
    
    renderizar() {
        const pantalla = document.createElement('div');
        pantalla.className = 'pantalla-confirmacion-salir';
        
        const overlay = document.createElement('div');
        overlay.className = 'overlay-modal';
        
        const modal = document.createElement('div');
        modal.className = 'modal-confirmacion';
        
        const titulo = document.createElement('h2');
        titulo.textContent = '¿Seguro que deseas salir?';
        titulo.className = 'titulo-modal';
        
        const mensaje = document.createElement('p');
        mensaje.textContent = 'Si sales ahora sin guardar, perderás todo el progreso no guardado.';
        mensaje.className = 'mensaje-modal';
        
        const contenedorBotones = document.createElement('div');
        contenedorBotones.className = 'contenedor-botones-confirmacion';
        
        const botonSi = document.createElement('button');
        botonSi.textContent = 'Sí, salir';
        botonSi.className = 'boton-confirmacion boton-si';
        botonSi.addEventListener('click', () => {
            this.cerrarAplicacion();
        });
        
        const botonNo = document.createElement('button');
        botonNo.textContent = 'No, volver';
        botonNo.className = 'boton-confirmacion boton-no';
        botonNo.addEventListener('click', () => {
            this.gestorPantallas.volverPantalla();
        });
        
        contenedorBotones.appendChild(botonSi);
        contenedorBotones.appendChild(botonNo);
        
        modal.appendChild(titulo);
        modal.appendChild(mensaje);
        modal.appendChild(contenedorBotones);
        
        overlay.appendChild(modal);
        pantalla.appendChild(overlay);
        
        this.contenedor.appendChild(pantalla);
    }
    
    cerrarAplicacion() {
        console.log('Cerrando aplicación...');
        alert('Gracias por jugar. ¡Hasta pronto!');
    }
}