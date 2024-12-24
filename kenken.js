
import Solution from './Solution.js';


function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}



function setGridColumns(size) {
    const gridTemplateColumns = `${'3fr '.repeat(size).trim()}`; // Generates "3fr 3fr" for size 2
    document.getElementById('KenContainer').style.gridTemplateColumns = gridTemplateColumns;
}


const size = parseInt(getQueryParam('size'));
const difficulty = getQueryParam('difficulty');
document.getElementById('siteTitle').textContent = "Your " + difficulty + " " + size.toString() + " x " + size.toString() + " grid";


const solution = new Solution();

//create an array of answers to crosscheck with player's answers. 
//answer key used to create questions

let packedGame = solution.packGame(size);
let answerKey = packedGame[0];
let tunneledArray = packedGame[1];
let userProblemView = packedGame[2];

const toAppend = document.getElementById("mainContainer");

let columns = '1fr'.repeat(size).trim();
let gridElements = document.querySelectorAll('.KenContainer');
gridElements.forEach(function(element) {
    element.style.display = 'grid';
    element.style.gridTemplateColumns = '1fr';//columns; // Ensures 4 columns for a 4x4 grid
});


for(let i = 0; i < size; i++){
    const a = document.createElement("div");
    a.className = "KenContainer" 
    a.id = "container" + (i+1).toString();
    
    for(let j = 0; j < size; j++){
        const nestDiv = document.createElement("div");
        nestDiv.style.width = '99%';
        nestDiv.style.height = '99%';
        nestDiv.style.margin = '20px';
        nestDiv.className = "nestContainer" + (j+1).toString();
        nestDiv.style.border = '3px solid';

        let problemNum = tunneledArray[i][j];
        
        let color = solution.getGridColor(problemNum, size);
        nestDiv.style.borderColor = color;
        nestDiv.style.background = color;
        console.log(solution.getGridColor(problemNum, size));


        nestDiv.textContent = userProblemView[i][j];

        a.appendChild(nestDiv);        
    }
    toAppend.appendChild(a);
    
}
//setGridColumns(size);

