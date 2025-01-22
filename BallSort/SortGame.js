class SortGame{
    
    constructor(numDiffElms = 2, capacity = 4, emptyBins = 1){
      this.bins = Array.from({ length: 2 }, () => []);
      this.numDiffElms = numDiffElms;
      this.numEmptyBins = emptyBins;
      this.capacity = capacity;
    }
  

    randomize(){
    // Math.random() can be used for randomness, but we can seed it if needed
    // const seed = 11; // Uncomment if you want to use a fixed seed
    let currLastIdx = numDiffElms * capacity - 1;
        while (currLastIdx > 0){
            let k = Math.floor(Math.random() * (currLastIdx + 1)); // select a random integer in [0, currLastIdx]
            [bins[Math.floor(k / capacity)][k % capacity], bins[Math.floor(currLastIdx / capacity)][currLastIdx % capacity]] =
                [bins[Math.floor(currLastIdx / capacity)][currLastIdx % capacity], bins[Math.floor(k / capacity)][k % capacity]];
            currLastIdx--;
        }
    }


    display(){
        const shapes = [
            "\u2b24", // circle
            "\u2b1f", // pentagon
            "\u25fc", // medium square, can add color
            "\u272f", // star, can add color
            "\u2665", // heart
            "\u25b2", // triangle
        ];
        const shapes_size = shapes.length;

        const colorShapeMap = new Array(numDiffElms);
        let colorCode = 31;
        // "\033[31m", a const char*, represents red text color
        // "\033[32m" represents green text color
        for (let i = 0; i < numDiffElms; i++) {
            colorShapeMap[i] = `\033[${colorCode}m${shapes[i % shapes_size]}\033[0m`;
            // restore to \033[0m, black color, after displaying a colored shape
            colorCode++;
        }

        for(let row = capacity - 1; row >= 0; row--) { //empties last row index of each bin, then goes toward index 0
            for(const bin of bins) { //for each bin in bins
                if(row < bin.length) {
                    process.stdout.write(`|  ${colorShapeMap[bin[row] - 1]}  |`);
                }else{
                    process.stdout.write("|     |");
                }
            }
            console.log();
        }

        for(let i = 0; i < bins.length; i++) { //may not consider empty bins
            process.stdout.write("+----+"); //ensures no spillout
        }
        console.log();

        for(let i = 0; i < bins.length; ++i){
            if (i < bins.length - 1) {
                process.stdout.write("    "); // 4 spaces
            }
            process.stdout.write(`Bin ${i + 1}`);
        }
        console.log();
    }

    move(shapesInBins, numFinishedBins){
        let num1 = parseInt(prompt("Enter the label of move out bin:"));
        let num2 = parseInt(prompt("Enter the label of move in bin:"));

        if(num1 === -1 && num2 === -1) return false;

        if(
            num1 < 1 || num1 > this.bins.length ||
            num2 < 1 || num2 > this.bins.length
        ){
            console.log("wrong bin number");
            return true;
        }

        num1 -= 1;
        num2 -= 1;

        if(this.bins[num1].length === 0){
            console.log("move out bin is empty");
            return true;
        }

        let arm = this.bins[num1][this.bins[num1].length - 1];

        if(this.bins[num2].length > 0 &&
            this.bins[num2][this.bins[num2].length - 1] !== arm){
            console.log("not match");
            return true;
        }

        let amtSame = 0;
        let i = this.bins[num1].length - 1;
        while(i >= 0 && this.bins[num1][i] === arm){
            amtSame++;
            i--;
        }

        if(amtSame + this.bins[num2].length > this.capacity){
            console.log("The move in bin has no sufficient slots.");
            return true;
        }

        for(let j = 0; j < amtSame; j++){
            this.bins[num1].pop();
            this.bins[num2].push(arm);
        }

        shapesInBins[num1][arm - 1] -= amtSame;
        shapesInBins[num2][arm - 1] += amtSame;

        if(shapesInBins[num2][arm - 1] === this.capacity){
            numFinishedBins++;
        }

        this.display();

        return true;
    }

    play(){
        let numMoves = 0;
        let numBinsFinished = 0;

        let shapesInBins = Array.from({ length: this.bins.length }, () => Array(this.capacity).fill(0));

        // Initialize shapesInBins and numBinsFinished
        for (let i = 0; i < this.bins.length; i++) {
            for (let j = 0; j < this.bins[i].length; j++) {
                let shapeNum = this.bins[i][j];
                shapesInBins[i][shapeNum - 1]++;
                if (shapesInBins[i][shapeNum - 1] === this.capacity) numBinsFinished++;
            }
        }

        this.display();

        let bContinue = true;
        while (bContinue && this.numDiffElms !== numBinsFinished) {
            numMoves++;
            console.log("move " + numMoves);

            bContinue = this.move(shapesInBins, numBinsFinished);
        }

        if (this.numDiffElms === numBinsFinished) {
            console.log("Congratulations! It takes " + numMoves);
        }
    }
}
export default SortGame;