const CELL_STATE_CLASSES = {
    right: "cell-green",
    misplaced: "cell-orange",
    wrong: "cell-grey"
};
const KEY_STATE_CLASSES = {
    right: "key-green",
    misplaced: "key-orange",
    wrong: "key-grey"
};
const STATE_PRIORITY = {
    right: 3,
    misplaced: 2,
    wrong: 1
};
export class Interface {
    getRow(turn) {
        const row = document.getElementById(`row_${turn}`);
        if (!row)
            throw new Error(`Row not found for turn: ${turn}`);
        return row;
    }
    getCell(turn, position) {
        const row = this.getRow(turn);
        const cell = row.children[position];
        if (!cell)
            throw new Error(`Cell not found at turn ${turn}, position ${position}`);
        return cell;
    }
    setLetter(turn, position, letter) {
        this.getCell(turn, position).textContent = letter;
    }
    clearLetter(turn, position) {
        this.getCell(turn, position).textContent = "";
    }
    setCellState(turn, position, state) {
        this.getCell(turn, position).classList.add(CELL_STATE_CLASSES[state]);
    }
    setKeyState(letter, state) {
        const keyCode = letter === "Ñ" ? "Semicolon" : "Key" + letter;
        const key = document.querySelector(`.key[value="${keyCode}"]`);
        if (!key)
            return;
        const currentState = key.dataset.state;
        const isHigherPriority = !currentState || STATE_PRIORITY[state] > STATE_PRIORITY[currentState];
        if (!isHigherPriority)
            return;
        key.dataset.state = state;
        key.classList.remove("key-green", "key-orange", "key-grey");
        key.classList.add(KEY_STATE_CLASSES[state]);
    }
    renderEvaluation(turn, currentWord, evaluation) {
        evaluation.forEach((state, index) => {
            if (!state)
                return;
            this.setCellState(turn, index, state);
            const letter = currentWord[index];
            this.setKeyState(letter, state);
        });
    }
}
//# sourceMappingURL=Interface.js.map