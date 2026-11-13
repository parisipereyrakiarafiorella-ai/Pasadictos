/* ==========================================
 * Pantalla Juego (PantallaJuego.js)
 * ========================================== */

class PantallaJuego {
    constructor(gestorPantallas, datos = {}) {
        this.gestorPantallas = gestorPantallas;
        this.contenedor = gestorPantallas.obtenerContenedor();
        this.datos = datos;

        // Si viene un estado guardado directo, lo aplicamos al construir
        const guardado = datos && (datos.estadoGuardado || datos);
        const estado = guardado && guardado.etapa ? guardado : (guardado && guardado._estadoPasadictos ? guardado._estadoPasadictos : null);

        if (estado && estado.etapa) {
            this.puntos = estado.puntos || 0;
            this.epoca = estado.epoca || 'Época Actual';
            this.etapa = estado.etapa || 'inicio';
            this.indiceDialogo = estado.indiceDialogo || 0;
            this.cantidadPreguntas = estado.cantidadPreguntas || 0;
            this.preguntaSeleccionada = estado.preguntaSeleccionada || null;
            this.preguntasRealizadas = Array.isArray(estado.preguntasRealizadas) ? new Set(estado.preguntasRealizadas) : new Set();
            this.preguntaEntrevistaActual = estado.indicePreguntaActual !== undefined ? estado.indicePreguntaActual : null;
            this.indiceDialogoFinalEntrevista = estado.indiceDialogoFinalEntrevista || 0;
            this.decisionEspecialRealizada = !!estado.decisionEspecialRealizada;
        } else {
            // VARIABLES POR DEFECTO (Partida Nueva)
            this.puntos = datos.puntos || 0;
            this.epoca = 'Época Actual';
            this.etapa = 'inicio';
            this.indiceDialogo = 0;
            this.cantidadPreguntas = 0;
            this.preguntasRealizadas = new Set();
            this.preguntaEntrevistaActual = null;
            this.indiceDialogoFinalEntrevista = 0;
            this.decisionEspecialRealizada = false;
        }

        // REFERENCIAS A ELEMENTOS HTML
        this.elementoDialogo = null;
        this.elementoNombre = null;
        this.contenedorOpciones = null;
        this.zonaJuego = null;
        this.textoPuntos = null;
        this.textoEpoca = null;
    }

    renderizar() {
        const pantalla = document.createElement('div');
        pantalla.className = 'pantalla-juego';

        // BARRA SUPERIOR
        const barraArriba = document.createElement('div');
        barraArriba.className = 'barra-arriba-juego';

        const imagenBarra = document.createElement('img');
        imagenBarra.src = GestorRecursos.obtenerRutaImagen('barraArriba');
        imagenBarra.alt = '';
        imagenBarra.draggable = false;
        barraArriba.appendChild(imagenBarra);

        this.textoPuntos = document.createElement('span');
        this.textoPuntos.className = 'puntos-juego';
        this.textoPuntos.textContent = `Puntos: ${this.puntos}`;
        barraArriba.appendChild(this.textoPuntos);

        this.textoEpoca = document.createElement('span');
        this.textoEpoca.className = 'epoca-juego';
        this.textoEpoca.textContent = this.epoca;
        barraArriba.appendChild(this.textoEpoca);

        pantalla.appendChild(barraArriba);

        // ZONA CENTRAL
        this.zonaJuego = document.createElement('div');
        this.zonaJuego.className = 'zona-central-juego';

        this.zonaJuego.addEventListener('click', (evento) => {
            if (evento.target.closest('.contenedor-opciones-juego')) return;
            if (['respuestaInicial', 'preguntas', 'entrevista', 'dialogoEntrevista'].includes(this.etapa)) return;
            if (this.etapa === 'inicio' || this.etapa === 'despuesRespuesta') {
                this.avanzarDialogo();
            }
        });

        pantalla.appendChild(this.zonaJuego);

        const barraAbajo = this.crearBarraInferior();
        pantalla.appendChild(barraAbajo);

        this.contenedor.appendChild(pantalla);

        this.crearDialogo();

        // RESTAURACIÓN VISUAL INTELIGENTE SEGÚN LA ETAPA
        if (this.etapa !== 'inicio' && this.etapa !== 'despuesRespuesta') {
            // Forzar gráficos de Rosas si corresponde
            if (!this.zonaJuego.querySelector('.fondo-rosas-juego')) {
                const fondoRosas = document.createElement('img');
                fondoRosas.src = GestorRecursos.obtenerRutaImagenRosas('fondoRosas');
                fondoRosas.alt = '';
                fondoRosas.className = 'fondo-rosas-juego';
                fondoRosas.draggable = false;
                this.zonaJuego.prepend(fondoRosas);
            }
            if (!this.zonaJuego.querySelector('.imagen-rosas-juego')) {
                const imagenRosas = document.createElement('img');
                imagenRosas.src = GestorRecursos.obtenerRutaImagenRosas('mRosas');
                imagenRosas.alt = 'Juan Manuel de Rosas';
                imagenRosas.className = 'imagen-rosas-juego';
                imagenRosas.draggable = false;
                this.zonaJuego.appendChild(imagenRosas);
            }

            if (this.etapa === 'entrevista') {
                this.mostrarOpcionesEntrevista();
            } else if (this.etapa === 'dialogoEntrevista') {
                if (this.preguntaEntrevistaActual !== null && typeof mostrarDialogoActualEntrevistaRestaurar === 'function') {
                    // Mantiene el diálogo activo de la pregunta
                }
                this.mostrarOpcionesEntrevista();
            } else if (this.etapa === 'dialogosFinalesEntrevista') {
                this.mostrarDialogoFinalEntrevista();
            } else {
                this.mostrarDialogoActual();
            }
        } else {
            this.mostrarDialogoActual();
            this.mostrarTutorialDialogo();
        }
    }

