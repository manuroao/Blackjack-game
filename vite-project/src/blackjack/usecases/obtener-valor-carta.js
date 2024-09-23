  
/**
 * 
 * @param {String} carta 
 * @returns {Number} - Devuelve el valor de la carta
 */
export const valor_carta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;
}
