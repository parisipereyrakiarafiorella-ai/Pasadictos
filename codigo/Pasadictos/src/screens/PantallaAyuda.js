class PantallaAyuda {
    constructor(gestorPantallas) {
        this.gestorPantallas = gestorPantallas;
        this.elemento = null;
    }

    renderizar() {
        if (!this.elemento) {
            this.elemento = document.createElement('div');
            this.elemento.className = 'pantalla-ayuda';

            // Fondo de madera principal
            const fondo = document.createElement('img');
            fondo.src = GestorRecursos.obtenerRutaImagen('ayudaFondo');
            fondo.className = 'fondo-ayuda';
            this.elemento.appendChild(fondo);



            // Hoja pergamino central
            const hoja = document.createElement('img');
            hoja.src = GestorRecursos.obtenerRutaImagen('ayudaHoja');
            hoja.className = 'hoja-ayuda';
            this.elemento.appendChild(hoja);

            // Cartel de madera de título
            const cartelContenedor = document.createElement('div');
            cartelContenedor.className = 'cartel-ayuda-contenedor';

            const cartelImg = document.createElement('img');
            cartelImg.src = GestorRecursos.obtenerRutaImagen('ayudaCartel');
            cartelImg.className = 'cartel-ayuda-img';

            const cartelTexto = document.createElement('img');
            cartelTexto.src = GestorRecursos.obtenerRutaImagen('ayudaTextoCartel');
            cartelTexto.className = 'cartel-ayuda-texto';

            cartelContenedor.appendChild(cartelImg);
            cartelContenedor.appendChild(cartelTexto);
            this.elemento.appendChild(cartelContenedor);

            // Contenedor de las 3 notas
            const contenedorNotas = document.createElement('div');
            contenedorNotas.className = 'contenedor-notas-ayuda';

            const nota1 = this.crearNota('ayudaNota1', 'ayudaTexto1', 'nota-ayuda nota-1', true);
            const nota2 = this.crearNota('ayudaNota2', 'ayudaTexto2', 'nota-ayuda nota-2', true);
            const nota3 = this.crearNota('ayudaNota3', 'ayudaTexto3', 'nota-ayuda nota-3', false);

            contenedorNotas.appendChild(nota1);
            contenedorNotas.appendChild(nota2);
            contenedorNotas.appendChild(nota3);

            this.elemento.appendChild(contenedorNotas);

            // Botón flotante para volver (esquina superior izquierda)
            const btnVolver = document.createElement('img');
            btnVolver.src = GestorRecursos.obtenerRutaImagen('btnAtras');
            btnVolver.className = 'btn-volver-ayuda-top';
            btnVolver.alt = 'Volver';
            btnVolver.addEventListener('click', () => {
                this.gestorPantallas.cambiarPantalla('PantallaJuego');
            });
            this.elemento.appendChild(btnVolver);
        }

        // ==================================================
        // AQUÍ ESTABA LO QUE FALTABA: Agregar el elemento al DOM
        // ==================================================
        const contenedor = this.gestorPantallas.obtenerContenedor();
        contenedor.appendChild(this.elemento);

        return this.elemento;
    }

    crearNota(claveNota, claveTexto, claseContenedor, tienePinche) {
        const divNota = document.createElement('div');
        divNota.className = claseContenedor;

        if (tienePinche) {
            const pinche = document.createElement('img');
            pinche.src = GestorRecursos.obtenerRutaImagen('ayudaPinche');
            pinche.className = 'pinche-nota';
            divNota.appendChild(pinche);
        }

        const imgNota = document.createElement('img');
        imgNota.src = GestorRecursos.obtenerRutaImagen(claveNota);
        imgNota.className = 'papel-nota';
        divNota.appendChild(imgNota);

        const imgTexto = document.createElement('img');
        imgTexto.src = GestorRecursos.obtenerRutaImagen(claveTexto);
        imgTexto.className = 'texto-nota';
        divNota.appendChild(imgTexto);

        return divNota;
    }
}