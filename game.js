var turnCount = 0;

var iceBlock = {
// CHANGE THIS FOR QUICKER TESTING OF ENDGAME() - BE SURE TO RESET TO 90 FOR FULL GAME!
    solidity: 30
}

var players = {
    penguinRescuer: {
        name: 'You',
        power: 1,
        actions: {
            lightMatch: {
                meltPower: 12,
                resultDisplay: ' with a match'
            },
            lightCandle: {
                meltPower: 16,
                resultDisplay: ' with a candle'
            },
            useBlowtorch: {
                meltPower: 20,
                resultDisplay: ' with a blowtorch'
            },
            iceCream: {
                defense: 0.25,
                resultDisplay: ' with an ice cream bar'
            },
            spellBook: {
                defense: 0.5,
                resultDisplay: ' by mixing up the pages of his spellbook'
            },
            cutElectricity: {
                defense: 0.75,
                resultDisplay: ' by turning off the electricity'
            }
        }
    },
    iceWizard: {
        name: 'The Ice Wizard',
        power: 1,
        actions: {
            useFan: {
                freezePower: 4,
                resultDisplay: ' with a fan'
            },
            blastAC: {
                freezePower: 8,
                resultDisplay: ' by blasting the air conditioner'
            },
            freezeSpell: {
                freezePower: 12,
                resultDisplay: ' by casting a freeze spell'
            },
            iceCream: {
                defense: 0.25,
                resultDisplay: ' with an ice cream bar'
            },
            waterBalloon: {
                defense: 0.5,
                resultDisplay: ' by tossing water balloons at your fire sources'
            },
            tempFreeze: {
                defense: 0.75,
                resultDisplay: ' by casting a temporary freeze spell on you'
            }
        }
    }
}

/* MELT AND FREEZE FUNCTIONS AND THEIR EFFECT ON ICE BLOCK APPEARANCE */

function melt(fireSource) {
    var meltAmount = players.penguinRescuer.actions[fireSource].meltPower * players.penguinRescuer.power; 
    if (iceBlock.solidity - meltAmount <= 0) {
        iceBlock.solidity = 0;
        setIceOpacity();
        endGame();
    } else {
        iceBlock.solidity -= meltAmount;
        setIceOpacity();
        showResults('penguinRescuer', 'the ice block', fireSource);
        players.penguinRescuer.power = 1;
        turnCount++;
        showOptions();
        showComputerTurn();
    }
}

function freeze(coldSource) {
    var freezeAmount = players.iceWizard.actions[coldSource].freezePower * players.iceWizard.power;
    if (iceBlock.solidity + freezeAmount >= 90) {
        iceBlock.solidity = 90;
    } else {
        iceBlock.solidity += freezeAmount;
    }
    setIceOpacity();
    showResults('iceWizard', 'the ice block', coldSource);
    players.iceWizard.power = 1;
    turnCount++;
    showOptions();
}

function setIceOpacity() {
    var currentIce = document.getElementById('ice-block');
    currentIce.style.opacity = iceBlock.solidity / 100;
}

/* DISTRACT FUNCTIONS */

function distractIceWizard(method) {
    var distractionPower = players.penguinRescuer.actions[method].defense * players.penguinRescuer.power;
    players.iceWizard.power = 1 - distractionPower;
    showResults('penguinRescuer', 'iceWizard', method);
    turnCount++;
    players.penguinRescuer.power = 1;
    showOptions();
    showComputerTurn();
}

function distractPenguinRescuer(method) {
    var distractionPower = players.iceWizard.actions[method].defense * players.iceWizard.power;
    players.penguinRescuer.power = 1 - distractionPower;
    showResults('iceWizard', 'penguinRescuer', method);
    turnCount++;
    players.iceWizard.power = 1;
    showOptions();
}

/* TOGGLE DISPLAY BASED ON WHOSE TURN IT IS */

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

/* AUTOMATE AND ILLUSTRATE COMPUTER'S (ICE WIZARD'S) TURN */

function makeComputerChoice() {
    var computerOptions = [];
    for (var action in players.iceWizard.actions) {
        computerOptions.push(action);
    }
    var randomNum = Math.floor(Math.random() * computerOptions.length);
    var computerChoice = computerOptions[randomNum];
    return computerChoice;
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

function highlight(element) {
    element.className = 'btn-highlight';
}

/* SHOW OUTCOME OF EACH TURN */
// just text for now - eventually this will be more interesting when images and animations come into play

function showResults(player, opponent, action) {
    var verb;
    if (opponent === 'the ice block') {
        if (player === 'penguinRescuer') {
            verb = 'melted';
        } else {
            verb = 'froze';
        }
        document.getElementById('turn-results').innerHTML = 
            '<p>' + players[player].name + ' ' + verb + ' ' + opponent + ' ' + players[player].actions[action].resultDisplay + '</p>'; 
    } 
    
    else {
        document.getElementById('turn-results').innerHTML = 
            '<p>' + players[player].name + ' distracted ' + players[opponent].name + ' ' + players[player].actions[action].resultDisplay + '</p>'; 

        if (opponent === 'penguinRescuer') {
        document.getElementById('turn-results').innerHTML += 
            '<p> Your power level: ' + players.penguinRescuer.power + '</p>';
        } else {
        document.getElementById('turn-results').innerHTML += 
            '<p> Ice Wizard\'s power level: ' + players.iceWizard.power + '</p>';
        }
    }

    document.getElementById('turn-results').innerHTML += 
        '<p>Ice level: ' + iceBlock.solidity + '</p>';         
}

/* END OF GAME DISPLAY */

function endGame() {
    document.getElementById('game-header').className = 'animated fadeOutRight';
    document.getElementById('victory').className = 'visible animated slideInLeft';
    document.getElementById('turn-results').innerHTML = '';    
    document.getElementById('gameplay-options').className = 'hidden';
    document.getElementById('reset-button').className = 'reset-button visible';
    document.getElementById('penguin').className += ' animated tada';
}

/* RESET GAME */

function resetGame() {
    document.getElementById('game-header').className = 'visible';
    document.getElementById('penguin').className = 'penguin';    
    iceBlock.solidity = 90;
    setIceOpacity();
    turnCount = 0;
    players.penguinRescuer.power = 1;
    players.iceWizard.power = 1;
    document.getElementById('victory').className = 'hidden';
    document.getElementById('gameplay-options').className = 'visible';
    document.getElementById('melt-options').className = 'visible';
    document.getElementById('distract-wizard-options').className = 'visible';
    document.getElementById('reset-button').className = 'reset-button hidden';
}

