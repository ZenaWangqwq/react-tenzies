import { nanoid } from "nanoid"
import React from "react"
import Die from "./components/Die"



export default function App() {

    const [diceArray, setDiceArray] = React.useState(allNewDice())

    function generateNewDie() {
        return {
            id: nanoid(),
            value: Math.ceil(Math.random() * 6),
            isHeld: false
        }
    }

    function allNewDice() {
        const diceArray = []
        for (let i = 0; i < 10; i++){
            diceArray.push(generateNewDie())
        }
        return diceArray
    }

    function roll() {
        setDiceArray(prevArray => prevArray.map(die => {
            return die.isHeld ? 
                die :
                generateNewDie()
        }))
    }

    function holdDice(id) {
        setDiceArray(prevArray => prevArray.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }

    const diceElements = diceArray.map(die => 
        <Die 
            key={die.id} 
            id={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
        />
    )

    return (
        <main>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="container">
                {diceElements}
            </div>
            <button className="roll-dice" onClick={roll}>Roll</button>
        </main>
    )
}