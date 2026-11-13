class PantallaInventario {
    constructor(gestorPantallas) {
        this.gestorPantallas = gestorPantallas;
        this.contenedorApp = gestorPantallas.obtenerContenedor();
        this.categoriaActiva = 'remeras';

        // Intentamos cargar la ropa desde localStorage. 
        const guardado = localStorage.getItem('ropaEquipadaManiqui');
        this.ropaEquipada = guardado ? JSON.parse(guardado) : {
            remeras: null,
            pantalones: null,
            zapatos: null,
            vestidos: null,
            accesorios: [] 
        };

        if (!Array.isArray(this.ropaEquipada.accesorios)) {
            this.ropaEquipada.accesorios = this.ropaEquipada.accesorios ? [this.ropaEquipada.accesorios] : [];
        }

        const compradosGuardados = localStorage.getItem('inventario_comprados');
        const itemsComprados = compradosGuardados ? JSON.parse(compradosGuardados) : {
            remeras: [],
            pantalones: [],
            zapatos: [],
            vestidos: [],
            accesorios: []
        };

        this.itemsInventario = {
            remeras: itemsComprados.remeras || [],
            pantalones: itemsComprados.pantalones || [],
            zapatos: itemsComprados.zapatos || [],
            vestidos: itemsComprados.vestidos || [],
            accesorios: itemsComprados.accesorios || []
        };
    }

    renderizar() {
        this.contenedorApp.innerHTML = '';

        const contenedor = document.createElement('div');
        contenedor.className = 'pantalla-inventario';

        const fondo = GestorRecursos.obtenerRutaImagen('inventarioFondo');
        const cartel = GestorRecursos.obtenerRutaImagen('inventarioCartel');
        const textoCartel = GestorRecursos.obtenerRutaImagen('inventarioTextoCartel');
        const cuadroBase = GestorRecursos.obtenerRutaImagen('inventarioCuadro');
        const hojaPergamino = GestorRecursos.obtenerRutaImagen('inventarioHoja');
        const sombra = GestorRecursos.obtenerRutaImagen('inventarioSombra');
        const chica = GestorRecursos.obtenerRutaImagen('inventarioChica');
        const btnAtras = GestorRecursos.obtenerRutaImagen('inventarioAtras');

        const catRemera = GestorRecursos.obtenerRutaImagen('catRemera');
        const catPantalon = GestorRecursos.obtenerRutaImagen('catPantalon');
        const catZapato = GestorRecursos.obtenerRutaImagen('catZapato');
        const catVestido = GestorRecursos.obtenerRutaImagen('catVestido');
        const catGafas = GestorRecursos.obtenerRutaImagen('catGafas');

        contenedor.innerHTML = `
            <img src="${fondo}" class="inventario-fondo-img" alt="Fondo Madera">
            <button class="btn-inventario-atras" id="btn-atras-inventario">
                <img src="${btnAtras}" alt="Volver">
            </button>
            <div class="inventario-columna-izquierda">
                <div class="inventario-cartel-contenedor">
                    <img src="${cartel}" class="img-cartel-base" alt="Cartel Ropa">
                    <img src="${textoCartel}" class="img-cartel-texto" alt="Texto Ropa">
                </div>
                <div class="inventario-cuadro-base">
                    <img src="${cuadroBase}" class="img-cuadro-fondo" alt="Cuadro Madera">
                    <div class="inventario-grid-items" id="grilla-items-inventario"></div>
                </div>
                <div class="inventario-barra-categorias">
                    <button class="btn-cat-inv ${this.categoriaActiva === 'remeras' ? 'activa' : ''}" data-cat="remeras">
                        <img src="${catRemera}" alt="Remeras">
                    </button>
                    <button class="btn-cat-inv ${this.categoriaActiva === 'pantalones' ? 'activa' : ''}" data-cat="pantalones">
                        <img src="${catPantalon}" alt="Pantalones">
                    </button>
                    <button class="btn-cat-inv ${this.categoriaActiva === 'zapatos' ? 'activa' : ''}" data-cat="zapatos">
                        <img src="${catZapato}" alt="Zapatos">
                    </button>
                    <button class="btn-cat-inv ${this.categoriaActiva === 'vestidos' ? 'activa' : ''}" data-cat="vestidos">
                        <img src="${catVestido}" alt="Vestidos">
                    </button>
                    <button class="btn-cat-inv ${this.categoriaActiva === 'accesorios' ? 'activa' : ''}" data-cat="accesorios">
                        <img src="${catGafas}" alt="Accesorios">
                    </button>
                </div>
            </div>
            <div class="inventario-columna-derecha">
                <img src="${hojaPergamino}" class="img-pergamino-derecho" alt="Pergamino">
                <div class="maniqui-contenedor">
                    <img src="${chica}" class="img-maniqui-cuerpo" alt="Personaje">
                    <div id="capas-ropa-maniqui"></div>
                    <img src="${sombra}" class="img-maniqui-sombra" alt="Sombra">
                </div>
            </div>
        `;

        contenedor.querySelector('#btn-atras-inventario').addEventListener('click', () => {
            this.gestorPantallas.cambiarPantalla('PantallaTienda');
        });

        const botonesCat = contenedor.querySelectorAll('.btn-cat-inv');
        botonesCat.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const categoria = e.currentTarget.getAttribute('data-cat');
                this.cambiarCategoria(categoria, contenedor);
            });
        });

        this.contenedorApp.appendChild(contenedor);
        this.actualizarGrilla(contenedor);
        this.actualizarManiqui(contenedor);
    }

    cambiarCategoria(nuevaCategoria, contenedor) {
        this.categoriaActiva = nuevaCategoria;
        const botones = contenedor.querySelectorAll('.btn-cat-inv');
        botones.forEach(btn => {
            if (btn.getAttribute('data-cat') === nuevaCategoria) {
                btn.classList.add('activa');
            } else {
                btn.classList.remove('activa');
            }
        });
        this.actualizarGrilla(contenedor);
    }

    actualizarGrilla(contenedor) {
        const grilla = contenedor.querySelector('#grilla-items-inventario');
        grilla.innerHTML = '';

        const listaClaves = this.itemsInventario[this.categoriaActiva] || [];
        const marcoDorado = GestorRecursos.obtenerRutaImagen('inventarioMarcox6');

        for (let i = 0; i < 6; i++) {
            const marcoDiv = document.createElement('div');
            marcoDiv.className = 'marco-item-inventario';

            let htmlMarco = `<img src="${marcoDorado}" class="img-marco-dorado" alt="Marco">`;

            if (listaClaves[i]) {
                const clavePrenda = listaClaves[i]; 
                const rutaRopa = GestorRecursos.obtenerRutaImagen(listaClaves[i]);
                htmlMarco += `<img src="${rutaRopa}" class="img-item-prenda" alt="Prenda">`;
                
                if (this.categoriaActiva === 'accesorios') {
                    if (this.ropaEquipada.accesorios.includes(clavePrenda)) {
                        marcoDiv.classList.add('item-equipado');
                    }
                } else {
                    if (this.ropaEquipada[this.categoriaActiva] === clavePrenda) {
                        marcoDiv.classList.add('item-equipado');
                    }
                }

                marcoDiv.style.cursor = 'pointer';
                marcoDiv.addEventListener('click', () => {
                    this.equiparPrenda(clavePrenda, contenedor);
                });
            }

            marcoDiv.innerHTML = htmlMarco;
            grilla.appendChild(marcoDiv);
        }
    }

    equiparPrenda(clavePrenda, contenedor) {
        if (this.categoriaActiva === 'accesorios') {
            const index = this.ropaEquipada.accesorios.indexOf(clavePrenda);
            if (index > -1) {
                this.ropaEquipada.accesorios.splice(index, 1);
            } else {
                this.ropaEquipada.accesorios.push(clavePrenda);
            }
        } else {
            if (this.ropaEquipada[this.categoriaActiva] === clavePrenda) {
                this.ropaEquipada[this.categoriaActiva] = null;
            } else {
                this.ropaEquipada[this.categoriaActiva] = clavePrenda;
            }
        }

        localStorage.setItem('ropaEquipadaManiqui', JSON.stringify(this.ropaEquipada));
        this.actualizarGrilla(contenedor);
        this.actualizarManiqui(contenedor);
    }

    actualizarManiqui(contenedor) {
        const capasContenedor = contenedor.querySelector('#capas-ropa-maniqui');
        if (!capasContenedor) return;

        capasContenedor.innerHTML = '';

        // Recorremos las categorías normales (remeras, pantalones, zapatos, vestidos)
        Object.keys(this.ropaEquipada).forEach(cat => {
            if (cat !== 'accesorios') {
                const claveImg = this.ropaEquipada[cat];
                if (claveImg) {
                    const imgRopa = document.createElement('img');
                    imgRopa.src = GestorRecursos.obtenerRutaImagen(claveImg);
                    
                    let claseEspecifica = cat;
                    if (cat === 'remeras') {
                        // 👈 Mapeo agregado para las nuevas camisas en el maniquí
                        if (claveImg === 'camisa2Img') claseEspecifica = 'remera2';
                        else if (claveImg === 'camisa3Img') claseEspecifica = 'remera3';
                        else if (claveImg === 'camisa4Img') claseEspecifica = 'remera4';
                        else if (claveImg === 'camisa5Img') claseEspecifica = 'remera5';
                        else if (claveImg === 'camisa6Img') claseEspecifica = 'remera6';
                        else claseEspecifica = 'remeras';
                    } else if (cat === 'vestidos') {
                        if (claveImg === 'vestido2Img') claseEspecifica = 'vestido2';
                        else if (claveImg === 'vestido3Img') claseEspecifica = 'vestido3';
                        else if (claveImg === 'vestido4Img') claseEspecifica = 'vestido4';
                        else if (claveImg === 'vestido5Img') claseEspecifica = 'vestido5';
                        else if (claveImg === 'vestido6Img') claseEspecifica = 'vestido6';
                        else claseEspecifica = 'vestidos';
                    } else if (cat === 'zapatos') {
                        if (claveImg === 'zapato2Img') claseEspecifica = 'zapato2';
                        else if (claveImg === 'zapato3Img') claseEspecifica = 'zapato3';
                        else if (claveImg === 'zapato4Img') claseEspecifica = 'zapato4';
                        else claseEspecifica = 'zapatos';
                    } else if (cat === 'pantalones') {
                        if (claveImg === 'pantalon2Img') claseEspecifica = 'pantalon2';
                        else if (claveImg === 'pantalon3Img') claseEspecifica = 'pantalon3';
                        else if (claveImg === 'pantalon4Img') claseEspecifica = 'pantalon4';
                        else if (claveImg === 'pantalon5Img') claseEspecifica = 'pantalon5';
                        else if (claveImg === 'pantalon6Img') claseEspecifica = 'pantalon6';
                        else claseEspecifica = 'pantalones';
                    }

                    imgRopa.className = `img-ropa-equipada prenda-${claseEspecifica}`;
                    capasContenedor.appendChild(imgRopa);
                }
            }
        });

        // Recorremos los accesorios
        if (Array.isArray(this.ropaEquipada.accesorios)) {
            this.ropaEquipada.accesorios.forEach(claveImg => {
                if (claveImg) {
                    const imgRopa = document.createElement('img');
                    imgRopa.src = GestorRecursos.obtenerRutaImagen(claveImg);
                    
                    let claseEspecifica = 'accesorio';
                    if (claveImg === 'sombreroImg') claseEspecifica = 'accesorio-sombrero';
                    else if (claveImg === 'bufandaImg') claseEspecifica = 'accesorio-bufanda';
                    else if (claveImg === 'lentesImg') claseEspecifica = 'accesorio-lentes';
                    else if (claveImg === 'floresImg') claseEspecifica = 'accesorio-flores';
                    else if (claveImg === 'clipImg') claseEspecifica = 'accesorio-clip';
                    else if (claveImg === 'collarImg') claseEspecifica = 'accesorio-collar';

                    imgRopa.className = `img-ropa-equipada prenda-${claseEspecifica}`;
                    capasContenedor.appendChild(imgRopa);
                }
            });
        }
    }
}