    crearDialogo() {
        const contenedorDialogo = document.createElement('div');
        contenedorDialogo.className = 'contenedor-dialogo-juego';

        const imagenDialogo = document.createElement('img');
        imagenDialogo.src = GestorRecursos.obtenerRutaImagen('dialogo');
        imagenDialogo.alt = '';
        imagenDialogo.draggable = false;
        contenedorDialogo.appendChild(imagenDialogo);

        const contenedorNombre = document.createElement('div');
        contenedorNombre.className = 'nombre-personaje-juego';

        const imagenNombre = document.createElement('img');
        imagenNombre.src = GestorRecursos.obtenerRutaImagen('nombrePersonaje');
        imagenNombre.alt = 'Nombre del personaje';
        imagenNombre.draggable = false;
        contenedorNombre.appendChild(imagenNombre);

        this.elementoNombre = document.createElement('span');
        this.elementoNombre.className = 'texto-nombre-personaje';
        this.elementoNombre.textContent = 'Nombre';
        contenedorNombre.appendChild(this.elementoNombre);

        contenedorDialogo.appendChild(contenedorNombre);

        this.elementoDialogo = document.createElement('p');
        this.elementoDialogo.className = 'texto-dialogo-juego';
        contenedorDialogo.appendChild(this.elementoDialogo);

        this.zonaJuego.appendChild(contenedorDialogo);

        this.contenedorOpciones = document.createElement('div');
        this.contenedorOpciones.className = 'contenedor-opciones-juego';
        this.contenedorOpciones.style.display = 'none';
        this.zonaJuego.appendChild(this.contenedorOpciones);
    }

    obtenerDialogosIniciales() {
        return [
            { nombre: '???', texto: '...' },
            { nombre: '???', texto: '¿Donde estoy?' },
            { nombre: '???', texto: '¡Entonces...' },
            { nombre: '???', texto: '¡Entonces... funcionó!' },
            { nombre: '???', texto: 'No creía que esto realmente sería posible' },
            { nombre: '???', texto: '¡Es increíble!' },
            { nombre: '???', texto: '(No puedo creer que viajé al pasado)' },
            { nombre: '???', texto: '¡Señor! Disculpe...' },
            { nombre: 'Juan Manuel de Rosas', texto: '¿Qué?' },
            { nombre: 'Linali', texto: '¿Qué tal? Soy Linali, reportera' },
            { nombre: 'Linali', texto: '¿Tendría un momento para charlar conmigo? Me encantaría contar con su testimonio para un informe que estoy haciendo' },
            { nombre: 'Juan Manuel de Rosas', texto: '¿Reportera?' },
            { nombre: 'Juan Manuel de Rosas', texto: '¿Reportera? ¿Informe?' },
            { nombre: 'Juan Manuel de Rosas', texto: '¿Reportera? ¿Informe? Palabras raras usa usted, señorita' },
            { nombre: 'Juan Manuel de Rosas', texto: 'Y más rara aún es su vestimenta' },
            { nombre: 'Linali', texto: '¿Eh-?' },
            { nombre: 'Juan Manuel de Rosas', texto: 'Un hombre en mi posición no concede su tiempo a la ligera, y menos para charlas tan triviales' },
            { nombre: 'Juan Manuel de Rosas', texto: 'Hable rápido, que las tareas del Gobierno no esperan' },
            { nombre: 'Linali', texto: '¡Se lo agradezco mucho! Podría decirme...' }
        ];
    }

