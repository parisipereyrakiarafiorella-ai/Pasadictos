/**
 * Pantalla - Tienda
 * Pantalla de tienda (preparada para expansión)
 */

class PantallaTienda {
    constructor(gestorPantallas, datos = {}) {
        this.gestorPantallas = gestorPantallas;
        this.contenedor = gestorPantallas.obtenerContenedor();
        this.datos = datos;
    }
    
    renderizar() {
        const pantalla = document.createElement('div');
        pantalla.className = 'pantalla-tienda';
        
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
        titulo.textContent = 'Tienda';
        encabezado.appendChild(titulo);
        
        pantalla.appendChild(encabezado);
        
        const contenido = document.createElement('div');
        contenido.className = 'contenido-pantalla-tienda';
        
        const infoMonedas = document.createElement('div');
        infoMonedas.className = 'info-monedas';
        infoMonedas.innerHTML = '<strong>Monedas disponibles:</strong> 1,500 💰';
        contenido.appendChild(infoMonedas);
        
        const mensaje = document.createElement('p');
        mensaje.className = 'mensaje-preparacion';
        mensaje.textContent = 'Compra objetos, mejoras y elementos especiales para tu aventura. La tienda se expandirá con nuevos productos y categorías.';
        contenido.appendChild(mensaje);
        
        const area = document.createElement('div');
        area.className = 'area-expansion';
        area.textContent = 'Espacio preparado para los productos de la tienda';
        contenido.appendChild(area);
        
        pantalla.appendChild(contenido);
        this.contenedor.appendChild(pantalla);
    }
}