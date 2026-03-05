import { IInterface } from "../interfaces/IInterface";
import { LetterResult } from "../domain/WordEvaluator";

export type CellState = "right" | "misplaced" | "wrong";

const CELL_STATE_CLASSES: Record<CellState, string> = {
    right: "cell-green",
    misplaced: "cell-orange",
    wrong: "cell-grey"
};

const KEY_STATE_CLASSES: Record<CellState, string> = {
    right: "key-green",
    misplaced: "key-orange",
    wrong: "key-grey"
};

const STATE_PRIORITY: Record<CellState, number> = {
    right: 3,
    misplaced: 2,
    wrong: 1
};

export class Interface implements IInterface{

    private getRow(turn: number): HTMLElement {
        const row = document.getElementById(`row_${turn}`);
        if (!row) throw new Error(`Row not found for turn: ${turn}`);
        return row;
    }

    private getCell(turn: number, position: number): HTMLElement {
        const row = this.getRow(turn);
        const cell = row.children[position] as HTMLElement | undefined;
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
        this.getCell(turn, position).classList.add(CELL_STATE_CLASSES[state]);
    }

    setKeyState(letter: string, state: CellState): void {
        const keyCode = letter === "Ñ" ? "Semicolon" : "Key" + letter;

        const key = document.querySelector(
            `.key[value="${keyCode}"]`
        ) as HTMLButtonElement | null;

        if (!key) return;

        const currentState = key.dataset.state as CellState | undefined;
        const isHigherPriority = !currentState || STATE_PRIORITY[state] > STATE_PRIORITY[currentState];

        if (!isHigherPriority) return;

        key.dataset.state = state;
        key.classList.remove("key-green", "key-orange", "key-grey");
        key.classList.add(KEY_STATE_CLASSES[state]);
    }

    renderEvaluation(turn: number, currentWord: string, evaluation: LetterResult[]): void {
        evaluation.forEach((state, index) => {
            if(!state) return;

            this.setCellState(turn, index, state);

            const letter = currentWord[index];
            this.setKeyState(letter, state);
        });

    }
}