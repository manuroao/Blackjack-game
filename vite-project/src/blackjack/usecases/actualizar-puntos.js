import { valor_carta } from "./obtener-valor-carta"

export const actualizar_puntos = (puntos, carta, puntosHTML) => {
    if (!carta) throw new Error("Se necesita la carta");
    if (!puntosHTML) throw new Error("puntosHTML son necesarios");

    puntos = puntos + valor_carta(carta);
    puntosHTML.innerText = puntos;
    return puntos;
}