/**
 * Pantalla - Juego
 *
 * Esta pantalla contiene la estructura principal
 * de la partida de Pasadictos.
 *
 * La pantalla está dividida en:
 *
 * - Barra superior
 * - Zona central del juego
 * - Diálogo
 * - Nombre del personaje
 * - Menú de respuestas
 * - Barra inferior
 *
 * También controla el avance de los diálogos
 * y las opciones que puede seleccionar el jugador.
 */

class PantallaJuego {

    constructor(gestorPantallas, datos = {}) {

        this.gestorPantallas =
            gestorPantallas;

        this.contenedor =
            gestorPantallas.obtenerContenedor();

        this.datos =
            datos;


        // ==================================================
        // VARIABLES DEL JUEGO
        // ==================================================

        this.puntos = 0;

        this.epoca = 'Época Actual';


        // ==================================================
        // ETAPAS DEL DIÁLOGO
        // ==================================================

        /*
         * Las etapas indican qué parte de la historia
         * se está mostrando.
         */

        this.etapa = 'inicio';


        // Posición del diálogo actual

        this.indiceDialogo = 0;


        // Cantidad de preguntas realizadas

        this.cantidadPreguntas = 0;


        // ==================================================
        // REFERENCIAS A ELEMENTOS HTML
        // ==================================================

        this.elementoDialogo = null;

        this.elementoNombre = null;

        this.contenedorOpciones = null;

        this.zonaJuego = null;

        this.textoPuntos = null;

        this.textoEpoca = null;
    }


    // ==================================================
    // RENDERIZAR PANTALLA
    // ==================================================

    renderizar() {

        // Crear pantalla principal

        const pantalla =
            document.createElement('div');

        pantalla.className =
            'pantalla-juego';


        // ==================================================
        // BARRA SUPERIOR
        // ==================================================

        const barraArriba =
            document.createElement('div');

        barraArriba.className =
            'barra-arriba-juego';


        // Imagen de la barra superior

        const imagenBarra =
            document.createElement('img');

        imagenBarra.src =
            GestorRecursos.obtenerRutaImagen(
                'barraArriba'
            );

        imagenBarra.alt =
            '';

        imagenBarra.draggable =
            false;


        barraArriba.appendChild(
            imagenBarra
        );


        // ==================================================
        // PUNTOS
        // ==================================================

        this.textoPuntos =
            document.createElement('span');

        this.textoPuntos.className =
            'puntos-juego';

        this.textoPuntos.textContent =
            `Puntos: ${this.puntos}`;


        barraArriba.appendChild(
            this.textoPuntos
        );


        // ==================================================
        // ÉPOCA
        // ==================================================

        this.textoEpoca =
            document.createElement('span');

        this.textoEpoca.className =
            'epoca-juego';

        this.textoEpoca.textContent =
            this.epoca;


        barraArriba.appendChild(
            this.textoEpoca
        );


        pantalla.appendChild(
            barraArriba
        );


        // ==================================================
        // ZONA CENTRAL
        // ==================================================

        this.zonaJuego =
            document.createElement('div');

        this.zonaJuego.className =
            'zona-central-juego';


        // ==================================================
        // EVENTO PARA AVANZAR DIÁLOGOS
        // ==================================================

        /*
         * Solamente se permite avanzar cuando estamos
         * mostrando un diálogo.
         *
         * La barra superior y la barra inferior están
         * fuera de esta zona, por lo que no interfieren.
         */

        this.zonaJuego.addEventListener(
            'click',
            (evento) => {

                // Si el click fue sobre una opción,
                // no avanzamos el diálogo.

                if (
                    evento.target.closest(
                        '.contenedor-opciones-juego'
                    )
                ) {

                    return;
                }


                // Si estamos en una etapa donde el jugador
                // debe elegir una opción, no hacemos nada.

                if (
                    this.etapa === 'respuestaInicial' ||
                    this.etapa === 'preguntas'
                ) {

                    return;
                }


                // Si estamos mostrando un diálogo,
                // avanzamos al siguiente.

                if (
                    this.etapa === 'inicio' ||
                    this.etapa === 'despuesRespuesta' ||
                    this.etapa === 'respuestaPersonaje'
                ) {

                    this.avanzarDialogo();
                }
            }
        );


        pantalla.appendChild(
            this.zonaJuego
        );


        // ==================================================
        // BARRA INFERIOR
        // ==================================================

        const barraAbajo =
            this.crearBarraInferior();


        pantalla.appendChild(
            barraAbajo
        );


        // ==================================================
        // MOSTRAR PANTALLA
        // ==================================================

        this.contenedor.appendChild(
            pantalla
        );


        // ==================================================
        // PREPARAR DIÁLOGO
        // ==================================================

        this.crearDialogo();


        // Mostrar primer diálogo

        this.mostrarDialogoActual();
    }


    // ==================================================
    // CREAR DIÁLOGO
    // ==================================================

    crearDialogo() {

        // ==================================================
        // CONTENEDOR DEL DIÁLOGO
        // ==================================================

        const contenedorDialogo =
            document.createElement('div');

        contenedorDialogo.className =
            'contenedor-dialogo-juego';


        // ==================================================
        // IMAGEN DEL PERGAMINO
        // ==================================================

        const imagenDialogo =
            document.createElement('img');

        imagenDialogo.src =
            GestorRecursos.obtenerRutaImagen(
                'dialogo'
            );

        imagenDialogo.alt =
            '';

        imagenDialogo.draggable =
            false;


        contenedorDialogo.appendChild(
            imagenDialogo
        );


        // ==================================================
        // NOMBRE DEL PERSONAJE
        // ==================================================

        const contenedorNombre =
            document.createElement('div');

        contenedorNombre.className =
            'nombre-personaje-juego';


        const imagenNombre =
            document.createElement('img');

        imagenNombre.src =
            GestorRecursos.obtenerRutaImagen(
                'nombrePersonaje'
            );

        imagenNombre.alt =
            'Nombre del personaje';

        imagenNombre.draggable =
            false;


        contenedorNombre.appendChild(
            imagenNombre
        );


        // Texto del nombre

        this.elementoNombre =
            document.createElement('span');

        this.elementoNombre.className =
            'texto-nombre-personaje';

        this.elementoNombre.textContent =
            'Nombre';


        contenedorNombre.appendChild(
            this.elementoNombre
        );


        contenedorDialogo.appendChild(
            contenedorNombre
        );


        // ==================================================
        // TEXTO DEL DIÁLOGO
        // ==================================================

        this.elementoDialogo =
            document.createElement('p');

        this.elementoDialogo.className =
            'texto-dialogo-juego';


        contenedorDialogo.appendChild(
            this.elementoDialogo
        );


        this.zonaJuego.appendChild(
            contenedorDialogo
        );


        // ==================================================
        // CONTENEDOR DE OPCIONES
        // ==================================================

        this.contenedorOpciones =
            document.createElement('div');

        this.contenedorOpciones.className =
            'contenedor-opciones-juego';

        this.contenedorOpciones.style.display =
            'none';


        this.zonaJuego.appendChild(
            this.contenedorOpciones
        );
    }


    // ==================================================
    // DIÁLOGOS INICIALES
    // ==================================================

    obtenerDialogosIniciales() {

        return [

            {
                nombre: '???',
                texto:
                    '...'
            },

            {
                nombre: '???',
                texto:
                    '¿Donde estoy?'
            },

            {
                nombre: '???',
                texto:
                    'Entonces...'
            },

            {
                nombre: '???',
                texto:
                    'Entonces... funciono!'
            },

            {
                nombre: '???',
                texto:
                    'No creia que esto realmente seria posible'
            },

            {
                nombre: '???',
                texto:
                    'Es increible!'
            },

            {
                nombre: '???',
                texto:
                    '(No puedo creer que viaje al pasado)'
            },

            {
                nombre: '???',
                texto:
                    'Señor! Disculpe...'
            },

            {
                nombre: 'Juan Manuel de Rosas',
                texto:
                    '¿?'
            },

            {
                nombre: 'Linali',
                texto:
                    '¿Que tal? Soy linali, reportera'
            },

            {
                nombre: 'Linali',
                texto:
                    '¿Tendria un momento para charlar conmigo? Me encantaria contar con su testimonio para un informe que estoy haciendo'
            },

            {
                nombre: 'Juan Manuel de Rosas',
                texto:
                    '¿Reportera?'
            },

            {
                nombre: 'Juan Manuel de Rosas',
                texto:
                    '¿Reportera? ¿Informe? '
            },

            {
                nombre: 'Juan Manuel de Rosas',
                texto:
                    '¿Reportera? ¿Informe? Palabras raras usa usted, señorita'
            },

            {
                nombre: 'Juan Manuel de Rosas',
                texto:
                    'Y mas rara aun es su vestimenta'
            },

            {
                nombre: 'Linali',
                texto:
                    '¿Eh-?'
            },

            {
                nombre: 'Juan Manuel de Rosas',
                texto:
                    'Un hombre en mi posicion no concede su tiempo a la ligera, y menos para charlas informales'
            },

            {
                nombre: 'Juan Manuel de Rosas',
                texto:
                    'Hable rapido, que las tareas del Gobierno no esperan'
            },

            {
                nombre: 'Linali',
                texto:
                    'Se lo agradezco mucho! Podria decirme...'
            }
        ];
    }


