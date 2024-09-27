import {mostrarMensaje} from './mensaje';


export const ganador = (puntos_jugadores, mensajeResultado) => {
    const [puntos_jugador, puntos_computadora] = puntos_jugadores;
    const jugador_gana = ((puntos_jugador <= 21) && (puntos_jugador > puntos_computadora)) || (puntos_computadora > 21);
    const computadora_gana = ((puntos_computadora <= 21) && (puntos_computadora > puntos_jugador)) || (puntos_jugador > 21);

    if (puntos_jugador === puntos_computadora) {
        mostrarMensaje('Empate :|', mensajeResultado);
    } else if (jugador_gana) {
        mostrarMensaje('Ganaste :)', mensajeResultado);
    } else if (computadora_gana) {
        mostrarMensaje('Perdiste :(', mensajeResultado);
    }
}