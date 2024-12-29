class Solution {
    constructor(){}
    generateNNArray(n) { //generates the answer array
        let toReturn = Array.from({ length: n }, () => Array(n).fill(0)); //new nn array filled with 0s
        
        for (let i = 0; i < n; i++) {
            let toCheck = this.generateOneArray(n);
            
            if (!this.isUnique(toCheck, toReturn, i)) {
                i--;
            } else {
                toReturn[i] = toCheck;
            }
        }
        
        return toReturn;
    }

    isUnique(toCheck, toReturn, n) { //checks if number appended to 1xN array is unique //helper for generateOneArray(n)
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < toCheck.length; j++) {
                if (toReturn[i][j] === toCheck[j]) return false;
                if (toReturn[j][i] === toCheck[i]) return false;
            }
        }
        return true;
    }

    generateOneArray(n) { //helper for generateNNArray
        let oneArray = Array(n).fill(0);
        
        for (let i = 0; i < n; i++) {
            let randomNum = Math.floor(Math.random() * n) + 1;
            
            while (!this.isUniqueInArray(i, randomNum, oneArray)) {
                randomNum = Math.floor(Math.random() * n) + 1;
            }
            
            oneArray[i] = randomNum;
        }
        
        return oneArray;
    }

    isUniqueInArray(i, randomNum, oneArray) { //returns whether the 1 x N array is unique in NXN Array. //helper for generateNNArray(n)
        if (i === 0) return true;
        
        for (let j = 0; j < i; j++) {
            if (oneArray[j] === randomNum) return false;
        }
        
        return true;
    }


    //!!!! end of generateNNArray line of commands !!!!! (Step 1)


    //purpose of function: to create snakes
    partitionArray(size){ //shows how the problems are separated (likely by color) //size synonymous with n: dimension of the array
        
        let toReturn = Array.from({ length: size }, () => Array(size).fill(0)); //fill array toReturn with 0s.
        //const onlyUniques = new Set([]); //generate empty set

        let pathLabel = 0;
        while(this.hasZeros(toReturn)){ //goal is to remove all 0s 
            let i = Math.floor(Math.random() * size); //random row
            let j = Math.floor(Math.random() * size); //random col
            //because this random coordinate may not be taken, we ensure this doesn't happen
            while(toReturn[i][j] != 0)
                {i = Math.floor(Math.random() * size); j = Math.floor(Math.random() * size);} //define i and j as 2  //ensure a unique coordinate is selected 
            
            //pathLabel is the problem section number
            pathLabel++; 
           
            
            //Temp equation to determine length of individual paths. 
            let problemSize = Math.floor(Math.random() * 2) + 2; //temporarily set for range [2,4]

            toReturn = this.randomBranching(i, j, problemSize, pathLabel, toReturn);

        }
        return toReturn;
    }
    randomBranching(i, j, amt, mark, arr){ //amt determines how many times recursion should occur //mark is the pathLabel //returns altered arr 
        if (i < 0 || i >= arr.length || j < 0 || j >= arr[0].length || arr[i][j] > 0|| amt == 0) {
            return arr;
        }
        arr[i][j] = mark; //mark must > 0, it sets the partition. 
        
        //1 is up //2 is down  //3 is left  //4 is right
        let canGoUp = i > 0 && arr[i-1][j] == 0;
        let canGoDown = i < arr.length - 1 && arr[i+1][j] == 0;
        let canGoLeft = j > 0 && arr[i][j-1] == 0;
        let canGoRight = j < arr.length - 1 && arr[i][j+1] == 0;
        
        
        const validDirections = [];
        if (canGoUp) validDirections.push(1);
        if (canGoDown) validDirections.push(2);
        if (canGoLeft) validDirections.push(3);
        if (canGoRight) validDirections.push(4);
        //check if a valid direction exists
        if (validDirections.length === 0) return arr;

        const moveThere = validDirections[Math.floor(Math.random() * validDirections.length)]; //selects code for valid direction
        switch(moveThere){
            case 1:
                return this.randomBranching(i-1, j, amt-1, mark, arr);
                //break;
            case 2:
                return this.randomBranching(i+1, j, amt-1, mark, arr);
            case 3:
                return this.randomBranching(i, j-1, amt-1, mark, arr);
                
            case 4:
                return this.randomBranching(i, j+1, amt-1, mark, arr);
                
        }
    }


    hasZeros(wholeArray) {
        for(let i = 0; i < wholeArray.length; i++){
            for (let j = 0; j < wholeArray[i].length; j++) {
                if (wholeArray[i][j] === 0) return true;
            }
        }
        return false;
    }

    //!!!! end of createTunnelArray line of commands !!!!! (Step 2)

    asIs(num, i, j){
        return [num.toString(), i, j];
    }
    
    determineSum(pathLabel, partitionArray, gameArray){ //if 7, adds the nums assigned location 7 
        let sum = 0;
        let x;
        let y;
        let first = true;
        
        for(let i = 0; i < gameArray.length; i++){
            for(let j = 0; j < gameArray[0].length; j++){
                if(partitionArray[i][j] == pathLabel){
                    if(first){
                        
                        x = i;
                        y = j;
                        if(this.problemLength(partitionArray, pathLabel) == 1)return this.asIs(gameArray[i][j], i, j);
                        first = false;
                    }
                    
                    sum += gameArray[i][j];
                }
            }
        }
        return [sum.toString() + "+", x,y]; //kenken.js unpacks this list to know where to display this problem
    }

    determineDifference(pathLabel, partitionArray, gameArray){ //pathlength must be 2!
        let pathLength = 0;
        let max = 0;
        let min = 100;
        let x;
        let y;
        let first = true;
        for(let i = 0; i < gameArray.length; i++){
            for(let j = 0; j < gameArray[0].length; j++){
                if(partitionArray[i][j] == pathLabel){
                    if(gameArray[i][j] > max)max = gameArray[i][j];
                    if(gameArray[i][j] < min)min = gameArray[i][j];
                    pathLength++;
                    if(first){
                        
                        x = i;
                        y = j;
                        first = false;
                    }
                    else if(pathLength == 2){
                        gameArray[i][j] > max ? max = gameArray[i][j] : min = gameArray[i][j]; 
                    }
                    else if(pathLength > 2){ //in the worst case, return sum. 
                        return this.determineSum(pathLabel, partitionArray, gameArray)
                    }   
                }
            }
        }
        return [(max-min).toString() + "-", x,y];
}
    determineMult(pathLabel, partitionArray, gameArray){ //if 7, adds the nums assigned location 7 
        let mult = 1;
        let x;
        let y;
        let first = true;
        for(let i = 0; i < gameArray.length; i++){
            for(let j = 0; j < gameArray[0].length; j++){
                if(partitionArray[i][j] == pathLabel){
                    if(first){
                        x = i;
                        y = j;
                        if(this.problemLength(partitionArray, pathLabel) == 1)return this.asIs(gameArray[i][j], i, j);
                        first = false;
                    }
                    
                    mult *= gameArray[i][j];
                }
            }
        }
        return [mult.toString() + "*", x,y]; //kenken.js unpacks this list to know where to display this problem
    }

    determineDivis(pathLabel, partitionArray, gameArray){
        let pathLength = 0;
        let max = 0;
        let min = 100;
        let x;
        let y;
        let first = true;
        for(let i = 0; i < gameArray.length; i++){
            for(let j = 0; j < gameArray[0].length; j++){                
                if(partitionArray[i][j] == pathLabel){
                    if(gameArray[i][j] > max)max = gameArray[i][j];
                    if(gameArray[i][j] < min)min = gameArray[i][j];
                    pathLength++;
                    if(first){
                        x = i;
                        y = j;
                        first = false;
                    }
                    else if(pathLength == 2){
                        gameArray[i][j] > max ? max = gameArray[i][j] : min = gameArray[i][j]; 
                    }
                    else if(pathLength > 2){ //in the worst case, return sum. 
                        return this.determineSum(pathLabel, partitionArray, gameArray)
                    }   
                }
            }
        }
        if(max % min == 0)return [(max / min).toString() + "/", x,y];
        return this.determineDifference(pathLabel, partitionArray, gameArray);
    }
    
    //returns the array to be displayed to the player, with all available problems. 
    establishProblems(tunneledArray, gameArray){  //tunneledArray = partitionedArray , gameArray is the answer array
        let completed = new Set(); //completed markers placed here. 
        let toReturn = Array.from({ length: tunneledArray.length }, () => Array(tunneledArray[0].length).fill("'"));

        //identify individual markers
        for(let i = 0; i < tunneledArray.length;i++){
            for(let j = 0; j < tunneledArray[0].length; j++){
                let mark = tunneledArray[i][j];
                let toUnpack;
                if(!completed.has(mark)){
                    //randomly run a problem-function on a marker
                    let lengthP = this.problemLength(tunneledArray, mark);
                    
                    if(lengthP == 2){ //must create odds for substract, add, multiply, and divide
                        //odds are 6,2,1,1

                        let chance = Math.floor(Math.random() * 10); //0 - 9
                        if(chance < 5){ //subtract
                            toUnpack = this.determineDivis(mark, tunneledArray, gameArray);
                            toReturn[toUnpack[1]][toUnpack[2]] = toUnpack[0];
                        }
                        else if(chance > 4 && chance < 8){ //divide
                            toUnpack = this.determineDifference(mark, tunneledArray, gameArray);
                            toReturn[toUnpack[1]][toUnpack[2]] = toUnpack[0];
                        }
                        else if(chance == 8){ //multiply
                            toUnpack = this.determineMult(mark, tunneledArray, gameArray);
                            toReturn[toUnpack[1]][toUnpack[2]] = toUnpack[0];

                        }
                        else{ //add //chance == 9
                            toUnpack = this.determineSum(mark, tunneledArray, gameArray);
                            toReturn[toUnpack[1]][toUnpack[2]] = toUnpack[0];
                        }
                    }
                    else{ //length > 2
                        switch(Math.floor(Math.random() * 2)){//0 - 1)
                            case 0:
                                toUnpack = this.determineMult(mark, tunneledArray, gameArray);
                                toReturn[toUnpack[1]][toUnpack[2]] = toUnpack[0];
                                break;
                            case 1:
                                toUnpack = this.determineSum(mark, tunneledArray, gameArray);
                                toReturn[toUnpack[1]][toUnpack[2]] = toUnpack[0];
                        }
                                
                    }


                }
                completed.add(mark);
            }
        }
        return toReturn;
    }
        
    
    //helper function for establishProblems - used to determine w
    problemLength(wholeArray,mark){
        let sum = 0
        for(let i = 0; i < wholeArray.length; i++){
            for (let j = 0; j < wholeArray[i].length; j++) {
                if (wholeArray[i][j] === mark) sum++;
            }
        }
        return sum;
    }
    //!!!! end of createProblemArray line of commands !!!!! (Step 3)


    packGame(n){ //n is the size. 
        
        let answerKey = this.generateNNArray(n);
        //console.log(answerKey);
        let partitionedArray = this.partitionArray(n);
        //console.log(partitionedArray);
        let problemView = this.establishProblems(partitionedArray, answerKey);
        //console.log(problemView);

        return [answerKey, partitionedArray, problemView];
    }


    getGridColor(problemNum,n) {
        
        const range = (n*n) / 4;

        let redScale = 255 / range;
        let greenScale = 255 / range;
        let blueScale = 255 / range;
        if(problemNum % 2 == 0)greenScale /= 2;
        else if(problemNum % 3 == 0)redScale /= 2
        else{
            blueScale /= 2;
        }

        //map problemNum to a color using RGB values
        const red = Math.min(255, Math.floor(redScale * problemNum));
        const green = Math.min(255, Math.floor(greenScale * problemNum));
        const blue = Math.min(255, Math.floor(blueScale * problemNum));
    
        // Return the color as an RGB string
        return `rgb(${red}, ${green}, ${blue})`;
    }
}




export default Solution;