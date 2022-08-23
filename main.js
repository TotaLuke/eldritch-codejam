import * as Ancients from "./data/ancients.js";
import * as Blue from "./data/mythicCards/blue/index.js";
import * as Brown from "./data/mythicCards/brown/index.js";
import * as Green from "./data/mythicCards/green/index.js";

const azathothImage = document.querySelector('.Azathoth');
const cthulthuImage = document.querySelector('.Cthulthu');
const iogSothothImage = document.querySelector('.IogSothoth');
const shubNiggurathImage = document.querySelector('.ShubNiggurath');
const buttons = document.querySelectorAll('.difficulty');
const difficultyContainer = document.querySelector('.difficulty-container');
const trackContainer = document.querySelector('.track-container');

const fgrc = document.querySelector('.first-green-count');
const fbrc = document.querySelector('.first-brown-count');
const fblc = document.querySelector('.first-blue-count');

const sgrc = document.querySelector('.second-green-count');
const sbrc = document.querySelector('.second-brown-count');
const sblc = document.querySelector('.second-blue-count');

const tbrc = document.querySelector('.third-brown-count');
const tgrc = document.querySelector('.third-green-count');
const tblc = document.querySelector('.third-blue-count');

const deckImage = document.querySelector('.deck');
const openCard = document.querySelector('.open-card');



let choosedAncient = {};
let deck = [];
let gameDeck = [];


azathothImage.addEventListener('click', () => {
    cthulthuImage.classList.remove('active-ancient');
    iogSothothImage.classList.remove('active-ancient');
    shubNiggurathImage.classList.remove('acive-ancient');
    azathothImage.classList.add('active-ancient');
    difficultyContainer.style.opacity = '1';
    choosedAncient = Ancients.ancientsData[0];
    deckImage.classList.remove('deck-active');
    openCard.style.background = 'none';
    trackContainer.classList.remove('track-active');
})

cthulthuImage.addEventListener('click', () => {
    iogSothothImage.classList.remove('active-ancient');
    shubNiggurathImage.classList.remove('active-ancient');
    azathothImage.classList.remove('active-ancient');
    cthulthuImage.classList.add('active-ancient');
    difficultyContainer.style.opacity = '1';
    choosedAncient = Ancients.ancientsData[1];
    deckImage.classList.remove('deck-active');
    openCard.style.background = 'none';
    trackContainer.classList.remove('track-active');
})

iogSothothImage.addEventListener('click', () => {
    cthulthuImage.classList.remove('active-ancient');
    shubNiggurathImage.classList.remove('active-ancient');
    azathothImage.classList.remove('active-ancient');
    iogSothothImage.classList.add('active-ancient');
    difficultyContainer.style.opacity = '1';
    choosedAncient = Ancients.ancientsData[2];
    deckImage.classList.remove('deck-active');
    openCard.style.background = 'none';
    trackContainer.classList.remove('track-active');
})

shubNiggurathImage.addEventListener('click', () => {
    cthulthuImage.classList.remove('active-ancient');
    iogSothothImage.classList.remove('active-ancient');
    azathothImage.classList.remove('active-ancient');
    shubNiggurathImage.classList.add('active-ancient');
    difficultyContainer.style.opacity = '1';
    choosedAncient = Ancients.ancientsData[3];
    deckImage.classList.remove('deck-active');
    openCard.style.background = 'none';
    trackContainer.classList.remove('track-active');
})

deckImage.addEventListener('click', () => {

    let popCard;
    if (!gameDeck[0].every(val => val.length === 0)) {
        while (!popCard) {
            popCard = deleteCard(gameDeck[0]);
        }
        openCard.style.background = `url(${popCard.cardFace})`;
        openCard.style.backgroundSize = "contain";
        openCard.style.backgroundRepeat = "no-repeat";
        rewrite(gameDeck);

    } else if (!gameDeck[1].every(val => val.length === 0)) {
        while (!popCard) {
            popCard = deleteCard(gameDeck[1]);
        }
        openCard.style.background = `url(${popCard.cardFace})`;
        openCard.style.backgroundSize = "contain";
        openCard.style.backgroundRepeat = "no-repeat";
        rewrite(gameDeck);
    } else if (!gameDeck[2].every(val => val.length === 0)) {
        while (!popCard) {
            popCard = deleteCard(gameDeck[2]);
        }
        openCard.style.background = `url(${popCard.cardFace})`;
        openCard.style.backgroundSize = "contain";
        openCard.style.backgroundRepeat = "no-repeat";
        rewrite(gameDeck);
    }
    if (gameDeck.flat(Infinity).length === 0) {
        deckImage.classList.remove('deck-active');
    }
})

