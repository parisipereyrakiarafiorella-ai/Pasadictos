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
            camisa2Img: 'src/assets/Camisa2.png',
            camisa3Img: 'src/assets/Camisa3.png',
            camisa4Img: 'src/assets/Camisa4.png',
            camisa5Img: 'src/assets/Camisa5.png',
            camisa6Img: 'src/assets/Camisa6.png',
            pantalonImg: 'src/assets/Pantalon.png',
            pantalon2Img: 'src/assets/Pantalon2.png',
            pantalon3Img: 'src/assets/Pantalon3.png',
            pantalon4Img: 'src/assets/Pantalon4.png',
            pantalon5Img: 'src/assets/Pantalon5.png',
            pantalon6Img: 'src/assets/Pantalon6.png',
            zapatoImg: 'src/assets/Zapato.png',
            zapato2Img: 'src/assets/Zapato2.png',
            zapato3Img: 'src/assets/Zapato3.png',
            zapato4Img: 'src/assets/Zapato4.png',
            vestidoImg: 'src/assets/Vestido.png',
            vestido2Img: 'src/assets/Vestido2.png',
            vestido3Img: 'src/assets/Vestido3.png',
            vestido4Img: 'src/assets/Vestido4.png',
            vestido5Img: 'src/assets/Vestido5.png',
            vestido6Img: 'src/assets/Vestido6.png',
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

            // ==========================================
            //  AGREGADO PARA LA SESION---------------
            //  ==========================================
            'sesion-fondo': 'src/assets/sesion-fondo.png',
            'sesion-tabla': 'src/assets/sesion-tabla.png',
            'sesion-registrar_tabla': 'src/assets/sesion-registrar_tabla.png',
            'sesion-decoracion': 'src/assets/sesion-decoracion.png',
            'sesion-escribir': 'src/assets/sesion-escribir.png',
            'sesion-botonx2': 'src/assets/sesion-botonx2.png',
            'sesion-atras': 'src/assets/atras.png',

            // ==========================================
            // AGREGADO PARA EL GUARDADO / CARGAR
            // ==========================================
            guardadoFondo: 'src/assets/fondoGuardado2.png',
            guardadoFondoCuadro: 'src/assets/fondoGuardado1.png',
            guardadoTitulo: 'src/assets/fondoTituloGuardado.png',
            guardadoCuadro: 'src/assets/cuadro.png',
            guardadoSignoMas: 'src/assets/signomas.png',
            guardadoBotonApagado: 'src/assets/botonApagado.png',
            guardadoBotonPrendido: 'src/assets/botonPrendido.png',
            guardadoAtras: 'src/assets/atras.png',
            guardadoletra: 'src/assets/Guardado.png',

            // RECURSOS DE PERFIL
            fondoPerfil: 'src/assets/FondoPerfil.jpg',
            marcoPerfil: 'src/assets/MarcoPerfil.png',
            editarPerfilBoton: 'src/assets/EditarPerfilBoton.png',
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