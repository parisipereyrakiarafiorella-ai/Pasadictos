/**
 * Pantalla - Tienda (Pasadictos)
 * Estructura adaptable al canvas global del juego
 */

class PantallaTienda {
    constructor(gestorPantallas, datos = {}) {
        this.gestorPantallas = gestorPantallas;
        this.contenedor = gestorPantallas.obtenerContenedor();
        this.datos = datos;

        this.categoriaActual = 'camisas';
        
        // Leemos los puntos acumulados del localStorage (si no hay, usa datos.puntos o 120 por defecto)
        this.puntosUsuario = parseInt(localStorage.getItem('puntos_jugador')) || datos.puntos || 120;

        // Productos vinculados a las imágenes definidas en GestorRecursos
        this.productos = {
            camisas: [
                { id: 'c1', nombre: 'Camisa Clásica', precio: 60, precioOriginal: 75, descuento: '-20%', imagen: GestorRecursos.obtenerRutaImagen('camisaImg') },
                { id: 'c2', nombre: 'Camisa Borgoña', precio: 75, descuento: null, imagen: GestorRecursos.obtenerRutaImagen('camisa2Img') },
                { id: 'c3', nombre: 'Blusa Azul', precio: 80, descuento: null, imagen: GestorRecursos.obtenerRutaImagen('camisa3Img') },
                { id: 'c4', nombre: 'Top Verde', precio: 85, descuento: null, imagen: GestorRecursos.obtenerRutaImagen('camisa4Img') },
                { id: 'c5', nombre: 'Túnica Marrón', precio: 90, descuento: null, imagen: GestorRecursos.obtenerRutaImagen('camisa5Img') },
                { id: 'c6', nombre: 'Blusa Estampada', precio: 95, descuento: null, imagen: GestorRecursos.obtenerRutaImagen('camisa6Img') }
            ],
            pantalones: [
                { id: 'p1', nombre: 'Pantalón Clásico', precio: 60, precioOriginal: 75, descuento: '-20%', imagen: GestorRecursos.obtenerRutaImagen('pantalonImg') },
                { id: 'p2', nombre: 'Short de Época', precio: 70, descuento: null, imagen: GestorRecursos.obtenerRutaImagen('pantalon2Img') },
                { id: 'p3', nombre: 'Pantalón Cargo', precio: 80, descuento: null, imagen: GestorRecursos.obtenerRutaImagen('pantalon3Img') },
                { id: 'p4', nombre: 'Bombacha de Campo', precio: 85, descuento: null, imagen: GestorRecursos.obtenerRutaImagen('pantalon4Img') },
                { id: 'p5', nombre: 'Pantalón Claro', precio: 90, descuento: null, imagen: GestorRecursos.obtenerRutaImagen('pantalon5Img') },
                { id: 'p6', nombre: 'Pantalón Rojo', precio: 95, descuento: null, imagen: GestorRecursos.obtenerRutaImagen('pantalon6Img') }
            ],
            zapatos: [
                { id: 'z1', nombre: 'Zapato Clásico', precio: 60, precioOriginal: 75, descuento: '-20%', imagen: GestorRecursos.obtenerRutaImagen('zapatoImg') },
                { id: 'z2', nombre: 'Zapatos con Moño', precio: 75, descuento: null, imagen: GestorRecursos.obtenerRutaImagen('zapato2Img') },
                { id: 'z3', nombre: 'Botas Altas', precio: 85, descuento: null, imagen: GestorRecursos.obtenerRutaImagen('zapato3Img') },
                { id: 'z4', nombre: 'Zapatos Rojos', precio: 90, descuento: null, imagen: GestorRecursos.obtenerRutaImagen('zapato4Img') },
                { id: 'z5', nombre: 'Zapato 5', precio: 75, descuento: null, imagen: GestorRecursos.obtenerRutaImagen('zapatoImg') },
                { id: 'z6', nombre: 'Zapato 6', precio: 75, descuento: null, imagen: GestorRecursos.obtenerRutaImagen('zapatoImg') }
            ],
            vestidos: [
                { id: 'v1', nombre: 'Vestido Clásico', precio: 60, precioOriginal: 75, descuento: '-20%', imagen: GestorRecursos.obtenerRutaImagen('vestidoImg') },
                { id: 'v2', nombre: 'Vestido Romano', precio: 80, descuento: null, imagen: GestorRecursos.obtenerRutaImagen('vestido2Img') },
                { id: 'v3', nombre: 'Vestido Época 3', precio: 90, descuento: null, imagen: GestorRecursos.obtenerRutaImagen('vestido3Img') },
                { id: 'v4', nombre: 'Vestido Rojo Elegante', precio: 100, descuento: null, imagen: GestorRecursos.obtenerRutaImagen('vestido4Img') },
                { id: 'v5', nombre: 'Vestido Crema', precio: 85, descuento: null, imagen: GestorRecursos.obtenerRutaImagen('vestido5Img') },
                { id: 'v6', nombre: 'Vestido Verde', precio: 95, descuento: null, imagen: GestorRecursos.obtenerRutaImagen('vestido6Img') }
            ],
            accesorios: [
                { id: 'a1', nombre: 'Sombrero', precio: 60, precioOriginal: 75, descuento: '-20%', imagen: GestorRecursos.obtenerRutaImagen('sombreroImg') },
                { id: 'a2', nombre: 'Lentes', precio: 75, descuento: null, imagen: GestorRecursos.obtenerRutaImagen('lentesImg') },
                { id: 'a3', nombre: 'Aros Flores', precio: 75, descuento: null, imagen: GestorRecursos.obtenerRutaImagen('floresImg') },
                { id: 'a4', nombre: 'Corona Flores', precio: 75, descuento: null, imagen: GestorRecursos.obtenerRutaImagen('clipImg') },
                { id: 'a5', nombre: 'Collar', precio: 75, descuento: null, imagen: GestorRecursos.obtenerRutaImagen('collarImg') },
                { id: 'a6', nombre: 'Bufanda', precio: 75, descuento: null, imagen: GestorRecursos.obtenerRutaImagen('bufandaImg') }
            ]
        };
    }

