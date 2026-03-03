export class Interface {
    getRow(turn) {
        const row = document.getElementById(`row_${turn}`);
        if (!row)
            throw new Error(`Row ${turn} not found`);
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
        const cell = this.getCell(turn, position);
        const stateClasses = {
            right: "cell-green",
            misplaced: "cell-orange",
            wrong: "cell-grey"
        };
        cell.classList.add(stateClasses[state]);
    }
    setKeyState(letter, state) {
        const keyCode = letter === "Ñ" ? "Semicolon" : "Key" + letter;
        const key = document.querySelector(`.key[value="${keyCode}"]`);
        if (!key)
            return;
        const statePriority = {
            right: 3,
            misplaced: 2,
            wrong: 1
        };
        const currentState = key.dataset.state;
        if (!currentState || statePriority[state] > statePriority[currentState]) {
            key.dataset.state = state;
            key.classList.remove("key-green", "key-orange", "key-grey");
            const stateClasses = {
                right: "key-green",
                misplaced: "key-orange",
                wrong: "key-grey"
            };
            key.classList.add(stateClasses[state]);
        }
    }
}
//# sourceMappingURL=Interface.js.map