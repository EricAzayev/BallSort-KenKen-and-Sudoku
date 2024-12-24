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
    partitionArray(size){ //size synonymous with n: dimension of the array
        
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

            toReturn = randomBranching(i, j, problemSize, pathLabel, toReturn);

        }
        return toReturn;
    }
    randomBranching(i, j, amt, mark, arr){ //amt determines how many times recursion should occur //mark is the pathLabel //returns altered arr 
        if (i < 0 || i >= arr.length || j < 0 || j >= arr[0].length || arr[i][j] > 0|| amt == 0) {
            return arr;
        }
        arr[i][j] = mark; //mark must > 0, it sets the partition. 
        
        //1 is up //2 is down  //3 is left  //4 is right
        canGoUp = i > 0 && arr[i-1][j] == 0;
        canGoDown = i < arr.length - 1 && arr[i+1][j] == 0;
        canGoLeft = j > 0 && arr[i][j-1] == 0;
        canGoRight = j < arr.length - 1 && arr[i][j+1] == 0;
        
        
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
                this.randomBranching(i-1, j, amt-1, mark, arr);
                break;
            case 2:
                this.randomBranching(i+1, j, amt-1, mark, arr);
                break;
            case 3:
                this.randomBranching(i, j-1, amt-1, mark, arr);
                break;
            case 4:
                this.randomBranching(i, j+1, amt-1, mark, arr);
                break;
        }
    }


    hasZeros(wholeArray) {
        for(let i = 0; i < wholeArray.length; i++){
            for (let j = 0; j < wholeArray[i].length; j++) {
                if (wholeArray[i][j] === 0) return false;
            }
        }
        return true;
    }

    //!!!! end of createTunnelArray line of commands !!!!! (Step 2)
    
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
        let min = 0;
        let x;
        let y;
        let first = true;
        for(let i = 0; i < gameArray.length; i++){
            for(let j = 0; j < gameArray[0].length; j++){
                if(partitionArray[i][j] == pathLabel){
                    pathLength++;
                    if(first){
                        max = gameArray[i][j];
                        min = gameArray[i][j];
                        x = i;
                        y = j;
                        first = false;
                    }
                    else if(pathLength == 2){
                        gameArray[i][j] > max ? max = gameArray[i][j] : min = gameArray[i][j]; 
                    }
                    else if(pathLength > 2){ //in the worst case, return sum. 
                        return determineSum(pathLabel, partitionArray, gameArray)
                    }   
                }
            }
        }
        return [(max-min).toString + "-", x,y];
}
    determineMult(pathLabel, partitionArray, gameArray){ //if 7, adds the nums assigned location 7 
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
                    }
                    
                    sum *= gameArray[i][j];
                }
            }
        }
        return [sum.toString() + "+", x,y]; //kenken.js unpacks this list to know where to display this problem
    }

    determineDivis(pathLabel, partitionArray, gameArray){
        let pathLength = 0;
        let max = 0;
        let min = 0;
        let x;
        let y;
        let first = true;
        for(let i = 0; i < gameArray.length; i++){
            for(let j = 0; j < gameArray[0].length; j++){
                if(partitionArray[i][j] == pathLabel){
                    pathLength++;
                    if(first){
                        max = gameArray[i][j];
                        min = gameArray[i][j];
                        x = i;
                        y = j;
                        first = false;
                    }
                    else if(pathLength == 2){
                        gameArray[i][j] > max ? max = gameArray[i][j] : min = gameArray[i][j]; 
                    }
                    else if(pathLength > 2){ //in the worst case, return sum. 
                        return determineSum(pathLabel, partitionArray, gameArray)
                    }   
                }
            }
        }
        return [(max / min).toString + "-", x,y];
    }

    





    //!!!! end of createProblemArray line of commands !!!!! (Step 2)
    
    



}




export default Solution;