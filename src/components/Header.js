import React from "react"

export default function Header(props) {
    const [minutes, setMinutes] = React.useState(0);
    const [seconds, setSeconds] = React.useState(0);
    const [bestTime, setBestTime] = React.useState(() => JSON.parse(localStorage.getItem("bestTime"))||"Not Recorded Yet")

    React.useEffect(() => {
            if (props.tenzies === true) {
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
            calculateBestTime()
        }else{
            setSeconds(0)
            setMinutes(0)
        }
    }, [props.tenzies])

    React.useEffect(() => {
        localStorage.setItem("bestTime", JSON.stringify(bestTime))
    },[bestTime])

    function showTime(min, sec) {
        let showMinutes = min
        let showSeconds = sec%60
        if (showMinutes < 10){
            showMinutes = "0" + showMinutes
        }
        if (showSeconds < 10){
            showSeconds = "0" + showSeconds
        }
        return showMinutes + " : " + showSeconds
    }

    function calculateBestTime() {
        if(bestTime==="Not Recorded Yet"){
            setBestTime([minutes,seconds])
            console.log("test")
            return
        }

        if (bestTime[0] > minutes) {
            setBestTime([minutes,seconds])
            return
        }
        else if (bestTime[0] === minutes) {
            if (bestTime[1] >= seconds) {
                setBestTime([minutes,seconds])
            }
        }
    }

    function showBestTimeString() {
        if(bestTime==="Not Recorded Yet"){
            return bestTime
        }
        else {
            return showTime(bestTime[0], bestTime[1])
        }
    }
    
    return (
        <header>
            <h4>Rolls: <font color="blue" size="3">{props.rollCount}</font></h4>
            <h4>Time: <font color="red" size="3">{showTime(minutes, seconds)}</font></h4>
            <h4>Best Time: <font color="green" size="3">{showBestTimeString()}</font></h4>
        </header>
    )
}