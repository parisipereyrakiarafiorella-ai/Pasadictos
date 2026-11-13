class PantallaCargar {
    constructor(gestorPantallas, datos = {}) {
        this.gestorPantallas = gestorPantallas;
        this.contenedor = gestorPantallas.obtenerContenedor();
        this.datos = datos || {};
        this.modo = this.datos.modo || 'cargar';
        this.slotSeleccionado = null;
        
        this.totalSlots = 99;
        this.slotsPorPagina = 6;
        this.paginaActual = 0;

        try {
            this.datosGuardados = JSON.parse(localStorage.getItem('pasadictos_slots_guardados')) || {};
        } catch (error) {
            this.datosGuardados = {};
        }

        this.instalarCompatibilidadGuardado();
    }

    instalarCompatibilidadGuardado() {
        if (typeof PantallaJuego === 'undefined' || PantallaJuego.prototype._guardadoPasadictosInstalado) return;
        const renderizarOriginal = PantallaJuego.prototype.renderizar;
        
        PantallaJuego.prototype.renderizar = function() {
            const guardado = this.datos && this.datos.estadoGuardado;
            if (guardado && !this.estadoRestaurado) {
                const estado = guardado.estadoPasadictos || guardado;
                const campos = [
                    'puntos', 'epoca', 'etapa', 'indiceDialogo',
                    'cantidadPreguntas', 'preguntaSeleccionada',
                    'preguntasRealizadas', 'indicePreguntaActual',
                    'indiceDialogoFinalEntrevista', 'decisionEspecialRealizada'
                ];
                campos.forEach(campo => {
                    if (Object.prototype.hasOwnProperty.call(estado, campo)) {
                        if (campo === 'preguntasRealizadas' && Array.isArray(estado[campo])) {
                            this[campo] = new Set(estado[campo]);
                        } else {
                            this[campo] = estado[campo];
                        }
                    }
                });
                this.estadoRestaurado = true;
            }
            renderizarOriginal.call(this);
            
            // RESTAURACIÓN VISUAL FORZADA DE FONDO Y PERSONAJE AL CARGAR
            if (guardado && this.estadoRestaurado && this.zonaJuego) {
                try {
                    if (this.textoPuntos) this.textoPuntos.textContent = `Puntos: ${this.puntos || 0}`;
                    if (this.textoEpoca && this.epoca) this.textoEpoca.textContent = this.epoca;

                    // 1. Forzar inserción del fondo histórico si no está
                    if (!this.zonaJuego.querySelector('.fondo-rosas-juego')) {
                        const fondoRosas = document.createElement('img');
                        fondoRosas.src = typeof GestorRecursos !== 'undefined' && typeof GestorRecursos.obtenerRutaImagenRosas === 'function'
                            ? GestorRecursos.obtenerRutaImagenRosas('fondoRosas')
                            : 'src/assets/fondoRosas.png'; // Ruta de respaldo por si acaso
                        fondoRosas.alt = '';
                        fondoRosas.className = 'fondo-rosas-juego';
                        fondoRosas.draggable = false;
                        this.zonaJuego.prepend(fondoRosas);
                    }

                    // 2. Forzar inserción del personaje (Juan Manuel de Rosas) si corresponde a la escena
                    if (!this.zonaJuego.querySelector('.imagen-rosas-juego')) {
                        const imagenRosas = document.createElement('img');
                        imagenRosas.src = typeof GestorRecursos !== 'undefined' && typeof GestorRecursos.obtenerRutaImagenRosas === 'function'
                            ? GestorRecursos.obtenerRutaImagenRosas('mRosas')
                            : 'src/assets/mRosas.png'; // Ruta de respaldo
                        imagenRosas.alt = 'Juan Manuel de Rosas';
                        imagenRosas.className = 'imagen-rosas-juego';
                        imagenRosas.draggable = false;
                        this.zonaJuego.appendChild(imagenRosas);
                    }

                    // 3. Restaurar el diálogo o las opciones según la etapa en la que se guardó
                    if (this.etapa === 'inicio' || this.etapa === 'despuesRespuesta') {
                        if (typeof this.mostrarDialogoActual === 'function') this.mostrarDialogoActual();
                    } else if (this.etapa === 'entrevista') {
                        if (typeof this.mostrarOpcionesEntrevista === 'function') this.mostrarOpcionesEntrevista();
                    } else if (this.etapa === 'dialogosFinalesEntrevista') {
                        if (typeof this.mostrarDialogoFinalEntrevista === 'function') this.mostrarDialogoFinalEntrevista();
                    }
                } catch (error) {
                    console.error('Error restaurando los gráficos de la partida cargada:', error);
                }
            }
        };
        PantallaJuego.prototype._guardadoPasadictosInstalado = true;
    }

    obtenerRecurso(nombre) {
        try {
            if (typeof GestorRecursos !== 'undefined' && typeof GestorRecursos.obtenerRutaImagen === 'function') {
                return GestorRecursos.obtenerRutaImagen(nombre) || '';
            }
        } catch (error) {}
        return '';
    }

    renderizar() {
        this.contenedor.innerHTML = '';
        const pantalla = document.createElement('div');
        pantalla.className = 'pantalla-guardado-container';
        Object.assign(pantalla.style, {
            position: 'absolute', top: '0', left: '0', width: '100%', height: '100%',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            backgroundImage: `url("${this.obtenerRecurso('guardadoFondoCuadro')}")`,
            backgroundSize: 'cover', backgroundPosition: 'center', userSelect: 'none'
        });

        pantalla.innerHTML = `
            <div id="btn-atras-guardado" title="Volver" style="position:absolute;top:3vh;left:3vh;cursor:pointer;width:11vh;height:11vh;z-index:10;transition:transform .2s;">
                <img src="${this.obtenerRecurso('guardadoAtras')}" alt="Volver" style="width:100%;height:100%;object-fit:contain;">
            </div>
            <div style="position:relative;width:min(155vh,94vw);height:min(90vh,92vh);background-image:url('${this.obtenerRecurso('guardadoFondo')}');background-size:100% 100%;background-repeat:no-repeat;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;box-sizing:border-box;">
                
                <!-- ======================================================= -->
                <!-- 1. TÍTULO / CARTEL DE GUARDADO (Movible y redimensionable) -->
                <!-- ======================================================= -->
                <div style="position:absolute; top: 9vh; width: 45vh; height: 20vh; max-width:80%; left: 34%; background-image:url('${this.obtenerRecurso('guardadoTitulo')}'); background-size:contain; background-repeat:no-repeat; background-position:center; display:flex; justify-content:center; align-items:center;">
                    <img src="${this.obtenerRecurso('guardadoletra')}" alt="Guardado" style="width: 60%; height: 60%; object-fit: contain; margin-top: 5.5vh;">
                </div>

                <!-- ======================================================= -->
                <!-- 2. ZONA DE RANURAS Y FLECHITAS (Movida más abajo con margin-top) -->
                <!-- ======================================================= -->
                <div style="display:flex; align-items:center; justify-content:center; gap:2vw; margin-top: 32vh; margin-bottom: 2vh; margin-left: -2vw;">
                    <button id="btn-pagina-anterior" style="background:transparent;border:none;cursor:pointer;font-size:5vh;color:#d4af37;font-weight:bold;transition:transform .2s;padding:1vh;" title="Anteriores">◀</button>
                    
                    <div id="grid-slots" style="display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:2vh 3vh;">
                        ${this.generarSlotsHTML()}
                    </div>

                    <button id="btn-pagina-siguiente" style="background:transparent;border:none;cursor:pointer;font-size:5vh;color:#d4af37;font-weight:bold;transition:transform .2s;padding:1vh;" title="Siguientes">▶</button>
                </div>

                <div id="indicador-pagina" style="color:#d4af37;font-family:Georgia,serif;font-size:1.8vh; margin-bottom: 1.5vh; font-weight:bold; text-shadow:0.1vh 0.1vh 0.2vh #000;">
                    Página ${this.paginaActual + 1} / ${Math.ceil(this.totalSlots / this.slotsPorPagina)} (Slots ${(this.paginaActual * this.slotsPorPagina) + 1} - ${Math.min(this.totalSlots, (this.paginaActual + 1) * this.slotsPorPagina)})
                </div>

                <div style="display:flex; gap:3vh; margin-left: -2vw;">
                    <div id="btn-accion-guardar" role="button" tabindex="0" style="position:relative;cursor:pointer;width:18vh;height:6vh;display:flex;justify-content:center;align-items:center;opacity:.5;pointer-events:none;transition:transform .2s,opacity .2s;">
                        <img src="${this.obtenerRecurso('guardadoBotonApagado')}" id="img-btn-guardar" alt="" style="position:absolute;width:100%;height:100%;object-fit:contain;">
                        <span style="position:relative;color:#fff;font-weight:bold;font-size:2.2vh;font-family:Georgia,serif;text-shadow:0.15vh 0.15vh 0.3vh #000;">Guardar</span>
                    </div>
                    <div id="btn-accion-cargar" role="button" tabindex="0" style="position:relative;cursor:pointer;width:18vh;height:6vh;display:flex;justify-content:center;align-items:center;opacity:.5;pointer-events:none;transition:transform .2s,opacity .2s;">
                        <img src="${this.obtenerRecurso('guardadoBotonApagado')}" id="img-btn-cargar" alt="" style="position:absolute;width:100%;height:100%;object-fit:contain;">
                        <span style="position:relative;color:#fff;font-weight:bold;font-size:2.2vh;font-family:Georgia,serif;text-shadow:0.15vh 0.15vh 0.3vh #000;">Cargar</span>
                    </div>
                    <div id="btn-accion-eliminar" role="button" tabindex="0" style="position:relative;cursor:pointer;width:18vh;height:6vh;display:flex;justify-content:center;align-items:center;opacity:.5;pointer-events:none;transition:transform .2s,opacity .2s;">
                        <img src="${this.obtenerRecurso('guardadoBotonApagado')}" id="img-btn-eliminar" alt="" style="position:absolute;width:100%;height:100%;object-fit:contain;">
                        <span style="position:relative;color:#fff;font-weight:bold;font-size:2.2vh;font-family:Georgia,serif;text-shadow:0.15vh 0.15vh 0.3vh #000;">Eliminar</span>
                    </div>
                </div>
            </div>
            
            <div id="tooltip-slot-fecha" style="position:absolute;display:none;background:rgba(20,10,5,0.92);border:2px solid #d4af37;color:#f3e5ab;padding:8px 14px;border-radius:6px;font-family:Georgia,serif;font-size:1.6vh;z-index:9999;pointer-events:none;box-shadow:0 4px 12px rgba(0,0,0,0.6);text-align:center;"></div>
            
            <div id="modal-container-guardado"></div>
        `;

        this.contenedor.appendChild(pantalla);
        this.elementoDOM = pantalla;
        this.agregarEventos();
        this.actualizarFlechasPaginacion();
    }

    generarSlotsHTML() {
        let html = '';
        const inicio = this.paginaActual * this.slotsPorPagina;
        const fin = Math.min(this.totalSlots, inicio + this.slotsPorPagina);

        for (let i = inicio + 1; i <= fin; i++) {
            const datosSlot = this.datosGuardados[`slot_${i}`];
            
            let fuenteImagen = '';
            if (datosSlot && datosSlot.miniatura) {
                fuenteImagen = datosSlot.miniatura;
            } else if (datosSlot && datosSlot.progreso) {
                fuenteImagen = typeof GestorRecursos !== 'undefined' ? GestorRecursos.obtenerRutaImagenRosas('fondoRosas') : '';
            }

            const imagen = fuenteImagen
                ? `<img src="${fuenteImagen}" alt="Partida ${i}" style="width:100%;height:100%;object-fit:cover;display:block;">`
                : `<img src="${this.obtenerRecurso('guardadoSignoMas')}" alt="Vacío" style="width:36px;height:36px;opacity:.85;">`;
            
            const fecha = datosSlot && datosSlot.fecha ? datosSlot.fecha : '';
            const esSeleccionado = String(this.slotSeleccionado) === String(i);
            const estiloSeleccion = esSeleccionado ? 'outline:3px solid #d4af37;box-shadow:0 0 15px rgba(212,175,55,.9);transform:scale(1.03);' : '';

            html += `
                <div class="slot-guardado" data-slot="${i}" data-fecha="${this.escaparHTML(fecha)}" style="position:relative;width:23vh;height:14vh;background-image:url('${this.obtenerRecurso('guardadoCuadro')}');background-size:100% 100%;background-position:center;background-repeat:no-repeat;display:flex;justify-content:center;align-items:center;cursor:pointer;transition:transform .2s,filter .2s;box-sizing:border-box;${estiloSeleccion}">
                    <div style="position:absolute;width:18.6vh;height:11vh;display:flex;justify-content:center;align-items:center;overflow:hidden;border-radius:2px;">${imagen}</div>
                    <span style="position:absolute;bottom:0.4vh;right:1vh;font-size:1.2vh;color:#d4af37;font-family:Georgia,serif;font-weight:bold;background:rgba(0,0,0,0.6);padding:0 4px;border-radius:3px;">#${i}</span>
                </div>
            `;
        }
        return html;
    }

    escaparHTML(valor) {
        return String(valor ?? '').replace(/[&<>"']/g, caracter => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[caracter]));
    }

    agregarEventos() {
        const btnAtras = this.elementoDOM.querySelector('#btn-atras-guardado');
        btnAtras.addEventListener('click', e => { e.stopPropagation(); this.volverAAnterior(); });

        const btnAnterior = this.elementoDOM.querySelector('#btn-pagina-anterior');
        const btnSiguiente = this.elementoDOM.querySelector('#btn-pagina-siguiente');

        btnAnterior.addEventListener('click', e => {
            e.stopPropagation();
            if (this.paginaActual > 0) {
                this.paginaActual--;
                this.recargarGridSlots();
            }
        });

        btnSiguiente.addEventListener('click', e => {
            e.stopPropagation();
            const maxPaginas = Math.ceil(this.totalSlots / this.slotsPorPagina);
            if (this.paginaActual < maxPaginas - 1) {
                this.paginaActual++;
                this.recargarGridSlots();
            }
        });

        this.vincularEventosSlots();

        const btnGuardar = this.elementoDOM.querySelector('#btn-accion-guardar');
        btnGuardar.addEventListener('click', e => {
            e.stopPropagation();
            if (!this.slotSeleccionado || !this.puedeGuardar()) return;
            if (this.datosGuardados[`slot_${this.slotSeleccionado}`]) {
                this.mostrarModalConfirmacion('¿Deseas sobreescribir la partida guardada en esta ranura?', () => this.ejecutarGuardadoPartida());
            } else {
                this.ejecutarGuardadoPartida();
            }
        });

        const btnCargar = this.elementoDOM.querySelector('#btn-accion-cargar');
        btnCargar.addEventListener('click', e => {
            e.stopPropagation();
            if (!this.slotSeleccionado) return;
            this.ejecutarCargaPartida();
        });

        const btnEliminar = this.elementoDOM.querySelector('#btn-accion-eliminar');
        btnEliminar.addEventListener('click', e => {
            e.stopPropagation();
            if (!this.slotSeleccionado || !this.datosGuardados[`slot_${this.slotSeleccionado}`]) return;
            this.mostrarModalConfirmacion('¿Deseás eliminar la partida guardada de esta ranura?', () => this.ejecutarEliminarPartida());
        });
    }

    recargarGridSlots() {
        const grid = this.elementoDOM.querySelector('#grid-slots');
        grid.innerHTML = this.generarSlotsHTML();
        const indicador = this.elementoDOM.querySelector('#indicador-pagina');
        const maxPaginas = Math.ceil(this.totalSlots / this.slotsPorPagina);
        indicador.textContent = `Página ${this.paginaActual + 1} / ${maxPaginas} (Slots ${(this.paginaActual * this.slotsPorPagina) + 1} - ${Math.min(this.totalSlots, (this.paginaActual + 1) * this.slotsPorPagina)})`;
        this.vincularEventosSlots();
        this.actualizarFlechasPaginacion();
        this.actualizarBotonesSegunModo();
    }

    actualizarFlechasPaginacion() {
        const btnAnterior = this.elementoDOM.querySelector('#btn-pagina-anterior');
        const btnSiguiente = this.elementoDOM.querySelector('#btn-pagina-siguiente');
        const maxPaginas = Math.ceil(this.totalSlots / this.slotsPorPagina);

        btnAnterior.style.opacity = this.paginaActual > 0 ? '1' : '0.3';
        btnAnterior.style.pointerEvents = this.paginaActual > 0 ? 'auto' : 'none';

        btnSiguiente.style.opacity = this.paginaActual < maxPaginas - 1 ? '1' : '0.3';
        btnSiguiente.style.pointerEvents = this.paginaActual < maxPaginas - 1 ? 'auto' : 'none';
    }

    vincularEventosSlots() {
        const slots = this.elementoDOM.querySelectorAll('.slot-guardado');
        const tooltip = this.elementoDOM.querySelector('#tooltip-slot-fecha');

        slots.forEach(slot => {
            slot.addEventListener('click', e => {
                e.stopPropagation();
                slots.forEach(s => {
                    s.style.outline = 'none';
                    s.style.boxShadow = 'none';
                    s.style.transform = 'scale(1)';
                });
                slot.style.outline = '3px solid #d4af37';
                slot.style.boxShadow = '0 0 15px rgba(212,175,55,.9)';
                slot.style.transform = 'scale(1.03)';
                this.slotSeleccionado = slot.getAttribute('data-slot');
                this.actualizarBotonesSegunModo();
            });

            slot.addEventListener('mouseenter', () => {
                const fecha = slot.getAttribute('data-fecha');
                if (fecha) {
                    tooltip.innerHTML = `Guardado:<br><b>${fecha}</b>`;
                    tooltip.style.display = 'block';
                }
            });

            slot.addEventListener('mousemove', (e) => {
                tooltip.style.left = `${e.clientX + 15}px`;
                tooltip.style.top = `${e.clientY - 40}px`;
            });

            slot.addEventListener('mouseleave', () => {
                tooltip.style.display = 'none';
            });
        });
    }

    volverAAnterior() {
        const instanciaJuego = this.datos.instanciaJuego;
        if (instanciaJuego && typeof instanciaJuego.renderizar === 'function') {
            this.contenedor.innerHTML = '';
            instanciaJuego.contenedor = this.contenedor;
            instanciaJuego.renderizar();
            return;
        }
        if (this.gestorPantallas && typeof this.gestorPantallas.cambiarPantalla === 'function') {
            this.gestorPantallas.cambiarPantalla('MenuPrincipal');
        }
    }

    puedeGuardar() {
        return this.modo === 'guardar' || !!this.datos.instanciaJuego;
    }

    actualizarBotonesSegunModo() {
        const btnGuardar = this.elementoDOM.querySelector('#btn-accion-guardar');
        const imgBtnGuardar = this.elementoDOM.querySelector('#img-btn-guardar');
        const btnCargar = this.elementoDOM.querySelector('#btn-accion-cargar');
        const imgBtnCargar = this.elementoDOM.querySelector('#img-btn-cargar');
        const btnEliminar = this.elementoDOM.querySelector('#btn-accion-eliminar');
        const imgBtnEliminar = this.elementoDOM.querySelector('#img-btn-eliminar');

        const datosSlot = this.datosGuardados[`slot_${this.slotSeleccionado}`];
        const guardarActivo = this.puedeGuardar() && this.slotSeleccionado !== null;
        const cargarActivo = !!(datosSlot && datosSlot.progreso);
        const eliminarActivo = !!(datosSlot && this.slotSeleccionado !== null);

        btnGuardar.style.opacity = guardarActivo ? '1' : '.5';
        btnGuardar.style.pointerEvents = guardarActivo ? 'auto' : 'none';
        imgBtnGuardar.src = this.obtenerRecurso(guardarActivo ? 'guardadoBotonPrendido' : 'guardadoBotonApagado');

        btnCargar.style.opacity = cargarActivo ? '1' : '.5';
        btnCargar.style.pointerEvents = cargarActivo ? 'auto' : 'none';
        imgBtnCargar.src = this.obtenerRecurso(cargarActivo ? 'guardadoBotonPrendido' : 'guardadoBotonApagado');

        btnEliminar.style.opacity = eliminarActivo ? '1' : '.5';
        btnEliminar.style.pointerEvents = eliminarActivo ? 'auto' : 'none';
        imgBtnEliminar.src = this.obtenerRecurso(eliminarActivo ? 'guardadoBotonPrendido' : 'guardadoBotonApagado');
    }

    obtenerEstadoActual() {
        const juego = this.datos.instanciaJuego;
        if (!juego) return {};
        const estado = {};
        ['puntos', 'epoca', 'etapa', 'indiceDialogo', 'cantidadPreguntas', 'preguntaSeleccionada', 'indicePreguntaActual', 'indiceDialogoFinalEntrevista', 'decisionEspecialRealizada'].forEach(campo => {
            if (campo in juego) estado[campo] = juego[campo];
        });
        if (juego.preguntasRealizadas instanceof Set) {
            estado.preguntasRealizadas = Array.from(juego.preguntasRealizadas);
        } else if (Array.isArray(juego.preguntasRealizadas)) {
            estado.preguntasRealizadas = juego.preguntasRealizadas;
        }
        return { estadoPasadictos: estado };
    }

    async capturarMiniatura() {
        try {
            if (typeof GestorRecursos !== 'undefined' && typeof GestorRecursos.obtenerRutaImagenRosas === 'function') {
                return GestorRecursos.obtenerRutaImagenRosas('fondoRosas');
            }
        } catch (e) {}
        
        const imgDom = document.querySelector('.fondo-rosas-juego') || document.querySelector('.pantalla-juego img');
        if (imgDom && imgDom.src) {
            return imgDom.src;
        }
        return '';
    }

    async ejecutarGuardadoPartida() {
        if (!this.slotSeleccionado) return;
        const progreso = this.obtenerEstadoActual();
        let miniatura = await this.capturarMiniatura();

        const ahora = new Date();
        const fecha = ahora.toLocaleString('es-AR', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit'
        });

        this.datosGuardados[`slot_${this.slotSeleccionado}`] = {
            fecha,
            fechaISO: ahora.toISOString(),
            miniatura,
            progreso
        };

        try {
            localStorage.setItem('pasadictos_slots_guardados', JSON.stringify(this.datosGuardados));
        } catch (error) {
            alert('El almacenamiento local está lleno. Probá eliminando algún guardado viejo.');
            return;
        }

        this.recargarGridSlots();
    }

    ejecutarCargaPartida() {
        const datosSlot = this.datosGuardados[`slot_${this.slotSeleccionado}`];
        if (!datosSlot || !datosSlot.progreso) return;
        if (!this.gestorPantallas || typeof this.gestorPantallas.cambiarPantalla !== 'function') return;

        this.gestorPantallas.cambiarPantalla('PantallaJuego', {
            estadoGuardado: datosSlot.progreso
        });
    }

    ejecutarEliminarPartida() {
        if (!this.slotSeleccionado) return;
        delete this.datosGuardados[`slot_${this.slotSeleccionado}`];
        try {
            localStorage.setItem('pasadictos_slots_guardados', JSON.stringify(this.datosGuardados));
        } catch (error) {
            console.error('Error al eliminar guardado');
        }
        this.recargarGridSlots();
        this.slotSeleccionado = null;
        this.actualizarBotonesSegunModo();
    }

    mostrarModalConfirmacion(mensaje, callbackSi) {
        const modalContainer = this.elementoDOM.querySelector('#modal-container-guardado');
        modalContainer.innerHTML = `
            <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.65);display:flex;justify-content:center;align-items:center;z-index:100;">
                <div style="background:#2b1810;border:3px solid #d4af37;padding:25px 35px;border-radius:8px;text-align:center;color:#fff;box-shadow:0 10px 30px rgba(0,0,0,.8);max-width:420px;font-family:Georgia,serif;">
                    <p style="font-size:18px;margin-bottom:20px;line-height:1.4;">${mensaje}</p>
                    <div style="display:flex;justify-content:space-around;gap:15px;">
                        <button id="modal-btn-si" style="background:#52803e;color:white;border:1px solid #73b357;padding:10px 25px;font-weight:bold;border-radius:4px;cursor:pointer;font-size:15px;">Sí</button>
                        <button id="modal-btn-no" style="background:#a83232;color:white;border:1px solid #d95353;padding:10px 25px;font-weight:bold;border-radius:4px;cursor:pointer;font-size:15px;">No</button>
                    </div>
                </div>
            </div>
        `;
        modalContainer.querySelector('#modal-btn-si').addEventListener('click', e => {
            e.stopPropagation();
            modalContainer.innerHTML = '';
            callbackSi();
        });
        modalContainer.querySelector('#modal-btn-no').addEventListener('click', e => {
            e.stopPropagation();
            modalContainer.innerHTML = '';
        });
    }

    destruir() {
        if (this.elementoDOM) this.elementoDOM.remove();
    }
}