// script.js
document.addEventListener('DOMContentLoaded', () => {
  // Elementos del DOM
  const gameBoard = document.getElementById('gameBoard');
  const timerElement = document.getElementById('timer');
  const movesElement = document.getElementById('moves');
  const scoreElement = document.getElementById('score');
  const levelElement = document.getElementById('level');
  const resetBtn = document.getElementById('resetBtn');
  const hintBtn = document.getElementById('hintBtn');
  const difficultySelect = document.getElementById('difficulty');
  const messageContainer = document.getElementById('messageContainer');
  const messageTitle = document.getElementById('messageTitle');
  const messageText = document.getElementById('messageText');
  const finalTime = document.getElementById('finalTime');
  const finalMoves = document.getElementById('finalMoves');
  const finalScore = document.getElementById('finalScore');
  const playAgainBtn = document.getElementById('playAgainBtn');

  // Configuraciones de dificultad
  const difficultySettings = {
    easy: { rows: 4, cols: 4, timeBonus: 100, movePenalty: 2 },
    medium: { rows: 4, cols: 5, timeBonus: 150, movePenalty: 1 },
    hard: { rows: 5, cols: 6, timeBonus: 200, movePenalty: 0.5 }
  };

  // Variables del juego
  let cards = [];
  let flippedCards = [];
  let matchedPairs = 0;
  let moves = 0;
  let score = 0;
  let gameTime = 0;
  let timerInterval = null;
  let gameStarted = false;
  let currentDifficulty = 'medium';
  let canFlip = true;

  // Emojis para las cartas (parejas)
  const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', 
                 '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦄',
                 '🐙', '🦑', '🦐', '🦞', '🦀', '🐠', '🐟', '🐬', '🐳', '🦈',
                 '🍎', '🍌', '🍇', '🍓', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝',
                 '🚗', '✈️', '🚀', '🚁', '🛶', '🚂', '🚲', '🛴', '🚒', '🚑'];

  // Inicializar el juego
  function initGame() {
    clearInterval(timerInterval);
    gameStarted = false;
    gameTime = 0;
    moves = 0;
    score = 0;
    matchedPairs = 0;
    flippedCards = [];
    canFlip = true;
    
    updateDisplay();
    createCards();
    startTimer();
  }

  // Crear las cartas
  function createCards() {
    const settings = difficultySettings[currentDifficulty];
    const totalCards = settings.rows * settings.cols;
    const neededPairs = totalCards / 2;
    
    // Seleccionar emojis aleatorios
    const selectedEmojis = [];
    const shuffledEmojis = [...emojis].sort(() => Math.random() - 0.5);
    
    for (let i = 0; i < neededPairs; i++) {
      selectedEmojis.push(shuffledEmojis[i], shuffledEmojis[i]);
    }
    
    // Mezclar las cartas
    cards = selectedEmojis.sort(() => Math.random() - 0.5);
    
    // Limpiar el tablero
    gameBoard.innerHTML = '';
    
    // Actualizar grid
    gameBoard.style.gridTemplateColumns = `repeat(${settings.cols}, 1fr)`;
    
    // Crear elementos de carta
    cards.forEach((emoji, index) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.dataset.index = index;
      card.dataset.value = emoji;
      
      const front = document.createElement('div');
      front.classList.add('card-front');
      front.textContent = emoji;
      
      const back = document.createElement('div');
      back.classList.add('card-back');
      back.textContent = '?';
      
      card.appendChild(front);
      card.appendChild(back);
      
      card.addEventListener('click', () => flipCard(card));
      gameBoard.appendChild(card);
    });
    
    // Mostrar todas las cartas brevemente al inicio
    setTimeout(() => {
      document.querySelectorAll('.card').forEach(card => {
        card.classList.add('flipped');
        setTimeout(() => {
          if (!card.classList.contains('matched')) {
            card.classList.remove('flipped');
          }
        }, 1500);
      });
    }, 500);
  }

  // Voltear una carta
  function flipCard(card) {
    if (!canFlip || card.classList.contains('flipped') || 
        card.classList.contains('matched') || flippedCards.length >= 2) {
      return;
    }
    
    if (!gameStarted) {
      gameStarted = true;
      startTimer();
    }
    
    card.classList.add('flipped');
    flippedCards.push(card);
    
    if (flippedCards.length === 2) {
      moves++;
      canFlip = false;
      
      const [card1, card2] = flippedCards;
      
      if (card1.dataset.value === card2.dataset.value) {
        // ¡Pareja encontrada!
        setTimeout(() => {
          card1.classList.add('matched');
          card2.classList.add('matched');
          matchedPairs++;
          score += calculateScore();
          flippedCards = [];
          canFlip = true;
          checkWin();
          updateDisplay();
        }, 500);
      } else {
        // No son pareja
        setTimeout(() => {
          card1.classList.remove('flipped');
          card2.classList.remove('flipped');
          flippedCards = [];
          canFlip = true;
          updateDisplay();
        }, 1000);
      }
      
      updateDisplay();
    }
  }

  // Calcular puntuación
  function calculateScore() {
    const settings = difficultySettings[currentDifficulty];
    const timeScore = Math.max(0, settings.timeBonus - gameTime);
    const moveScore = Math.max(0, 100 - (moves * settings.movePenalty));
    return Math.round((timeScore + moveScore) / 2);
  }

  // Iniciar temporizador
  function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      if (gameStarted) {
        gameTime++;
        updateTimerDisplay();
      }
    }, 1000);
  }

  // Actualizar display del temporizador
  function updateTimerDisplay() {
    const minutes = Math.floor(gameTime / 60).toString().padStart(2, '0');
    const seconds = (gameTime % 60).toString().padStart(2, '0');
    timerElement.textContent = `${minutes}:${seconds}`;
  }

  // Actualizar toda la pantalla
  function updateDisplay() {
    movesElement.textContent = moves;
    scoreElement.textContent = score;
    levelElement.textContent = difficultySelect.selectedOptions[0].text.split('(')[0].trim();
    updateTimerDisplay();
  }

  // Verificar si ganó
  function checkWin() {
    const settings = difficultySettings[currentDifficulty];
    const totalPairs = (settings.rows * settings.cols) / 2;
    
    if (matchedPairs === totalPairs) {
      clearInterval(timerInterval);
      showWinMessage();
    }
  }

  // Mostrar mensaje de victoria
  function showWinMessage() {
    finalTime.textContent = timerElement.textContent;
    finalMoves.textContent = moves;
    finalScore.textContent = score;
    
    // Mensaje según el rendimiento
    const efficiency = moves / (difficultySettings[currentDifficulty].rows * difficultySettings[currentDifficulty].cols);
    
    if (efficiency < 1.5) {
      messageTitle.textContent = '¡Genio de la Memoria! 🏆';
      messageText.textContent = 'Tu memoria fotográfica es impresionante. ¡Excelente trabajo!';
    } else if (efficiency < 2.5) {
      messageTitle.textContent = '¡Muy Bien! 🌟';
      messageText.textContent = 'Has demostrado tener una excelente memoria. ¡Felicidades!';
    } else {
      messageTitle.textContent = '¡Buen Trabajo! 👍';
      messageText.textContent = 'Has completado el juego. ¡Sigue practicando!';
    }
    
    messageContainer.style.display = 'flex';
  }

  // Dar pista
  function giveHint() {
    if (!gameStarted || flippedCards.length > 0) return;
    
    const unmatchedCards = Array.from(document.querySelectorAll('.card:not(.matched)'));
    if (unmatchedCards.length < 2) return;
    
    // Encontrar una pareja para la pista
    const cardValues = {};
    let hintCards = [];
    
    unmatchedCards.forEach(card => {
      const value = card.dataset.value;
      if (!cardValues[value]) {
        cardValues[value] = [card];
      } else if (cardValues[value].length === 1) {
        cardValues[value].push(card);
        hintCards = cardValues[value];
      }
    });
    
    if (hintCards.length === 2) {
      // Mostrar pista
      hintCards.forEach(card => {
        card.classList.add('hint');
        setTimeout(() => {
          card.classList.remove('hint');
        }, 1000);
      });
      
      // Penalizar por usar pista
      score = Math.max(0, score - 50);
      updateDisplay();
    }
  }

  // Cambiar dificultad
  function changeDifficulty() {
    currentDifficulty = difficultySelect.value;
    initGame();
  }

  // Event Listeners
  resetBtn.addEventListener('click', initGame);
  hintBtn.addEventListener('click', giveHint);
  difficultySelect.addEventListener('change', changeDifficulty);
  playAgainBtn.addEventListener('click', () => {
    messageContainer.style.display = 'none';
    initGame();
  });

  // Inicializar el juego al cargar
  initGame();
  
  // Mensaje de consola
  console.log('🎮 Juego de Memoria cargado correctamente');
  console.log('🎯 Características:');
  console.log('   - 3 niveles de dificultad');
  console.log('   - Sistema de puntuación');
  console.log('   - Temporizador');
  console.log('   - Pistas disponibles');
  console.log('   - Diseño responsive');
});