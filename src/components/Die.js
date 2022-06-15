import React from "react"

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    const dotsStyles =  {}

    const dotElements = []

    function determineNumberOfDots() {
        if (props.value === 3) {
            return "three-dots"
        }
        else if (props.value === 5) {
            return "five-dots"
        }
        else return "dots"
    }

    for (let i = 0; i < props.value; i++){
        dotElements.push(<span style={dotsStyles} className= {determineNumberOfDots()} />)
    }

    switch(props.value) {
        case 1:
            styles.display = "flex";
            styles.justifyContent = "center";
            styles.alignItems = "center";
            break;
        case 2:
            styles.display = "flex";
            styles.justifyContent = "space-around";
            styles.alignItems = "center";
            break;
        case 3:
            styles.display = "flex";
            styles.justifyContent = "space-between";
            styles.padding = "5px";
            break;
        case 4:
            styles.display = "grid";
            styles.gridTemplate = "1fr 1fr/ 1fr 1fr";
            styles.placeItems = "center";
            break;
        case 6:
            styles.display = "grid";
            styles.gridTemplate = "1fr 1fr 1fr/ 1fr 1fr";
            styles.placeItems = "center";
            break;
    }

    return (
        <div style={styles} className="die" onClick={props.holdDice}>
            {dotElements}
        </div>
    )
}