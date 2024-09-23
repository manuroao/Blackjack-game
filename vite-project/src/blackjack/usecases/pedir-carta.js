/**
 * 
 * @param {Array<String>} deck 
 * @returns {String} - Devuelve una carta del deck
 */

export const pedir_carta = (deck) => {
    if (!deck || deck.length === 0) {
        throw 'No hay cartas en el deck';
    }
    return deck.pop();
}