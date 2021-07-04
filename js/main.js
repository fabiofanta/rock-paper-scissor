const selectionButtons = document.querySelectorAll('[data-selection]');
const selectionComputerVsComputer = document.querySelectorAll('.computer')[0];
const finalColumn = document.querySelector('[data-final-column]');
const computerScoreSpan = document.querySelector('[data-computer-score]');
const yourScoreSpan = document.querySelector('[data-your-score]');
const SELECTIONS = [
  {
    name: 'rock',
    emoji: '✊',
    beats: ['scissors']
  },
  {
    name: 'paper',
    emoji: '✋',
    beats: ['rock']
  },
  {
    name: 'scissors',
    emoji: '✌',
    beats: ['paper']
  }
];


const makeSelection = (selection) => {
    const computerSelection = randomSelection();
    let yourWinner = isWinner(selection, computerSelection);
    let computerWinner = isWinner(computerSelection, selection);

    addSelectionResult(computerSelection, computerWinner)
    addSelectionResult(selection, yourWinner)

    if (yourWinner) incrementScore(yourScoreSpan)
    if (computerWinner) incrementScore(computerScoreSpan)
}
  
const incrementScore = (scoreSpan) => {
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1;
}
  
const addSelectionResult = (selection, winner) => {
    const div = document.createElement('div');
    div.innerText = selection.emoji;
    div.classList.add('result-selection')
    if (winner) div.classList.add('winner')
    finalColumn.after(div)
}
  
const isWinner = (selection, opponentSelection) => {
    return selection.beats.includes(opponentSelection.name);
}
  
const randomSelection = () => {
    let randomIndex = Math.floor(Math.random() * SELECTIONS.length);
    return SELECTIONS[randomIndex];
}

selectionButtons.forEach(selectionButton => {
  selectionButton.addEventListener('click', e => {
    const selectionName = selectionButton.dataset.selection;
    const selection = SELECTIONS.find(selection => selection.name === selectionName);
    makeSelection(selection);
  })
})

selectionComputerVsComputer.addEventListener('click', e => {
    const computerSelection = randomSelection();
    const selection = SELECTIONS.find(selection => selection.name === computerSelection.name);
    makeSelection(selection);
})