/**
 * Pantalla - Usuario
 * Pantalla de perfil de usuario (expandible)
 */

class PantallaUsuario {
    constructor(gestorPantallas, datos = {}) {
        this.gestorPantallas = gestorPantallas;
        this.contenedor = gestorPantallas.obtenerContenedor();
        this.datos = datos;
    }
    
    renderizar() {
        const pantalla = document.createElement('div');
        pantalla.className = 'pantalla-usuario';
        
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
        titulo.textContent = 'Mi Perfil';
        encabezado.appendChild(titulo);
        
        pantalla.appendChild(encabezado);
        
        const contenido = document.createElement('div');
        contenido.className = 'contenido-pantalla-usuario';
        
        const mensaje = document.createElement('p');
        mensaje.className = 'mensaje-preparacion';
        mensaje.textContent = 'Visualiza tu información de jugador, logros y estadísticas. El sistema de usuario está preparado para futuras expansiones.';
        contenido.appendChild(mensaje);
        
        const area = document.createElement('div');
        area.className = 'area-expansion';
        area.textContent = 'Espacio preparado para los datos del usuario';
        contenido.appendChild(area);
        
        pantalla.appendChild(contenido);
        this.contenedor.appendChild(pantalla);
    }
}