export class WordEvaluator {
    constructor(maxWordSize) {
        this.maxWordSize = maxWordSize;
    }
    evaluateWord(pickedWord, currentWord) {
        const results = new Array(this.maxWordSize).fill("wrong");
        const pickedLetters = pickedWord.split("");
        for (let i = 0; i < this.maxWordSize; i++) {
            if (currentWord[i] === pickedLetters[i]) {
                results[i] = "right";
                pickedLetters[i] = "";
            }
        }
        for (let i = 0; i < this.maxWordSize; i++) {
            if (results[i] !== "right") {
                const indexInPicked = pickedLetters.indexOf(currentWord[i]);
                if (indexInPicked !== -1) {
                    results[i] = "misplaced";
                    pickedLetters[indexInPicked] = "";
                }
            }
        }
        return results;
    }
}
//# sourceMappingURL=WordEvaluator.js.map