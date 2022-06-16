import React from "react"

export default function Header(props) {
    const [minutes, setMinutes] = React.useState(0);
    const [countSeconds, setCountSeconds] = React.useState(0);

    React.useEffect(
            () => {
                const timer = () => {
                    setCountSeconds(countSeconds + 1);
                }
                
                if (countSeconds >= 60) {
                    setMinutes(minutes+1)
                    setCountSeconds(0);
                    return;
                }

                const id = setInterval(timer, 1000);
                return () => clearInterval(id);
            },
            [countSeconds]
        );

    function showTime() {
        let showMinutes = minutes
        let showSeconds = countSeconds
        if (minutes < 10){
            showMinutes = "0" + minutes
        }
        if (countSeconds < 10){
            showSeconds = "0" + countSeconds
        }
        return showMinutes + " : " + showSeconds
    }

    return (
        <header>
            <h4>Number of Roll: <font color="red" size="5">{props.rollCount}</font></h4>
            <h4>Time: {showTime()}</h4>
            <h4>Best Time: </h4>
        </header>
    )
}