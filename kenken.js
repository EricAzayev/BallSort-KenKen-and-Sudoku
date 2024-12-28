
import Solution from './Solution.js';
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}
const size = parseInt(getQueryParam('size'));
const difficulty = getQueryParam('difficulty');
document.getElementById('siteTitle').textContent = "Your " + difficulty + " " + size.toString() + " x " + size.toString() + " grid";

const solution = new Solution();
let game = solution.packGame(size);
let answerKey = game[0];
let tunneledArray = game[1];
let userProblemView = game[2];



const toAppend = document.getElementById("KenKenContainer");

for(let i = 0; i < size; i++){
    const a = document.createElement("div");
    a.className = "KenContainer" 
    a.style.gridTemplateColumns = '1fr '.repeat(size).trim();
    a.id = "container" + (i+1).toString();
    
    for(let j = 0; j < size; j++){
        const nestDiv = document.createElement("div");
        nestDiv.style.width = '100%';
        nestDiv.style.maxWidth = '100px';
        nestDiv.style.minWidth = '100px';
        nestDiv.style.height = '100px';
        nestDiv.style.margin = '0px';
        nestDiv.id = "nestContainer" + (j+1).toString();
        nestDiv.style.border = '3px solid';


        // Make nestDiv a flex container to center content
        nestDiv.style.display = 'flex';
        nestDiv.style.flexFlow = "column wrap";

        
        nestDiv.style.justifyContent = 'center'; // Horizontally center
        nestDiv.style.alignItems = 'center'; // Vertically center



        let problemNum = tunneledArray[i][j];
        
        let color = solution.getGridColor(problemNum, size);
        
        //this will be an onclick feature
        //if(coloredBackground == true)
            //nestDiv.style.borderColor = color;
            //nestDiv.style.background = color;
        //else{
        if(i < tunneledArray.length - 1 && problemNum == tunneledArray[i+1][j]){nestDiv.style.borderBottomColor = "grey";nestDiv.style.borderBottom = '1px solid';}
        if(problemNum == tunneledArray[i][j+1]){nestDiv.style.borderRightColor = "grey";nestDiv.style.borderRight = '1px solid';}
        if(i > 0 && problemNum == tunneledArray[i-1][j]){nestDiv.style.borderTopColor = "grey";nestDiv.style.borderTop = '0px solid';}
        else if(problemNum == tunneledArray[i][j-1]){nestDiv.style.borderLeftColor = "grey";nestDiv.style.borderLeft = '0px solid';}

        const textDiv = document.createElement("div");
        if(userProblemView[i][j] == "'")textDiv.style.color = "white";
        textDiv.textContent = userProblemView[i][j]; //problem displayed
        
        
        const inputDiv = document.createElement('div');

        const userInput = document.createElement("input");
        userInput.className = "userInput";
        userInput.type = "text";
        userInput.style.width = "50px";
        userInput.style.height = "30px";
        userInput.style.marginTop = "10px";
        userInput.style.display = "block";

        inputDiv.appendChild(userInput);

        nestDiv.appendChild(textDiv);
        nestDiv.appendChild(document.createElement('div'));
        nestDiv.appendChild(inputDiv);

        


        a.appendChild(nestDiv);        
    }
    toAppend.appendChild(a); //
}






//to clear grid
// while (toAppend.firstChild) {
//     toAppend.removeChild(toAppend.firstChild);
// }

//setGridColumns(size);