    // ==================================================
    // MOSTRAR DIÁLOGO ACTUAL
    // ==================================================

    mostrarDialogoActual() {

        let dialogos = [];


        // Elegir los diálogos correspondientes
        // a la etapa actual.

        if (this.etapa === 'inicio') {

            dialogos =
                this.obtenerDialogosIniciales();

        }


        else if (
            this.etapa === 'despuesRespuesta'
        ) {

            dialogos =
                this.obtenerDialogosDespuesRespuesta();

        }


        else if (
            this.etapa === 'respuestaPersonaje'
        ) {

            dialogos =
                this.obtenerDialogoRespuestaActual();

        }


        // Si no hay diálogo, no hacemos nada.

        if (
            dialogos.length === 0
        ) {

            return;
        }


        const dialogo =
            dialogos[this.indiceDialogo];


        // Mostrar nombre

        this.elementoNombre.textContent =
            dialogo.nombre;


        // Mostrar texto

        this.elementoDialogo.textContent =
            dialogo.texto;
    }


    // ==================================================
    // AVANZAR DIÁLOGO
    // ==================================================

    avanzarDialogo() {

        let cantidadDialogos =
            0;


        if (
            this.etapa === 'inicio'
        ) {

            cantidadDialogos =
                this.obtenerDialogosIniciales().length;
        }


        else if (
            this.etapa === 'despuesRespuesta'
        ) {

            cantidadDialogos =
                this.obtenerDialogosDespuesRespuesta().length;
        }


        else if (
            this.etapa === 'respuestaPersonaje'
        ) {

            cantidadDialogos =
                this.obtenerDialogoRespuestaActual().length;
        }


        this.indiceDialogo++;


        // ==================================================
        // TODAVÍA HAY DIÁLOGOS
        // ==================================================

        if (
            this.indiceDialogo <
            cantidadDialogos
        ) {

            this.mostrarDialogoActual();

            return;
        }


        // ==================================================
        // TERMINAR DIÁLOGOS INICIALES
        // ==================================================

        if (
            this.etapa === 'inicio'
        ) {

            this.indiceDialogo =
                0;

            this.etapa =
                'respuestaInicial';


            this.mostrarOpcionesRespuestaInicial();

            return;
        }


        // ==================================================
        // TERMINAR DIÁLOGOS DESPUÉS DE RESPONDER
        // ==================================================

        if (
            this.etapa === 'despuesRespuesta'
        ) {

            this.indiceDialogo =
                0;

            this.etapa =
                'preguntas';


            this.mostrarOpcionesPreguntas();

            return;
        }


        // ==================================================
        // TERMINAR RESPUESTA DEL PERSONAJE
        // ==================================================

        if (
            this.etapa === 'respuestaPersonaje'
        ) {

            // Si todavía quedan preguntas,
            // volvemos a mostrar las opciones.

            if (
                this.cantidadPreguntas < 5
            ) {

                this.indiceDialogo =
                    0;

                this.etapa =
                    'preguntas';


                this.mostrarOpcionesPreguntas();

                return;
            }


            // ==================================================
            // FINAL
            // ==================================================

            this.mostrarDialogoFinal();
        }
    }


    // ==================================================
    // OPCIONES DE LA PRIMERA RESPUESTA
    // ==================================================

    mostrarOpcionesRespuestaInicial() {

        this.limpiarOpciones();


        const opciones = [

            'Sí',

            'No',

            'Capaz',

            'Qué'
        ];


        this.mostrarMenuOpciones(
            opciones,
            (opcion) => {

                // Cada respuesta suma puntos.

                this.puntos += 10;

                this.actualizarPuntos();


                // Ocultar opciones

                this.ocultarOpciones();


                // Continuar con los diálogos

                this.indiceDialogo =
                    0;

                this.etapa =
                    'despuesRespuesta';


                this.mostrarDialogoActual();
            }
        );
    }


    // ==================================================
    // DIÁLOGOS DESPUÉS DE LA RESPUESTA
    // ==================================================

    obtenerDialogosDespuesRespuesta() {

        return [

            {
                nombre: 'Nombre',
                texto:
                    'Después de presentar la bandera, continué trabajando para que pudiera ser utilizada como símbolo de nuestra causa.'
            },

            {
                nombre: 'Nombre',
                texto:
                    'La bandera fue izada por primera vez a orillas del río Paraná.'
            },

            {
                nombre: 'Nombre',
                texto:
                    'Los colores celeste y blanco comenzaron a representar cada vez más nuestra identidad.'
            },

            {
                nombre: 'Nombre',
                texto:
                    'Pero todavía quedaban muchas cosas por descubrir sobre el origen y el significado de estos colores.'
            }
        ];
    }


    // ==================================================
    // MOSTRAR MENÚ DE PREGUNTAS
    // ==================================================

    mostrarOpcionesPreguntas() {

        this.limpiarOpciones();


        const preguntas = [

            '¿Por qué elegiste esos colores?',

            '¿Dónde se creó la bandera?',

            '¿Cuándo fue presentada?',

            '¿Quiénes la utilizaron?',

            '¿Qué significaban sus colores?'
        ];


        this.mostrarMenuOpciones(
            preguntas,
            (pregunta, indice) => {

                this.cantidadPreguntas++;

                this.puntos += 5;

                this.actualizarPuntos();


                // Ocultar las opciones mientras
                // responde el personaje.

                this.ocultarOpciones();


                this.indiceDialogo =
                    0;

                this.etapa =
                    'respuestaPersonaje';


                this.preguntaSeleccionada =
                    indice;


                this.mostrarDialogoActual();
            }
        );
    }


    // ==================================================
    // RESPUESTAS DEL PERSONAJE
    // ==================================================

    obtenerDialogoRespuestaActual() {

        const respuestas = [

            {
                nombre: 'Nombre',
                texto:
                    'Elegí el celeste y el blanco porque eran colores que ya estaban relacionados con nuestra identidad y con distintos símbolos que utilizábamos.'
            },

            {
                nombre: 'Nombre',
                texto:
                    'La bandera fue creada y presentada durante la campaña en las orillas del río Paraná.'
            },

            {
                nombre: 'Nombre',
                texto:
                    'Fue presentada por primera vez en febrero de 1812, durante las luchas por la independencia.'
            },

            {
                nombre: 'Nombre',
                texto:
                    'Fue utilizada principalmente por las fuerzas que luchaban por la independencia y buscaban tener un símbolo propio.'
            },

            {
                nombre: 'Nombre',
                texto:
                    'Los colores celeste y blanco terminaron convirtiéndose en una parte fundamental de los símbolos nacionales argentinos.'
            }
        ];


        const indice =
            this.preguntaSeleccionada || 0;


        return [

            respuestas[indice]

        ];
    }


    // ==================================================
    // MOSTRAR MENÚ DE OPCIONES
    // ==================================================

    mostrarMenuOpciones(
        opciones,
        funcionSeleccion
    ) {

        this.contenedorOpciones.style.display =
            'flex';


        // Imagen de fondo del menú

        const fondo =
            document.createElement('img');

        fondo.src =
            GestorRecursos.obtenerRutaImagen(
                'opcionesFondo'
            );

        fondo.alt =
            '';

        fondo.className =
            'fondo-opciones-juego';

        fondo.draggable =
            false;


        this.contenedorOpciones.appendChild(
            fondo
        );


        // Contenedor de los botones

        const lista =
            document.createElement('div');

        lista.className =
            'lista-opciones-juego';


        opciones.forEach(
            (opcion, indice) => {

                const boton =
                    document.createElement('button');

                boton.type =
                    'button';

                boton.className =
                    'boton-opcion-juego';


                // Imagen del botón

                const imagen =
                    document.createElement('img');

                imagen.src =
                    GestorRecursos.obtenerRutaImagen(
                        'botonOpciones'
                    );

                imagen.alt =
                    '';

                imagen.draggable =
                    false;


                boton.appendChild(
                    imagen
                );


                // Texto

                const texto =
                    document.createElement('span');

                texto.textContent =
                    opcion;


                boton.appendChild(
                    texto
                );


                // Click

                boton.addEventListener(
                    'click',
                    (evento) => {

                        evento.stopPropagation();


                        funcionSeleccion(
                            opcion,
                            indice
                        );
                    }
                );


                lista.appendChild(
                    boton
                );
            }
        );


        this.contenedorOpciones.appendChild(
            lista
        );
    }


    // ==================================================
    // OCULTAR OPCIONES
    // ==================================================

    ocultarOpciones() {

        this.contenedorOpciones.style.display =
            'none';

        this.limpiarOpciones();
    }