    mostrarDialogoActual() {
        let dialogos = [];
        if (this.etapa === 'inicio') {
            dialogos = this.obtenerDialogosIniciales();
        } else if (this.etapa === 'despuesRespuesta') {
            dialogos = this.obtenerDialogosDespuesRespuesta();
        }

        if (dialogos.length === 0) return;
        const dialogo = dialogos[this.indiceDialogo];
        if (dialogo) {
            this.elementoNombre.textContent = dialogo.nombre;
            this.elementoDialogo.textContent = dialogo.texto;
        }
    }

    avanzarDialogo() {
        let cantidadDialogos = 0;
        if (this.etapa === 'inicio') {
            cantidadDialogos = this.obtenerDialogosIniciales().length;
        } else if (this.etapa === 'despuesRespuesta') {
            cantidadDialogos = this.obtenerDialogosDespuesRespuesta().length;
        }

        this.indiceDialogo++;
        if (this.indiceDialogo < cantidadDialogos) {
            this.mostrarDialogoActual();
            return;
        }

        if (this.etapa === 'inicio') {
            this.indiceDialogo = 0;
            this.etapa = 'respuestaInicial';
            this.mostrarOpcionesRespuestaInicial();
            return;
        }

        if (this.etapa === 'despuesRespuesta') {
            this.indiceDialogo = 0;
            this.etapa = 'entrevista';
            if (typeof this.mostrarOpcionesEntrevista === 'function') {
                this.mostrarOpcionesEntrevista();
            }
            return;
        }
    }

    mostrarOpcionesRespuestaInicial() {
        this.limpiarOpciones();
        const opciones = ['Sí', 'No', 'Capaz', 'Qué'];
        this.mostrarMenuOpciones(opciones, (opcion) => {
            this.puntos += 10;
            this.actualizarPuntos();
            this.ocultarOpciones();
            this.indiceDialogo = 0;
            this.etapa = 'despuesRespuesta';
            this.mostrarDialogoActual();
        });
    }

    obtenerDialogosDespuesRespuesta() {
        return [
            { nombre: 'Linali', texto: 'Comprendo la gravedad de la situación institucional que le toca presidir.' },
            { nombre: 'Linali', texto: 'Cada provincia busca mantener su autonomía mientras se debate el rumbo de la nación.' },
            { nombre: 'Linali', texto: 'Es un escenario sumamente delicado para la política de nuestro país.' }
        ];
    }

    mostrarMenuOpciones(opciones, funcionSeleccion) {
        this.contenedorOpciones.style.display = 'flex';

        const fondo = document.createElement('img');
        fondo.src = 'src/assets/pergamino.png';
        fondo.alt = '';
        fondo.className = 'fondo-opciones-juego';
        fondo.draggable = false;
        this.contenedorOpciones.appendChild(fondo);

        const lista = document.createElement('div');
        lista.className = 'lista-opciones-juego';

        opciones.forEach((opcion, indice) => {
            const boton = document.createElement('button');
            boton.type = 'button';
            boton.className = 'boton-opcion-juego';

            const imagen = document.createElement('img');
            imagen.src = GestorRecursos.obtenerRutaImagen('botonOpciones');
            imagen.alt = '';
            imagen.draggable = false;
            boton.appendChild(imagen);

            const texto = document.createElement('span');
            texto.textContent = opcion;
            boton.appendChild(texto);

            boton.addEventListener('click', (evento) => {
                evento.stopPropagation();
                funcionSeleccion(opcion, indice);
            });

            lista.appendChild(boton);
        });

        this.contenedorOpciones.appendChild(lista);
    }

