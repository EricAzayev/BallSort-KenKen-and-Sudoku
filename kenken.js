
import Solution from './Solution.js';


function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// colorGameArray(){
//     //size 4 allows for combinations between 4 and 8
// }

function setGridColumns(size) {
    const gridTemplateColumns = `${'3fr '.repeat(size).trim()}`; // Generates "3fr 3fr" for size 2
    document.getElementById('KenContainer').style.gridTemplateColumns = gridTemplateColumns;
}
//document.getElementById('sizeShow').textContent = "YOOOOOOOOOO"; //test

const size = parseInt(getQueryParam('size'));
const difficulty = getQueryParam('difficulty');
document.getElementById('siteTitle').textContent = "Your " + difficulty + " " + size.toString() + " x " + size.toString() + " grid";


const solution = new Solution();
var gameArray = solution.generateNNArray(size);
console.log(gameArray);
//gameArray = solution.decorateArray(gameArray, difficulty); To Be Implemented
const toAppend = document.getElementById("mainContainer");

let columns = '1fr '.repeat(size).trim();
let gridElements = document.querySelectorAll('.KenContainer');
gridElements.forEach(function(element) {
    element.style.display = 'grid';
    element.style.gridTemplateColumns = columns; // Ensures 4 columns for a 4x4 grid
});

for(let i = 0; i < size; i++){
    const a = document.createElement("div");
    a.className = "KenContainer" 
    //a.id = "container" + (i+1).toString();
    
    for(let j = 0; j < size; j++){
        const nestDiv = document.createElement("div");
        nestDiv.className = "nestContainer" + (j+1).toString();
        nestDiv.style.border = '3px solid black';
        nestDiv.textContent = gameArray[i][j].toString();

        a.appendChild(nestDiv);        
    }
    toAppend.appendChild(a);
    
}
setGridColumns(size);