    // ==================================================
    // LIMPIAR OPCIONES
    // ==================================================

    limpiarOpciones() {

        if (
            this.contenedorOpciones
        ) {

            this.contenedorOpciones.innerHTML =
                '';
        }
    }


    // ==================================================
    // CREAR BARRA INFERIOR
    // ==================================================

    crearBarraInferior() {

        const barra =
            document.createElement('div');

        barra.className =
            'barra-abajo-juego';


        


        // ==================================================
        // BOTÓN SALIR
        // ==================================================

        const botonSalir =
            this.crearBotonBarra(
                'Salir',
                'ConfirmacionSalir'
            );


        barra.appendChild(
            botonSalir
        );


        // ==================================================
        // BOTÓN GUARDAR
        // ==================================================

        const botonGuardar =
            this.crearBotonBarra(
                'Guardar',
                null
            );


        botonGuardar.addEventListener(
            'click',
            (evento) => {

                evento.stopPropagation();

                alert(
                    'Partida guardada.'
                );
            }
        );


        barra.appendChild(
            botonGuardar
        );


        // ==================================================
        // BOTÓN INVENTARIO
        // ==================================================

        const botonInventario =
            this.crearBotonBarra(
                'Inventario',
                null
            );


        botonInventario.addEventListener(
            'click',
            (evento) => {

                evento.stopPropagation();

                alert(
                    'El inventario estará disponible próximamente.'
                );
            }
        );


        barra.appendChild(
            botonInventario
        );


        // ==================================================
        // BOTÓN OPCIONES
        // ==================================================

        const botonOpciones =
            this.crearBotonBarra(
                'Opciones',
                'PantallaOpciones'
            );


        barra.appendChild(
            botonOpciones
        );


        // ==================================================
        // BOTÓN AYUDA
        // ==================================================

// ==================================================
        // >>> AQUÍ ESTÁ EL ÚNICO CAMBIO <<<
        // ==================================================
        // Antes tenías:
        // const botonAyuda = this.crearBotonBarra('Ayuda', null);
        // botonAyuda.addEventListener('click', ... alert(...));
        //
        // Ahora cambia a esto para que abra la pantalla:
        
        const botonAyuda = this.crearBotonBarra(
            'Ayuda',
            'PantallaAyuda'
        );
        barra.appendChild(botonAyuda);
        
        // ==================================================


        return barra;
    }


    // ==================================================
    // CREAR BOTÓN DE LA BARRA
    // ==================================================

crearBotonBarra(
    texto,
    pantallaDestino
) {

    const boton =
        document.createElement('button');

    boton.type =
        'button';

    boton.className =
        'boton-barra-juego';


    // ==================================================
    // IMAGEN INDIVIDUAL DEL BOTÓN
    // ==================================================

    const imagen =
        document.createElement('img');

    imagen.src =
        GestorRecursos.obtenerRutaImagen(
            'botonesAbajo'
        );

    imagen.alt =
        '';

    imagen.draggable =
        false;

    imagen.className =
        'imagen-boton-barra-juego';


    boton.appendChild(
        imagen
    );


    // ==================================================
    // TEXTO DEL BOTÓN
    // ==================================================

    const textoBoton =
        document.createElement('span');

    textoBoton.textContent =
        texto;

    textoBoton.className =
        'texto-boton-barra-juego';


    boton.appendChild(
        textoBoton
    );


    // ==================================================
    // ACCIÓN DEL BOTÓN
    // ==================================================

    if (
        pantallaDestino
    ) {

        boton.addEventListener(
            'click',
            (evento) => {

                evento.stopPropagation();

                this.gestorPantallas.cambiarPantalla(
                    pantallaDestino
                );
            }
        );
    }


    return boton;
}


    // ==================================================
    // ACTUALIZAR PUNTOS
    // ==================================================

    actualizarPuntos() {

        if (
            this.textoPuntos
        ) {

            this.textoPuntos.textContent =
                `Puntos: ${this.puntos}`;
        }
    }


    // ==================================================
    // DIÁLOGO FINAL
    // ==================================================

    mostrarDialogoFinal() {

        this.etapa =
            'final';


        this.ocultarOpciones();


        this.elementoNombre.textContent =
            'Nombre';


        this.elementoDialogo.textContent =
            'Creo que ya sabes bastante sobre esta historia. ¡Buen trabajo, periodista!';


        // No agregamos otro menú porque
        // esta parte puede conectarse después
        // con el sistema de resultados.
    }
}

// ==================================================
// ESCENA DE JUAN MANUEL DE ROSAS
// ==================================================

(() => {

    // Guardamos la función original
    const mostrarDialogoOriginal =
        PantallaJuego.prototype.mostrarDialogoActual;


    // Reemplazamos la función por una que también
    // comprueba si debe aparecer la escena de Rosas
    PantallaJuego.prototype.mostrarDialogoActual =
        function() {

            // Primero mostramos el diálogo normalmente
            mostrarDialogoOriginal.call(this);


            // Si todavía no existe la zona de juego,
            // no hacemos nada
            if (!this.zonaJuego) {
                return;
            }


            // Obtenemos el texto y el nombre actuales
            const textoActual =
                this.elementoDialogo
                    ? this.elementoDialogo.textContent.trim()
                    : '';

            const nombreActual =
                this.elementoNombre
                    ? this.elementoNombre.textContent.trim()
                    : '';


            // ==================================================
            // FONDO DE ROSAS
            // ==================================================

            // Cuando la reportera dice:
            // "Entonces... funciono!"
            if (
                textoActual
                    .toLowerCase()
                    .includes('entonces... funciono!')
            ) {

                // Si todavía no existe el fondo,
                // lo creamos
                if (
                    !this.zonaJuego.querySelector(
                        '.fondo-rosas-juego'
                    )
                ) {

                    const fondoRosas =
                        document.createElement('img');

                    fondoRosas.src =
                        GestorRecursos.obtenerRutaImagenRosas(
                            'fondoRosas'
                        );

                    fondoRosas.alt = '';

                    fondoRosas.className =
                        'fondo-rosas-juego';

                    fondoRosas.draggable = false;


                    this.zonaJuego.prepend(
                        fondoRosas
                    );
                }
            }


            // ==================================================
            // IMAGEN DE JUAN MANUEL DE ROSAS
            // ==================================================

            // Cuando aparece Juan Manuel de Rosas
            // y dice "¿?"
            if (
                nombreActual === 'Juan Manuel de Rosas' &&
                textoActual === '¿?'
            ) {

                // Si todavía no existe la imagen,
                // la creamos
                if (
                    !this.zonaJuego.querySelector(
                        '.imagen-rosas-juego'
                    )
                ) {

                    const imagenRosas =
                        document.createElement('img');

                    imagenRosas.src =
                        GestorRecursos.obtenerRutaImagenRosas(
                            'mRosas'
                        );

                    imagenRosas.alt =
                        'Juan Manuel de Rosas';

                    imagenRosas.className =
                        'imagen-rosas-juego';

                    imagenRosas.draggable = false;


                    this.zonaJuego.appendChild(
                        imagenRosas
                    );
                }
            }

        };

})();

// ==================================================
// SISTEMA DE ENTREVISTA CON JUAN MANUEL DE ROSAS
// ==================================================

