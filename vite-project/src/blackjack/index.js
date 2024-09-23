import {crear_deck} from './usecases/crear-deck.js';

(() => {

  'use strict';

  let  deck =[],
       puntos_jugadores = [];
  
  // Referencias HTML
  const boton_nuevo = document.querySelector('#boton-nuevo-juego'),
        boton_pedir = document.querySelector('#boton-pedir'),
        boton_detener = document.querySelector('#boton-detener'),
        puntosHTML = document.querySelectorAll('small'),
        cartas = document.querySelectorAll('.div-cartas'),
        mensajeResultado = document.querySelector('#mensaje-resultado');

  
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
  
    

    const mostrarMensaje = (mensaje) => {        
        // Asegúrate de que el div existe en el DOM
        if (mensajeResultado) {
            mensajeResultado.innerText = mensaje;
            mensajeResultado.classList.remove('mensaje-oculto');
            mensajeResultado.classList.add('mensaje-visible');
        } else {
            console.error('No se encontró el div con id "mensaje-resultado"');
        }

        console.log(mensajeResultado);
    };


  const ganador = () => {
        const [puntos_jugador, puntos_computadora] = puntos_jugadores;
        const jugador_gana = ((puntos_jugador <= 21) && (puntos_jugador > puntos_computadora)) || (puntos_computadora > 21);
        const computadora_gana = ((puntos_computadora <= 21) && (puntos_computadora > puntos_jugador)) || (puntos_jugador > 21);
    
        if (puntos_jugador === puntos_computadora) {
            mostrarMensaje('Empate :|');
        } else if (jugador_gana) {
            mostrarMensaje('Ganaste :)');
        } else if (computadora_gana) {
            mostrarMensaje('Perdiste :(');
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
        mensajeResultado.classList.remove('mensaje-visible');
        mensajeResultado.classList.add('mensaje-oculto');
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

