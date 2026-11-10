const CATEGORIES = [
   { id: "maantieto", name: "Maantieto" },
   { id: "luonto", name: "luonto" },
   { id: "historia", name: "historia"},
   { id: "taide ja kulttuuri", name: "taide ja kulttuuri"},
   { id: "tiede", name: "tiede"},
   { id: "teknologia", name: "teknologia"}
];

const gameState = {
    player: {
        name: "Player",
        position: 0,
        collectedCategories: new Set()
    },
    computer: {
        name: "Tietokone",
        position: 0,
        collectedCategories: new Set()
    },
    currentTurn: "player"
};
var API_URL= "https://oma-trivia-api-0f8ffa1eed2e.herokuapp.com/api/questions";

const BOARD_SIZE= 18;
const boardElement = document.querySelector("#board");
const rollButtonElement = document.querySelector("#roll-button");
const diceBoxElement = document.querySelector("#dice-box");
var playerQuestionText = document.querySelector("#question-text")
rollButtonElement.addEventListener("click", RollDice);

CreateBoard()

function CreateBoardCoodrinates(){
    const coordinates = [];
    for ( let column = 1; column <= 7; column += 1) {
       coordinates.push({row: 1, column})
    }

    for (let row = 2; row <= 4; row += 1) {
        coordinates.push( {row, column: 7} )
    }
   
    for (let column = 6; column >= 1; column -= 1)
    {
        coordinates.push( {column, row: 4} )
    }

    for (let row = 3; row >= 2; row -= 1)
    {
        coordinates.push( {column: 1, row} )
    }
    return coordinates;
}

function CreateBoard() {
    const coordinates = CreateBoardCoodrinates()
    boardElement.innerHTML = "";

    for (let index = 0; index < BOARD_SIZE; index += 1)
    {
      const category = CATEGORIES[index % CATEGORIES.length]
      const coordinate = coordinates[index]

      const newSpace = document.createElement("div");

      newSpace.className = "space";

      newSpace.style.gridColumn = coordinate.column;
      newSpace.style.gridRow = coordinate.row;

      newSpace.dataset.category = category.id;
      newSpace.dataset.spaceIndex = index;

      newSpace.textContent = category.name

      boardElement.append(newSpace);

    }

    
}

async function RollDice() {
    var diceResult = Math.floor(Math.random() * 6) + 1; // Väli: 1-6
    diceBoxElement.textContent = diceResult;

    gameState.player.position = (gameState.player.position + diceResult)% BOARD_SIZE;
    UpdateTokens();

   // var currentCategory = CATEGORIES[gameState.player.position % CATEGORIES.length]

   // var questionData = await getQuestion(currentCategory.id);
    showQuestion(questionData);
}




function UpdateTokens(){
    document.querySelectorAll(".token").forEach((token) =>{
        token.remove();

    });

    var currentSpace =document.querySelector(`[data-space-index='${gameState.player.position}']`)
    var token = document.createElement("token")
    token.textContent = "P";
    token.className = "token";

    currentSpace.append(token);
}
async function getQuestion(targetCategory){
    var response = await fetch(API_URL,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "category": targetCategory,
            "difficulty": "helppo",
            "ageGroup": "10-12",
            "count": 1,
            "language": "suomi"
        })
    });
if (!response.ok){
    throw new Error("tapahtui virhe :(")
}
    var data = await response.json();
    console.log(data);
    console.log(data[0].question);
    return data[0];


}

function showQuestion (questionData) {
    playerQuestionText.innerHTML = questionData

}