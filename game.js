const CATEGORIES = [
   { id: "maantieto", name: "Maantieto" },
   { id: "yleistieto", name: "yleistieto" },
   { id: "historia", name: "historia"},
   { id: "taide ja kulttuuri", name: "taide ja kulttuuri"},
   { id: "tiede", name: "tiede"},
   { id: "urheilu", name: "urheilu"}
];

const BOARD_SIZE= 18;
const boardElement = document.querySelector("#board");

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

      newSpace.textContent = category.name

      boardElement.append(newSpace);

    }

    
}




