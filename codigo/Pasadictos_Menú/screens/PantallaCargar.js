/**
 * Pantalla - Cargar
 * Pantalla de cargar partida (expandible)
 */

class PantallaCargar {
    constructor(gestorPantallas, datos = {}) {
        this.gestorPantallas = gestorPantallas;
        this.contenedor = gestorPantallas.obtenerContenedor();
        this.datos = datos;
    }
    
    renderizar() {
        const pantalla = document.createElement('div');
        pantalla.className = 'pantalla-cargar';
        
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
        titulo.textContent = 'Cargar Partida';
        encabezado.appendChild(titulo);
        
        pantalla.appendChild(encabezado);
        
        const contenido = document.createElement('div');
        contenido.className = 'contenido-pantalla-cargar';
        
        const mensaje = document.createElement('p');
        mensaje.className = 'mensaje-preparacion';
        mensaje.textContent = 'Carga una de tus partidas guardadas y continúa tu aventura desde donde la dejaste.';
        contenido.appendChild(mensaje);
        
        const area = document.createElement('div');
        area.className = 'area-expansion';
        area.textContent = 'Espacio preparado para la lista de partidas guardadas';
        contenido.appendChild(area);
        
        pantalla.appendChild(contenido);
        this.contenedor.appendChild(pantalla);
    }
}