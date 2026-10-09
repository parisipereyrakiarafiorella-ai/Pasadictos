class PantallaOpciones {
    constructor(gestorPantallas) {
        this.gestorPantallas = gestorPantallas;
        this.contenedorApp = gestorPantallas.obtenerContenedor();

        // Cargar o iniciar valores predeterminados
        this.sfx = parseInt(localStorage.getItem('opciones_sfx')) || 80;
        this.musica = parseInt(localStorage.getItem('opciones_musica')) || 50;
        this.brillo = parseInt(localStorage.getItem('opciones_brillo')) || 90;
        
        this.resoluciones = ['1920 x 1080', '1366 x 768', '1280 x 720'];
        this.idxResolucion = parseInt(localStorage.getItem('opciones_idxRes')) || 0;

        // Aplicar el brillo guardado en cuanto se crea la pantalla
        this.aplicarFiltroBrillo(this.brillo);
    }

    // Convierte el valor de 0 a 100 en un filtro de CSS brightness()
    aplicarFiltroBrillo(valor) {
        // Mínimo de 0.35 (35%) para que la pantalla no quede totalmente negra si bajan a 0
        const factorBrillo = 0.35 + (valor / 100) * 0.95; 
        document.body.style.filter = `brightness(${factorBrillo})`;
    }

    obtenerRuta(clave, rutaPorDefecto) {
        if (typeof GestorRecursos !== 'undefined' && typeof GestorRecursos.obtenerRutaImagen === 'function') {
            const ruta = GestorRecursos.obtenerRutaImagen(clave);
            if (ruta) return ruta;
        }
        return rutaPorDefecto;
    }

    renderizar() {
        this.contenedorApp.innerHTML = '';

        const contenedor = document.createElement('div');
        contenedor.className = 'pantalla-opciones';

        const fondo = 'src/assets/fondoOpciones.png';
        const cartelTitulo = 'src/assets/FondoTitulo.png';
        const pergamino = 'src/assets/pergamino-opciones.png';
        const flechaTexto = 'src/assets/FondoTextos.png';
        const barraBase = 'src/assets/recorridorDeBoton.png';
        const botonSlider = 'src/assets/botonQueSeMueve.png';
        const btnIzq = 'src/assets/botonIzquierda.png';
        const btnDer = 'src/assets/botonDerecha.png';
        const btnAtras = 'src/assets/atras.png';

        contenedor.innerHTML = `
            <!-- Fondo principal -->
            <img src="${fondo}" class="opciones-fondo-img" alt="Fondo Opciones">

            <!-- Botón Volver -->
            <button class="btn-opciones-atras" id="btn-atras-opciones">
                <img src="${btnAtras}" alt="Volver">
            </button>

            <!-- Cartel Título -->
            <div class="opciones-cartel-titulo">
                <img src="${cartelTitulo}" alt="Cartel Opciones">
                <h2>Opciones</h2>
            </div>

            <!-- Pergamino Central -->
            <div class="opciones-pergamino-contenedor">
                <img src="${pergamino}" class="img-pergamino-fondo" alt="Pergamino">

                <div class="opciones-contenido-filas">
                    <!-- Fila 1: SFX -->
                    <div class="opciones-fila">
                        <div class="etiqueta-madera">
                            <img src="${flechaTexto}" alt="SFX">
                            <span>SFX</span>
                        </div>
                        <div class="slider-contenedor" id="slider-sfx">
                            <img src="${barraBase}" class="img-barra-slider" alt="Barra Slider">
                            <input type="range" min="0" max="100" value="${this.sfx}" class="input-range-custom" id="input-sfx">
                            <img src="${botonSlider}" class="img-boton-slider" id="thumb-sfx" alt="Botón Deslizante">
                        </div>
                    </div>

                    <!-- Fila 2: Música -->
                    <div class="opciones-fila">
                        <div class="etiqueta-madera">
                            <img src="${flechaTexto}" alt="Musica">
                            <span>Musica</span>
                        </div>
                        <div class="slider-contenedor" id="slider-musica">
                            <img src="${barraBase}" class="img-barra-slider" alt="Barra Slider">
                            <input type="range" min="0" max="100" value="${this.musica}" class="input-range-custom" id="input-musica">
                            <img src="${botonSlider}" class="img-boton-slider" id="thumb-musica" alt="Botón Deslizante">
                        </div>
                    </div>

                    <!-- Fila 3: Brillo -->
                    <div class="opciones-fila">
                        <div class="etiqueta-madera">
                            <img src="${flechaTexto}" alt="Brillo">
                            <span>Brillo</span>
                        </div>
                        <div class="slider-contenedor" id="slider-brillo">
                            <img src="${barraBase}" class="img-barra-slider" alt="Barra Slider">
                            <input type="range" min="0" max="100" value="${this.brillo}" class="input-range-custom" id="input-brillo">
                            <img src="${botonSlider}" class="img-boton-slider" id="thumb-brillo" alt="Botón Deslizante">
                        </div>
                    </div>

                    <!-- Fila 4: Resolución -->
                    <div class="opciones-fila">
                        <div class="etiqueta-madera">
                            <img src="${flechaTexto}" alt="Resolución">
                            <span>Resolución</span>
                        </div>
                        <div class="selector-resolucion">
                            <button class="btn-res-flecha" id="btn-res-izq">
                                <img src="${btnIzq}" alt="Anterior">
                            </button>
                            <span class="texto-resolucion" id="texto-resolucion-valor">${this.resoluciones[this.idxResolucion]}</span>
                            <button class="btn-res-flecha" id="btn-res-der">
                                <img src="${btnDer}" alt="Siguiente">
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Evento volver al Menú Principal
        contenedor.querySelector('#btn-atras-opciones').addEventListener('click', () => {
            this.gestorPantallas.cambiarPantalla('MenuPrincipal');
        });

        this.contenedorApp.appendChild(contenedor);

        // Configuración de Sliders
        this.configurarSlider(contenedor, 'sfx', (val) => {
            this.sfx = val;
            localStorage.setItem('opciones_sfx', val);
        });

        this.configurarSlider(contenedor, 'musica', (val) => {
            this.musica = val;
            localStorage.setItem('opciones_musica', val);
        });

        // Slider de brillo con actualización visual inmediata
        this.configurarSlider(contenedor, 'brillo', (val) => {
            this.brillo = val;
            localStorage.setItem('opciones_brillo', val);
            this.aplicarFiltroBrillo(val); // <--- Aplica el cambio de brillo al instante
        });

        // Configuración del selector de Resolución
        const btnResIzq = contenedor.querySelector('#btn-res-izq');
        const btnResDer = contenedor.querySelector('#btn-res-der');
        const textoRes = contenedor.querySelector('#texto-resolucion-valor');

        btnResIzq.addEventListener('click', () => {
            this.idxResolucion = (this.idxResolucion - 1 + this.resoluciones.length) % this.resoluciones.length;
            textoRes.textContent = this.resoluciones[this.idxResolucion];
            localStorage.setItem('opciones_idxRes', this.idxResolucion);
        });

        btnResDer.addEventListener('click', () => {
            this.idxResolucion = (this.idxResolucion + 1) % this.resoluciones.length;
            textoRes.textContent = this.resoluciones[this.idxResolucion];
            localStorage.setItem('opciones_idxRes', this.idxResolucion);
        });
    }

    configurarSlider(contenedor, idSlider, callback) {
        const input = contenedor.querySelector(`#input-${idSlider}`);
        const thumb = contenedor.querySelector(`#thumb-${idSlider}`);

        const actualizarPosicion = () => {
            const min = parseFloat(input.min);
            const max = parseFloat(input.max);
            const val = parseFloat(input.value);
            const porcentaje = (val - min) / (max - min);

            thumb.style.left = `calc(${porcentaje * 100}% - ${porcentaje * 2.8}rem)`;
            callback(val);
        };

        input.addEventListener('input', actualizarPosicion);
        actualizarPosicion();
    }
}
