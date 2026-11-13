/* ==========================================
 * Pantalla Cuestionario (PantallaQuiz.js)
 * ========================================== */

const QUIZ_TIEMPO = 30;
const PUNTOS_CORRECTA = 70;
const PUNTOS_INCORRECTA = 25;

const recursosQuiz = {
    fondo: 'src/assets/fondoPreguntas.png',
    marco: 'src/assets/marcoPreguntas.png',
    titulo: 'src/assets/FondoTituloP.png',
    boton: 'src/assets/botonesPreguntas.png',
    audioCuenta: 'src/assets/321.mp3' // 🎵 Reemplaza con la ruta real de tu archivo
};

const preguntasQuiz = [
    {
        pregunta: '¿Cuál era el posicionamiento político fundamental que defendía Juan Manuel de Rosas ante la inestabilidad?',
        opciones: [
            'La instauración inmediata de un poder unitario en Buenos Aires',
            'El orden, la disciplina y la unidad bajo la causa federal',
            'La total autonomía individual de cada provincia sin pactos',
            'La subordinación política directa de la Confederación a Europa'
        ],
        correcta: 1
    },
    {
        pregunta: '¿Cómo concebía Rosas el rol de la provincia de Buenos Aires dentro de la Confederación?',
        opciones: [
            'Como una nación completamente separada del resto del territorio',
            'Como el hermano mayor y centro protector de la familia federal',
            'Como una provincia común sin ninguna responsabilidad militar',
            'Como el único estado autorizado para dictar leyes a los demás'
        ],
        correcta: 1
    },
    {
        pregunta: 'Según la visión expresada por Rosas en la entrevista, ¿cuál era el mayor peligro para el país?',
        opciones: [
            'La falta de desarrollo comercial con el continente asiático',
            'La escasez de instituciones educativas modernas',
            'La anarquía interna y las acechanzas que quebrantan el orden',
            'El exceso de debate político abierto en los periódicos'
        ],
        correcta: 2
    },
    {
        pregunta: '¿Qué postura defendía Rosas respecto a las relaciones con las demás provincias hermanas?',
        opciones: [
            'Velar estrictamente por el respeto y la soberanía de cada una',
            'Someterlas por la fuerza militar para disolver sus gobiernos',
            'Obligarlas a autofinanciar por completo la aduana porteña',
            'Desentenderse por completo de sus conflictos internos'
        ],
        correcta: 0
    },
    {
        pregunta: '¿Qué le aconsejaba Rosas a las generaciones futuras sobre cómo valorar la historia y la política?',
        opciones: [
            'Aceptar cualquier forma de gobierno extranjero para garantizar paz',
            'Priorizar la paz interior por encima de todo espíritu faccioso',
            'Olvidar los conflictos del pasado y destruir documentos antiguos',
            'Imitar ciegamente los modelos europeos sin importar el costo'
        ],
        correcta: 1
    },
    {
        pregunta: 'Al tomar la decisión crucial al final de la entrevista, ¿cuál enfoque otorgaba el mayor puntaje estratégico?',
        opciones: [
            'Cuestionar firmemente el poder centralizado del gobernador',
            'Enfatizar la necesidad absoluta de unidad y orden nacional',
            'Proponer la libre navegación de los ríos sin intervención',
            'Exigir la sanción inmediata de una Constitución centralista'
        ],
        correcta: 1
    },
    {
        pregunta: '¿Cuál era el principal enemigo político al que Rosas afirmaba combatir incansablemente?',
        opciones: [
            'El espíritu de anarquía y el desorden institucional',
            'La absoluta falta de industrias manufactureras nacionales',
            'La excesiva centralización de los bancos extranjeros',
            'El aislamiento geográfico de las provincias del Litoral'
        ],
        correcta: 0
    }
];

class PantallaQuiz {
    constructor(gestorPantallas, datos = {}) {
        this.gestorPantallas = gestorPantallas;
        this.contenedor = gestorPantallas.obtenerContenedor();
        this.datos = datos;

        this.puntos = datos.puntos || 0;
        this.epoca = 'Época Actual';
        this.quizPreguntaActual = 0;
        this.quizTiempoRestante = QUIZ_TIEMPO;
        this.quizTimer = null;
        this.quizRespuestaBloqueada = false;
        this.quizCorrectas = 0;
        this.quizIncorrectas = 0;
        
        // Guardaremos aquí el índice correcto barajado de la pregunta actual
        this.indiceCorrectoActual = 0;
    }

