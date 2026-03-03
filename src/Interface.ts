export type CellState = "right" | "misplaced" | "wrong";

export class Interface {

    private getRow(turn: number): HTMLElement {
        const row = document.getElementById(`row_${turn}`);
        if (!row) throw new Error(`Row ${turn} not found`);
        return row;
    }

    private getCell(turn: number, position: number): HTMLElement {
        const row = this.getRow(turn);
        const cell = row.children[position] as HTMLElement;

        if (!cell) throw new Error(`Cell not found at turn ${turn}, position ${position}`);
        return cell;
    }

    setLetter(turn: number, position: number, letter: string): void {
        this.getCell(turn, position).textContent = letter;
    }

    clearLetter(turn: number, position: number): void {
        this.getCell(turn, position).textContent = "";
    }

    setCellState(turn: number, position: number, state: CellState): void {
        const cell = this.getCell(turn, position);

        const stateClasses: Record<CellState, string> = {
            right: "cell-green",
            misplaced: "cell-orange",
            wrong: "cell-grey"
        };

        cell.classList.add(stateClasses[state]);
    }

    setKeyState(letter: string, state: CellState): void {
        const keyCode = letter === "Ñ" ? "Semicolon" : "Key" + letter;

        const key = document.querySelector(
            `.key[value="${keyCode}"]`
        ) as HTMLButtonElement | null;

        if (!key) return;

        const statePriority: Record<CellState, number> = {
            right: 3,
            misplaced: 2,
            wrong: 1
        };

        const currentState = key.dataset.state as CellState | undefined;

        if (!currentState || statePriority[state] > statePriority[currentState]) {
            key.dataset.state = state;
            key.classList.remove("key-green", "key-orange", "key-grey");

            const stateClasses: Record<CellState, string> = {
                right: "key-green",
                misplaced: "key-orange",
                wrong: "key-grey"
            };

            key.classList.add(stateClasses[state]);
        }
    }
}