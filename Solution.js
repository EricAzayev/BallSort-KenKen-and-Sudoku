class Solution {
    constructor(){}
    generateNNArray(n) {
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

    isUnique(toCheck, toReturn, n) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < toCheck.length; j++) {
                if (toReturn[i][j] === toCheck[j]) return false;
                if (toReturn[j][i] === toCheck[i]) return false;
            }
        }
        return true;
    }

    generateOneArray(n) {
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

    isUniqueInArray(i, randomNum, oneArray) {
        if (i === 0) return true;
        
        for (let j = 0; j < i; j++) {
            if (oneArray[j] === randomNum) return false;
        }
        
        return true;
    }

    partitionArray(size){ 
        //generate numbers between 1 and size

        let toReturn = Array.from({ length: size }, () => Array(size).fill(0));
        const onlyUniques = new Set([]);
        while(this.hasZeros(toReturn)){
            let i = Math.floor(Math.random() * size); //random row
            let j = Math.floor(Math.random() * size); //random col

            while(toReturn[i][j] != 0){i = Math.floor(Math.random() * size); j = Math.floor(Math.random() * size);} //ensure a unique coordinate is selected
            let sec = Math.floor(Math.random() * size) + 1;
            while(onlyUniques.has(sec))sec = Math.floor(Math.random() * size) + 1; //ensure sec is a UNIQUE random number
            let problemSize = Math.floor(Math.random() * 2) + 2; //2 - 4 //Temp equation to determine pSs, TO BE CHANGED!!!
            let mark = Math.floor(Math.random() * size) + 1; //decides the color and problem-branch

            toReturn = randomBranching(i, j, problemSize, mark, toReturn);

        }
        return toReturn;
    }
    randomBranching(i, j, amt, mark, arr){ //return type: array[][] only because js is pass by value //amt determines how many times recursion should occur 
        let toReturn = arr; //to be recursed
        if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] == 0 || arr[i][j] > 0|| amt == 0) {
            return arr;
        }
        arr[i][j] = mark; //mark must > 0, it sets the partition. 
        let moveThere = Math.floor(Math.random() * 4) + 1; //choosing random direction
        //1 is up
        //2 is down
        //3 is left
        //4 is right
        canGoUp = i > 0 && arr[i-1][j] == 0;
        canGoDown = i < arr.length - 1 && arr[i+1][j] == 0;
        canGoLeft = j > 0 && arr[i][j-1] == 0;
        canGoRight = j < arr.length - 1 && arr[i][j+1] == 0;
        
        if(!canGoUp && !canGoDown && !canGoLeft && !canGoRight){
            return arr;
        }

        const canGo = new Map([[1,canGoUp],[2,canGoDown],[3,canGoLeft],[4,canGoRight]]);


        while(!canGo.get(moveThere))moveThere = Math.floor(Math.random() * 4) + 1;
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
    
    determineSum(targ, partitionArray, gameArray){ //if 7, adds the nums assigned location 7 
        let sum = 0;
        for(let i = 0; i < gameArray.length; i++){
            for(let j = 0; j < gameArray[0].length; j++){
                if(partitionArray[i][j] == targ)sum += gameArray[i][j];
            }
        }
        return sum;
    }
    determineMult(targ, partitionArray, gameArray){ //if 7, adds the nums assigned location 7 
        let mult = 0;
        for(let i = 0; i < gameArray.length; i++){
            for(let j = 0; j < gameArray[0].length; j++){
                if(partitionArray[i][j] == targ)mult *= gameArray[i][j];
            }
        }
        return mult;
    }


}




export default Solution;