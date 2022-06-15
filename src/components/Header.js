import React from "react"

export default function Header(props) {
    return (
        <header>
            <h4>Number of Roll: <font color="red" size="5">{props.rollCount}</font></h4>
            <h4>Time: </h4>
            <h4>Best Time: </h4>
        </header>
    )
}