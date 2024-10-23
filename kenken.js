import Solution from './Solution.js';
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}
document.getElementById('sizeShow').textContent = "YOOOOOOOOOO";

const size = parseInt(getQueryParam('size'));
const difficulty = getQueryParam('difficulty');

const solution = new Solution();
gameArray = solution.generateNNArray(size);
console.log(gameArray);
//gameArray = solution.decorateArray(gameArray, difficulty); To Be Implemented
const toAppend = document.getElementById("mainContainer");

for(let i = 0; i < size; i++){
    const a = document.createElement("div");
    a.className = "KenContainer" 
    //a.id = "container" + (i+1).toString();
    
    for(let j = 0; j < size; j++){
        const nestDiv = document.createElement("div");
        nestDiv.className = "KenKenContainer";
        //nestDiv.id = "nestContainer" + (i+1).toString() + "][" (j+1).toString();
        nestDiv.textContent = gameArray[i][j].toString();

        a.appendChild(nestDiv);        
    }
    toAppend.appendChild(a);
}

