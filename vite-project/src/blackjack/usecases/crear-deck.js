import _ from 'underscore';

// Esta función crea un nuevo deck
export const crear_deck = () => {
    let deck = [];
    for (let i = 2; i <= 10; i++) {
        for (let tipo of ['C', 'D', 'H', 'S']) {
            deck.push(i + tipo);
        }
    }

    for (let tipo of ['C', 'D', 'H', 'S']) {
        for (let especial of ['J', 'Q', 'K', 'A']) {
            deck.push(especial + tipo);
        }
    }
    return _.shuffle(deck);
}