    renderizar() {
        this.contenedor.innerHTML = '';

        const pantalla = document.createElement('div');
        pantalla.className = 'quiz-pantalla';

        // BARRA SUPERIOR
        const barraArriba = document.createElement('div');
        barraArriba.className = 'barra-arriba-juego';

        const imagenBarra = document.createElement('img');
        imagenBarra.src = 'src/assets/barra arriba.png';
        imagenBarra.alt = '';
        imagenBarra.draggable = false;
        barraArriba.appendChild(imagenBarra);

        const textoPuntos = document.createElement('span');
        textoPuntos.className = 'puntos-juego';
        textoPuntos.textContent = `Puntos: ${this.puntos}`;
        barraArriba.appendChild(textoPuntos);

        const textoEpoca = document.createElement('span');
        textoEpoca.className = 'epoca-juego';
        textoEpoca.textContent = this.epoca;
        barraArriba.appendChild(textoEpoca);

        // TIMER EN LA BARRA SUPERIOR
        const timer = document.createElement('div');
        timer.className = 'quiz-timer';

        const barraImg = document.createElement('img');
        barraImg.src = 'src/assets/barraCronometro.png';
        barraImg.className = 'quiz-barra-cronometro';

        const relojImg = document.createElement('img');
        relojImg.src = 'src/assets/reloj.png';
        relojImg.className = 'quiz-reloj';

        const textoTimer = document.createElement('span');
        textoTimer.className = 'quiz-timer-texto';
        textoTimer.textContent = `00:${this.quizTiempoRestante < 10 ? '0' : ''}${this.quizTiempoRestante}`;

        timer.appendChild(barraImg);
        timer.appendChild(relojImg);
        timer.appendChild(textoTimer);
        barraArriba.appendChild(timer);

        pantalla.appendChild(barraArriba);

        // FONDO Y MARCO DE MADERA
        const fondo = document.createElement('img');
        fondo.src = recursosQuiz.fondo;
        fondo.className = 'quiz-fondo';
        fondo.draggable = false;
        pantalla.appendChild(fondo);

        const marco = document.createElement('img');
        marco.src = recursosQuiz.marco;
        marco.className = 'quiz-marco';
        marco.draggable = false;
        pantalla.appendChild(marco);

        // CONTENIDO
        const contenido = document.createElement('div');
        contenido.className = 'quiz-contenido';

        // PREGUNTA (PERGAMINO)
        const titulo = document.createElement('div');
        titulo.className = 'quiz-titulo';

        const imagenTitulo = document.createElement('img');
        imagenTitulo.src = recursosQuiz.titulo;
        imagenTitulo.className = 'quiz-imagen-titulo';
        imagenTitulo.draggable = false;
        titulo.appendChild(imagenTitulo);

        const preguntaDatos = preguntasQuiz[this.quizPreguntaActual];

        const textoTitulo = document.createElement('span');
        textoTitulo.textContent = preguntaDatos.pregunta;
        textoTitulo.className = 'quiz-texto-titulo';
        titulo.appendChild(textoTitulo);

        contenido.appendChild(titulo);

        // OPCIONES DE MADERA (BARAJADAS ALEATORIAMENTE)
        const opciones = document.createElement('div');
        opciones.className = 'quiz-opciones';

        const imagenUnica = document.createElement('img');
        imagenUnica.src = recursosQuiz.boton;
        imagenUnica.className = 'quiz-imagen-opciones-unica';
        imagenUnica.draggable = false;
        opciones.appendChild(imagenUnica);

        // Creamos un array de objetos con el texto y un identificador para saber si era la correcta original
        let opcionesMezcladas = preguntaDatos.opciones.map((textoOp, idx) => {
            return {
                texto: textoOp,
                esCorrecta: idx === preguntaDatos.correcta
            };
        });

        // Mezclamos al azar las opciones
        opcionesMezcladas.sort(() => Math.random() - 0.5);

        // Encontramos el nuevo índice donde quedó la respuesta correcta
        this.indiceCorrectoActual = opcionesMezcladas.findIndex(op => op.esCorrecta);

        opcionesMezcladas.forEach((opcionObj, indice) => {
            const boton = document.createElement('button');
            boton.type = 'button';
            boton.className = `quiz-opcion quiz-opcion-${indice + 1}`;

            const texto = document.createElement('span');
            texto.textContent = opcionObj.texto;
            texto.className = 'quiz-texto-opcion';
            boton.appendChild(texto);

            boton.addEventListener('click', (evento) => {
                evento.stopPropagation();
                this.responder(indice, boton, opciones, textoPuntos);
            });

            opciones.appendChild(boton);
        });

        contenido.appendChild(opciones);
        pantalla.appendChild(contenido);

        // 💡 NOTA: La barra inferior ha sido eliminada para evitar salidas del quiz.

        this.contenedor.appendChild(pantalla);

        // Cuenta regresiva inicial (solo en la primera pregunta) con fondo borroso
        if (this.quizPreguntaActual === 0) {
            this.mostrarCuentaRegresiva(timer, opciones, textoPuntos);
        } else {
            this.iniciarTimer(timer, opciones, textoPuntos);
        }
    }

mostrarCuentaRegresiva(elementoTimer, contenedorOpciones, textoPuntos) {
        const botones = Array.from(contenedorOpciones.querySelectorAll('.quiz-opcion'));
        botones.forEach(b => b.disabled = true);

        const contenidoQuiz = this.contenedor.querySelector('.quiz-contenido');
        if (contenidoQuiz) contenidoQuiz.classList.add('quiz-blur');

        // 🎵 Intentamos reproducir el audio controlando si el navegador lo bloquea
        const audioCuenta = new Audio(recursosQuiz.audioCuenta);
        audioCuenta.volume = 0.8;
        
        const reproduccion = audioCuenta.play();
        if (reproduccion !== undefined) {
            reproduccion.catch(error => {
                console.log("El navegador pausó el audio automático por políticas de interacción:", error);
            });
        }

        const overlayCuenta = document.createElement('div');
        overlayCuenta.className = 'quiz-cuenta-overlay';
        
        const numeroCuenta = document.createElement('span');
        numeroCuenta.className = 'quiz-cuenta-numero';
        overlayCuenta.appendChild(numeroCuenta);

        this.contenedor.appendChild(overlayCuenta);

        let contador = 3;
        numeroCuenta.textContent = contador;

        const intervaloCuenta = setInterval(() => {
            contador--;
            if (contador > 0) {
                numeroCuenta.textContent = contador;
            } else if (contador === 0) {
                numeroCuenta.textContent = '¡YA!';
            } else {
                clearInterval(intervaloCuenta);
                
                audioCuenta.pause();
                audioCuenta.currentTime = 0;

                overlayCuenta.remove();
                if (contenidoQuiz) contenidoQuiz.classList.remove('quiz-blur');
                
                botones.forEach(b => b.disabled = false);
                this.iniciarTimer(elementoTimer, contenedorOpciones, textoPuntos);
            }
        }, 1000);
    }

