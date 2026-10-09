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
        this.puntosUsuario = datos.puntos || 120;

        // Productos vinculados a las imágenes definidas en GestorRecursos
        this.productos = {
            camisas: [
                { id: 'c1', nombre: 'Camisa 1', precio: 60, precioOriginal: 75, descuento: '-20%', imagen: GestorRecursos.obtenerRutaImagen('camisaImg') },
                { id: 'c2', nombre: 'Camisa 2', precio: 75, descuento: null, imagen: GestorRecursos.obtenerRutaImagen('camisaImg') },
                { id: 'c3', nombre: 'Camisa 3', precio: 75, descuento: null, imagen: GestorRecursos.obtenerRutaImagen('camisaImg') },
                { id: 'c4', nombre: 'Camisa 4', precio: 75, descuento: null, imagen: GestorRecursos.obtenerRutaImagen('camisaImg') },
                { id: 'c5', nombre: 'Camisa 5', precio: 75, descuento: null, imagen: GestorRecursos.obtenerRutaImagen('camisaImg') },
                { id: 'c6', nombre: 'Camisa 6', precio: 75, descuento: null, imagen: GestorRecursos.obtenerRutaImagen('camisaImg') }
            ],
            pantalones: [
                { id: 'p1', nombre: 'Pantalón 1', precio: 60, precioOriginal: 75, descuento: '-20%', imagen: GestorRecursos.obtenerRutaImagen('pantalonImg') },
                { id: 'p2', nombre: 'Pantalón 2', precio: 75, descuento: null, imagen: GestorRecursos.obtenerRutaImagen('pantalonImg') },
                { id: 'p3', nombre: 'Pantalón 3', precio: 75, descuento: null, imagen: GestorRecursos.obtenerRutaImagen('pantalonImg') },
                { id: 'p4', nombre: 'Pantalón 4', precio: 75, descuento: null, imagen: GestorRecursos.obtenerRutaImagen('pantalonImg') },
                { id: 'p5', nombre: 'Pantalón 5', precio: 75, descuento: null, imagen: GestorRecursos.obtenerRutaImagen('pantalonImg') },
                { id: 'p6', nombre: 'Pantalón 6', precio: 75, descuento: null, imagen: GestorRecursos.obtenerRutaImagen('pantalonImg') }
            ],
            zapatos: [
                { id: 'z1', nombre: 'Zapato 1', precio: 60, precioOriginal: 75, descuento: '-20%', imagen: GestorRecursos.obtenerRutaImagen('zapatoImg') },
                { id: 'z2', nombre: 'Zapato 2', precio: 75, descuento: null, imagen: GestorRecursos.obtenerRutaImagen('zapatoImg') },
                { id: 'z3', nombre: 'Zapato 3', precio: 75, descuento: null, imagen: GestorRecursos.obtenerRutaImagen('zapatoImg') },
                { id: 'z4', nombre: 'Zapato 4', precio: 75, descuento: null, imagen: GestorRecursos.obtenerRutaImagen('zapatoImg') },
                { id: 'z5', nombre: 'Zapato 5', precio: 75, descuento: null, imagen: GestorRecursos.obtenerRutaImagen('zapatoImg') },
                { id: 'z6', nombre: 'Zapato 6', precio: 75, descuento: null, imagen: GestorRecursos.obtenerRutaImagen('zapatoImg') }
            ],
            vestidos: [
                { id: 'v1', nombre: 'Vestido 1', precio: 60, precioOriginal: 75, descuento: '-20%', imagen: GestorRecursos.obtenerRutaImagen('vestidoImg') },
                { id: 'v2', nombre: 'Vestido 2', precio: 75, descuento: null, imagen: GestorRecursos.obtenerRutaImagen('vestidoImg') },
                { id: 'v3', nombre: 'Vestido 3', precio: 75, descuento: null, imagen: GestorRecursos.obtenerRutaImagen('vestidoImg') },
                { id: 'v4', nombre: 'Vestido 4', precio: 75, descuento: null, imagen: GestorRecursos.obtenerRutaImagen('vestidoImg') },
                { id: 'v5', nombre: 'Vestido 5', precio: 75, descuento: null, imagen: GestorRecursos.obtenerRutaImagen('vestidoImg') },
                { id: 'v6', nombre: 'Vestido 6', precio: 75, descuento: null, imagen: GestorRecursos.obtenerRutaImagen('vestidoImg') }
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
        if (this.puntosUsuario >= item.precio) {
            this.puntosUsuario -= item.precio;
            alert(`¡Compraste ${item.nombre}!`);
            this.renderizar();
        } else {
            alert('No tienes suficientes puntos.');
        }
    }
}
