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
    this.totalTime = totalTime;
    this.timeRemaining = totalTime;
    this.timer = document.getElementById("time-remaining");
    this.ticker = document.getElementById("flips");
    this.audioController = new AudioController();
  }
  startGame() {
    this.cardToCheck = null; //current flipped card
    this.totalClicks = 0;
    this.timeRemaining = this.totalTime;
    this.matchedCards = []; // array to hold matched cards
    this.busy = true; //specify whether card can be flipped or not (like when any animation is running)

    setTimeout(() => {
      this.audioController.startMusic();
      this.shuffleCards();
      this.countDown = this.startCountDown();
      this.busy = false;
    }, 500);

    this.hideCards();
    this.timer.innerText = this.timeRemaining;
    this.ticker.innerText = this.totalClicks;
  }

  hideCards() {
    this.cardsArray.forEach((card) => {
      card.classList.remove("visible");
      card.classList.remove("matched");
    });
  }

  flipCard(card) {
    if (this.canFlipCard(card)) {
      this.audioController.flip();
      this.totalClicks++;
      this.ticker.innerText = this.totalClicks;
      card.classList.add("visible");

      if (this.cardToCheck) {
        this.checkForCardMatch(card);
      } else {
        this.cardToCheck = card;
      }
    }
  }

  // to check if card have a match or not
  checkForCardMatch(card) {}

  // to get card-value(src) of a card so that it can be compared.
  getCardType(card) {
    return card.getElementsByClassName("card-value")[0].src;
  }

  startCountDown() {
    return setInterval(() => {
      this.timeRemaining--;
      this.timer.innerText = this.timeRemaining;
      if (this.timeRemaining === 0) this.gameOver();
    }, 1000);
  }

  gameOver() {
    clearInterval(this.countDown);
    this.audioController.gameOver();
    document.getElementById("game-over-text").classList.add("visible");
  }

  victory() {
    clearInterval(this.countDown);
    this.audioController.victory();
    document.getElementById("victory-text").classList.add("visible");
  }

  shuffleCards() {
    for (let i = this.cardsArray.length - 1; i > 0; i--) {
      let randIndex = Math.floor(Math.random() * (i + 1));
      this.cardsArray[randIndex].style.order = i;
      this.cardsArray[i].style.order = randIndex;
    }
  }

  //func to tell whether card can be flipped or not
  canFlipCard(card) {
    return true;
    // return (
    //   !this.busy &&
    //   !this.matchedCards.includes(card) &&
    //   card !== this.cardToCheck
    // );
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
  let game = new MixOrMatch(100, cards);

  overlays.forEach((overlay) => {
    overlay.addEventListener("click", () => {
      overlay.classList.remove("visible");
      game.startGame();
    });
  });

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      game.flipCard(card);
    });
  });
}
