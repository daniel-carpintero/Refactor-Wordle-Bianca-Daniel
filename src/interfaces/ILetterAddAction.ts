export interface ILetterAddAction {
    type: "add";
    letter: string;
    position: number;
    turn: number;
}