    ocultarOpciones() {
        this.contenedorOpciones.style.display = 'none';
        this.limpiarOpciones();
    }

    limpiarOpciones() {
        if (this.contenedorOpciones) {
            this.contenedorOpciones.innerHTML = '';
        }
    }

    crearBarraInferior() {
        const barra = document.createElement('div');
        barra.className = 'barra-abajo-juego';

        const botonSalir = this.crearBotonBarra('Salir', 'ConfirmacionSalir');
        barra.appendChild(botonSalir);

        const botonGuardar = this.crearBotonBarra('Guardar', null);
        botonGuardar.addEventListener('click', (evento) => {
            evento.stopPropagation();
            if (this.gestorPantallas && typeof this.gestorPantallas.cambiarPantalla === 'function') {
                this.gestorPantallas.cambiarPantalla('PantallaCargar', {
                    modo: 'guardar',
                    instanciaJuego: this
                });
            }
        });
        barra.appendChild(botonGuardar);

        const botonInventario = this.crearBotonBarra('Inventario', null);
        botonInventario.addEventListener('click', (evento) => {
            evento.stopPropagation();
            this.abrirModalInventario();
        });
        barra.appendChild(botonInventario);

        const botonOpciones = this.crearBotonBarra('Opciones', null);
        botonOpciones.addEventListener('click', (evento) => {
            evento.stopPropagation();
            this.abrirModalOpciones();
        });
        barra.appendChild(botonOpciones);

        const botonAyuda = this.crearBotonBarra('Ayuda', null);
        botonAyuda.addEventListener('click', (evento) => {
            evento.stopPropagation();
            this.abrirModalAyuda();
        });
        barra.appendChild(botonAyuda);

        return barra;
    }

    abrirModalOpciones() {
        if (document.getElementById('modal-opciones-flotante')) return;
        const modal = document.createElement('div');
        modal.id = 'modal-opciones-flotante';
        modal.className = 'pantalla-opciones';
        modal.style.position = 'absolute';
        modal.style.inset = '0';
        modal.style.zIndex = '9999';

        const fondo = 'src/assets/fondoOpciones.png';
        const cartelTitulo = 'src/assets/FondoTitulo.png';
        const pergamino = 'src/assets/pergamino-opciones.png';
        const flechaTexto = 'src/assets/FondoTextos.png';
        const barraBase = 'src/assets/recorridorDeBoton.png';
        const botonSlider = 'src/assets/botonQueSeMueve.png';
        const btnAtras = 'src/assets/atras.png';

        const sfxActual = localStorage.getItem('opciones_sfx') || 80;
        const musicaActual = localStorage.getItem('opciones_musica') || 50;
        const brilloActual = localStorage.getItem('opciones_brillo') || 90;

        modal.innerHTML = `
            <img src="${fondo}" class="opciones-fondo-img" alt="Fondo Opciones">
            <button class="btn-opciones-atras" id="btn-cerrar-modal-opciones">
                <img src="${btnAtras}" alt="Volver">
            </button>
            <div class="opciones-cartel-titulo">
                <img src="${cartelTitulo}" alt="Cartel Opciones">
                <h2>Opciones</h2>
            </div>
            <div class="opciones-pergamino-contenedor">
                <img src="${pergamino}" class="img-pergamino-fondo" alt="Pergamino">
                <div class="opciones-contenido-filas">
                    <div class="opciones-fila">
                        <div class="etiqueta-madera"><img src="${flechaTexto}" alt="SFX"><span>SFX</span></div>
                        <div class="slider-contenedor" id="slider-sfx">
                            <img src="${barraBase}" class="img-barra-slider" alt="Barra Slider">
                            <input type="range" min="0" max="100" value="${sfxActual}" class="input-range-custom" id="input-sfx">
                            <img src="${botonSlider}" class="img-boton-slider" id="thumb-sfx" alt="Botón Deslizante">
                        </div>
                    </div>
                    <div class="opciones-fila">
                        <div class="etiqueta-madera"><img src="${flechaTexto}" alt="Musica"><span>Musica</span></div>
                        <div class="slider-contenedor" id="slider-musica">
                            <img src="${barraBase}" class="img-barra-slider" alt="Barra Slider">
                            <input type="range" min="0" max="100" value="${musicaActual}" class="input-range-custom" id="input-musica">
                            <img src="${botonSlider}" class="img-boton-slider" id="thumb-musica" alt="Botón Deslizante">
                        </div>
                    </div>
                    <div class="opciones-fila">
                        <div class="etiqueta-madera"><img src="${flechaTexto}" alt="Brillo"><span>Brillo</span></div>
                        <div class="slider-contenedor" id="slider-brillo">
                            <img src="${barraBase}" class="img-barra-slider" alt="Barra Slider">
                            <input type="range" min="0" max="100" value="${brilloActual}" class="input-range-custom" id="input-brillo">
                            <img src="${botonSlider}" class="img-boton-slider" id="thumb-brillo" alt="Botón Deslizante">
                        </div>
                    </div>
                </div>
            </div>
        `;

        modal.querySelector('#btn-cerrar-modal-opciones').addEventListener('click', () => {
            modal.remove();
        });

        ['sfx', 'musica', 'brillo'].forEach(id => {
            const input = modal.querySelector(`#input-${id}`);
            const thumb = modal.querySelector(`#thumb-${id}`);
            if (input && thumb) {
                const actualizarPosicion = () => {
                    const min = parseFloat(input.min);
                    const max = parseFloat(input.max);
                    const val = parseFloat(input.value);
                    const porcentaje = (val - min) / (max - min);
                    thumb.style.left = `calc(${porcentaje * 100}% - ${porcentaje * 2.8}rem)`;
                    localStorage.setItem(`opciones_${id}`, val);

                    if (id === 'brillo') {
                        const factorBrillo = 0.35 + (val / 100) * 0.95;
                        document.body.style.filter = `brightness(${factorBrillo})`;
                    }
                };
                input.addEventListener('input', actualizarPosicion);
                actualizarPosicion();
            }
        });

        this.contenedor.appendChild(modal);
    }

