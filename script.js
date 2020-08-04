//For audio inside the game

class AudioController {
  constructor() {
    this.bgMusic = new Audio(
      "Assets/Audio/background_ Assassin's Creed Theme.mp3"
    );
    this.flipSound = new Audio("Assets/Audio/flip.wav");
    this.matchSound = new Audio("Assets/Audio/match_Leap-of-Faith.wav");
    this.victorySound = new Audio("Assets/Audio/victory.wav");
    this.gameOverSound = new Audio("Assets/Audio/gameOver.wav");
    this.bgMusic.volume = 0.5;
    this.bgMusic.loop = true;
  }
  startMusic() {
    this.bgMusic.play();
  }
  stopMusic() {
    this.bgMusic.pause();
    this.bgMusic.currentTime = 0;
  }
  flip() {
    this.flipSound.play();
  }
  match() {
    this.matchSound.play();
  }
  victory() {
    this.stopMusic();
    this.victorySound.play();
  }
  gameOver() {
    this.stopMusic();
    this.gameOverSound.play();
  }
}

//Actual game class for mix or match

class MixOrMatch {
  constructor(totalTime, cards) {
    this.cardsArray = cards;
    this.tatalTime = totalTime;
    this.timeRemaining = totalTime;
    this.timer = document.getElementById("time-remaining");
    this.ticker = document.getElementById("flips");
    this.audioController = new AudioController();
  }
  startGame() {
    this.cardToCheck = null; //current flipped card
    this.totalClick = 0;
    this.timeRemaining = this.totalTime;
    this.matchedCards = []; // array to hold matched cards
    this.busy = true; //specify whether card can be flipped or not
  }
  
}

//Rendering all elements of HTML DOM

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", ready());
} else {
  ready();
}

//At game startup
function ready() {
  let overlays = Array.from(document.getElementsByClassName("overlay-text"));
  let cards = Array.from(document.getElementsByClassName("card"));

  overlays.forEach((overlay) => {
    overlay.addEventListener("click", () => {
      overlay.classList.remove("visible");
      //game.startGame();
      let audioController = new AudioController();
      audioController.startMusic();
    });
  });

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      //game.flipCard(Card);
      let audioController = new AudioController();
      audioController.flip();
    });
  });
}
