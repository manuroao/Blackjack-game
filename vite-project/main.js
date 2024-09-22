import './style.css'
import _ from 'underscore'

(() => {

  'use strict';

  let  deck =[],
       puntos_jugadores = [];
  
  // Referencias HTML
  const boton_nuevo = document.querySelector('#boton-nuevo-juego'),
        boton_pedir = document.querySelector('#boton-pedir'),
        boton_detener = document.querySelector('#boton-detener'),
        puntosHTML = document.querySelectorAll('small'),
        cartas = document.querySelectorAll('.div-cartas');
  
  // Esta función crea un nuevo deck
  const crear_deck = () => {
      deck = [];
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
  
  // Esta función me permite tomar una carta
  const pedir_carta = () => {
      if (deck.length ===0) {
          throw 'No hay cartas en el deck';
      }
      return deck.pop();
  }
  

  // Esta función me permite saber el valor de una carta
  const valor_carta = (carta) => {
      const valor = carta.substring(0, carta.length - 1);
      return (isNaN(valor)) ?
              (valor === 'A') ? 11 : 10
              : valor * 1;
  }
  
  
  // Eventos
  
  // Inicio del juego
  boton_nuevo.addEventListener('click', main);
  
  
  const crear_carta = (carta, turno) => {
      const img_carta = document.createElement('img');
      img_carta.src = `assets/cartas/${carta}.png`;
      img_carta.classList.add('carta');
      cartas[turno].append(img_carta);
  }
  
  const actualizar_puntos = (turno, carta) => {
      puntos_jugadores[turno] = puntos_jugadores[turno] + valor_carta(carta);
      puntosHTML[turno].innerText = puntos_jugadores[turno];
  }

  const turno_computadora = ( puntos_minimos ) =>{
  
      do {

          const carta = pedir_carta();
          actualizar_puntos(puntos_jugadores.length - 1, carta);
          crear_carta(carta, puntos_jugadores.length - 1);
      
      } while ((puntos_jugadores[puntos_jugadores.length - 1] < puntos_minimos) && (puntos_minimos <= 21));
  
      setTimeout(() => {
          ganador();
      }, 100);
  
  }
  
  const ganador = () => {
      const [puntos_jugador, puntos_computadora] = puntos_jugadores;
      const jugador_gana = ((puntos_jugador <= 21) && (puntos_jugador > puntos_computadora)) || (puntos_computadora > 21);
      const computadora_gana = ((puntos_computadora <= 21) && (puntos_computadora > puntos_jugador)) || (puntos_jugador > 21);
  
      if (puntos_jugador === puntos_computadora) {
          alert('Empate');
      } else if (jugador_gana) {
          alert('Ganaste');
      } else if (computadora_gana) {
          alert('Perdiste');
      }
  }
  
  // Pedir carta
  boton_pedir.addEventListener('click', () => {
  
      const carta = pedir_carta();
      actualizar_puntos(0, carta);    
      crear_carta(carta, 0);
  
      if (puntos_jugadores[0] > 21) {
          botones(true);
          turno_computadora(puntos_jugadores[0]);
          ganador();
      } else if (puntos_jugadores[0] === 21) {
          botones(true);
          turno_computadora(puntos_jugadores[0]);
          ganador();
      }
  
  });
  
  
  // Detener
  boton_detener.addEventListener('click', () => {
  
      botones(true);
      turno_computadora(puntos_jugadores[0]);
  
  });

  const inicializar_juego = ( num_jugadores = 2 ) => {
      deck = crear_deck();
      puntos_jugadores = [];
      for (let i = 0; i < num_jugadores; i++) {
          puntos_jugadores.push(0);
          puntosHTML[i].innerText = 0;
          cartas[i].innerHTML = '';
      }
  }
  
  const botones = (flag) => {
      boton_pedir.disabled = flag;
      boton_detener.disabled = flag;
  }

  // Función principal
  function main() {
      inicializar_juego();    
      botones(false);
  }

  return {
      nuevo_juego: inicializar_juego
  };

})();    

