/**
 * Componente Botón Imagen
 * Crea botones con imagen de fondo, efectos hover y animaciones
 * Reutilizable para cualquier botón que use imagen como fondo
 */

class BotonImagen {
    constructor(rutaImagen, textoAlternativo = '', opciones = {}) {
        this.rutaImagen = rutaImagen;
        this.textoAlternativo = textoAlternativo;
        this.elemento = null;
        this.callback = null;
        this.opciones = {
            claseCSS: 'boton-imagen',
            deshabilitado: false,
            ...opciones
        };
    }
    
    crear() {
        const boton = document.createElement('button');
        boton.className = `${this.opciones.claseCSS}`;
        boton.style.backgroundImage = `url('${this.rutaImagen}')`;
        boton.title = this.textoAlternativo;
        boton.alt = this.textoAlternativo;
        
        if (this.opciones.deshabilitado) {
            boton.disabled = true;
        }
        
        boton.addEventListener('click', () => {
            if (!this.opciones.deshabilitado && this.callback) {
                this.callback();
            }
        });
        
        boton.addEventListener('mousedown', () => {
            boton.classList.add('activo');
        });
        
        boton.addEventListener('mouseup', () => {
            boton.classList.remove('activo');
        });
        
        boton.addEventListener('mouseleave', () => {
            boton.classList.remove('activo');
        });
        
        this.elemento = boton;
        return boton;
    }
    
    alHacer(callback) {
        this.callback = callback;
        return this;
    }
    
    obtenerElemento() {
        if (!this.elemento) {
            this.crear();
        }
        return this.elemento;
    }
    
    habilitar() {
        this.opciones.deshabilitado = false;
        if (this.elemento) {
            this.elemento.disabled = false;
        }
    }
    
    deshabilitar() {
        this.opciones.deshabilitado = true;
        if (this.elemento) {
            this.elemento.disabled = true;
        }
    }
}