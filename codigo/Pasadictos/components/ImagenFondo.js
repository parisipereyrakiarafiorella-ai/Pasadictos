/**
 * Componente Imagen Fondo
 * Gestiona la carga y renderización de imágenes de fondo y decoraciones
 * Soporta múltiples capas y manejo de transparencias
 */

class ImagenFondo {
    constructor(rutaImagen, opciones = {}) {
        this.rutaImagen = rutaImagen;
        this.elementoImagen = null;
        this.opciones = {
            consolaOcultada: false,
            tipoCobertura: 'cover',
            posicion: 'center',
            ...opciones
        };
    }
    
    crear() {
        const img = document.createElement('img');
        img.src = this.rutaImagen;
        img.alt = 'Fondo';
        img.className = 'imagen-fondo';
        
        img.style.objectFit = this.opciones.tipoCobertura;
        img.style.objectPosition = this.opciones.posicion;
        
        img.addEventListener('error', () => {
            console.warn(`Imagen no encontrada: ${this.rutaImagen}`);
            this.crearPlaceholder(img);
        });
        
        this.elementoImagen = img;
        return img;
    }
    
    crearPlaceholder(elemento) {
        elemento.style.backgroundColor = '#2a2a2a';
        elemento.style.opacity = '0.5';
        console.log(`Usando placeholder para: ${this.rutaImagen}`);
    }
    
    obtenerElemento() {
        if (!this.elementoImagen) {
            this.crear();
        }
        return this.elementoImagen;
    }
}