export const mostrarMensaje = (mensaje, mensajeResultado) => {        
    // Asegúrate de que el div existe en el DOM
    if (mensajeResultado) {
        mensajeResultado.innerText = mensaje;
        mensajeResultado.classList.remove('mensaje-oculto');
        mensajeResultado.classList.add('mensaje-visible');
    } else {
        console.error('No se encontró el div con id "mensaje-resultado"');
    }
};