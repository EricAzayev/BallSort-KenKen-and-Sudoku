class Solution {
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
}

/*const solution = new Solution();
console.log(solution.generateNNArray(6));*/

export default Solution;