    renderizar() {
        this.contenedor.innerHTML = '';

        // Actualizamos los puntos desde localStorage cada vez que se renderiza la tienda
        this.puntosUsuario = parseInt(localStorage.getItem('puntos_jugador')) || this.puntosUsuario;

        const pantalla = document.createElement('div');
        pantalla.className = 'pantalla-tienda';
        
        // Fondo de la tienda
        const imgFondo = document.createElement('img');
        imgFondo.src = GestorRecursos.obtenerRutaImagen('tiendaFondo');
        imgFondo.className = 'img-fondo-tienda';
        pantalla.appendChild(imgFondo);

        // 1. Botón Volver
        const botonVolver = document.createElement('button');
        botonVolver.type = 'button';
        botonVolver.className = 'btn-tienda-volver';
        botonVolver.addEventListener('click', () => {
            this.gestorPantallas.cambiarPantalla('MenuPrincipal');
        });

        const imgVolver = document.createElement('img');
        imgVolver.src = GestorRecursos.obtenerRutaImagen('tiendaAtras');
        imgVolver.alt = 'Volver';
        botonVolver.appendChild(imgVolver);
        pantalla.appendChild(botonVolver);

        // 2. Monedas
        const badgeDinero = document.createElement('div');
        badgeDinero.className = 'tienda-dinero-badge';

        const imgMoneda = document.createElement('img');
        imgMoneda.src = GestorRecursos.obtenerRutaImagen('tiendaDinero');
        imgMoneda.alt = 'Moneda';

        const textoPuntos = document.createElement('span');
        textoPuntos.textContent = `${this.puntosUsuario}`;

        badgeDinero.appendChild(imgMoneda);
        badgeDinero.appendChild(textoPuntos);
        pantalla.appendChild(badgeDinero);

        // 3. Pergamino Contenedor Central
        const pergamino = document.createElement('div');
        pergamino.className = 'tienda-pergamino-marco';

        const imgHoja = document.createElement('img');
        imgHoja.src = GestorRecursos.obtenerRutaImagen('tiendaHoja');
        imgHoja.className = 'img-hoja-fondo';
        pergamino.appendChild(imgHoja);

        // Banner Cinta TIENDA
        const bannerTienda = document.createElement('div');
        bannerTienda.className = 'tienda-banner-titulo';

        const imgCinta = document.createElement('img');
        imgCinta.src = GestorRecursos.obtenerRutaImagen('tiendaCinta');
        imgCinta.alt = 'Cinta Tienda';

        const textoTienda = document.createElement('span');
        textoTienda.className = 'texto-cinta-tienda';
        textoTienda.textContent = 'TIENDA';

        bannerTienda.appendChild(imgCinta);
        bannerTienda.appendChild(textoTienda);
        pergamino.appendChild(bannerTienda);

        // Cuerpo Interior
        const tiendaCuerpo = document.createElement('div');
        tiendaCuerpo.className = 'tienda-cuerpo';

        // Columna Izquierda
        const columnaIzquierda = document.createElement('div');
        columnaIzquierda.className = 'tienda-columna-izquierda';

        const colgadorCategorias = document.createElement('div');
        colgadorCategorias.className = 'tienda-colgador-contenedor';

        const imgColgador = document.createElement('img');
        imgColgador.src = GestorRecursos.obtenerRutaImagen('tiendaColgador');
        imgColgador.className = 'img-colgador-fondo';
        colgadorCategorias.appendChild(imgColgador);

        const listaCategorias = document.createElement('div');
        listaCategorias.className = 'tienda-lista-categorias';
        listaCategorias.id = 'tienda-lista-categorias';

        colgadorCategorias.appendChild(listaCategorias);
        columnaIzquierda.appendChild(colgadorCategorias);

        // Botón INVENTARIO
        const btnInventario = document.createElement('button');
        btnInventario.type = 'button';
        btnInventario.className = 'btn-tienda-inventario';

        btnInventario.addEventListener('click', () => {
            this.gestorPantallas.cambiarPantalla('PantallaInventario');
        });

        const imgBtnInventario = document.createElement('img');
        imgBtnInventario.src = GestorRecursos.obtenerRutaImagen('tiendaBotonInventario');

        const textoInventario = document.createElement('span');
        textoInventario.textContent = 'INVENTARIO';

        btnInventario.appendChild(imgBtnInventario);
        btnInventario.appendChild(textoInventario);

        columnaIzquierda.appendChild(btnInventario);
        tiendaCuerpo.appendChild(columnaIzquierda);

        // Columna Derecha
        const columnaDerecha = document.createElement('div');
        columnaDerecha.className = 'tienda-columna-derecha';
        columnaDerecha.id = 'tienda-grilla-productos';

        tiendaCuerpo.appendChild(columnaDerecha);
        pergamino.appendChild(tiendaCuerpo);

        pantalla.appendChild(pergamino);
        this.contenedor.appendChild(pantalla);

        this.renderizarBotonesCategorias();
        this.renderizarGrillaProductos();
    }

