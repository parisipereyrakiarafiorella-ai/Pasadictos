/**
 * Gestor de Recursos
 *
 * Centraliza todas las rutas de imágenes del videojuego.
 *
 * Todas las imágenes están guardadas en:
 * src/assets/
 */

class GestorRecursos {

    static obtenerRutaImagen(nombreRecurso) {

        const rutas = {

            // ==========================================
            // LOGO
            // ==========================================

            logoPasadictos:
                'src/assets/pasadicto.png',


            // ==========================================
            // FONDOS
            // ==========================================

            fondoBase:
                'src/assets/fondo.png',

            fondoIzquierda:
                'src/assets/fondo.png',

            fondoDerecha:
                'src/assets/image%201.png',


            // ==========================================
            // DECORACIÓN
            // ==========================================

            decoracionIzquierda:
                'src/assets/decoracion.png',


            // ==========================================
            // PNG ÚNICO DE LOS CARTELES
            // ==========================================

            botonMenu:
                'src/assets/colgado.png',


            // ==========================================
            // USUARIO
            // ==========================================

            iconoUsuario:
                'src/assets/usuariooo%7D.png',


            // ==========================================
            // ESCENA HISTÓRICA
            // ==========================================

            escenaHistorica:
                'src/assets/image%201.png'
        };


        if (rutas[nombreRecurso]) {

            return rutas[nombreRecurso];
        }


        console.warn(
            `Recurso no encontrado: ${nombreRecurso}`
        );


        return '';
    }


    /**
     * Devuelve todos los recursos utilizados.
     */

    static obtenerTodosLosRecursos() {

        return {

            imagenes: [

                // Logo
                'logoPasadictos',

                // Fondos
                'fondoBase',
                'fondoIzquierda',
                'fondoDerecha',

                // Decoración
                'decoracionIzquierda',

                // PNG único de carteles
                'botonMenu',

                // Usuario
                'iconoUsuario',

                // Escena
                'escenaHistorica'
            ]
        };
    }
}