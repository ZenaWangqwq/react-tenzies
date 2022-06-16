import React from "react"

export default function Header(props) {
    const [minutes, setMinutes] = React.useState(0);
    const [seconds, setSeconds] = React.useState(0);
    const [bestTime, setBestTime] = React.useState(localStorage.getItem("bestTime")||"Not Recorded Yet")

    React.useEffect(() => {
            if (props.tenzies === true) {
                getBestTime()
                return;
            }

            const timer = () => {
                setSeconds(seconds + 1);
            }

            if (seconds%60 === 0 && seconds !== 0) {
                setMinutes(minutes => minutes+1)
            }

            const id = setInterval(timer, 1000);
            return () => clearInterval(id);
    },[seconds, props.tenzies]);

    React.useEffect(() => {
        if (props.tenzies === true) {
            getBestTime()
        }else{
            setSeconds(0)
            setMinutes(0)
        }
    }, [props.tenzies])

    React.useEffect(() => {
        localStorage.setItem("bestTime", bestTime)
    },[bestTime])

    function showTime(min, sec) {
        let showMinutes = min
        let showSeconds = sec%60
        if (minutes < 10){
            showMinutes = "0" + showMinutes
        }
        if ((seconds%60) < 10){
            showSeconds = "0" + showSeconds
        }
        return showMinutes + " : " + showSeconds
    }
    
    function getBestTime() {
        if(bestTime==="Not Recorded Yet"){
            setBestTime(JSON.stringify([minutes,seconds%60]))
            return
        }

        let bestTimeArray = JSON.parse(bestTime)
        
        const bestTimeMinutes = bestTimeArray[0]
        const bestTimeSeconds = bestTimeArray[1]

        if (bestTimeMinutes > minutes) {
            setBestTime(JSON.stringify([minutes,seconds%60]))
            return
        }
        else if (bestTimeMinutes === minutes) {
            if (bestTimeSeconds >= seconds) {
                setBestTime(JSON.stringify([minutes,seconds%60]))
            }
        }
    }

    return (
        <header>
            <h4>Rolls: <font color="blue" size="3">{props.rollCount}</font></h4>
            <h4>Time: <font color="red" size="3">{showTime(minutes, seconds)}</font></h4>
            <h4>Best Time: <font color="green" size="3">{bestTime}</font></h4>
        </header>
    )
}