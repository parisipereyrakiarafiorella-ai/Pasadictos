/**
 * Pantalla de Confirmación de Salida
 *
 * Se utiliza tanto desde el Menú Principal
 * como desde la Pantalla de Juego.
 *
 * Desde el menú:
 *      "Salir del juego"
 *
 * Desde el juego:
 *      "Salir al menú principal"
 */

class ConfirmacionSalir {

    constructor(gestorPantallas, datos = {}) {

        this.gestorPantallas =
            gestorPantallas;

        this.contenedor =
            gestorPantallas.obtenerContenedor();

        this.datos =
            datos;


        // ==================================================
        // DETECTAR DE DÓNDE VENIMOS
        // ==================================================

        const historial =
            this.gestorPantallas.historialPantallas;

        this.pantallaOrigen =
            historial.length > 0
                ? historial[historial.length - 1]
                : 'MenuPrincipal';
    }


    // ==================================================
    // RENDERIZAR
    // ==================================================

    renderizar() {

        const pantalla =
            document.createElement('div');

        pantalla.className =
            'pantalla-confirmacion-salir';


        // ==================================================
        // FONDO
        // ==================================================

        const fondo =
            document.createElement('img');

        fondo.src =
            GestorRecursos.obtenerRutaImagen(
                'fondoSalir'
            );

        fondo.alt =
            '';

        fondo.className =
            'fondo-confirmacion-salir';

        fondo.draggable =
            false;


        pantalla.appendChild(
            fondo
        );


        // ==================================================
        // CONTENIDO
        // ==================================================

        const contenido =
            document.createElement('div');

        contenido.className =
            'contenido-confirmacion-salir';


        // ==================================================
        // TEXTO
        // ==================================================

        const titulo =
            document.createElement('div');

        titulo.className =
            'titulo-confirmacion-salir';


        if (
            this.pantallaOrigen ===
            'PantallaJuego'
        ) {

            titulo.textContent =
                'Salir al menú principal';

        } else {

            titulo.textContent =
                'Salir del juego';
        }


        contenido.appendChild(
            titulo
        );


        // ==================================================
        // CONTENEDOR DE BOTONES
        // ==================================================

        const botones =
            document.createElement('div');

        botones.className =
            'botones-confirmacion-salir';


        // ==================================================
        // BOTÓN SÍ
        // ==================================================

        const botonSi =
            this.crearBoton(
                'SI'
            );


        botonSi.addEventListener(
            'click',
            (evento) => {

                evento.stopPropagation();

                this.confirmarSalida();
            }
        );


        // ==================================================
        // BOTÓN NO
        // ==================================================

        const botonNo =
            this.crearBoton(
                'NO'
            );


        botonNo.addEventListener(
            'click',
            (evento) => {

                evento.stopPropagation();

                this.cancelarSalida();
            }
        );


        botones.appendChild(
            botonSi
        );

        botones.appendChild(
            botonNo
        );


        contenido.appendChild(
            botones
        );


        pantalla.appendChild(
            contenido
        );


        // ==================================================
        // MOSTRAR
        // ==================================================

        this.contenedor.appendChild(
            pantalla
        );
    }


    // ==================================================
    // CREAR BOTÓN
    // ==================================================

    crearBoton(texto) {

        const boton =
            document.createElement('button');

        boton.type =
            'button';

        boton.className =
            'boton-confirmacion-salir';


        const imagen =
            document.createElement('img');

        imagen.src =
            GestorRecursos.obtenerRutaImagen(
                'botonSalir'
            );

        imagen.alt =
            '';

        imagen.draggable =
            false;


        const textoBoton =
            document.createElement('span');

        textoBoton.textContent =
            texto;


        boton.appendChild(
            imagen
        );

        boton.appendChild(
            textoBoton
        );


        return boton;
    }


    // ==================================================
    // CONFIRMAR
    // ==================================================

    confirmarSalida() {

        // ==============================================
        // DESDE EL JUEGO
        // ==============================================

        if (
            this.pantallaOrigen ===
            'PantallaJuego'
        ) {

            this.gestorPantallas.cambiarPantalla(
                'MenuPrincipal'
            );

            return;
        }


        // ==============================================
        // DESDE EL MENÚ PRINCIPAL
        // ==============================================

        this.cerrarJuego();
    }


    // ==================================================
    // CANCELAR
    // ==================================================

    cancelarSalida() {

        if (
            this.pantallaOrigen ===
            'PantallaJuego'
        ) {

            this.gestorPantallas.cambiarPantalla(
                'PantallaJuego'
            );

            return;
        }


        this.gestorPantallas.cambiarPantalla(
            'MenuPrincipal'
        );
    }


    // ==================================================
    // CERRAR JUEGO
    // ==================================================

    cerrarJuego() {

        /*
         * Los navegadores solamente permiten cerrar
         * automáticamente determinadas ventanas.
         *
         * Si el juego está ejecutándose como una
         * aplicación de escritorio, window.close()
         * puede ser gestionado por el entorno.
         */

        window.close();


        // Si el navegador bloquea el cierre,
        // dejamos la pantalla en negro.

        setTimeout(
            () => {

                document.body.innerHTML = '';

                document.body.style.background =
                    '#000';

            },
            100
        );
    }
}