    abrirModalAyuda() {
        if (document.getElementById('modal-ayuda-flotante')) return;
        const modal = document.createElement('div');
        modal.id = 'modal-ayuda-flotante';
        modal.style.position = 'absolute';
        modal.style.inset = '0';
        modal.style.zIndex = '9999';
        this.contenedor.appendChild(modal);

        const gestorFalso = {
            obtenerContenedor: () => modal,
            cambiarPantalla: () => modal.remove(),
            volverPantalla: () => modal.remove()
        };

        if (typeof PantallaAyuda !== 'undefined') {
            const pantallaAyuda = new PantallaAyuda(gestorFalso);
            pantallaAyuda.renderizar();
            setTimeout(() => {
                const botonAtrasAyuda = modal.querySelector('.btn-opciones-atras, .btn-atras, button');
                if (botonAtrasAyuda) {
                    const nuevoBoton = botonAtrasAyuda.cloneNode(true);
                    botonAtrasAyuda.parentNode.replaceChild(nuevoBoton, botonAtrasAyuda);
                    nuevoBoton.addEventListener('click', (e) => {
                        e.stopPropagation();
                        modal.remove();
                    });
                }
            }, 50);
        } else {
            modal.innerHTML = '<div style="color:white; padding:20px; text-align:center;">Error: PantallaAyuda no está definida.</div>';
            setTimeout(() => modal.remove(), 2000);
        }
    }

    abrirModalInventario() {
        if (document.getElementById('modal-inventario-flotante')) return;
        const modal = document.createElement('div');
        modal.id = 'modal-inventario-flotante';
        modal.style.position = 'absolute';
        modal.style.inset = '0';
        modal.style.zIndex = '9999';
        this.contenedor.appendChild(modal);

        const gestorFalso = {
            obtenerContenedor: () => modal,
            cambiarPantalla: () => modal.remove(),
            volverPantalla: () => modal.remove()
        };

        if (typeof PantallaInventario !== 'undefined') {
            const pantallaInventario = new PantallaInventario(gestorFalso);
            pantallaInventario.renderizar();
            setTimeout(() => {
                const botonAtrasInv = modal.querySelector('.btn-opciones-atras, .btn-atras, button');
                if (botonAtrasInv) {
                    const nuevoBoton = botonAtrasInv.cloneNode(true);
                    botonAtrasInv.parentNode.replaceChild(nuevoBoton, botonAtrasInv);
                    nuevoBoton.addEventListener('click', (e) => {
                        e.stopPropagation();
                        modal.remove();
                    });
                }
            }, 50);
        } else {
            modal.innerHTML = '<div style="color: white; padding: 20px; text-align:center;">Error: PantallaInventario no está definida.</div>';
            setTimeout(() => modal.remove(), 2000);
        }
    }

