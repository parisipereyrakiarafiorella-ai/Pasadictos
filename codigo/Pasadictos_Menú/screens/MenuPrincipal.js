/**
 * Pantalla - Menú Principal
 *
 * Pantalla inicial del videojuego.
 *
 * Los cinco botones utilizan UN SOLO PNG:
 *
 *     colgado.png
 *
 * Encima del PNG se colocan:
 *
 *     - zonas transparentes clickeables
 *     - textos de cada botón
 */

class MenuPrincipal {

    constructor(gestorPantallas, datos = {}) {

        this.gestorPantallas =
            gestorPantallas;

        this.contenedor =
            gestorPantallas.obtenerContenedor();

        this.datos = datos;
    }


    renderizar() {

        // ==========================================
        // PANTALLA PRINCIPAL
        // ==========================================

        const pantalla =
            document.createElement('div');

        pantalla.className =
            'pantalla-menu-principal';


        // ==========================================
        // FONDO BASE
        // ==========================================

        const imagenFondoBase =
            new ImagenFondo(
                GestorRecursos.obtenerRutaImagen(
                    'fondoBase'
                )
            );


        const fondoBase =
            document.createElement('div');

        fondoBase.className =
            'fondo-base-pantalla';


        fondoBase.appendChild(
            imagenFondoBase.obtenerElemento()
        );


        pantalla.appendChild(
            fondoBase
        );


        // ==========================================
        // MITAD IZQUIERDA
        // ==========================================

        const mitadIzquierda =
            document.createElement('div');

        mitadIzquierda.className =
            'mitad-izquierda';


        // ==========================================
        // FONDO IZQUIERDO
        // ==========================================

        const imagenFondoIzq =
            new ImagenFondo(
                GestorRecursos.obtenerRutaImagen(
                    'fondoIzquierda'
                )
            );


        const fondoIzq =
            document.createElement('div');

        fondoIzq.className =
            'fondo-mitad-izquierda';


        fondoIzq.appendChild(
            imagenFondoIzq.obtenerElemento()
        );


        mitadIzquierda.appendChild(
            fondoIzq
        );


        // ==========================================
        // DECORACIÓN
        // ==========================================

        const imagenDecoracionIzq =
            new ImagenFondo(
                GestorRecursos.obtenerRutaImagen(
                    'decoracionIzquierda'
                )
            );


        const decoracionIzq =
            document.createElement('div');

        decoracionIzq.className =
            'decoracion-mitad-izquierda';


        decoracionIzq.appendChild(
            imagenDecoracionIzq.obtenerElemento()
        );


        mitadIzquierda.appendChild(
            decoracionIzq
        );


        // ==========================================
        // CONTENIDO IZQUIERDO
        // ==========================================

        const contenidoIzq =
            document.createElement('div');

        contenidoIzq.className =
            'contenido-mitad-izquierda';


        // ==========================================
        // USUARIO
        // ==========================================

        const usuario =
            document.createElement('button');

        usuario.className =
            'usuario-principal';

        usuario.type =
            'button';

        usuario.title =
            'Perfil de usuario';


        // Imagen usuario

        const imagenUsuario =
            document.createElement('img');


        imagenUsuario.src =
            GestorRecursos.obtenerRutaImagen(
                'iconoUsuario'
            );


        imagenUsuario.alt =
            'Usuario';


        // Nombre usuario

        const nombreUsuario =
            document.createElement('span');


        nombreUsuario.className =
            'nombre-usuario';


        nombreUsuario.textContent =
            'Usuario123';


        // Agregar elementos

        usuario.appendChild(
            imagenUsuario
        );


        usuario.appendChild(
            nombreUsuario
        );


        // Click usuario

        usuario.addEventListener(
            'click',
            () => {

                this.gestorPantallas.cambiarPantalla(
                    'PantallaUsuario'
                );
            }
        );


        contenidoIzq.appendChild(
            usuario
        );


        // ==========================================
        // LOGO
        // ==========================================

        const contenedorLogo =
            document.createElement('div');

        contenedorLogo.className =
            'contenedor-logo';


        const imagenLogo =
            document.createElement('img');


        imagenLogo.src =
            GestorRecursos.obtenerRutaImagen(
                'logoPasadictos'
            );


        imagenLogo.alt =
            'Logo Pasadictos';


        imagenLogo.className =
            'logo-principal';


        contenedorLogo.appendChild(
            imagenLogo
        );


        contenidoIzq.appendChild(
            contenedorLogo
        );


        // ==========================================
        // CONTENEDOR DE CARTELES
        // ==========================================

        const contenedorBotones =
            document.createElement('div');

        contenedorBotones.className =
            'contenedor-botones-menu';


        // ==========================================
        // PNG ÚNICO
        // ==========================================

        const imagenBotones =
            document.createElement('img');


        imagenBotones.src =
            GestorRecursos.obtenerRutaImagen(
                'botonMenu'
            );


        imagenBotones.alt =
            'Menú principal';


        imagenBotones.className =
            'imagen-botones-menu';


        contenedorBotones.appendChild(
            imagenBotones
        );


        // ==========================================
        // ZONAS CLICKEABLES
        // ==========================================

        const zonasBotones =
            document.createElement('div');


        zonasBotones.className =
            'zonas-botones';


        // ==========================================
        // INICIAR
        // ==========================================

        zonasBotones.appendChild(

            this.crearZonaBoton(
                'Iniciar',
                'PantallaJuego'
            )

        );


        // ==========================================
        // CARGAR
        // ==========================================

        zonasBotones.appendChild(

            this.crearZonaBoton(
                'Cargar',
                'PantallaCargar'
            )

        );


        // ==========================================
        // TIENDA
        // ==========================================

        zonasBotones.appendChild(

            this.crearZonaBoton(
                'Tienda',
                'PantallaTienda'
            )

        );


        // ==========================================
        // OPCIONES
        // ==========================================

        zonasBotones.appendChild(

            this.crearZonaBoton(
                'Opciones',
                'PantallaOpciones'
            )

        );


        // ==========================================
        // SALIR
        // ==========================================

        zonasBotones.appendChild(

            this.crearZonaBoton(
                'Salir',
                'ConfirmacionSalir'
            )

        );


        // ==========================================
        // AGREGAR ZONAS
        // ==========================================

        contenedorBotones.appendChild(
            zonasBotones
        );


        contenidoIzq.appendChild(
            contenedorBotones
        );


        // ==========================================
        // AGREGAR CONTENIDO IZQUIERDO
        // ==========================================

        mitadIzquierda.appendChild(
            contenidoIzq
        );


        pantalla.appendChild(
            mitadIzquierda
        );


        // ==========================================
        // MITAD DERECHA
        // ==========================================

        const mitadDerecha =
            document.createElement('div');

        mitadDerecha.className =
            'mitad-derecha';


        // ==========================================
        // ESCENA HISTÓRICA
        // ==========================================

        const imagenEscena =
            new ImagenFondo(
                GestorRecursos.obtenerRutaImagen(
                    'escenaHistorica'
                )
            );


        const contenedorEscena =
            document.createElement('div');

        contenedorEscena.className =
            'escena-historica';


        contenedorEscena.appendChild(
            imagenEscena.obtenerElemento()
        );


        mitadDerecha.appendChild(
            contenedorEscena
        );


        pantalla.appendChild(
            mitadDerecha
        );


        // ==========================================
        // MOSTRAR PANTALLA
        // ==========================================

        this.contenedor.appendChild(
            pantalla
        );
    }


    /**
     * Crea una zona invisible encima
     * de uno de los carteles del PNG.
     *
     * También coloca el texto visible.
     */

    crearZonaBoton(
        nombre,
        pantallaDestino
    ) {

        const boton =
            document.createElement('button');


        boton.type =
            'button';


        boton.className =
            'zona-boton';


        boton.setAttribute(
            'aria-label',
            nombre
        );


        // ==========================================
        // TEXTO DEL BOTÓN
        // ==========================================

        const texto =
            document.createElement('span');


        texto.className =
            'texto-boton-menu';


        texto.textContent =
            nombre;


        boton.appendChild(
            texto
        );


        // ==========================================
        // CLICK
        // ==========================================

        boton.addEventListener(
            'click',
            () => {

                this.gestorPantallas.cambiarPantalla(
                    pantallaDestino
                );
            }
        );


        return boton;
    }
}