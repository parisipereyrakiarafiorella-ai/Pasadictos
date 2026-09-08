/**
 * Pantalla - Juego
 * Pantalla de inicio de partida (preparada para expansión)
 */

class PantallaJuego {
    constructor(gestorPantallas, datos = {}) {
        this.gestorPantallas = gestorPantallas;
        this.contenedor = gestorPantallas.obtenerContenedor();
        this.datos = datos;
    }
    
    renderizar() {
        const pantalla = document.createElement('div');
        pantalla.className = 'pantalla-juego';
        
        const encabezado = document.createElement('div');
        encabezado.className = 'encabezado-pantalla';
        
        const botonVolver = document.createElement('button');
        botonVolver.className = 'boton-volver';
        botonVolver.textContent = 'Volver al Menú';
        botonVolver.addEventListener('click', () => {
            this.gestorPantallas.volverPantalla();
        });
        encabezado.appendChild(botonVolver);
        
        const titulo = document.createElement('h1');
        titulo.className = 'titulo-pantalla';
        titulo.textContent = 'Iniciar Juego';
        encabezado.appendChild(titulo);
        
        pantalla.appendChild(encabezado);
        
        const contenido = document.createElement('div');
        contenido.className = 'contenido-pantalla-juego';
        
        const mensaje = document.createElement('p');
        mensaje.className = 'mensaje-preparacion';
        mensaje.textContent = 'Aquí comienza tu aventura. El sistema de juego está listo para ser expandido con nuevas mecánicas, historias y desafíos.';
        contenido.appendChild(mensaje);
        
        const area = document.createElement('div');
        area.className = 'area-expansion';
        area.textContent = 'Espacio preparado para la pantalla de juego principal';
        contenido.appendChild(area);
        
        pantalla.appendChild(contenido);
        this.contenedor.appendChild(pantalla);
    }
}