window.addEventListener('load', mainCanvas) //starts program after loadout
window.addEventListener('resize', mainCanvas) //whenever the window is resized, code checks if everything is on its place (it will also be helpful while adding a responsivness)


// global variables responsible for setting up game parameters
var whosTurnFirst = Math.random() < 0.5 ? 'X' : 'O'
var isFinishedRound = false
var isReset = false

// coordinations of right bottom corner of each field; helps estimate where user clicked
const cords = [
    [140, 140],
    [280, 140],
    [420, 140],
    [140, 280],
    [280, 280],
    [420, 280],
    [140, 420],
    [280, 420],
    [420, 420]
]

// default game parameters 
const gameParams = {
    whosTurn: whosTurnFirst,
    chosenPositions: ["", "", "", "", "", "", "", "", ""],
    xPoints: 0,
    oPoints: 0
}


function mainCanvas() {
    // assinging canvas elemnent and its context to variables
    var canvas = document.getElementById("canvas")
    var ctx = canvas.getContext("2d");

    // sets up canvas hight (without it, all breaks)
    canvas.width = 420;
    canvas.height = 420;

    // changes #points elemnent based on current game parameters 
    if (gameParams.whosTurn === "X") {
        document.getElementById('points').innerHTML = "* X | " + gameParams.xPoints + " - " + gameParams.oPoints + " | O"
    } else {
        document.getElementById('points').innerHTML = "X | " + gameParams.xPoints + " - " + gameParams.oPoints + " | O *"
    }
    

    // checks if game was reseted, if so, this code clears whole canvas element
    if (isReset) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isReset = false
    }

    // draws a grid 
    var grid_field_size = canvas.width / 3;

    ctx.moveTo(grid_field_size, 0);
    ctx.lineTo(grid_field_size, 420);
    ctx.stroke();

    ctx.moveTo(grid_field_size * 2, 0);
    ctx.lineTo(grid_field_size * 2, 420);
    ctx.stroke();

    ctx.moveTo(0, grid_field_size);
    ctx.lineTo(420, grid_field_size);
    ctx.stroke();

    ctx.moveTo(0, grid_field_size * 2);
    ctx.lineTo(420, grid_field_size * 2);
    ctx.stroke();

    // draws Xs and Os in corect places  
    ctx.font = "140px megufont";
    for (let i = 0; i < gameParams.chosenPositions.length; i++) {
        player = ""
        if (gameParams.chosenPositions[i] === 'X') {
            player = "X";
        } else if (gameParams.chosenPositions[i] === 'O') {
            player = "O";
        } else {
            continue;
        }
        switch (i) {
            case 0:
                ctx.fillText(player, 30, 120)
                break;
            case 1:
                ctx.fillText(player, 170, 120)
                break;
            case 2:
                ctx.fillText(player, 310, 120)
                break;
            case 3:
                ctx.fillText(player, 30, 250)
                break;
            case 4:
                ctx.fillText(player, 170, 250)
                break;
            case 5:
                ctx.fillText(player, 310, 250)
                break;
            case 6:
                ctx.fillText(player, 30, 380)
                break;
            case 7:
                ctx.fillText(player, 170, 380)
                break;
            case 8:
                ctx.fillText(player, 310, 380)
                break;
        }
    }

    /**
     * if mouse is down, it checks if round is finished
     * if round isn't finished, it calls a function 
     */
    canvas.addEventListener('mousedown', function (e) {
        if (!isFinishedRound) {
            getCursorPosition(canvas, e)
        } 

    })
}

/**
 * gets position of where a user clicked and calls function which checks which field was clicked
 */
function getCursorPosition(canvas, event) {
    if (typeof canvas === 'object' && canvas !== null && 'getBoundingClientRect' in canvas) {
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        whichField(x, y)
    }
}

/**
 * checks which field was clicked and decide whether it was clicked earlier or function responsible for turn mechanics should be called 
 */
function whichField(x, y) {
    for (let i = 0; i < cords.length; i++) {
        if (gameParams.chosenPositions[i] !== "" && x < cords[i][0] && y < cords[i][1]) {
            break;
        }
        else if (gameParams.chosenPositions[i] === "" && x < cords[i][0] && y < cords[i][1]) {
            turnMechanics(i);
            break;
        }
    }
}

/**
 * 
 * @param {int} fieldNumber 
 * 
 * it assigns X or O to an array of chosen possitions,
 * changes player to one who's turn will be next, 
 * call a function which checks if someone won and assign it to a variable 
 * if someone won, it calls a function which ends a round 
 * if no one won, it calls mainCanvas() 
 */
function turnMechanics(fieldNumber) {
    gameParams.chosenPositions[fieldNumber] = gameParams.whosTurn
    if (gameParams.whosTurn === 'X') {
        gameParams.whosTurn = 'O';
    } else {
        gameParams.whosTurn = 'X';
    }
    winner = isWin()
    if (winner !== false) {
        endRound(winner)
    }
    mainCanvas()
}

/**
 * 
 * @param {string} winner
 * 
 * changes global variable which points if round is finished to true
 * increments points of the round winner by 1,
 * changes #points element to show current score 
 * changes player who will start next round to the opposite of the person who started finished round
 * reset chosen possitions 
 */
function endRound(winner) {
    isFinishedRound = true

    if (winner === "X") {
        gameParams.xPoints += 1
    } else {
        gameParams.oPoints += 1
    }

    document.getElementById('points').innerHTML = "X | " + gameParams.xPoints + " - " + gameParams.oPoints + " | O"

    if (whosTurnFirst === "X") {
        whosTurnFirst = "O"
        gameParams.whosTurn = whosTurnFirst
    } else {
        whosTurnFirst = "X"
        gameParams.whosTurn = whosTurnFirst
    }

    mainCanvas()
}


/**
 * 
 * @returns winner or false
 * 
 * checks for all win scenarios
 */
function isWin() {
    for (let i = 0; i < 7; i++) {
        if (gameParams.chosenPositions[i] === "") continue;
        if (
            i % 3 === 0 &&
            gameParams.chosenPositions[i] === gameParams.chosenPositions[i + 1] &&
            gameParams.chosenPositions[i] === gameParams.chosenPositions[i + 2]) {
            return gameParams.chosenPositions[i]
        }
        else if (
            i < 3 &&
            gameParams.chosenPositions[i] === gameParams.chosenPositions[i + 3] &&
            gameParams.chosenPositions[i] === gameParams.chosenPositions[i + 6]) {
            return gameParams.chosenPositions[i]
        }
        else if (
            i === 0 &&
            gameParams.chosenPositions[i] === gameParams.chosenPositions[4] &&
            gameParams.chosenPositions[i] === gameParams.chosenPositions[8]) {
            return gameParams.chosenPositions[i]
        }
        else if (
            i === 2 &&
            gameParams.chosenPositions[i] === gameParams.chosenPositions[4] &&
            gameParams.chosenPositions[i] === gameParams.chosenPositions[6]) {
            return gameParams.chosenPositions[i]
        }
    }
    return false
}

/**
 * going to next round 
 */
function nextRound() {
    gameParams.chosenPositions = ["", "", "", "", "", "", "", "", ""]
    isFinishedRound = false
    isReset = true
    mainCanvas()
}

/**
 * resets whole game
 */
function reset() {
    gameParams.chosenPositions = ["", "", "", "", "", "", "", "", ""]
    gameParams.oPoints = 0
    gameParams.xPoints = 0
    isReset = true
    isFinishedRound = false
    mainCanvas()
}
