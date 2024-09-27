import { actualizar_puntos } from "./actualizar-puntos";
import { crear_carta } from "./crear-carta";
import { pedir_carta } from "./pedir-carta";

export const turno_computadora = (puntos_minimos, deck, turno, puntos, puntosHTML) =>{
  
    do {

        const carta = pedir_carta(deck);
        puntos = actualizar_puntos(puntos, carta, puntosHTML);
        crear_carta(carta, turno);
    
    } while ((puntos < puntos_minimos) && (puntos_minimos <= 21));


    return puntos;
}