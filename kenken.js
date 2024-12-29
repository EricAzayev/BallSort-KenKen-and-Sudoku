
import Solution from './Solution.js';
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}
function decompiler(abstractedString) {
    const [first, answerKeyStr, tunneledArrayStr, problemViewStr, playerAnswersStr] = abstractedString.split("|");
    const [, size, hardness] = first.split(".");
    const answerKey = answerKeyStr.split(",").map(Number);
    const tunneledArray = tunneledArrayStr.split(",").map(Number);
    const userProblemView = problemViewStr.split(",");
    const playerAnswers = playerAnswersStr.split(",").map(Number);
    return {
      size,
      hardness,
      answerKey,
      tunneledArray,
      userProblemView,
      playerAnswers,
    };
}

const decompiling = getQueryParam('decompiling');
let n = parseInt(getQueryParam('size')); 
let d = getQueryParam('difficulty');
if(decompiling){

}

const size = n;
const difficulty = d;


document.getElementById('siteTitle').textContent = "Your " + difficulty + " " + size.toString() + " x " + size.toString() + " grid";

const solution = new Solution();
let game = solution.packGame(size);
let answerKey = game[0]; //ints
let tunneledArray = game[1]; //ints
let userProblemView = game[2]; //strings


const toAppend = document.getElementById("KenKenContainer");
let toColor = false;
function generateProblem(){

    //must erase old grid before generating new
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
            nestDiv.appendChild(document.createElement('div'));
            nestDiv.appendChild(inputDiv);
            a.appendChild(nestDiv);        
        }
        toAppend.appendChild(a); //
    }
}

generateProblem();

let playerAnswers = Array.from({ length: size }, () => Array(size).fill(0));
function collectPlayerAnswers(){
    for(let i = 0; i < playerAnswers.length; i++){
        for(let j = 0; j < playerAnswers[i].length; j++){
            let element = document.getElementById('attempt' + i.toString() + j.toString());
            if(element.value != null)playerAnswers[i][j] = element.value;
            else playerAnswers[i][j] = 999;
            console.log(element.value)
        }
    }
}
const check = document.getElementById("Check");
const hint = document.getElementById("hint");
const colorCode = document.getElementById("colorCode");
const newGame = document.getElementById("newGame");

newGame.addEventListener("click", function () {

    game = solution.packGame(size);
    answerKey = game[0];
    tunneledArray = game[1];
    userProblemView = game[2];
    
    generateProblem();    

});

colorCode.addEventListener("click", function () {
    toColor = !toColor; 
    generateProblem();

});

check.addEventListener("click", function () {
    collectPlayerAnswers();
    let sum = 0;
    for(let i = 0; i < size; i++){
        for(let j = 0; j < size; j++){
            let nestDiv = document.getElementById("nestDiv" + i.toString() + j.toString());
            let tempCol = nestDiv.style.color;
            if(playerAnswers[i][j] == answerKey[i][j]){
                
                nestDiv.style.background = "green";
                setTimeout(() => {
                    nestDiv.style.background = tempCol;
                }, 1000);
                sum++;

            }
            else{
                nestDiv.style.background = "red";
                
                setTimeout(() => {
                    nestDiv.style.background = tempCol;
                }, 1000);
            }
        }
    }
    if(sum == 16); //to be implemented later
    //console.log(playerAnswers);
});


hint.addEventListener("click", function () {
    let i = Math.floor(Math.random() * size); //0 to size
    let j = Math.floor(Math.random() * size); //0 to size
    let nestDiv = document.getElementById("nestDiv" + i.toString() + j.toString());
    let userInp = document.getElementById('attempt' + i.toString() + j.toString());
    collectPlayerAnswers();
    if(userInp.value != 999){
        let temp = userInp.value;
        nestDiv.style.background = "linear-gradient(45deg, #ffcc00, #f39c12)";
        userInp.value = answerKey[i][j]

        setTimeout(() => {
            nestDiv.style.background = "white";
            userInp.value = temp;
        }, 1000);

    }
    else{
        userInp.value = answerKey[i][j]

        setTimeout(() => {
            nestDiv.style.background = "white";
            userInp.value = "";
        }, 1000);


    }
});

function abstractor(){
    let first = "kenken." + size.toString() + "." + difficulty;
    let answerKeyStr = answerKey.join(",");
    let tunneledArrayStr = tunneledArray.join(",");
    let problemViewStr = userProblemView.join(","); //can compiler handle ",,,,,,"?
    collectPlayerAnswers();
    let playerAnswersStr = playerAnswers.join(",");
    return first + `${answerKeyStr}|${tunneledArrayStr}|${problemViewStr}|${playerAnswersStr}`;

}

console.log(abstractor());



//setGridColumns(size);

