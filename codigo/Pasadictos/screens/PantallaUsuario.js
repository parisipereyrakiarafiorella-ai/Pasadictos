class PantallaUsuario {
    constructor(gestorPantallas, datos = {}) {
        this.gestorPantallas = gestorPantallas;
        this.contenedor = gestorPantallas.obtenerContenedor();
        this.datos = datos;
        this.modoRegistro = false; // false = LOGIN, true = SIGN UP
    }

    renderizar() {
        this.contenedor.innerHTML = '';

        const pantalla = document.createElement('div');
        pantalla.className = 'pantalla-usuario';

        // Fondo general
        const rutaFondo = GestorRecursos.obtenerRutaImagen('sesion-fondo');
        pantalla.style.backgroundImage = `url('${rutaFondo}')`;

        // Obtener rutas de recursos
        const rutaAtras = GestorRecursos.obtenerRutaImagen('sesion-atras');
        const rutaDecoracion = GestorRecursos.obtenerRutaImagen('sesion-decoracion');
        const rutaTabla = GestorRecursos.obtenerRutaImagen(this.modoRegistro ? 'sesion-registrar_tabla' : 'sesion-tabla');
        const rutaEscribir = GestorRecursos.obtenerRutaImagen('sesion-escribir');
        const rutaBoton = GestorRecursos.obtenerRutaImagen('sesion-botonx2');

        pantalla.innerHTML = `
            <!-- Botón de volver atrás -->
            <button id="btn-usuario-volver" class="btn-volver-circular" title="Volver" style="background-image: url('${rutaAtras}');"></button>

            <!-- Decoración superior -->
            <div class="usuario-decoracion" style="background-image: url('${rutaDecoracion}');"></div>

            <!-- Cartel de madera central -->
            <div class="usuario-cartel ${this.modoRegistro ? 'modo-registro' : 'modo-login'}" style="background-image: url('${rutaTabla}');">
                ${!this.modoRegistro ? `
                    <!-- VISTA LOGIN -->
                    <div id="vista-login" class="auth-container">
                        <h2 class="auth-titulo">LOGIN</h2>
                        <div class="auth-filas">
                            <div class="auth-fila">
                                <label>Usuario</label>
                                <div class="input-escribir-container" style="background-image: url('${rutaEscribir}');">
                                    <input type="text" id="login-usuario" class="auth-input" autocomplete="off" />
                                </div>
                            </div>
                            <div class="auth-fila">
                                <label>Contraseña</label>
                                <div class="input-escribir-container" style="background-image: url('${rutaEscribir}');">
                                    <input type="password" id="login-pass" class="auth-input" autocomplete="new-password" />
                                </div>
                            </div>
                        </div>
                        <div class="auth-botones">
                            <button id="btn-login-ingresar" class="btn-auth-madera" style="background-image: url('${rutaBoton}');">Iniciar sesión</button>
                            <button id="btn-login-ir-registro" class="btn-auth-madera" style="background-image: url('${rutaBoton}');">Registrarse</button>
                        </div>
                    </div>
                ` : `
                    <!-- VISTA SIGN UP (REGISTRO) -->
                    <div id="vista-registro" class="auth-container">
                        <h2 class="auth-titulo">SIGN UP</h2>
                        <div class="auth-filas">
                            <div class="auth-fila">
                                <label>Correo</label>
                                <div class="input-escribir-container" style="background-image: url('${rutaEscribir}');">
                                    <input type="email" id="reg-correo" class="auth-input" autocomplete="off" placeholder="ejemplo@gmail.com" />
                                </div>
                            </div>
                            <div class="auth-fila">
                                <label>Usuario</label>
                                <div class="input-escribir-container" style="background-image: url('${rutaEscribir}');">
                                    <input type="text" id="reg-usuario" class="auth-input" autocomplete="off" />
                                </div>
                            </div>
                            <div class="auth-fila">
                                <label>Contraseña</label>
                                <div class="input-escribir-container" style="background-image: url('${rutaEscribir}');">
                                    <input type="password" id="reg-pass" class="auth-input" autocomplete="new-password" />
                                </div>
                            </div>
                            <div class="auth-fila">
                                <label>Confir. cont.</label>
                                <div class="input-escribir-container" style="background-image: url('${rutaEscribir}');">
                                    <input type="password" id="reg-pass-confirm" class="auth-input" autocomplete="new-password" />
                                </div>
                            </div>
                        </div>
                        <div class="auth-botones">
                            <button id="btn-reg-atras" class="btn-auth-madera" style="background-image: url('${rutaBoton}');">Atrás</button>
                            <button id="btn-reg-confirmar" class="btn-auth-madera" style="background-image: url('${rutaBoton}');">Registrarse</button>
                        </div>
                    </div>
                `}
            </div>
        `;

        this.asignarEventos(pantalla);
        this.contenedor.appendChild(pantalla);
    }

    asignarEventos(pantalla) {
        // Botón circular atrás
        const btnVolver = pantalla.querySelector('#btn-usuario-volver');
        if (btnVolver) {
            btnVolver.addEventListener('click', () => {
                this.modoRegistro = false;
                this.gestorPantallas.cambiarPantalla('MenuPrincipal');
            });
        }

        // Ir a Registro
        const btnIrReg = pantalla.querySelector('#btn-login-ir-registro');
        if (btnIrReg) {
            btnIrReg.addEventListener('click', () => {
                this.modoRegistro = true;
                this.renderizar();
            });
        }

        // Volver a Login desde Registro
        const btnRegAtras = pantalla.querySelector('#btn-reg-atras');
        if (btnRegAtras) {
            btnRegAtras.addEventListener('click', () => {
                this.modoRegistro = false;
                this.renderizar();
            });
        }

        // Botón de Confirmar Registro (Sign Up)
        const btnRegConfirmar = pantalla.querySelector('#btn-reg-confirmar');
        if (btnRegConfirmar) {
            btnRegConfirmar.addEventListener('click', () => {
                const correo = pantalla.querySelector('#reg-correo').value.trim();
                const usuario = pantalla.querySelector('#reg-usuario').value.trim();
                const password = pantalla.querySelector('#reg-pass').value;
                const passwordConfirm = pantalla.querySelector('#reg-pass-confirm').value;

                if (!correo || !usuario || !password || !passwordConfirm) {
                    alert('Por favor, completá todos los campos.');
                    return;
                }

                if (!correo.toLowerCase().endsWith('@gmail.com')) {
                    alert('El correo electrónico debe ser obligatoriamente una cuenta de @gmail.com.');
                    return;
                }

                if (password !== passwordConfirm) {
                    alert('Las contraseñas no coinciden. Por favor, verificá los datos.');
                    return;
                }

                let usuariosRegistrados = JSON.parse(localStorage.getItem('pasadictos_usuarios')) || {};
                if (usuariosRegistrados[usuario]) {
                    alert('Este nombre de usuario ya está registrado!');
                    return;
                }

                usuariosRegistrados[usuario] = { correo, password };
                localStorage.setItem('pasadictos_usuarios', JSON.stringify(usuariosRegistrados));
                alert('¡Registro exitoso! Ya podés iniciar sesión con tus datos.');
                this.modoRegistro = false;
                this.renderizar();
            });
        }

        // Botón de Iniciar Sesión (Login)
        const btnIngresar = pantalla.querySelector('#btn-login-ingresar');
        if (btnIngresar) {
            btnIngresar.addEventListener('click', () => {
                const usuario = pantalla.querySelector('#login-usuario').value.trim();
                const password = pantalla.querySelector('#login-pass').value;

                if (!usuario || !password) {
                    alert('Por favor, ingresá tu usuario y contraseña.');
                    return;
                }

                let usuariosRegistrados = JSON.parse(localStorage.getItem('pasadictos_usuarios')) || {};

                if (usuariosRegistrados[usuario] && usuariosRegistrados[usuario].password === password) {
                    window.usuarioActual = usuario;
                    localStorage.setItem('pasadictos_sesion_activa', usuario);
                    this.modoRegistro = false;
                    this.gestorPantallas.cambiarPantalla('MenuPrincipal');
                } else {
                    alert('Usuario o contraseña incorrectos.');
                }
            });
        }
    }
}