(() => {

    // Guardamos la función que ya existe
    const mostrarDialogoAnterior =
        PantallaJuego.prototype.mostrarDialogoActual;


    // Preguntas de la entrevista
    const preguntasEntrevista = [

        {
            pregunta: '¿Cómo ve la situación del país en este momento?',
            respuesta: 'Es un momento complejo, señorita. Hay mucho por resolver y debemos procurar mantener el orden y la unidad.'
        },

        {
            pregunta: '¿Qué piensa que necesita nuestro país para salir adelante?',
            respuesta: 'Creo que debemos trabajar por la unión de las provincias y defender los intereses de nuestra tierra.'
        },

        {
            pregunta: '¿Qué importancia tiene Buenos Aires para usted?',
            respuesta: 'Buenos Aires tiene una gran importancia, pero debemos recordar que las provincias también forman parte de nuestra nación.'
        },

        {
            pregunta: '¿Qué mensaje le daría a las personas de nuestra época?',
            respuesta: 'Les diría que conozcan su historia y que recuerden que las decisiones del pasado también dejan huellas en el futuro.'
        }

    ];


    // ==================================================
    // INICIALIZAR ENTREVISTA
    // ==================================================

    const iniciarEntrevista =
        function() {

            this.etapa = 'entrevista';

            this.preguntasRealizadas =
                new Set();

            this.preguntaEntrevistaActual =
                null;

            this.dialogoEntrevistaActual =
                null;

            this.mostrarOpcionesEntrevista();
        };


    // ==================================================
    // MOSTRAR DIÁLOGO
    // ==================================================

    PantallaJuego.prototype.mostrarDialogoActual =
        function() {

            // Ejecutar todo lo que ya hacía el juego
            mostrarDialogoAnterior.call(this);


            if (
                !this.elementoDialogo ||
                !this.elementoNombre
            ) {
                return;
            }


            const textoActual =
                this.elementoDialogo.textContent.trim();


            // ==================================================
            // COMENZAR ENTREVISTA
            // ==================================================

            if (
                textoActual ===
                'Se lo agradezco mucho! Podria decirme...'
            ) {

                // Evitar que se vuelva a crear
                // el menú varias veces
                if (
                    this.etapa !== 'entrevista' &&
                    this.etapa !== 'dialogoEntrevista'
                ) {

                    iniciarEntrevista.call(this);
                }

                return;
            }


            // ==================================================
            // MOSTRAR DIÁLOGO DE LA ENTREVISTA
            // ==================================================

            if (
                this.etapa ===
                'dialogoEntrevista'
            ) {

                const dialogo =
                    this.dialogoEntrevistaActual;


                if (!dialogo) {
                    return;
                }


                this.elementoNombre.textContent =
                    dialogo.nombre;

                this.elementoDialogo.textContent =
                    dialogo.texto;
            }

        };


    // ==================================================
    // MOSTRAR LAS PREGUNTAS
    // ==================================================

    PantallaJuego.prototype.mostrarOpcionesEntrevista =
        function() {

            this.ocultarOpciones();


            const opciones =
                preguntasEntrevista.map(
                    pregunta =>
                        pregunta.pregunta
                );


            // Cuando ya se hicieron las 4 preguntas,
            // aparece también la opción para terminar
            if (
                this.preguntasRealizadas &&
                this.preguntasRealizadas.size ===
                preguntasEntrevista.length
            ) {

                opciones.push(
                    'Listo, ya está'
                );
            }


            this.mostrarMenuOpciones(
                opciones,
                (opcion, indice) => {


                    // ==================================================
                    // TERMINAR ENTREVISTA
                    // ==================================================

                    if (
                        opcion ===
                        'Listo, ya está'
                    ) {

                        this.ocultarOpciones();

                        this.mostrarDialogosFinalesEntrevista();

                        return;
                    }


                    // ==================================================
                    // ELEGIR PREGUNTA
                    // ==================================================

                    this.preguntaEntrevistaActual =
                        indice;


                    // Guardamos que esta pregunta
                    // ya fue realizada
                    this.preguntasRealizadas.add(
                        indice
                    );


                    this.ocultarOpciones();


                    // Mostrar primero la pregunta de Linali
                    this.etapa =
                        'dialogoEntrevista';

                    this.dialogoEntrevistaActual = {

                        nombre: 'Linali',

                        texto:
                            preguntasEntrevista[indice].pregunta

                    };


                    this.elementoNombre.textContent =
                        this.dialogoEntrevistaActual.nombre;

                    this.elementoDialogo.textContent =
                        this.dialogoEntrevistaActual.texto;

                }
            );
        };


    // ==================================================
    // AVANZAR LOS DIÁLOGOS DE LA ENTREVISTA
    // ==================================================

    PantallaJuego.prototype.avanzarEntrevista =
        function() {

            // Si no hay pregunta seleccionada,
            // no hacemos nada
            if (
                this.preguntaEntrevistaActual ===
                null
            ) {
                return;
            }


            // ==================================================
            // LINALI -> ROSAS
            // ==================================================

            if (
                this.elementoNombre.textContent ===
                'Linali'
            ) {

                const indice =
                    this.preguntaEntrevistaActual;


                this.elementoNombre.textContent =
                    'Juan Manuel de Rosas';


                this.elementoDialogo.textContent =
                    preguntasEntrevista[indice].respuesta;


                return;
            }


            // ==================================================
            // ROSAS -> VOLVER A LAS PREGUNTAS
            // ==================================================

            if (
                this.elementoNombre.textContent ===
                'Juan Manuel de Rosas'
            ) {

                this.preguntaEntrevistaActual =
                    null;


                this.etapa =
                    'entrevista';


                this.mostrarOpcionesEntrevista();
            }

        };


    // ==================================================
    // DOS DIÁLOGOS FINALES
    // ==================================================

    PantallaJuego.prototype.mostrarDialogosFinalesEntrevista =
        function() {

            this.etapa =
                'dialogosFinalesEntrevista';


            this.dialogosFinalesEntrevista = [

                {
                    nombre: 'Linali',

                    texto:
                        'Muchas gracias por su tiempo, señor Rosas. Creo que esta entrevista será muy interesante.'
                },

                {
                    nombre: 'Juan Manuel de Rosas',

                    texto:
                        'Ha sido un placer responder a sus preguntas, señorita. Espero que encuentre lo que busca.'
                }

            ];


            this.indiceDialogoFinalEntrevista =
                0;


            this.mostrarDialogoFinalEntrevista();
        };


    // ==================================================
    // MOSTRAR UNO DE LOS DOS DIÁLOGOS FINALES
    // ==================================================

    PantallaJuego.prototype.mostrarDialogoFinalEntrevista =
        function() {

            const dialogo =
                this.dialogosFinalesEntrevista[
                    this.indiceDialogoFinalEntrevista
                ];


            if (!dialogo) {
                return;
            }


            this.elementoNombre.textContent =
                dialogo.nombre;


            this.elementoDialogo.textContent =
                dialogo.texto;
        };


    // ==================================================
    // CLICK PARA AVANZAR ENTREVISTA
    // ==================================================

    const configurarClickEntrevista =
        function() {

            if (
                !this.zonaJuego
            ) {
                return;
            }


            this.zonaJuego.addEventListener(
                'click',
                (evento) => {

                    // Si se hizo click en una opción,
                    // no avanzar el diálogo
                    if (
                        evento.target.closest(
                            '.contenedor-opciones-juego'
                        )
                    ) {
                        return;
                    }


                    // ==================================================
                    // ENTREVISTA
                    // ==================================================

                    if (
                        this.etapa ===
                        'dialogoEntrevista'
                    ) {

                        this.avanzarEntrevista();

                        return;
                    }


                    // ==================================================
                    // DOS DIÁLOGOS FINALES
                    // ==================================================

                    if (
                        this.etapa ===
                        'dialogosFinalesEntrevista'
                    ) {

                        this.indiceDialogoFinalEntrevista++;


                        if (
                            this.indiceDialogoFinalEntrevista <
                            this.dialogosFinalesEntrevista.length
                        ) {

                            this.mostrarDialogoFinalEntrevista();

                        } else {

                            // Terminó la entrevista
                            this.etapa =
                                'finalEntrevista';
                        }

                    }

                }
            );
        };


    // ==================================================
    // ESPERAR A QUE EXISTAN LOS ELEMENTOS
    // ==================================================

    const renderizarAnterior =
        PantallaJuego.prototype.renderizar;


    PantallaJuego.prototype.renderizar =
        function() {

            renderizarAnterior.call(this);

            configurarClickEntrevista.call(this);

        };

})();

// ==================================================
// EFECTO DE ROSAS SEGÚN QUIÉN HABLA
// ==================================================

(() => {

    // Actualiza el aspecto de Rosas según
    // el personaje que está hablando
    function actualizarAspectoRosas() {

        if (
            !this.zonaJuego ||
            !this.elementoNombre
        ) {
            return;
        }


        const nombre =
            this.elementoNombre.textContent
                .trim()
                .toLowerCase();


        // Quitamos los estados anteriores
        this.zonaJuego.classList.remove(
            'linali-hablando',
            'rosas-hablando'
        );


        // ==================================================
        // LINALI HABLA
        // ==================================================

        if (
            nombre === 'linali'
        ) {

            this.zonaJuego.classList.add(
                'linali-hablando'
            );

        }


        // ==================================================
        // ROSAS HABLA
        // ==================================================

        else if (
            nombre ===
            'juan manuel de rosas'
        ) {

            this.zonaJuego.classList.add(
                'rosas-hablando'
            );

        }

    }


    // ==================================================
    // OBSERVAR CAMBIOS EN EL NOMBRE
    // ==================================================

    const esperarPantalla =
        setInterval(() => {

            // Esperamos hasta que exista
            // el elemento del nombre

            const pantallas =
                document.querySelectorAll(
                    '.zona-central-juego'
                );


            if (
                pantallas.length === 0
            ) {
                return;
            }


            clearInterval(
                esperarPantalla
            );


            pantallas.forEach(
                zona => {

                    // Buscamos el nombre
                    const nombre =
                        zona.querySelector(
                            '.texto-nombre-personaje'
                        );


                    if (!nombre) {
                        return;
                    }


                    // Actualizamos una primera vez
                    actualizarAspectoRosas.call({
                        zonaJuego: zona,
                        elementoNombre: nombre
                    });


                    // Observamos cuando cambia
                    // el nombre del personaje

                    const observador =
                        new MutationObserver(
                            () => {

                                actualizarAspectoRosas.call({
                                    zonaJuego: zona,
                                    elementoNombre: nombre
                                });

                            }
                        );


                    observador.observe(
                        nombre,
                        {
                            childList: true,
                            characterData: true,
                            subtree: true
                        }
                    );

                }
            );

        }, 100);

})();





































