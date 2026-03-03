import { MAX_WORD_SIZE } from "./env.js";
var WordEvaluator = /** @class */ (function () {
    function WordEvaluator() {
    }
    WordEvaluator.prototype.checkRightLetters = function (pickedWord, currentWord, results) {
        for (var i = 0; i < MAX_WORD_SIZE; i++) {
            if (pickedWord[i] === currentWord[i]) {
                results[i] = "right";
            }
        }
    };
    WordEvaluator.prototype.checkMisplacedLetters = function (pickedWord, currentWord, results) {
        var rightLetterCounts = this.countRightLetters(pickedWord, currentWord);
        for (var i = 0; i < MAX_WORD_SIZE; i++) {
            if (results[i] === "right")
                continue;
            var letter = currentWord[i];
            var timesInPickedWord = (pickedWord.match(new RegExp(letter, "g")) || []).length;
            var timesAlreadyAccounted = rightLetterCounts[letter] || 0;
            if (timesInPickedWord > timesAlreadyAccounted) {
                results[i] = "misplaced";
                rightLetterCounts[letter] = timesAlreadyAccounted + 1;
            }
        }
    };
    WordEvaluator.prototype.checkWrongLetters = function (pickedWord, currentWord, results) {
        for (var i = 0; i < MAX_WORD_SIZE; i++) {
            if (results[i] !== null)
                continue;
            var letter = currentWord[i];
            var isInPickedWord = pickedWord.includes(letter);
            if (!isInPickedWord) {
                results[i] = "wrong";
            }
        }
    };
    WordEvaluator.prototype.countRightLetters = function (pickedWord, currentWord) {
        var counts = {};
        for (var i = 0; i < MAX_WORD_SIZE; i++) {
            if (pickedWord[i] === currentWord[i]) {
                var letter = pickedWord[i];
                counts[letter] = (counts[letter] || 0) + 1;
            }
        }
        return counts;
    };
    WordEvaluator.prototype.evaluateWord = function (pickedWord, currentWord) {
        var results = new Array(MAX_WORD_SIZE).fill(null);
        this.checkRightLetters(pickedWord, currentWord, results);
        this.checkMisplacedLetters(pickedWord, currentWord, results);
        this.checkWrongLetters(pickedWord, currentWord, results);
        return results;
    };
    return WordEvaluator;
}());
export { WordEvaluator };