const deleteCard = (deckArray) => {
    if (deckArray) {
        let randNumb = Math.floor(Math.random() * 3);
        return deckArray[randNumb].pop();
    }
}

buttons.forEach(elem => {
    elem.addEventListener('click', (event) => {
        deckImage.classList.remove('deck-active');
        openCard.style.background = 'none';
        trackContainer.classList.remove('track-active');
        buttons.forEach(item => {
            if (!event.target.classList.contains('shuffle-button')) {
                item.classList.remove('difficulty-active')
            }
        })
        if (event.target.classList.contains('veryeasy-button')) {
            deck = buildDeckfromDifficulty(Blue, Brown, Green, 'veryeasy');
            buttons[buttons.length - 1].classList.add('shuffle-active');
            elem.classList.add('difficulty-active');
        } else if (event.target.classList.contains('easy-button')) {
            buttons[buttons.length - 1].classList.add('shuffle-active');
            elem.classList.add('difficulty-active');
        } else if (event.target.classList.contains('normal-button')) {
            buttons[buttons.length - 1].classList.add('shuffle-active');
            elem.classList.add('difficulty-active');
        } else if (event.target.classList.contains('hard-button')) {
            buttons[buttons.length - 1].classList.add('shuffle-active');
            elem.classList.add('difficulty-active');
        } else if (event.target.classList.contains('veryhard-button')) {
            buttons[buttons.length - 1].classList.add('shuffle-active');
            elem.classList.add('difficulty-active');
        } else if (event.target.classList.contains('shuffle-button')) {
            gameDeck = shuffleDeck(choosedAncient);
            rewrite(gameDeck);
            deckImage.classList.add('deck-active');
            trackContainer.classList.add('track-active');
        }
    })
})


const buildDeckfromDifficulty = (Blue, Brown, Green, difficulty) => {
    let fullDeck = [...Blue.cardsData, ...Brown.cardsData, ...Green.cardsData];
    let easyCards = [];
    let normalCards = [];
    let hardCards = [];

    fullDeck.forEach(elem => {
        if (elem.difficulty === 'easy') {
            easyCards.push(elem);
        } else if (elem.difficulty === 'normal') {
            normalCards.push(elem);
        } else {
            hardCards.push(elem);
        }
    })
    switch (difficulty) {
        case 'veryeasy': {
            return [...shuffle(easyCards), ...shuffle(normalCards)];
        }
    }

}

const stagesCreate = (stage, deck) => {

    let greenCards = [];
    let brownCards = [];
    let blueCards = [];

    for (const key in stage) {
        for (let i = 0; i < stage[key]; i++) {
            if (key === 'greenCards') {
                const index = deck.findIndex(value => value.color === 'green');
                greenCards.push(...deck.splice(index, 1));
            } else if (key === 'brownCards') {
                const index = deck.findIndex(value => value.color === 'brown');
                brownCards.push(...deck.splice(index, 1));
            } else if (key === 'blueCards') {
                const index = deck.findIndex(value => value.color === 'blue');
                blueCards.push(...deck.splice(index, 1));
            }
        }
    }
    return [shuffle(greenCards), shuffle(brownCards), shuffle(blueCards)]

}



const shuffleDeck = (boss) => {

    const first = stagesCreate(boss.firstStage, deck);
    const second = stagesCreate(boss.secondStage, deck);
    const third = stagesCreate(boss.thirdStage, deck);

    // fgrc.textContent = first[0].length;
    // fbrc.textContent = first[1].length;
    // fblc.textContent = first[2].length;

    // sgrc.textContent = second[0].length;
    // sbrc.textContent = second[1].length;
    // sblc.textContent = second[2].length;

    // tgrc.textContent = third[0].length;
    // tbrc.textContent = third[1].length;
    // tblc.textContent = third[2].length;
    return [first, second, third];


}

const rewrite = (array) => {

    fgrc.textContent = array[0][0].length;
    fbrc.textContent = array[0][1].length;
    fblc.textContent = array[0][2].length;

    sgrc.textContent = array[1][0].length;
    sbrc.textContent = array[1][1].length;
    sblc.textContent = array[1][2].length;

    tgrc.textContent = array[2][0].length;
    tbrc.textContent = array[2][1].length;
    tblc.textContent = array[2][2].length;
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}