import {crear_deck, 
    pedir_carta,  
    actualizar_puntos,
    crear_carta,
    turno_computadora,
    ganador} from './usecases/'

(() => {

  'use strict';

  let  deck =[],
       puntos_jugadores = [];
  
  // Referencias HTML
  const puntosHTML = document.querySelectorAll('small'),
        cartas = document.querySelectorAll('.div-cartas'),
        mensajeResultado = document.querySelector('#mensaje-resultado'),
        botones = document.querySelectorAll('.btn');
  
  
  // Eventos
  console.log(botones[0]);
  // Inicio del juego
  botones[0].addEventListener('click', main);

  // Pedir carta
  botones[1].addEventListener('click', () => {
  
        const carta = pedir_carta(deck);
        puntos_jugadores[0] = actualizar_puntos(puntos_jugadores[0], carta, puntosHTML[0]);
        crear_carta(carta, cartas[0]);
  
        if (puntos_jugadores[0] > 21) {
            actualizarBotones(true);
            puntos_jugadores[1] = turno_computadora(puntos_jugadores[0], deck, cartas[1], puntos_jugadores[1], puntosHTML[1]);
            ganador(puntos_jugadores, mensajeResultado);
        } else if (puntos_jugadores[0] === 21) {
            actualizarBotones(true);
            puntos_jugadores[1] = turno_computadora(puntos_jugadores[0], deck, cartas[1], puntos_jugadores[1], puntosHTML[1]);
            ganador(puntos_jugadores, mensajeResultado);
        }
        
    });
    
    
    // Detener
    botones[2].addEventListener('click', () => {
        actualizarBotones(true);
        puntos_jugadores[1] = turno_computadora(puntos_jugadores[0], deck, cartas[1], puntos_jugadores[1], puntosHTML[1]);
        ganador(puntos_jugadores, mensajeResultado)
  });

  const inicializar_juego = ( num_jugadores = 2 ) => {
        deck = crear_deck();
        puntos_jugadores = [];
        for (let i = 0; i < num_jugadores; i++) {
            puntos_jugadores.push(0);
            puntosHTML[i].innerText = 0;
            cartas[i].innerHTML = '';
        }
        mensajeResultado.classList.remove('mensaje-visible');
        mensajeResultado.classList.add('mensaje-oculto');
  }
  
  const actualizarBotones = (flag) => {
      botones[1].disabled = flag;
      botones[2].disabled = flag;
  }

  // Función principal
  function main() {
      inicializar_juego();    
      actualizarBotones(false);
  }

  return {
      nuevo_juego: inicializar_juego
  };

})();    

