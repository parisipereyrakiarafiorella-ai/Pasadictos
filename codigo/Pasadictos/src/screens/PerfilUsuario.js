class PerfilUsuario {
    constructor(gestorPantallas, datos = {}) {
        this.gestorPantallas = gestorPantallas;
        this.contenedor = gestorPantallas.obtenerContenedor();
        this.datos = datos;
    }

    renderizar() {
        this.contenedor.innerHTML = '';

        const pantalla = document.createElement('div');
        pantalla.className = 'pantalla-perfil animacion-entrada-perfil';

        // Obtener recursos desde el GestorRecursos
        const rutaFondo = GestorRecursos.obtenerRutaImagen('fondoPerfil');
        const rutaMarco = GestorRecursos.obtenerRutaImagen('marcoPerfil');
        const rutaBtnEdit = GestorRecursos.obtenerRutaImagen('editarPerfilBoton');
        const rutaAtras = GestorRecursos.obtenerRutaImagen('sesion-atras');
        const rutaAvatar = GestorRecursos.obtenerRutaImagen('inventarioChica');

        // Datos del usuario logueado o por defecto
        const usuarioActual = localStorage.getItem('pasadictos_sesion_activa') || 'Usuario123';

        // Estructura HTML de la pantalla de perfil adaptada a tu prototipo
        pantalla.style.backgroundImage = `url('${rutaFondo}')`;

        pantalla.innerHTML = `
            <!-- Botón de Volver -->
            <button id="btn-perfil-volver" class="btn-volver-circular" title="Volver" style="background-image: url('${rutaAtras}');"></button>

            <!-- Título de la pantalla -->
            <h1 class="titulo-perfil">Perfil</h1>

            <!-- Contenedor del Marco con la información -->
            <div class="perfil-marco-container" style="background-image: url('${rutaMarco}');">
                <!-- PANEL IZQUIERDO DE DATOS -->
                <div class="perfil-panel-izquierdo">
                    <!-- Cabecera de Usuario -->
                    <div class="perfil-header-usuario">
                        <div class="perfil-avatar-circle">
                            <img src="${rutaAvatar}" alt="Avatar Mini" />
                        </div>
                        <div class="perfil-info-textos">
                            <h2 class="perfil-nombre-usuario">${usuarioActual}</h2>
                            <p class="perfil-estado">• Activo hace 2h</p>
                            <p class="perfil-social">Amigos 7 • Seguidores 3</p>
                        </div>
                    </div>

                    <!-- Sección Estadísticas -->
                    <div class="perfil-seccion-estadisticas">
                        <h3 class="perfil-titulo-estadisticas"></h3>
                        <ul class="perfil-lista-estadisticas">
                            <li><span>❀ Puntuación actual:</span> <strong>540</strong></li>
                            <li><span>❀ Items obtenidos:</span> <strong>46</strong></li>
                            <li><span>❀ Respuestas correctas:</span> <strong>30</strong></li>
                            <li><span>❀ Personajes entrevistados:</span> <strong>7</strong></li>
                            <li><span>❀ Interacciones ocultas:</span> <strong>3</strong></li>
                        </ul>
                    </div>
                </div>

                <!-- PANEL DERECHO: MUÑECO/AVATAR COMPLETO -->
                <div class="perfil-panel-derecho">
                    <div class="perfil-avatar-completo">
                        <img src="${rutaAvatar}" alt="Personaje" />
                    </div>
                </div>
            </div>

            <!-- BOTONES INFERIORES -->
            <div class="perfil-botones-abajo">
                <button id="btn-edit-profile" class="btn-edit-profile" style="background-image: url('${rutaBtnEdit}');"></button>
                <button id="btn-cerrar-sesion" class="btn-cerrar-sesion-texto">Cerrar sesión</button>
            </div>
        `;

        this.asignarEventos(pantalla);
        this.contenedor.appendChild(pantalla);
    }

    asignarEventos(pantalla) {
        // Volver al menú
        const btnVolver = pantalla.querySelector('#btn-perfil-volver');
        if (btnVolver) {
            btnVolver.addEventListener('click', () => {
                this.gestorPantallas.cambiarPantalla('MenuPrincipal');
            });
        }

        // Editar Perfil
        const btnEdit = pantalla.querySelector('#btn-edit-profile');
        if (btnEdit) {
            btnEdit.addEventListener('click', () => {
                alert('Función de editar perfil en desarrollo');
            });
        }

        // Cerrar Sesión
        const btnCerrarSesion = pantalla.querySelector('#btn-cerrar-sesion');
        if (btnCerrarSesion) {
            btnCerrarSesion.addEventListener('click', () => {
                localStorage.removeItem('pasadictos_sesion_activa');
                window.usuarioActual = null;
                alert('Sesión cerrada correctamente.');
                this.gestorPantallas.cambiarPantalla('PantallaUsuario');
            });
        }
    }
}