// ================================================================
// CUESTIONARIO FINAL DEL JUEGO
// ================================================================
// Se inicia automáticamente después del último diálogo
// de la entrevista.
// 5 preguntas - 30 segundos cada una
// Correcta: +70 puntos
// Incorrecta / tiempo agotado: -25 puntos
// ================================================================

(() => {

    // ============================================================
    // CONFIGURACIÓN
    // ============================================================

    const QUIZ_TIEMPO = 30;
    const PUNTOS_CORRECTA = 70;
    const PUNTOS_INCORRECTA = 25;

    // ============================================================
    // RECURSOS VISUALES
    // ============================================================

    const recursosQuiz = {

        fondo:
            'src/assets/fondoPreguntas.png',

        marco:
            'src/assets/marcoPreguntas.png',

        titulo:
            'src/assets/FondoTituloP.png',

        boton:
            'src/assets/botonesPreguntas.png'

    };


    // ============================================================
    // PREGUNTAS
    // ============================================================

    const preguntasQuiz = [

        {
            pregunta:
                '¿Cuál fue una de las principales acciones de Manuel Belgrano que tuvo importancia para la historia de nuestro país?',

            opciones: [
                'Fundó la ciudad de Buenos Aires',
                'Creó la bandera argentina',
                'Fue el primer presidente de la Argentina',
                'Escribió la Constitución Nacional de 1853'
            ],

            correcta: 1
        },

        {
            pregunta:
                '¿Quién fue Juan Manuel de Rosas?',

            opciones: [
                'Un gobernador de Buenos Aires',
                'Un presidente de Brasil',
                'Un explorador español',
                'Un escritor francés'
            ],

            correcta: 0
        },

        {
            pregunta:
                '¿Qué importancia tuvo Buenos Aires durante la época de Rosas?',

            opciones: [
                'No tuvo importancia política',
                'Tuvo un papel político y económico central',
                'Fue la capital de otro país',
                'Fue completamente independiente'
            ],

            correcta: 1
        },

        {
            pregunta:
                '¿Qué tema apareció durante la entrevista con Rosas?',

            opciones: [
                'La situación y el futuro del país',
                'La llegada del hombre a la Luna',
                'La creación de internet',
                'La exploración espacial'
            ],

            correcta: 0
        },

        {
            pregunta:
                '¿Qué mensaje se relaciona con lo aprendido durante la entrevista?',

            opciones: [
                'Conocer la historia ayuda a comprender el presente',
                'La historia no tiene relación con el presente',
                'El pasado debe ser olvidado',
                'Las decisiones del pasado no tienen consecuencias'
            ],

            correcta: 0
        }

    ];


    // ============================================================
    // VARIABLES DEL CUESTIONARIO
    // ============================================================

    const renderizarAnterior =
        PantallaJuego.prototype.renderizar;


    PantallaJuego.prototype.renderizar =
        function() {

            this.quizActivo = false;

            this.quizPreguntaActual = 0;

            this.quizTiempoRestante =
                QUIZ_TIEMPO;

            this.quizTimer =
                null;

            this.quizRespuestaBloqueada =
                false;

            this.quizCorrectas =
                0;

            this.quizIncorrectas =
                0;

            this.quizTerminado =
                false;

            renderizarAnterior.call(this);

            this.configurarInicioCuestionario();

        };


    // ============================================================
    // DETECTAR EL ÚLTIMO CLICK DEL DIÁLOGO
    // ============================================================

    PantallaJuego.prototype.configurarInicioCuestionario =
        function() {

            if (!this.zonaJuego) {
                return;
            }


            this.zonaJuego.addEventListener(
                'click',
                (evento) => {

                    // No hacer nada si se pulsa una opción
                    if (
                        evento.target.closest(
                            '.contenedor-opciones-juego'
                        )
                    ) {
                        return;
                    }


                    // Cuando termina el último diálogo
                    // de la entrevista comienza el quiz.
                    if (
                        this.etapa ===
                        'finalEntrevista'
                    ) {

                        this.iniciarCuestionario();

                    }

                }
            );

        };


    // ============================================================
    // INICIAR CUESTIONARIO
    // ============================================================

    PantallaJuego.prototype.iniciarCuestionario =
        function() {

            if (this.quizActivo) {
                return;
            }


            this.quizActivo = true;

            this.quizTerminado = false;

            this.quizPreguntaActual = 0;

            this.quizCorrectas = 0;

            this.quizIncorrectas = 0;

            this.etapa =
                'cuestionario';


            this.ocultarOpciones();


            // Ocultar el diálogo normal
            const dialogo =
                this.zonaJuego.querySelector(
                    '.contenedor-dialogo-juego'
                );

            if (dialogo) {
                dialogo.style.display =
                    'none';
            }


            this.mostrarPreguntaQuiz();

        };


    // ============================================================
    // MOSTRAR PREGUNTA
    // ============================================================

    PantallaJuego.prototype.mostrarPreguntaQuiz =
        function() {

            this.detenerTimerQuiz();


            this.quizRespuestaBloqueada =
                false;

            this.quizTiempoRestante =
                QUIZ_TIEMPO;


            // Limpiar cuestionario anterior

            const anterior =
                this.zonaJuego.querySelector(
                    '.quiz-pantalla'
                );

            if (anterior) {
                anterior.remove();
            }


            // ====================================================
            // PANTALLA
            // ====================================================

            const pantalla =
                document.createElement('div');

            pantalla.className =
                'quiz-pantalla';


            // ====================================================
            // FONDO
            // ====================================================

            const fondo =
                document.createElement('img');

            fondo.src =
                recursosQuiz.fondo;

            fondo.className =
                'quiz-fondo';

            fondo.draggable =
                false;

            pantalla.appendChild(
                fondo
            );


            // ====================================================
            // MARCO DE MADERA
            // ====================================================

            const marco =
                document.createElement('img');

            marco.src =
                recursosQuiz.marco;

            marco.className =
                'quiz-marco';

            marco.draggable =
                false;

            pantalla.appendChild(
                marco
            );


            // ====================================================
            // CONTENIDO
            // ====================================================

            const contenido =
                document.createElement('div');

            contenido.className =
                'quiz-contenido';


            // ====================================================
            // CONTADOR DE PREGUNTA
            // ====================================================

            const numero =
                document.createElement('div');

            numero.className =
                'quiz-numero';

            numero.textContent =
                `Pregunta ${this.quizPreguntaActual + 1} de ${preguntasQuiz.length}`;

            contenido.appendChild(
                numero
            );


            // ====================================================
            // TÍTULO / PERGAMINO
            // ====================================================

            const titulo =
                document.createElement('div');

            titulo.className =
                'quiz-titulo';


            const imagenTitulo =
                document.createElement('img');

            imagenTitulo.src =
                recursosQuiz.titulo;

            imagenTitulo.className =
                'quiz-imagen-titulo';

            imagenTitulo.draggable =
                false;

            titulo.appendChild(
                imagenTitulo
            );


            const textoTitulo =
                document.createElement('span');

            textoTitulo.textContent =
                preguntasQuiz[
                    this.quizPreguntaActual
                ].pregunta;

            textoTitulo.className =
                'quiz-texto-titulo';

            titulo.appendChild(
                textoTitulo
            );


            contenido.appendChild(
                titulo
            );


            // ====================================================
            // TIMER
            // ====================================================

            const timer =
                document.createElement('div');

            timer.className =
                'quiz-timer';

            timer.innerHTML =
                `
                    <span class="quiz-timer-icono">⏱</span>
                    <span class="quiz-timer-texto">
                        ${QUIZ_TIEMPO}
                    </span>
                `;

            contenido.appendChild(
                timer
            );


            // ====================================================
            // OPCIONES
            // ====================================================

            const opciones =
                document.createElement('div');

            opciones.className =
                'quiz-opciones';


            const pregunta =
                preguntasQuiz[
                    this.quizPreguntaActual
                ];


            pregunta.opciones.forEach(
                (opcion, indice) => {

                    const boton =
                        document.createElement('button');

                    boton.type =
                        'button';

                    boton.className =
                        'quiz-opcion';

                    boton.dataset.indice =
                        indice;


                    // Imagen del botón

                    const imagen =
                        document.createElement('img');

                    imagen.src =
                        recursosQuiz.boton;

                    imagen.className =
                        'quiz-imagen-boton';

                    imagen.draggable =
                        false;

                    boton.appendChild(
                        imagen
                    );


                    // Texto

                    const texto =
                        document.createElement('span');

                    texto.textContent =
                        opcion;

                    texto.className =
                        'quiz-texto-opcion';

                    boton.appendChild(
                        texto
                    );


                    // Click

                    boton.addEventListener(
                        'click',
                        (evento) => {

                            evento.stopPropagation();

                            this.responderPreguntaQuiz(
                                indice,
                                boton,
                                opciones
                            );

                        }
                    );


                    opciones.appendChild(
                        boton
                    );

                }
            );


            contenido.appendChild(
                opciones
            );


            // ====================================================
            // AGREGAR TODO
            // ====================================================

            pantalla.appendChild(
                contenido
            );

            this.zonaJuego.appendChild(
                pantalla
            );


            // ====================================================
            // ANIMACIÓN DE ENTRADA
            // ====================================================

            requestAnimationFrame(
                () => {

                    pantalla.classList.add(
                        'quiz-visible'
                    );

                }
            );


            // ====================================================
            // INICIAR TIMER
            // ====================================================

            this.iniciarTimerQuiz(
                timer,
                opciones
            );

        };


    // ============================================================
    // TIMER
    // ============================================================

    PantallaJuego.prototype.iniciarTimerQuiz =
        function(
            elementoTimer,
            contenedorOpciones
        ) {

            this.detenerTimerQuiz();


            this.quizTiempoRestante =
                QUIZ_TIEMPO;


            const textoTimer =
                elementoTimer.querySelector(
                    '.quiz-timer-texto'
                );


            this.quizTimer =
                setInterval(
                    () => {

                        this.quizTiempoRestante--;


                        if (textoTimer) {

                            textoTimer.textContent =
                                this.quizTiempoRestante;

                        }


                        // Últimos 10 segundos

                        if (
                            this.quizTiempoRestante <= 10
                        ) {

                            elementoTimer.classList.add(
                                'quiz-timer-peligro'
                            );

                        }


                        // Tiempo terminado

                        if (
                            this.quizTiempoRestante <= 0
                        ) {

                            this.detenerTimerQuiz();

                            this.responderPorTiempoQuiz(
                                contenedorOpciones
                            );

                        }

                    },
                    1000
                );

        };


    // ============================================================
    // DETENER TIMER
    // ============================================================

    PantallaJuego.prototype.detenerTimerQuiz =
        function() {

            if (this.quizTimer) {

                clearInterval(
                    this.quizTimer
                );

                this.quizTimer =
                    null;

            }

        };


    // ============================================================
    // RESPONDER PREGUNTA
    // ============================================================

    PantallaJuego.prototype.responderPreguntaQuiz =
        function(
            indiceSeleccionado,
            botonSeleccionado,
            contenedorOpciones
        ) {

            if (
                this.quizRespuestaBloqueada
            ) {
                return;
            }


            this.quizRespuestaBloqueada =
                true;


            this.detenerTimerQuiz();


            const pregunta =
                preguntasQuiz[
                    this.quizPreguntaActual
                ];


            const botones =
                Array.from(
                    contenedorOpciones.querySelectorAll(
                        '.quiz-opcion'
                    )
                );


            // Desactivar todos

            botones.forEach(
                boton => {

                    boton.disabled =
                        true;

                }
            );


            // ====================================================
            // RESPUESTA CORRECTA
            // ====================================================

            if (
                indiceSeleccionado ===
                pregunta.correcta
            ) {

                this.quizCorrectas++;

                this.puntos +=
                    PUNTOS_CORRECTA;

                this.actualizarPuntos();


                botonSeleccionado.classList.add(
                    'quiz-correcta'
                );

                botonSeleccionado.classList.add(
                    'quiz-acierto'
                );


                this.mostrarMensajeResultadoQuiz(
                    '¡Correcto! +70 puntos',
                    'correcto'
                );

            }


            // ====================================================
            // RESPUESTA INCORRECTA
            // ====================================================

            else {

                this.quizIncorrectas++;

                this.puntos -=
                    PUNTOS_INCORRECTA;

                this.actualizarPuntos();


                // Marcar la elegida como incorrecta

                botonSeleccionado.classList.add(
                    'quiz-incorrecta'
                );

                botonSeleccionado.classList.add(
                    'quiz-error'
                );


                // Marcar la correcta

                const botonCorrecto =
                    botones[
                        pregunta.correcta
                    ];

                if (botonCorrecto) {

                    botonCorrecto.classList.add(
                        'quiz-correcta'
                    );

                }


                this.mostrarMensajeResultadoQuiz(
                    'Respuesta incorrecta -25 puntos',
                    'incorrecto'
                );

            }


            // ====================================================
            // SIGUIENTE PREGUNTA
            // ====================================================

            setTimeout(
                () => {

                    this.siguientePreguntaQuiz();

                },
                1500
            );

        };


    // ============================================================
    // TIEMPO AGOTADO
    // ============================================================

    PantallaJuego.prototype.responderPorTiempoQuiz =
        function(
            contenedorOpciones
        ) {

            if (
                this.quizRespuestaBloqueada
            ) {
                return;
            }


            this.quizRespuestaBloqueada =
                true;


            this.quizIncorrectas++;

            this.puntos -=
                PUNTOS_INCORRECTA;

            this.actualizarPuntos();


            const pregunta =
                preguntasQuiz[
                    this.quizPreguntaActual
                ];


            const botones =
                Array.from(
                    contenedorOpciones.querySelectorAll(
                        '.quiz-opcion'
                    )
                );


            // Desactivar botones

            botones.forEach(
                boton => {

                    boton.disabled =
                        true;

                }
            );


            // Marcar la correcta

            const botonCorrecto =
                botones[
                    pregunta.correcta
                ];

            if (botonCorrecto) {

                botonCorrecto.classList.add(
                    'quiz-correcta'
                );

            }


            this.mostrarMensajeResultadoQuiz(
                '¡Se acabó el tiempo! -25 puntos',
                'incorrecto'
            );


            setTimeout(
                () => {

                    this.siguientePreguntaQuiz();

                },
                1500
            );

        };


    // ============================================================
    // MENSAJE DE RESULTADO
    // ============================================================

    PantallaJuego.prototype.mostrarMensajeResultadoQuiz =
        function(
            texto,
            tipo
        ) {

            const anterior =
                this.zonaJuego.querySelector(
                    '.quiz-mensaje-resultado'
                );

            if (anterior) {
                anterior.remove();
            }


            const mensaje =
                document.createElement('div');

            mensaje.className =
                `quiz-mensaje-resultado quiz-mensaje-${tipo}`;

            mensaje.textContent =
                texto;


            this.zonaJuego.appendChild(
                mensaje
            );


            requestAnimationFrame(
                () => {

                    mensaje.classList.add(
                        'quiz-mensaje-visible'
                    );

                }
            );

        };


    // ============================================================
    // SIGUIENTE PREGUNTA
    // ============================================================

    PantallaJuego.prototype.siguientePreguntaQuiz =
        function() {

            this.quizPreguntaActual++;


            if (
                this.quizPreguntaActual >=
                preguntasQuiz.length
            ) {

                this.finalizarCuestionario();

                return;
            }


            this.mostrarPreguntaQuiz();

        };


    // ============================================================
    // FINAL DEL CUESTIONARIO
    // ============================================================

    PantallaJuego.prototype.finalizarCuestionario =
        function() {

            this.detenerTimerQuiz();


            this.quizTerminado =
                true;

            this.quizActivo =
                false;

            this.etapa =
                'finalQuiz';


            const quiz =
                this.zonaJuego.querySelector(
                    '.quiz-pantalla'
                );

            if (quiz) {
                quiz.remove();
            }


            const mensajeAnterior =
                this.zonaJuego.querySelector(
                    '.quiz-mensaje-resultado'
                );

            if (mensajeAnterior) {
                mensajeAnterior.remove();
            }


            // Mostrar nuevamente el diálogo
            const dialogo =
                this.zonaJuego.querySelector(
                    '.contenedor-dialogo-juego'
                );

            if (dialogo) {
                dialogo.style.display =
                    '';
            }


            this.elementoNombre.textContent =
                'Linali';

            this.elementoDialogo.textContent =
                `¡Terminamos! Respondiste correctamente ${this.quizCorrectas} de ${preguntasQuiz.length} preguntas.`;


            const resultado =
                document.createElement('div');

            resultado.className =
                'quiz-resultado-final';

            resultado.innerHTML =
                `
                    <div class="quiz-resultado-titulo">
                        ¡Ronda terminada!
                    </div>

                    <div class="quiz-resultado-datos">
                        Correctas:
                        ${this.quizCorrectas}
                    </div>

                    <div class="quiz-resultado-datos">
                        Incorrectas:
                        ${this.quizIncorrectas}
                    </div>

                    <div class="quiz-resultado-puntos">
                        Puntos: ${this.puntos}
                    </div>
                `;


            this.zonaJuego.appendChild(
                resultado
            );

        };

})();

