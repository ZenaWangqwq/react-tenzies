import React from "react"

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    const dotElements = []

    for (let i = 0; i < props.value; i++){
        dotElements.push(<span className="dots" />)
    }

    return (
        <div style={styles} className="die" onClick={props.holdDice}>
            {dotElements}
        </div>
    )
}