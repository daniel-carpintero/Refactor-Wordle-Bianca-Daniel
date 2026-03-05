import { GameStatus } from "../domain/GameStatus.js"
import { LetterResult } from "../domain/WordEvaluator.js"

export type TurnResult = {
    status: GameStatus
    evaluation: LetterResult[] | null
    evaluatedTurn: number | null
}