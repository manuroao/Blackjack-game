export const crear_carta = (carta, turno) => {
    const img_carta = document.createElement('img');
    img_carta.src = `assets/cartas/${carta}.png`;
    img_carta.classList.add('carta');
    turno.append(img_carta);
}