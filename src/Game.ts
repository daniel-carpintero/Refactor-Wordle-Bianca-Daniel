import {MAX_WORD_SIZE, MAX_ATTEMPTS} from "./env.js";
import {Interface} from "./Interface.js";
import { KeyboardInput } from './KeyboardInput';

export class Game {
    private _pickedWord: string
    private _actualWord: string
    private _actualPosition: number
    private _turn: number
    private _keyboardInput: KeyboardInput
    
    private _interface: Interface
    constructor(pickedWord: string, keyboardInput: KeyboardInput){
        this._pickedWord = pickedWord;
        this._actualWord = "";
        this._actualPosition = 0;
        this._turn = 1;
        this._keyboardInput = keyboardInput
        this._interface = new Interface();
    }

    get pickedWord(){
        return this._pickedWord;
    }
    
    set pickedWord(word){
        this._pickedWord = word;
    }

    get actualWord(){
        return this._actualWord;
    }
    set actualWord(word){
        this._actualWord = word;
    }

    get actualPosition(){
        return this._actualPosition;
    }
    set actualPosition(num){
        this._actualPosition = num;
    }

    get turn(){
        return this._turn;
    }
    set turn(num){
        this._turn = num;
    }

    get interface() {
        return this._interface;
    }
    set interface(i) {
        this._interface = i;
    }

    newLetter(code: string):void{
        let letter: string = this._keyboardInput.transformCodeToLetter(code);
        this._interface.setNewLetter(this.turn, this.actualPosition, letter);
        this._actualPosition = this._actualPosition + 1;
        this._actualWord += letter;
    }

    checkWordIsRight():void{
        if (this._actualWord == this._pickedWord){
            location.assign("/winner");
        }
    }

    checkRightLetters = ():void=>{
        for(let i=0; i<MAX_WORD_SIZE; i++){
            if (this._pickedWord[i]==this._actualWord[i]){
                this._interface.changeBackgroundPosition(this._turn, i, "rightLetter");
            }
        }
    }

    checkMisplacedLetters = ():void=> {
        let actualLetter: string = "";
        let pattern: RegExp;
        let numberOfCoincidences: number = 0;
        let isMisplacedLetter: boolean;
        for (let i=0; i<MAX_WORD_SIZE; i++){
            isMisplacedLetter = true;
            actualLetter = this._actualWord[i];
            pattern = new RegExp(actualLetter,"g");
            numberOfCoincidences = (this._pickedWord.match(pattern)||[]).length;
            if (this._pickedWord[i]==this._actualWord[i]) isMisplacedLetter=false;
            if (numberOfCoincidences>0 && isMisplacedLetter) this._interface.changeBackgroundPosition(this._turn, i, "misplacedLetter");
            
        }
    }

    checkWrongLetters = ():void=>{
        let actualLetter = "";
        let pattern:RegExp;
        let numberOfCoincidences = 0;
        for (let i=0; i<MAX_WORD_SIZE; i++){
            actualLetter = this._actualWord[i];
            pattern = new RegExp(actualLetter,"g");
            numberOfCoincidences = (this._pickedWord.match(pattern)||[]).length;
            if (numberOfCoincidences==0) this._interface.changeBackgroundPosition(this._turn, i, "wrongLetter");
        }
    }

    updateAfterANewWord = ():void=>{
        this.checkRightLetters();
        this.checkMisplacedLetters();
        this.checkWrongLetters();
        this._turn = this._turn + 1;
        this._actualPosition = 0;
        this._actualWord = "";
    }

    checkGameIsOver():void{
        if (this.turn == MAX_ATTEMPTS){
            location.assign("/loser");
        }
    }

    enterPressed():void{
        if (this._actualWord.length == MAX_WORD_SIZE){
            this.checkWordIsRight();
            this.checkGameIsOver();
            this.updateAfterANewWord();
        }
    }

    backspacePressed():void{
        if (this._actualPosition > 0) {
            this._actualPosition -= 1;
            this._interface.deleteLetter(this._turn, this._actualPosition);
        }
    }

    newKeyPressed(code: string):void{ 
        if (this._keyboardInput.isValidLetter(code) && this._actualPosition < MAX_WORD_SIZE) this.newLetter(code);
        if (this._keyboardInput.isEnterKey(code)) this.enterPressed();
        if (this._keyboardInput.isBackspaceKey(code)) this.backspacePressed();
        this._interface.changeBackgroundKey(code);
    }

    
}