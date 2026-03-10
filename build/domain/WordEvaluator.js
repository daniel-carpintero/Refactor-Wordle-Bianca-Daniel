export class WordEvaluator {
    evaluateWord(pickedWord, currentWord) {
        const results = new Array(pickedWord.length).fill("wrong");
        const pickedLetters = pickedWord.split("");
        for (let i = 0; i < pickedWord.length; i++) {
            if (currentWord[i] === pickedLetters[i]) {
                results[i] = "right";
                pickedLetters[i] = "";
            }
        }
        for (let i = 0; i < pickedWord.length; i++) {
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