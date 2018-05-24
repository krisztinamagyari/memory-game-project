/*
 * Create a list that holds all of your cards
 */
const symbols = ["fa fa-diamond", "fa fa-paper-plane-o",
              "fa fa-bolt", "fa fa-cube", "fa fa-anchor", "fa fa-leaf",
              "fa fa-bicycle", "fa fa-bomb", "fa fa-diamond", "fa fa-paper-plane-o",
              "fa fa-bolt", "fa fa-cube", "fa fa-anchor", "fa fa-leaf",
              "fa fa-bicycle", "fa fa-bomb"];

const cardsContainer = document.querySelector(".deck");
const timerContainer = document.querySelector(".timer");

let openedCards = [];
let matchedCards = [];
let shuffledDeck = shuffle(symbols);
let liveTimer = 0;
let totalSeconds = 0;
let isFirstClick = true;

// Set the default value to the timer's container
timerContainer.innerHTML = totalSeconds;

// The total seconds will be increased by 1 after 1000 ms
function startTimer() {
    liveTimer = setInterval(function() {
    //increase the total secondy by one
    totalSeconds++;
    //Update the HTML container with the new time
    timerContainer.innerHTML = totalSeconds;
    }, 1000);
}


/*
 * Initialize the game
 */
function init() {
    for (let i = 0; i < symbols.length; i++) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class="${symbols[i]}"></i>`;
        cardsContainer.appendChild(card);

    // Shuffling the cards
    for (let i = 0; i < shuffledDeck.length; i++) {
        shuffledDeck[i].innerHTML = `<i class="${symbols[i]}"></i>`;
          }

    // Add click event to each cards
    click(card);
  }
}

/*
 * Click event
 */
function click(card) {

    // Card click event
    card.addEventListener("click", function() {

    if(isFirstClick) {
        // Start the timer
        startTimer();
        // Change the first click indicator's value
        isFirstClick = false;
    }

    const currentCard = this;
    const previousCard = openedCards [0];

    //We have an existing opened card
    if(openedCards.length === 1) {

        card.classList.add("open", "show", "disable");
        openedCards.push(this);

        // We should compare our two open cardsContainer
        compare(currentCard, previousCard);

    } else {
    //WE don't have any opened cards

      card.classList.add("open", "show", "disable");
      openedCards.push(this);
    }

    });
}

/*
 * Compare the two cards
 */
function compare(currentCard, previousCard) {

    // Matcher
    if (currentCard.innerHTML === previousCard.innerHTML) {

        currentCard.classList.add("match");
        previousCard.classList.add("match");

        matchedCards.push(currentCard, previousCard);

        openedCards = [];

        // Check if game is over
        isOver()

    } else {

        //Wait 500ms, and then do the following
        setTimeout(function() {
        currentCard.classList.remove("open", "show", "disable");
        previousCard.classList.remove("open", "show", "disable");
        }, 600);
        openedCards = [];
        }

    // Add new move
    addMove();
}

/*
 * Check if the game is over.
 */
function isOver() {
    if(matchedCards.length === symbols.length) {
        alert("Game Over!");
        stopTimer();
    }
}

/*
 * Add move
 */
const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;
function addMove() {
    moves++;
    movesContainer.innerHTML = moves;

    // Set the rating
    rating();
}

/*
 * Rating system
 */
const starsContainer = document.querySelector(".stars");
starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
function rating() {
    if(20 < moves) {
        starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>`;
    } else if(10 < moves && moves <= 20) {
        starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
    } else {
        starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
    }
};

/*
 * Restart button
 */
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function() {
    // Delete all cards
    cardsContainer.innerHTML = "";

    shuffle(symbols);

    // Call `init` to create new cards
    init();

    // Reset any related variables
    matchedCards = [];
    moves = 0;
    movesContainer.innerHTML = moves;
    starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
    totalSeconds = 0;
    timerContainer.innerHTML = totalSeconds;

});

////////// Start the game for the first time
init();

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