// ================================================================
// CORRECCIÓN FINAL DEL CUESTIONARIO
// UN SOLO PNG + 4 BOTONES INVISIBLES + TIMER CON IMÁGENES
// ================================================================

(() => {

    // ============================================================
    // ESPERAR A QUE APAREZCA EL CUESTIONARIO
    // ============================================================

    const observarQuiz =
        new MutationObserver(() => {

            const quizzes =
                document.querySelectorAll(
                    '.quiz-pantalla'
                );


            quizzes.forEach(
                quiz => {

                    // Evitar procesarlo muchas veces
                    if (
                        quiz.dataset.quizCorregido === 'true'
                    ) {
                        return;
                    }


                    const opciones =
                        quiz.querySelector(
                            '.quiz-opciones'
                        );


                    if (!opciones) {
                        return;
                    }


                    // =================================================
                    // MARCAR COMO CORREGIDO
                    // =================================================

                    quiz.dataset.quizCorregido =
                        'true';


                    // =================================================
                    // 1. QUITAR LOS 4 PNG REPETIDOS
                    // =================================================

                    const imagenesViejas =
                        opciones.querySelectorAll(
                            '.quiz-imagen-boton'
                        );


                    imagenesViejas.forEach(
                        imagen => {
                            imagen.remove();
                        }
                    );


                    // =================================================
                    // 2. CREAR UN ÚNICO PNG
                    // =================================================

                    const imagenUnica =
                        document.createElement('img');

                    imagenUnica.src =
                        'src/assets/botonesPreguntas.png';

                    imagenUnica.className =
                        'quiz-botones-unico';

                    imagenUnica.alt =
                        '';

                    imagenUnica.draggable =
                        false;


                    // El PNG va detrás de los botones
                    imagenUnica.style.position =
                        'absolute';

                    imagenUnica.style.left =
                        '0';

                    imagenUnica.style.top =
                        '0';

                    imagenUnica.style.width =
                        '100%';

                    imagenUnica.style.height =
                        '100%';

                    imagenUnica.style.objectFit =
                        'fill';

                    imagenUnica.style.pointerEvents =
                        'none';

                    imagenUnica.style.zIndex =
                        '1';


                    // =================================================
                    // 3. PREPARAR CONTENEDOR
                    // =================================================

                    opciones.style.position =
                        'relative';

                    opciones.style.display =
                        'block';

                    opciones.style.width =
                        '100%';


                    // La altura se toma del PNG
                    opciones.style.height =
                        'auto';


                    // =================================================
                    // 4. CONTENEDOR DEL PNG
                    // =================================================

                    const contenedorPNG =
                        document.createElement('div');

                    contenedorPNG.className =
                        'quiz-contenedor-png-unico';


                    contenedorPNG.style.position =
                        'relative';

                    contenedorPNG.style.width =
                        '100%';

                    contenedorPNG.style.height =
                        '0';

                    contenedorPNG.style.paddingBottom =
                        '50%';


                    contenedorPNG.style.zIndex =
                        '5';


                    contenedorPNG.appendChild(
                        imagenUnica
                    );


                    // =================================================
                    // 5. SACAR LOS BOTONES ACTUALES
                    // =================================================

                    const botones =
                        Array.from(
                            opciones.querySelectorAll(
                                '.quiz-opcion'
                            )
                        );


                    // Los sacamos temporalmente
                    botones.forEach(
                        boton => {
                            boton.remove();
                        }
                    );


                    // =================================================
                    // 6. AGREGAR EL PNG ÚNICO
                    // =================================================

                    opciones.innerHTML =
                        '';

                    opciones.appendChild(
                        contenedorPNG
                    );


                    // =================================================
                    // 7. VOLVER A PONER LOS 4 BOTONES
                    //    PERO AHORA INVISIBLES
                    // =================================================

                    botones.forEach(
                        (boton, indice) => {

                            // -----------------------------------------
                            // QUITAR CUALQUIER IMAGEN QUE QUEDARA
                            // -----------------------------------------

                            boton
                                .querySelectorAll('img')
                                .forEach(
                                    imagen => {
                                        imagen.remove();
                                    }
                                );


                            // -----------------------------------------
                            // ESTILO DEL BOTÓN INVISIBLE
                            // -----------------------------------------

                            boton.style.position =
                                'absolute';

                            boton.style.width =
                                '50%';

                            boton.style.height =
                                '50%';

                            boton.style.padding =
                                '0';

                            boton.style.margin =
                                '0';

                            boton.style.border =
                                'none';

                            boton.style.outline =
                                'none';

                            boton.style.background =
                                'transparent';

                            boton.style.boxShadow =
                                'none';

                            boton.style.appearance =
                                'none';

                            boton.style.webkitAppearance =
                                'none';

                            boton.style.cursor =
                                'pointer';

                            boton.style.zIndex =
                                '10';


                            // -----------------------------------------
                            // POSICIÓN
                            //
                            // 1 ─ 2
                            // 3 ─ 4
                            // -----------------------------------------

                            if (
                                indice === 0
                            ) {

                                boton.style.left =
                                    '0';

                                boton.style.top =
                                    '0';

                            }

                            else if (
                                indice === 1
                            ) {

                                boton.style.left =
                                    '50%';

                                boton.style.top =
                                    '0';

                            }

                            else if (
                                indice === 2
                            ) {

                                boton.style.left =
                                    '0';

                                boton.style.top =
                                    '50%';

                            }

                            else if (
                                indice === 3
                            ) {

                                boton.style.left =
                                    '50%';

                                boton.style.top =
                                    '50%';

                            }


                            // -----------------------------------------
                            // TEXTO
                            // -----------------------------------------

                            const texto =
                                boton.querySelector(
                                    '.quiz-texto-opcion'
                                );


                            if (texto) {

                                texto.style.position =
                                    'absolute';

                                texto.style.left =
                                    '5%';

                                texto.style.right =
                                    '5%';

                                texto.style.top =
                                    '50%';

                                texto.style.transform =
                                    'translateY(-50%)';

                                texto.style.width =
                                    '90%';

                                texto.style.textAlign =
                                    'center';

                                texto.style.pointerEvents =
                                    'none';

                                texto.style.color =
                                    '#21160f';

                                texto.style.fontFamily =
                                    "Georgia, 'Times New Roman', serif";

                                texto.style.fontSize =
                                    'clamp(14px, 1.3vw, 22px)';

                                texto.style.lineHeight =
                                    '1.15';

                                texto.style.zIndex =
                                    '11';

                            }


                            // -----------------------------------------
                            // AGREGAR BOTÓN AL CONTENEDOR
                            // -----------------------------------------

                            contenedorPNG.appendChild(
                                boton
                            );

                        }
                    );


                    // =================================================
                    // 8. TIMER
                    // =================================================

                    const timer =
                        quiz.querySelector(
                            '.quiz-timer'
                        );


                    if (timer) {

                        // No tocamos el funcionamiento del timer.
                        // Solamente cambiamos su apariencia.

                        timer.innerHTML = `

                            <img
                                class="quiz-timer-barra"
                                src="src/assets/barraCronometro.png"
                                draggable="false"
                                alt=""
                            >

                            <img
                                class="quiz-timer-reloj"
                                src="src/assets/reloj.png"
                                draggable="false"
                                alt=""
                            >

                            <span
                                class="quiz-timer-texto"
                            >
                                30
                            </span>

                        `;

                    }

                }
            );

        });


    // ============================================================
    // OBSERVAR EL JUEGO
    // ============================================================

    observarQuiz.observe(
        document.body,
        {
            childList: true,
            subtree: true
        }
    );


    // ============================================================
    // CSS
    // ============================================================

    const estilo =
        document.createElement('style');

    estilo.textContent = `

        /* ========================================================
           PNG ÚNICO DE LAS CUATRO RESPUESTAS
           ======================================================== */

        .quiz-contenedor-png-unico {

            position: relative !important;

            width: 100% !important;

            height: 0 !important;

            padding-bottom: 50% !important;

            margin: 0 auto !important;

            overflow: visible !important;

        }


        .quiz-botones-unico {

            position: absolute !important;

            left: 0 !important;

            top: 0 !important;

            width: 100% !important;

            height: 100% !important;

            object-fit: fill !important;

            display: block !important;

            pointer-events: none !important;

            z-index: 1 !important;

        }


        /* ========================================================
           BOTONES INVISIBLES
           ======================================================== */

        .quiz-contenedor-png-unico
        .quiz-opcion {

            position: absolute !important;

            width: 50% !important;

            height: 50% !important;

            padding: 0 !important;

            margin: 0 !important;

            border: none !important;

            outline: none !important;

            background: transparent !important;

            box-shadow: none !important;

            color: transparent !important;

            appearance: none !important;

            -webkit-appearance: none !important;

            z-index: 10 !important;

            cursor: pointer !important;

        }


        /* ========================================================
           TEXTO DE LAS RESPUESTAS
           ======================================================== */

        .quiz-contenedor-png-unico
        .quiz-texto-opcion {

            position: absolute !important;

            left: 5% !important;

            right: 5% !important;

            top: 50% !important;

            width: 90% !important;

            transform: translateY(-50%) !important;

            text-align: center !important;

            color: #21160f !important;

            font-family:
                Georgia,
                'Times New Roman',
                serif !important;

            font-size:
                clamp(
                    14px,
                    1.3vw,
                    22px
                ) !important;

            line-height: 1.15 !important;

            pointer-events: none !important;

            z-index: 11 !important;

        }


        /* ========================================================
           TIMER
           ======================================================== */

        .quiz-timer {

            position: absolute !important;

            display: flex !important;

            align-items: center !important;

            justify-content: center !important;

            width: 115px !important;

            height: 45px !important;

            right: 8% !important;

            top: 3% !important;

            z-index: 50 !important;

            background: transparent !important;

            border: none !important;

            box-shadow: none !important;

        }


        /* Barra de madera */

        .quiz-timer-barra {

            position: absolute !important;

            left: 0 !important;

            top: 0 !important;

            width: 100% !important;

            height: 100% !important;

            object-fit: fill !important;

            pointer-events: none !important;

            z-index: 1 !important;

        }


        /* Reloj */

        .quiz-timer-reloj {

            position: absolute !important;

            width: 43px !important;

            height: 43px !important;

            left: -20px !important;

            top: 1px !important;

            object-fit: contain !important;

            pointer-events: none !important;

            z-index: 3 !important;

        }


        /* Número */

        .quiz-timer-texto {

            position: relative !important;

            z-index: 4 !important;

            display: flex !important;

            align-items: center !important;

            justify-content: center !important;

            width: 100% !important;

            height: 100% !important;

            padding-left: 18px !important;

            color: #fff4d5 !important;

            font-family:
                Georgia,
                'Times New Roman',
                serif !important;

            font-size: 17px !important;

            font-weight: bold !important;

            text-shadow:
                1px 1px 2px
                rgba(0, 0, 0, 0.8) !important;

            pointer-events: none !important;

        }


        /* ========================================================
           TIMER EN LOS ÚLTIMOS 10 SEGUNDOS
           ======================================================== */

        .quiz-timer-peligro
        .quiz-timer-texto {

            animation:
                quizTimerParpadeo
                0.7s
                infinite alternate !important;

        }


        @keyframes quizTimerParpadeo {

            from {
                opacity: 1;
            }

            to {
                opacity: 0.45;
            }

        }

    `;


    document.head.appendChild(
        estilo
    );

})();

