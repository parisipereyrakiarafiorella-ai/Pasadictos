/**
 * Gestor de Pantallas
 * Controla la navegación entre diferentes pantallas de la aplicación
 * Mantiene un registro del historial y permite cambiar entre pantallas
 */

class GestorPantallas {
    constructor(contenedorAplicacion) {
        this.contenedor = contenedorAplicacion;
        this.pantallaActual = null;
        this.historialPantallas = [];
        this.pantallasRegistradas = new Map();
        
        this.registrarPantallas();
    }
    
    registrarPantallas() {
        this.pantallasRegistradas.set('MenuPrincipal', MenuPrincipal);
        this.pantallasRegistradas.set('PantallaJuego', PantallaJuego);
        this.pantallasRegistradas.set('PantallaTienda', PantallaTienda);
        this.pantallasRegistradas.set('PantallaCargar', PantallaCargar);
        this.pantallasRegistradas.set('PantallaOpciones', PantallaOpciones);
        this.pantallasRegistradas.set('PantallaUsuario', PantallaUsuario);
        this.pantallasRegistradas.set('ConfirmacionSalir', ConfirmacionSalir);
    }
    
    cambiarPantalla(nombrePantalla, datos = {}) {
        const ClasePantalla = this.pantallasRegistradas.get(nombrePantalla);
        
        if (!ClasePantalla) {
            console.error(`Pantalla no registrada: ${nombrePantalla}`);
            return;
        }
        
        // Guardar en historial
        if (this.pantallaActual) {
            this.historialPantallas.push(this.pantallaActual.constructor.name);
        }
        
        // Limpiar contenedor
        this.contenedor.innerHTML = '';
        
        // Crear y renderizar nueva pantalla
        this.pantallaActual = new ClasePantalla(this, datos);
        this.pantallaActual.renderizar();
        
        console.log(`Pantalla cargada: ${nombrePantalla}`);
    }
    
    volverPantalla() {
        if (this.historialPantallas.length > 0) {
            const nombrePantalla = this.historialPantallas.pop();
            this.cambiarPantalla(nombrePantalla);
        } else {
            console.warn('No hay pantallas anteriores en el historial');
        }
    }
    
    obtenerContenedor() {
        return this.contenedor;
    }
}