

const deck = document.querySelector('.deck');
const totalPairs = 8;


// Embaralha as cartas:
function shuffleDeck() {
	const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
	console.log('Cards to Shuffle', cardsToShuffle);
	const shuffledCards = shuffle(cardsToShuffle);
	console.log('Shuffled cards', shuffledCards);
	for (card of shuffledCards) {
		deck.appendChild(card);
	}
}
shuffleDeck();

let matched = 0;
let time = 0;
let clockId; 
let moves = 0;


let clockOff = true;

// adiciona a jogada no contador:
function addMove() {
	moves++;
	const movesText = document.querySelector('.moves');
	movesText.innerHTML = moves;
}


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

let toggledCards = [];

const cards = document.querySelectorAll('.card');

for (card of cards) {
	card.addEventListener('click', () => {
		
	})
}

// função que valida o clique do usuário:
function isClickValid(clickTarget) {
	return (
		clickTarget.classList.contains('card') && 
		toggledCards.length < 2 &&
		!toggledCards.includes(clickTarget) &&
		!clickTarget.classList.contains('match')
		);
}


deck.addEventListener('click', event => {
	const clickTarget = event.target;
	if (isClickValid(clickTarget))  {
		if (clockOff) {
			startClock();
			clockOff = false;
		}

		toggleCard(clickTarget);
		addToggleCard(clickTarget);

			if (toggledCards.length === 2) {

			clickTarget.removeAttribute('toggledCards')
			checkForMatch();
			addMove();
			checkScore();

		}
	}


});

//função que vira a carta clicada:
function toggleCard(clickTarget) {
	clickTarget.classList.toggle('open');
	clickTarget.classList.toggle('show');
}


function addToggleCard(clickTarget) {
	toggledCards.push(clickTarget);
	console.log(toggledCards);
}

//função que inicia a contagem de tempo:
function startClock() {
	clockId = setInterval(() => {
		time++
		console.log(time);
		displayTime();
	}, 1000);
}

// função que mostra o decorrer do tempo na tela:
function displayTime() {
	const clock = document.querySelector('.clock');
	const minutes = Math.floor(time / 60);
	const seconds = time % 60;
	console.log(clock);
	if (seconds < 10) {
		clock.innerHTML = `${minutes}:0${seconds}`;
	} else {
		clock.innerHTML = `${minutes}:${seconds}`;
}
}

// função que para o contador:

function stopClock() {
	clearInterval(clockId);
}


// função que valida se as cartãs formam pares

function checkForMatch() {
	if (
		toggledCards[0].firstElementChild.className ===
		toggledCards[1].firstElementChild.className) 
	{
	
		toggledCards[0].classList.toggle('match');
		toggledCards[1].classList.toggle('match');
		toggledCards = [];
		matched++;
		if (matched === totalPairs) {
		gameOver();
		}



	 } 	

	 else {
	 
		setTimeout(() => {

	 		toggleCard(toggledCards[0]);
	 		toggleCard(toggledCards[1]);
	 		toggledCards = [];
	 	}, 1000);
	 		 	
	

	 }
} 


// função que controla a pontuação escondendo as estrelas conforme o número de jogadas:	
function hideStar() {
	const starList = document.querySelectorAll('.stars li');
	for (star of starList) {
		if (star.style.display !== 'none') {
			star.style.display = 'none';
			break;
		} 
	}
}


function checkScore() {
	if (moves === 16 || moves === 30) {
		hideStar();

	}
}

// função que mostra o modal:
function toggleModal() {
	const modal = document.querySelector('.modal-background');
	modal.classList.toggle('hide');


}


// função que adciona dados ao modal:
function writeModalStats() {
	const timeStat = document.querySelector('.modal-time');
	const clockTime = document.querySelector('.clock').innerHTML;
	const movesStat = document.querySelector('.modal-moves');
	const starsStat = document.querySelector('.modal-stars');
	const stars = getStars();


	timeStat.innerHTML = `Tempo = ${clockTime}`;
	movesStat.innerHTML = `Jogadas = ${moves}`;
	starsStat.innerHTML = `Estrelas = ${stars}`;
}


function getStars() {
	stars = document.querySelectorAll('.stars li');
	starCount = 0;
	for (star of stars) {
		if (star.style.display !== 'none') {
			starCount++;
		}
	}
console.log(starCount);
return starCount;

}


// função para reiniciar o jogo:

function resetGame() {
	resetClockAndTime();
	resetMoves();
	resetStars();
	shuffleDeck();
	resetCards();
}

// reinicia o contador:

function resetClockAndTime() {
	stopClock();
	clockOff = true;
	time = 0;
	displayTime();
}

// reinicia as jogadas:
function resetMoves() {
	moves = 0;
	document.querySelector('.moves').innerHTML = moves;

}

// reinicia a pontuação:
function resetStars() {
	stars = 0;
	const starList = document.querySelectorAll('.stars li');
	for (star of starList) {
		star.style.display = 'inline';
	}
}

document.querySelector('.restart').addEventListener('click', resetGame);

document.querySelector('.btn-primary').addEventListener('click', () => {
	resetGame();
	toggleModal();
});

document.querySelector('.modal-close').addEventListener('click', () => {
	toggleModal();
	resetGame();
});

document.querySelector('.btn-secondary').addEventListener('click', () => {
	toggleModal();
	resetGame();
});



// apresenta o modal, para o contador do tempo, e mostra os dados de pontuação no modal
function gameOver() {
	stopClock();
	writeModalStats();
	toggleModal();

}

// reinicia o jogo:

function replayGame() {
	resetGame();
	toggleModal();
	resetCards();
}

// vira as cartas novamente
function resetCards() {
	const cards = document.querySelectorAll('.deck li');
	for (let card of cards) {
		card.className = 'card';
	}
}

























