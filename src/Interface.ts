export class Interface {

    private getRow(turn: number): HTMLElement | null {
        return document.getElementById(`row_${turn}`);
    }

    private getCell(turn: number, position: number): HTMLElement | null {
        const row = this.getRow(turn);
        return row ? (row.children[position] as HTMLElement) : null;
    }

    setNewLetter(turn: number, position: number, letter: string) {
        const cell = this.getCell(turn, position);
        if (cell) cell.textContent = letter;
    }

    deleteLetter(turn: number, position: number) {
        const cell = this.getCell(turn, position);
        if (cell) cell.textContent = "";
    }

    changeBackgroundPosition(turn: number, position: number, state: string) {
        const cell = this.getCell(turn, position);
        if (!cell) return;

        const stateClasses: Record<string, string> = {
            rightLetter: "cell-green",
            misplacedLetter: "cell-orange",
            wrongLetter: "cell-grey"
        };

        const cssClass = stateClasses[state] ?? "cell-grey";
        cell.classList.add(cssClass);
    }

    changeBackgroundKey(code: string) {
        const keys = document.querySelectorAll(".key");

        keys.forEach(key => {
            if ((key as HTMLButtonElement).value === code &&
                code !== "Enter" &&
                code !== "Backspace") {
                key.classList.add("keyPressed");
            }
        });
    }
}
