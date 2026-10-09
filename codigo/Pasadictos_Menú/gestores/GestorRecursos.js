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
                'src/assets/image%201.png',


            // ==========================================
            // RECURSOS DEL JUEGO
            // ==========================================

            barraArriba:
                'src/assets/barra arriba.png',

            dialogo:
                'src/assets/dialogo.png',

            nombrePersonaje:
                'src/assets/nombre de personaje.png',

            opcionesFondo:
                'src/assets/opciones fondo.png',

            botonOpciones:
                'src/assets/boton de opciones.png',

            botonesAbajo:
                'src/assets/botones abajo.png',

           // ==========================================
            // RECURSOS DE LA TIENDA
            // ==========================================
            tiendaFondo: 'src/assets/tiendafondo.png',
            tiendaHoja: 'src/assets/tienda-hoja-ariba.png',
            tiendaCinta: 'src/assets/tiendacinta.png',
            tiendaMaderaItem: 'src/assets/tienda-madera-presentacionx6.png',
            tiendaColgador: 'src/assets/tiendacolgador.png',
            tiendaLetrerito: 'src/assets/tienda-letreritox6.png',
            tiendaBotonInventario: 'src/assets/boton-de-inventario.png',
            tiendaDescuento: 'src/assets/descuento.png',
            tiendaDinero: 'src/assets/dinero.png',
            tiendaAtras: 'src/assets/atras.png',

            // ==========================================
            //  AGREGADO PARA EL INVENTARIO ---------------
            // ==========================================
            inventarioFondo: 'src/assets/inventariofondo.png',
            inventarioCartel: 'src/assets/inventariocartel.png',
            inventarioTextoCartel: 'src/assets/textocartel.png',
            inventarioCuadro: 'src/assets/inventariocuadro.png',
            inventarioMarcox6: 'src/assets/in-tablerox6.png',
            inventarioHoja: 'src/assets/inventariohoja.png',
            inventarioSombra: 'src/assets/sombra.png',
            inventarioChica: 'src/assets/chica.png',
            inventarioAtras: 'src/assets/atras.png',

            // Categorías del inventario
            catRemera: 'src/assets/in-remera.png',
            catPantalon: 'src/assets/in-pantalon.png',
            catZapato: 'src/assets/in-zapatos.png',
            catVestido: 'src/assets/in-vestido.png',
            catGafas: 'src/assets/in-gafas.png',
            //  FIN DE LO AGREGADO -------------

            // Ropa y Accesorios
            camisaImg: 'src/assets/camisa.png',
            pantalonImg: 'src/assets/Pantalon.png',
            zapatoImg: 'src/assets/Zapato.png',
            vestidoImg: 'src/assets/Vestido.png',
            sombreroImg: 'src/assets/Sombrero.png',
            lentesImg: 'src/assets/Lentes.png',
            clipImg: 'src/assets/Clip.png',
            floresImg: 'src/assets/Flores.png',
            collarImg: 'src/assets/Collar.png',
            bufandaImg: 'src/assets/Bufanda.png',
            // ==========================================
            //  AGREGADO PARA EL OPCIONES---------------
            // ==========================================

            'opcionesFondo': 'src/assets/fondoOpciones.png',
            'opcionesCartel': 'src/assets/FondoTitulo.png',
            'opcionesPergamino': 'src/assets/pergamino-opciones.png',
            'opcionesFlechaTexto': 'src/assets/FondoTextos.png',
            'opcionesBarra': 'src/assets/recorridorDeBoton.png',
            'opcionesBotonSlider': 'src/assets/botonQueSeMueve.png',
            'opcionesBotonIzq': 'src/assets/botonIzquierda.png',
            'opcionesBotonDer': 'src/assets/botonDerecha.png',
            'opcionesAtras': 'src/assets/atras.png',

            // ==========================================
            //  AGREGADO PARA LA AYUDA---------------
            // ==========================================

            ayudaFondo: 'src/assets/ayuda-fondo.png',
            ayudaHoja: 'src/assets/ayuda-hoja.png',
            ayudaCartel: 'src/assets/ayuda-cartel.png',
            ayudaNota1: 'src/assets/ayuda-nota1.png',
            ayudaNota2: 'src/assets/ayuda-nota2.png',
            ayudaNota3: 'src/assets/ayuda-nota3.png',
            ayudaPinche: 'src/assets/ayuda-pinchex2.png',
            ayudaTexto1: 'src/assets/ayuda-texto1.png',
            ayudaTexto2: 'src/assets/ayuda-texto2.png',
            ayudaTexto3: 'src/assets/ayuda-texto3.png',
            ayudaTextoCartel: 'src/assets/ayuda-texto_cartel.png',
            btnAtras: 'src/assets/atras.png',
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
                'escenaHistorica',

                // Juego
                'barraArriba',
                'dialogo',
                'nombrePersonaje',
                'opcionesFondo',
                'botonOpciones',
                'botonesAbajo'
            ]
        };
    }
}

/* ==================================================
   RECURSOS DE CONFIRMACIÓN DE SALIDA
   ================================================== */

GestorRecursos.obtenerRutaImagen =
    (() => {

        const obtenerRutaOriginal =
            GestorRecursos.obtenerRutaImagen;


        return function(nombreRecurso) {

            if (
                nombreRecurso ===
                'fondoSalir'
            ) {

                return 'src/assets/fondoSalir.png';
            }


            if (
                nombreRecurso ===
                'botonSalir'
            ) {

                return 'src/assets/botonSalir.png';
            }


            return obtenerRutaOriginal.call(
                GestorRecursos,
                nombreRecurso
            );
        };

    })();

    // ==================================================
// RECURSOS DE JUAN MANUEL DE ROSAS
// ==================================================

GestorRecursos.obtenerRutaImagenRosas = function(nombreRecurso) {

    if (nombreRecurso === 'fondoRosas') {
        return 'src/assets/fondoRosas.jpeg';
    }

    if (nombreRecurso === 'mRosas') {
        return 'src/assets/mRosas.png';
    }

    return '';
};
