class GestorAudio {
    constructor() {
        this.musicaGlobal = null;
        this.musicaMenu = null;
    }

    // Obtener volumen guardado (por defecto 50)
    obtenerVolumenMusica() {
        const v = localStorage.getItem('opciones_musica');
        return v !== null ? parseInt(v) / 100 : 0.5;
    }

    obtenerVolumenSfx() {
        const v = localStorage.getItem('opciones_sfx');
        return v !== null ? parseInt(v) / 100 : 0.5;
    }

    // Reproducir música del menú
    reproducirMusicaMenu(ruta) {
        if (!this.musicaMenu) {
            this.musicaMenu = new Audio(ruta);
            this.musicaMenu.loop = true;
        }
        this.musicaMenu.volume = this.obtenerVolumenMusica();
        this.musicaMenu.play().catch(() => {});
    }

    detenerMusicaMenu() {
        if (this.musicaMenu) {
            this.musicaMenu.pause();
            this.musicaMenu.currentTime = 0;
        }
    }

    // Reproducir música general del juego (musica2.mp3)
    reproducirMusicaGlobal(ruta) {
        if (!this.musicaGlobal) {
            this.musicaGlobal = new Audio(ruta);
            this.musicaGlobal.loop = true;
        }
        this.musicaGlobal.volume = this.obtenerVolumenMusica();
        this.musicaGlobal.play().catch(() => {});
    }

    detenerMusicaGlobal() {
        if (this.musicaGlobal) {
            this.musicaGlobal.pause();
            this.musicaGlobal.currentTime = 0;
        }
    }

    // Reproducir efecto de clic (SFX) en cualquier parte
    reproducirClick() {
        const volumen = this.obtenerVolumenSfx();
        if (volumen > 0) {
            const click = new Audio('src/assets/click.mp3');
            click.volume = volumen;
            click.play().catch(() => {});
        }
    }

    // Actualizar volúmenes en tiempo real si se mueven los sliders en Opciones
    actualizarVolumenesEnVivo() {
        const volM = this.obtenerVolumenMusica();
        if (this.musicaMenu) this.musicaMenu.volume = volM;
        if (this.musicaGlobal) this.musicaGlobal.volume = volM;
    }
}

// Creamos una única instancia global para todo el juego
window.gestorAudio = new GestorAudio();

// Sonido de clic global para TODOS los botones del juego que respeta el SFX
document.addEventListener('click', (evento) => {
    const boton = evento.target.closest('button');
    if (boton) {
        window.gestorAudio.reproducirClick();
    }
});