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
        a.className = "FullBin" 
        a.style.gridTemplateColumns = '1fr '.repeat(size).trim();
        a.id = "container" + (i+1).toString();

        /*Generate Container Top*/
        let binTop = document.createElement("div");
        binTop.background = 

        /*Generate Middle of Container*/
        for(let j = 0; j < containerHeight - 2; j++){
            
        }
        /*Generate Container Bottom*/

        /*Append to Display Screen*/
        toAppend.appendChild(a); //
    }
}