    crearBotonBarra(texto, pantallaDestino) {
        const boton = document.createElement('button');
        boton.type = 'button';
        boton.className = 'boton-barra-juego';

        const imagen = document.createElement('img');
        imagen.src = GestorRecursos.obtenerRutaImagen('botonesAbajo');
        imagen.alt = '';
        imagen.draggable = false;
        imagen.className = 'imagen-boton-barra-juego';
        boton.appendChild(imagen);

        const textoBoton = document.createElement('span');
        textoBoton.textContent = texto;
        textoBoton.className = 'texto-boton-barra-juego';
        boton.appendChild(textoBoton);

        if (pantallaDestino) {
            boton.addEventListener('click', (evento) => {
                evento.stopPropagation();
                this.gestorPantallas.cambiarPantalla(pantallaDestino);
            });
        }

        return boton;
    }

    actualizarPuntos() {
        if (this.textoPuntos) {
            this.textoPuntos.textContent = `Puntos: ${this.puntos}`;
        }
    }

    mostrarTutorialDialogo() {
        if (sessionStorage.getItem('tutorial_dialogo_visto')) return;
        const tutorial = document.createElement('div');
        tutorial.className = 'tutorial-flotante';
        tutorial.innerHTML = '<span>Haz clic en la pantalla para avanzar los diálogos</span>';
        this.contenedor.appendChild(tutorial);

        const ocultarTutorial = () => {
            tutorial.remove();
            sessionStorage.setItem('tutorial_dialogo_visto', 'true');
            window.removeEventListener('click', ocultarTutorial);
        };

        setTimeout(() => {
            window.addEventListener('click', ocultarTutorial);
        }, 100);
    }
}

/* ==========================================
 * ESCENA Y ENTREVISTA DE JUAN MANUEL DE ROSAS
 * ========================================== */

(() => {
    const mostrarDialogoOriginal = PantallaJuego.prototype.mostrarDialogoActual;
    PantallaJuego.prototype.mostrarDialogoActual = function() {
        mostrarDialogoOriginal.call(this);
        if (!this.zonaJuego) return;

        const textoActual = this.elementoDialogo ? this.elementoDialogo.textContent.trim() : '';
        const nombreActual = this.elementoNombre ? this.elementoNombre.textContent.trim() : '';

        if (textoActual.toLowerCase().includes('¡entonces... funcionó!')) {
            if (!this.zonaJuego.querySelector('.fondo-rosas-juego')) {
                const fondoRosas = document.createElement('img');
                fondoRosas.src = GestorRecursos.obtenerRutaImagenRosas('fondoRosas');
                fondoRosas.alt = '';
                fondoRosas.className = 'fondo-rosas-juego';
                fondoRosas.draggable = false;
                this.zonaJuego.prepend(fondoRosas);
            }
        }

        if (nombreActual === 'Juan Manuel de Rosas' && textoActual === '¿Qué?') {
            if (!this.zonaJuego.querySelector('.imagen-rosas-juego')) {
                const imagenRosas = document.createElement('img');
                imagenRosas.src = GestorRecursos.obtenerRutaImagenRosas('mRosas');
                imagenRosas.alt = 'Juan Manuel de Rosas';
                imagenRosas.className = 'imagen-rosas-juego';
                imagenRosas.draggable = false;
                this.zonaJuego.appendChild(imagenRosas);
            }
        }
    };
})();