// ================================================================
// ARREGLO FINAL DEL CUESTIONARIO
// UN SOLO PNG + BOTONES INVISIBLES + TIMER CON IMÁGENES
// ================================================================

(() => {

    // ============================================================
    // 1. REEMPLAZAR VISUAL DE LOS 4 BOTONES
    // ============================================================

    const mostrarPreguntaOriginal =
        PantallaJuego.prototype.mostrarPreguntaQuiz;


    PantallaJuego.prototype.mostrarPreguntaQuiz =
        function() {

            // Ejecutamos tu cuestionario original.
            mostrarPreguntaOriginal.call(this);


            // Buscamos la pantalla del cuestionario.
            const quiz =
                this.zonaJuego.querySelector(
                    '.quiz-pantalla'
                );

            if (!quiz) {
                return;
            }


            // Buscamos el contenedor de las respuestas.
            const opciones =
                quiz.querySelector(
                    '.quiz-opciones'
                );

            if (!opciones) {
                return;
            }


            // ====================================================
            // LIMPIAR LOS PNG REPETIDOS
            // ====================================================

            const botones =
                Array.from(
                    opciones.querySelectorAll(
                        '.quiz-opcion'
                    )
                );


            // Guardamos los textos y las funciones de click
            // ANTES de eliminar las imágenes.
            const datosBotones =
                botones.map(
                    (boton, indice) => {

                        const texto =
                            boton.querySelector(
                                '.quiz-texto-opcion'
                            );


                        return {
                            botonOriginal: boton,
                            texto: texto
                                ? texto.textContent
                                : '',
                            indice: indice
                        };

                    }
                );


            // ====================================================
            // QUITAR LAS 4 IMÁGENES INDIVIDUALES
            // ====================================================

            botones.forEach(
                boton => {

                    const imagen =
                        boton.querySelector(
                            '.quiz-imagen-boton'
                        );

                    if (imagen) {
                        imagen.remove();
                    }

                }
            );


            // ====================================================
            // ELIMINAR CUALQUIER SPRITE ANTERIOR
            // ====================================================

            const spriteAnterior =
                opciones.querySelector(
                    '.quiz-botones-sprite'
                );

            if (spriteAnterior) {
                spriteAnterior.remove();
            }


            // ====================================================
            // CREAR UN ÚNICO PNG
            // ====================================================

            const sprite =
                document.createElement('img');

            sprite.src =
                'src/assets/botonesPreguntas.png';

            sprite.alt =
                '';

            sprite.draggable =
                false;

            sprite.className =
                'quiz-botones-sprite';


            opciones.prepend(
                sprite
            );


            // ====================================================
            // CONFIGURAR LOS 4 BOTONES INVISIBLES
            // ====================================================

            botones.forEach(
                (boton, indice) => {

                    boton.classList.add(
                        'quiz-boton-invisible'
                    );


                    // Nos aseguramos de que sea un botón
                    // completamente transparente.
                    boton.style.background =
                        'transparent';

                    boton.style.backgroundImage =
                        'none';

                    boton.style.border =
                        'none';

                    boton.style.boxShadow =
                        'none';


                    // =================================================
                    // POSICIONES
                    //
                    // 0 = arriba izquierda
                    // 1 = arriba derecha
                    // 2 = abajo izquierda
                    // 3 = abajo derecha
                    // =================================================

                    if (indice === 0) {

                        boton.style.left =
                            '0%';

                        boton.style.top =
                            '0%';

                    }

                    else if (indice === 1) {

                        boton.style.left =
                            '50%';

                        boton.style.top =
                            '0%';

                    }

                    else if (indice === 2) {

                        boton.style.left =
                            '0%';

                        boton.style.top =
                            '50%';

                    }

                    else if (indice === 3) {

                        boton.style.left =
                            '50%';

                        boton.style.top =
                            '50%';

                    }


                    // Cada zona ocupa la mitad del PNG.
                    boton.style.width =
                        '50%';

                    boton.style.height =
                        '50%';


                    // Texto encima del botón.
                    const texto =
                        boton.querySelector(
                            '.quiz-texto-opcion'
                        );

                    if (texto) {

                        texto.style.position =
                            'absolute';

                        texto.style.left =
                            '5%';

                        texto.style.right =
                            '5%';

                        texto.style.top =
                            '50%';

                        texto.style.transform =
                            'translateY(-50%)';

                        texto.style.width =
                            '90%';

                        texto.style.textAlign =
                            'center';

                        texto.style.pointerEvents =
                            'none';

                        texto.style.zIndex =
                            '5';

                    }

                }
            );


            // ====================================================
            // 2. TIMER CON TUS IMÁGENES
            // ====================================================

            const timer =
                quiz.querySelector(
                    '.quiz-timer'
                );

            if (!timer) {
                return;
            }


            // Guardamos el texto que usa tu timer original.
            const textoTimer =
                timer.querySelector(
                    '.quiz-timer-texto'
                );


            // Quitamos el emoji ⏱.
            const iconoAnterior =
                timer.querySelector(
                    '.quiz-timer-icono'
                );

            if (iconoAnterior) {
                iconoAnterior.remove();
            }


            // ====================================================
            // IMAGEN DEL RELOJ
            // ====================================================

            const reloj =
                document.createElement('img');

            reloj.src =
                'src/assets/reloj.png';

            reloj.alt =
                '';

            reloj.draggable =
                false;

            reloj.className =
                'quiz-reloj';


            // ====================================================
            // BARRA DEL CRONÓMETRO
            // ====================================================

            const barra =
                document.createElement('img');

            barra.src =
                'src/assets/barraCronometro.png';

            barra.alt =
                '';

            barra.draggable =
                false;

            barra.className =
                'quiz-barra-cronometro';


            // ====================================================
            // COLOCAR IMÁGENES
            // ====================================================

            timer.prepend(
                barra
            );

            timer.prepend(
                reloj
            );


            // ====================================================
            // FORZAR EL CONTADOR A MOSTRAR 30
            // ====================================================

            if (textoTimer) {

                textoTimer.textContent =
                    '30';

            }


            // ====================================================
            // IMPORTANTE:
            // EL TIMER ORIGINAL YA TIENE SU setInterval.
            //
            // Nosotros NO lo reemplazamos.
            // Solamente cambiamos su apariencia.
            // Así el 30 -> 29 -> 28 -> 27...
            // sigue funcionando.
            // ====================================================

        };


    // ============================================================
    // 3. CORREGIR EL TIMER PARA QUE SE VEA BIEN
    // ============================================================

    const iniciarTimerOriginal =
        PantallaJuego.prototype.iniciarTimerQuiz;


    PantallaJuego.prototype.iniciarTimerQuiz =
        function(
            elementoTimer,
            contenedorOpciones
        ) {

            // Ejecutamos el timer original.
            iniciarTimerOriginal.call(
                this,
                elementoTimer,
                contenedorOpciones
            );

        };

})();