    renderizarBotonesCategorias() {
        const contenedorCat = document.getElementById('tienda-lista-categorias');
        if (!contenedorCat) return;

        contenedorCat.innerHTML = '';

        const categoriasDef = [
            { id: 'camisas', label: 'Camisas' },
            { id: 'pantalones', label: 'Pantalones' },
            { id: 'zapatos', label: 'Zapatos' },
            { id: 'vestidos', label: 'Vestidos' },
            { id: 'accesorios', label: 'Accesorios' }
        ];

        categoriasDef.forEach(cat => {
            const btnCat = document.createElement('button');
            btnCat.type = 'button';
            const esActiva = this.categoriaActual === cat.id;
            btnCat.className = `btn-tienda-categoria ${esActiva ? 'activa' : ''}`;

            const textoCat = document.createElement('span');
            textoCat.textContent = cat.label;
            btnCat.appendChild(textoCat);

            btnCat.addEventListener('click', () => {
                this.categoriaActual = cat.id;
                this.renderizarBotonesCategorias();
                this.renderizarGrillaProductos();
            });

            contenedorCat.appendChild(btnCat);
        });
    }

    renderizarGrillaProductos() {
        const contenedorGrilla = document.getElementById('tienda-grilla-productos');
        if (!contenedorGrilla) return;

        contenedorGrilla.innerHTML = '';

        const productosActuales = this.productos[this.categoriaActual] || [];

        for (let i = 0; i < 6; i++) {
            const item = productosActuales[i];
            const tarjeta = document.createElement('div');
            tarjeta.className = 'tarjeta-producto-tienda';

            const imgMadera = document.createElement('img');
            imgMadera.className = 'img-madera-item';
            imgMadera.src = GestorRecursos.obtenerRutaImagen('tiendaMaderaItem');
            tarjeta.appendChild(imgMadera);

            if (item) {
                if (item.descuento) {
                    const contEtiqueta = document.createElement('div');
                    contEtiqueta.className = 'contenedor-etiqueta-descuento';

                    const imgEtiqueta = document.createElement('img');
                    imgEtiqueta.src = GestorRecursos.obtenerRutaImagen('tiendaDescuento');

                    const textoDescuento = document.createElement('span');
                    textoDescuento.textContent = item.descuento;

                    contEtiqueta.appendChild(imgEtiqueta);
                    contEtiqueta.appendChild(textoDescuento);
                    tarjeta.appendChild(contEtiqueta);
                }

                const imgPrenda = document.createElement('img');
                imgPrenda.className = 'img-prenda-tienda';
                imgPrenda.src = item.imagen;
                imgPrenda.alt = item.nombre;
                tarjeta.appendChild(imgPrenda);

                const btnPrecio = document.createElement('button');
                btnPrecio.type = 'button';
                btnPrecio.className = 'btn-comprar-item';

                const imgLetrerito = document.createElement('img');
                imgLetrerito.src = GestorRecursos.obtenerRutaImagen('tiendaLetrerito');

                const textoPrecio = document.createElement('span');
                if (item.precioOriginal) {
                    textoPrecio.innerHTML = `<span class="precio-tachado">${item.precioOriginal}</span> ${item.precio} pts`;
                } else {
                    textoPrecio.textContent = `${item.precio} pts`;
                }

                btnPrecio.appendChild(imgLetrerito);
                btnPrecio.appendChild(textoPrecio);

                btnPrecio.addEventListener('click', () => {
                    this.comprarProducto(item);
                });

                tarjeta.appendChild(btnPrecio);
            }

            contenedorGrilla.appendChild(tarjeta);
        }
    }

