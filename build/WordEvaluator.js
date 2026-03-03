import { MAX_WORD_SIZE } from "./env.js";
export class WordEvaluator {
    evaluateWord(pickedWord, currentWord) {
        const results = new Array(MAX_WORD_SIZE).fill("wrong");
        const pickedLetters = pickedWord.split("");
        for (let i = 0; i < MAX_WORD_SIZE; i++) {
            if (currentWord[i] === pickedLetters[i]) {
                results[i] = "right";
                pickedLetters[i] = "";
            }
        }
        for (let i = 0; i < MAX_WORD_SIZE; i++) {
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