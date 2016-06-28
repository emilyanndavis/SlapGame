var iceBlock = {
    solidity: 90
}

var players = {
    penguinRescuer: {
        name: 'You',
        power: 1,
        actions: {
            lightMatch: {
                meltPower: 4
            },
            lightCandle: {
                meltPower: 8
            },
            useBlowtorch: {
                meltPower: 12
            },
            iceCream: {
                defense: 0.25
            },
            spellBook: {
                defense: 0.5
            },
            cutElectricity: {
                defense: 1
            }
        }
    },
    iceWizard: {
        name: 'Ice Wizard',
        power: 1,
        actions: {
            useFan: {
                freezePower: 4
            },
            blastAC: {
                freezePower: 8
            },
            freezeSpell: {
                freezePower: 12
            },
            iceCream: {
                defense: 0.25
            },
            waterBalloon: {
                defense: 0.5
            },
            tempFreeze: {
                defense: 1
            }
        }
    }
}

var turnCount = 0;

function melt(fireSource) {
    var meltAmount = players.penguinRescuer.actions[fireSource].meltPower * players.penguinRescuer.power; 
    iceBlock.solidity -= meltAmount;
    console.log('Ice: ' + iceBlock.solidity);
    setIceOpacity();
    players.penguinRescuer.power = 1;
    turnCount++;
    console.log('Turn count: ' + turnCount);
    showOptions();
    showComputerTurn();
}

function freeze(coldSource) {
    var freezeAmount = players.iceWizard.actions[coldSource].freezePower * players.iceWizard.power;
    iceBlock.solidity += freezeAmount;
    console.log('Ice: ' + iceBlock.solidity);
    setIceOpacity();
    players.iceWizard.power = 1;
    turnCount++;
    console.log('Turn count: ' + turnCount);
    showOptions();
}

function setIceOpacity() {
    var currentIce = document.getElementById('ice-block');
    currentIce.style.opacity = iceBlock.solidity / 100;
    console.log('Opacity: ' + currentIce.style.opacity);
}

function distractIceWizard(method) {
    var distractionPower = players.penguinRescuer.actions[method].defense * players.penguinRescuer.power;
    players.iceWizard.power = 1 - distractionPower;
    turnCount++;
    players.penguinRescuer.power = 1;
    console.log('Wizard power: ' + players.iceWizard.power);
    console.log('Turn count: ' + turnCount);
    showOptions();
    showComputerTurn();
}

function distractPenguinRescuer(method) {
    var distractionPower = players.iceWizard.actions[method].defense * players.iceWizard.power;
    players.penguinRescuer.power = 1 - distractionPower;
    turnCount++;
    players.iceWizard.power = 1;
    console.log('Rescuer power: ' + players.penguinRescuer.power);
    console.log('Turn count: ' + turnCount);
    showOptions();
}

function showOptions() {
    var highlighted = document.getElementsByClassName('btn-highlight');
    if (highlighted.length > 0) {
        highlighted[0].className = '';
    }
    if (turnCount % 2 === 1) {
        // show computer options (freeze and distract) and hide player options
        document.getElementById('freeze-options').className = 'visible';
        document.getElementById('distract-rescuer-options').className = 'visible';
        document.getElementById('melt-options').className = 'hidden';
        document.getElementById('distract-wizard-options').className = 'hidden';
    } else {
        // show player options (melt and distract) and hide computer options
        document.getElementById('melt-options').className = 'visible';
        document.getElementById('distract-wizard-options').className = 'visible';
        document.getElementById('freeze-options').className = 'hidden';
        document.getElementById('distract-rescuer-options').className = 'hidden';
    }
}

function showComputerTurn() {
    // randomly choose an option
    var computerChoice = makeComputerChoice();
    // highlight choice
    var timeoutID;
    var chosenElement = document.getElementById('btn-' + computerChoice);
    timeoutID = window.setTimeout(highlight, 2000, chosenElement);
    // call freeze or distract function as appropriate
    if (computerChoice === 'useFan' || computerChoice === 'blastAC' || computerChoice === 'freezeSpell') {
        timeoutID = window.setTimeout(freeze, 4000, computerChoice);
    } else {
        timeoutID = window.setTimeout(distractPenguinRescuer, 4000, computerChoice);
    } 
}

function makeComputerChoice() {
    var computerOptions = ['useFan', 'blastAC', 'freezeSpell', 'iceCream', 'waterBalloon', 'tempFreeze'];
    var randomNum = Math.floor(Math.random() * computerOptions.length);
    var computerChoice = computerOptions[randomNum];
    console.log(computerChoice);
    return computerChoice;
}

function highlight(element) {
    element.className = 'btn-highlight';
}




function showResults(player, opponent) {
    // show results, including 
        // amount of ice melt/freeze and
        // effect on opponent's power
}