    comprarProducto(item) {
        // Obtenemos el inventario actual desde localStorage
        let compradosGuardados = localStorage.getItem('inventario_comprados');
        let inventarioComprados = compradosGuardados ? JSON.parse(compradosGuardados) : {
            remeras: [], pantalones: [], zapatos: [], vestidos: [], accesorios: []
        };

        let categoriaInv = this.categoriaActual === 'camisas' ? 'remeras' : this.categoriaActual;
        
        let claveImagen = 'camisaImg';
        if (this.categoriaActual === 'camisas') {
            if (item.id === 'c2') claveImagen = 'camisa2Img';
            else if (item.id === 'c3') claveImagen = 'camisa3Img';
            else if (item.id === 'c4') claveImagen = 'camisa4Img';
            else if (item.id === 'c5') claveImagen = 'camisa5Img';
            else if (item.id === 'c6') claveImagen = 'camisa6Img';
            else claveImagen = 'camisaImg';
        } else if (this.categoriaActual === 'pantalones') {
            if (item.id === 'p2') claveImagen = 'pantalon2Img';
            else if (item.id === 'p3') claveImagen = 'pantalon3Img';
            else if (item.id === 'p4') claveImagen = 'pantalon4Img';
            else if (item.id === 'p5') claveImagen = 'pantalon5Img';
            else if (item.id === 'p6') claveImagen = 'pantalon6Img';
            else claveImagen = 'pantalonImg';
        } else if (this.categoriaActual === 'zapatos') {
            if (item.id === 'z2') claveImagen = 'zapato2Img';
            else if (item.id === 'z3') claveImagen = 'zapato3Img';
            else if (item.id === 'z4') claveImagen = 'zapato4Img';
            else claveImagen = 'zapatoImg';
        } else if (this.categoriaActual === 'vestidos') {
            if (item.id === 'v2') claveImagen = 'vestido2Img';
            else if (item.id === 'v3') claveImagen = 'vestido3Img';
            else if (item.id === 'v4') claveImagen = 'vestido4Img';
            else if (item.id === 'v5') claveImagen = 'vestido5Img';
            else if (item.id === 'v6') claveImagen = 'vestido6Img';
            else claveImagen = 'vestidoImg';
        } else if (this.categoriaActual === 'accesorios') {
            if (item.id === 'a1') claveImagen = 'sombreroImg';
            else if (item.id === 'a2') claveImagen = 'lentesImg';
            else if (item.id === 'a3') claveImagen = 'floresImg';
            else if (item.id === 'a4') claveImagen = 'clipImg';
            else if (item.id === 'a5') claveImagen = 'collarImg';
            else claveImagen = 'bufandaImg';
        }

        // 👈 Validación: Verificamos si la prenda ya está en el inventario
        if (inventarioComprados[categoriaInv] && inventarioComprados[categoriaInv].includes(claveImagen)) {
            alert('¡Ya tienes esta prenda en tu inventario!');
            return; // Detenemos la compra
        }

        if (this.puntosUsuario >= item.precio) {
            this.puntosUsuario -= item.precio;
            
            // Guardamos los puntos actualizados en localStorage
            localStorage.setItem('puntos_jugador', this.puntosUsuario);

            if (inventarioComprados[categoriaInv]) {
                inventarioComprados[categoriaInv].push(claveImagen);
                localStorage.setItem('inventario_comprados', JSON.stringify(inventarioComprados));
            }

            alert(`¡Compraste ${item.nombre}!`);
            this.renderizar();
        } else {
            alert('No tienes suficientes puntos.');
        }
    }
}