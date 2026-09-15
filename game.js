const GATEGORIES = [
   { id: "maantieto", name: "Maantieto" },
   { id: "yleistieto", name: "yleistieto" },
   { id: "historia", name: "historia"},
   { id: "taide ja kulttuuri", name: "taide ja kulttuuri"},
   { id: "tiede", name: "tiede"},
   { id: "urheilu", name: "urheilu"}
];



const BOARD_SIZE= 18;
const boardElement = document.querySelector("#board");


function CreateBoardCoodrinates(){
    const coordinates = [];
   for ( let column = 1; column <= 7; column += 1) {
    coordinates.push({row: 1, column})
    

   }

    return coordinates;
}