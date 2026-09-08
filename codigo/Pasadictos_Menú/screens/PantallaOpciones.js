/**
 * Pantalla - Opciones
 * Pantalla de opciones (preparada para expansión)
 */

class PantallaOpciones {
    constructor(gestorPantallas, datos = {}) {
        this.gestorPantallas = gestorPantallas;
        this.contenedor = gestorPantallas.obtenerContenedor();
        this.datos = datos;
    }
    
    renderizar() {
        const pantalla = document.createElement('div');
        pantalla.className = 'pantalla-opciones';
        
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
        titulo.textContent = 'Opciones';
        encabezado.appendChild(titulo);
        
        pantalla.appendChild(encabezado);
        
        const contenido = document.createElement('div');
        contenido.className = 'contenido-pantalla-opciones';
        
        const mensaje = document.createElement('p');
        mensaje.className = 'mensaje-preparacion';
        mensaje.textContent = 'Personaliza tu experiencia de juego. Aquí podrás ajustar volumen, gráficos, controles y otras configuraciones.';
        contenido.appendChild(mensaje);
        
        const area = document.createElement('div');
        area.className = 'area-expansion';
        area.textContent = 'Espacio preparado para las opciones del juego';
        contenido.appendChild(area);
        
        pantalla.appendChild(contenido);
        this.contenedor.appendChild(pantalla);
    }
}