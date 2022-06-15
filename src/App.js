import { nanoid } from "nanoid"
import React from "react"
import Die from "./components/Die"
import Confetti from 'react-confetti'
import Header from "./components/Header"



export default function App() {

    const [tenzies, setTenzies] = React.useState(false)
    const [diceArray, setDiceArray] = React.useState(allNewDice())
    const [rollCount, setRollCount] = React.useState(0)

    React.useEffect(() => {
        const allHeld = diceArray.every(die => die.isHeld)
        const firstDie = diceArray[0]
        const allSameValue = diceArray.every(die => die.value === firstDie.value)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [diceArray])

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
        setRollCount(prevRollCount => prevRollCount+1)
    }

    function newGame() {
        setDiceArray(allNewDice())
        setTenzies(false)
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
            <Header rollCount={rollCount}/>
            {tenzies && <Confetti/>}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="container">
                {diceElements}
            </div>
            <button 
                className="game-button" 
                onClick = {tenzies ? newGame : roll}
            > {tenzies ? "New Game" : `Roll`} 
            </button>
        </main>
    )
}