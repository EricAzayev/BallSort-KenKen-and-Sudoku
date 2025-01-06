import SortGame from './SortGame.js';

//add event listeners for amount bins, amount colors, amount empty bins
//add dropdown of default options

//constructor(numDiffElms = 2, capacity = 4, emptyBins = 1) {
let customize = document.getElementById("customize");
let numDiffElms = document.getElementById("inp1");
let capacity = document.getElementById("inp2");
let emptyBins = document.getElementById("inp3");

let game = new SortGame();

customize.addEventListener('click', () => {
    game.capacity = capacity.value;
    game.emptyBins = emptyBins.value;
    game.numDiffElms = numDiffElms.value;    
    generateGame();

});

let toAppend = document.getElementById("SortGameContainer");

function generateGame(){
    toAppend.innerHTML = "";
    for(let i = 0; i < size; i++){
        const a = document.createElement("div");
        a.className = "KenContainer" 
        a.style.gridTemplateColumns = '1fr '.repeat(size).trim();
        a.id = "container" + (i+1).toString();
        
        for(let j = 0; j < size; j++){
            const nestDiv = document.createElement("div");
            nestDiv.id = "nestDiv" + i.toString() + j.toString();
            nestDiv.class = "nestDiv";
            nestDiv.style.width = '100%';
            nestDiv.style.maxWidth = '100px';
            nestDiv.style.minWidth = '100px';
            nestDiv.style.height = '100px';
            nestDiv.style.margin = '0px';
            nestDiv.style.border = '3px solid';

            // Make nestDiv a flex container to center content
            nestDiv.style.display = 'flex';
            nestDiv.style.flexFlow = "column wrap";
            nestDiv.style.justifyContent = 'center'; // Horizontally center
            nestDiv.style.alignItems = 'center'; // Vertically center

            let problemNum = tunneledArray[i][j];
            
            

            if(toColor == true){
                let color = solution.getGridColor(problemNum, size);
                nestDiv.style.borderColor = color;
                nestDiv.style.background = color;
            }
            else{
                if(i < tunneledArray.length - 1 && problemNum == tunneledArray[i+1][j]){nestDiv.style.borderBottomColor = "grey";nestDiv.style.borderBottom = '1px solid';}
                if(problemNum == tunneledArray[i][j+1]){nestDiv.style.borderRightColor = "grey";nestDiv.style.borderRight = '1px solid';}
                if(i > 0 && problemNum == tunneledArray[i-1][j]){nestDiv.style.borderTopColor = "grey";nestDiv.style.borderTop = '0px solid';}
                else if(problemNum == tunneledArray[i][j-1]){nestDiv.style.borderLeftColor = "grey";nestDiv.style.borderLeft = '0px solid';}
            }

            const textDiv = document.createElement("div");
            if(userProblemView[i][j] == "'")textDiv.style.color = "white";
            textDiv.textContent = userProblemView[i][j]; //problem displayed
            
            
            const inputDiv = document.createElement('div');

            const userInput = document.createElement("input");
            
            userInput.id = "attempt" + i.toString() + j.toString();
            userInput.className = "userInput";
            userInput.type = "text";
            userInput.style.width = "50px";
            userInput.style.height = "30px";
            userInput.style.marginTop = "10px";
            userInput.style.display = "block";

            inputDiv.appendChild(userInput);

            nestDiv.appendChild(textDiv);
            //nestDiv.appendChild(document.createElement('div'));
            nestDiv.appendChild(inputDiv);
            a.appendChild(nestDiv);        
        }
        toAppend.appendChild(a); //
    }
}