(() => {
    const mostrarDialogoAnterior = PantallaJuego.prototype.mostrarDialogoActual;

    const preguntasEntrevista = [
        {
            pregunta: '¿Cómo ve la situación del país en este momento?',
            respuesta: 'La situación es harto compleja, señorita. Nos hallamos lidiando incansablemente contra la anarquía y las acechanzas de quienes pretenden quebrantar el orden sagrado de nuestra Confederación.'
        },
        {
            pregunta: '¿Qué piensa que necesita nuestro país para salir adelante?',
            respuesta: 'Se requiere, ante todo, orden, disciplina y una férrea unidad en defensa de la causa federal.'
        },
        {
            pregunta: '¿Qué importancia tiene Buenos Aires para usted?',
            respuesta: 'Buenos Aires cumple el riguroso deber de ser el hermano mayor y el centro protector de la gran familia federal.'
        },
        {
            pregunta: '¿Qué mensaje le daría a las personas de nuestra época?',
            respuesta: 'Les aconsejaría que reflexionen con profunda seriedad sobre los sacrificios que ha costado forjar esta patria.'
        }
    ];

    const iniciarEntrevista = function() {
        this.etapa = 'entrevista';
        this.preguntasRealizadas = new Set();
        this.preguntaEntrevistaActual = null;
        this.dialogoEntrevistaActual = null;
        this.mostrarOpcionesEntrevista();
    };

    PantallaJuego.prototype.mostrarDialogoActual = function() {
        mostrarDialogoAnterior.call(this);
        if (!this.elementoDialogo || !this.elementoNombre) return;

        const textoActual = this.elementoDialogo.textContent.trim();

        if (textoActual === '¡Se lo agradezco mucho! Podría decirme...') {
            if (this.etapa !== 'entrevista' && this.etapa !== 'dialogoEntrevista') {
                iniciarEntrevista.call(this);
                return;
            }
        }

        if (this.etapa === 'dialogoEntrevista') {
            const dialogo = this.dialogoEntrevistaActual;
            if (!dialogo) return;
            this.elementoNombre.textContent = dialogo.nombre;
            this.elementoDialogo.textContent = dialogo.texto;
        }
    };

    PantallaJuego.prototype.mostrarOpcionesEntrevista = function() {
        this.ocultarOpciones();
        const opciones = preguntasEntrevista.map(pregunta => pregunta.pregunta);

        if (this.preguntasRealizadas && this.preguntasRealizadas.size === preguntasEntrevista.length) {
            if (!this.decisionEspecialRealizada) {
                this.mostrarDecisionCrucial();
                return;
            }
            opciones.push('Listo, ya está');
        }

        this.mostrarMenuOpciones(opciones, (opcion, indice) => {
            if (opcion === 'Listo, ya está') {
                this.ocultarOpciones();
                this.mostrarDialogosFinalesEntrevista();
                return;
            }

            this.preguntaEntrevistaActual = indice;
            this.preguntasRealizadas.add(indice);
            this.ocultarOpciones();
            this.etapa = 'dialogoEntrevista';

            this.dialogoEntrevistaActual = {
                nombre: 'Linali',
                texto: preguntasEntrevista[indice].pregunta
            };

            this.elementoNombre.textContent = this.dialogoEntrevistaActual.nombre;
            this.elementoDialogo.textContent = this.dialogoEntrevistaActual.texto;
        });
    };

    PantallaJuego.prototype.mostrarDecisionCrucial = function() {
        this.ocultarOpciones();
        this.elementoNombre.textContent = 'Linali';
        this.elementoDialogo.textContent = 'Antes de concluir la entrevista, debo definir la postura principal de mi informe... ¿Qué enfoque le daré?';

        const opcionesDecision = [
            'Enfatizar la necesidad de unidad y orden nacional',
            'Cuestionar firmemente el poder centralizado'
        ];

        this.mostrarMenuOpciones(opcionesDecision, (opcionSeleccionada) => {
            let esAcierto = false;
            if (opcionSeleccionada.includes('unidad y orden')) {
                this.puntos += 50;
                esAcierto = true;
            } else {
                this.puntos -= 20;
                esAcierto = false;
            }

            this.actualizarPuntos();
            this.decisionEspecialRealizada = true;

            if (this.textoPuntos) {
                const claseColor = esAcierto ? 'puntos-brillo-verde' : 'puntos-brillo-rojo';
                this.textoPuntos.classList.add(claseColor);
                setTimeout(() => {
                    this.textoPuntos.classList.remove(claseColor);
                }, 290);
            }

            this.ocultarOpciones();
            this.mostrarOpcionesEntrevista();
        });
    };

    PantallaJuego.prototype.avanzarEntrevista = function() {
        if (this.preguntaEntrevistaActual === null) return;

        if (this.elementoNombre.textContent === 'Linali') {
            const indice = this.preguntaEntrevistaActual;
            this.elementoNombre.textContent = 'Juan Manuel de Rosas';
            this.elementoDialogo.textContent = preguntasEntrevista[indice].respuesta;
            return;
        }

        if (this.elementoNombre.textContent === 'Juan Manuel de Rosas') {
            this.preguntaEntrevistaActual = null;
            this.etapa = 'entrevista';
            this.mostrarOpcionesEntrevista();
        }
    };

    PantallaJuego.prototype.mostrarDialogosFinalesEntrevista = function() {
        this.etapa = 'dialogosFinalesEntrevista';
        this.dialogosFinalesEntrevista = [
            { nombre: 'Linali', texto: 'Muchas gracias por su tiempo, señor Rosas. Creo que esta entrevista será muy interesante' },
            { nombre: 'Juan Manuel de Rosas', texto: 'Ha sido un placer responder a sus preguntas, señorita' },
            { nombre: 'Juan Manuel de Rosas', texto: 'Ahora le toca a usted responder algunas preguntas, preparese' },
            { nombre: 'Juan Manuel de Rosas', texto: 'Tenes 30 segundos para responder cada pregunta, asegurate de elegit la opcion correcta' },
            { nombre: 'Juan Manuel de Rosas', texto: 'Y quiza' },
            { nombre: 'Juan Manuel de Rosas', texto: 'Obtengas una recompensa' },
            { nombre: 'Juan Manuel de Rosas', texto: 'Buena suerte' }
        ];
        this.indiceDialogoFinalEntrevista = 0;
        this.mostrarDialogoFinalEntrevista();
    };

    PantallaJuego.prototype.mostrarDialogoFinalEntrevista = function() {
        const dialogo = this.dialogosFinalesEntrevista[this.indiceDialogoFinalEntrevista];
        if (!dialogo) return;
        this.elementoNombre.textContent = dialogo.nombre;
        this.elementoDialogo.textContent = dialogo.texto;
    };

    const configurarClickEntrevista = function() {
        if (!this.zonaJuego) return;
        this.zonaJuego.addEventListener('click', (evento) => {
            if (evento.target.closest('.contenedor-opciones-juego')) return;

            if (this.etapa === 'finalEntrevista') {
                this.gestorPantallas.cambiarPantalla('PantallaQuiz', { puntos: this.puntos });
                return;
            }

            if (this.etapa === 'dialogoEntrevista') {
                this.avanzarEntrevista();
                return;
            }

            if (this.etapa === 'dialogosFinalesEntrevista') {
                this.indiceDialogoFinalEntrevista++;
                if (this.indiceDialogoFinalEntrevista < this.dialogosFinalesEntrevista.length) {
                    this.mostrarDialogoFinalEntrevista();
                } else {
                    this.etapa = 'finalEntrevista';
                }
            }
        });
    };

    const renderizarAnterior = PantallaJuego.prototype.renderizar;
    PantallaJuego.prototype.renderizar = function() {
        renderizarAnterior.call(this);
        configurarClickEntrevista.call(this);
    };
})();