    iniciarTimer(elementoTimer, contenedorOpciones, textoPuntos) {
        this.detenerTimer();
        this.quizTiempoRestante = QUIZ_TIEMPO;
        const textoTimer = elementoTimer.querySelector('.quiz-timer-texto');

        elementoTimer.classList.remove('quiz-timer-latido');

        this.quizTimer = setInterval(() => {
            this.quizTiempoRestante--;
            if (textoTimer) {
                textoTimer.textContent = `00:${this.quizTiempoRestante < 10 ? '0' : ''}${this.quizTiempoRestante}`;
            }

            if (this.quizTiempoRestante <= 7) {
                elementoTimer.classList.add('quiz-timer-latido');
            }

            if (this.quizTiempoRestante <= 0) {
                this.detenerTimer();
                this.responderPorTiempo(contenedorOpciones, textoPuntos);
            }
        }, 1000);
    }

    detenerTimer() {
        if (this.quizTimer) {
            clearInterval(this.quizTimer);
            this.quizTimer = null;
        }
    }

    responder(indiceSeleccionado, botonSeleccionado, contenedorOpciones, textoPuntos) {
        if (this.quizRespuestaBloqueada) return;
        this.quizRespuestaBloqueada = true;
        this.detenerTimer();

        const botones = Array.from(contenedorOpciones.querySelectorAll('.quiz-opcion'));
        botones.forEach(b => b.disabled = true);

        if (indiceSeleccionado === this.indiceCorrectoActual) {
            this.quizCorrectas++;
            this.puntos += PUNTOS_CORRECTA;
            botonSeleccionado.classList.add('quiz-correcta');
        } else {
            this.quizIncorrectas++;
            this.puntos -= PUNTOS_INCORRECTA;
            botonSeleccionado.classList.add('quiz-incorrecta');
            const correcto = botones[this.indiceCorrectoActual];
            if (correcto) correcto.classList.add('quiz-correcta');
        }

        textoPuntos.textContent = `Puntos: ${this.puntos}`;

        setTimeout(() => this.siguientePregunta(), 1400);
    }

    responderPorTiempo(contenedorOpciones, textoPuntos) {
        if (this.quizRespuestaBloqueada) return;
        this.quizRespuestaBloqueada = true;
        this.quizIncorrectas++;
        this.puntos -= PUNTOS_INCORRECTA;

        const botones = Array.from(contenedorOpciones.querySelectorAll('.quiz-opcion'));
        botones.forEach(b => b.disabled = true);

        const correcto = botones[this.indiceCorrectoActual];
        if (correcto) correcto.classList.add('quiz-correcta');

        textoPuntos.textContent = `Puntos: ${this.puntos}`;

        setTimeout(() => this.siguientePregunta(), 1400);
    }

    siguientePregunta() {
        this.quizRespuestaBloqueada = false;
        this.quizPreguntaActual++;

        if (this.quizPreguntaActual >= preguntasQuiz.length) {
            this.finalizar();
            return;
        }
        this.renderizar();
    }

    finalizar() {
        this.detenerTimer();
        
        localStorage.setItem('puntos_jugador', this.puntos);

        alert(`¡Cuestionario Terminado!\nCorrectas: ${this.quizCorrectas}\nIncorrectas: ${this.quizIncorrectas}\nPuntos Totales: ${this.puntos}`);
        this.gestorPantallas.cambiarPantalla('MenuPrincipal');
    }
}