/* ==========================================
 * EFECTO DE ROSAS SEGÚN QUIÉN HABLA
 * ========================================== */
(() => {
    function actualizarAspectoRosas() {
        if (!this.zonaJuego || !this.elementoNombre) return;
        const nombre = this.elementoNombre.textContent.trim().toLowerCase();
        this.zonaJuego.classList.remove('linali-hablando', 'rosas-hablando');

        if (nombre === 'linali') {
            this.zonaJuego.classList.add('linali-hablando');
        } else if (nombre === 'juan manuel de rosas') {
            this.zonaJuego.classList.add('rosas-hablando');
        }
    }

    const esperarPantalla = setInterval(() => {
        const pantallas = document.querySelectorAll('.zona-central-juego');
        if (pantallas.length === 0) return;
        clearInterval(esperarPantalla);

        pantallas.forEach(zona => {
            const nombre = zona.querySelector('.texto-nombre-personaje');
            if (!nombre) return;

            actualizarAspectoRosas.call({ zonaJuego: zona, elementoNombre: nombre });

            const observador = new MutationObserver(() => {
                actualizarAspectoRosas.call({ zonaJuego: zona, elementoNombre: nombre });
            });

            observador.observe(nombre, { childList: true, characterData: true, subtree: true });
        });
    }, 100);
})();

