import React from "react"

export default function Header(props) {
    const [minutes, setMinutes] = React.useState(0);
    const [seconds, setSeconds] = React.useState(0);
    const [bestTime, setBestTime] = React.useState(localStorage.getItem("bestTime")||{minutes: 99,seconds: 99})

    React.useEffect(
            () => {
                if (props.tenzies) {
                    getBestTime()
                    return;
                }

                const timer = () => {
                    setSeconds(seconds + 1);
                }

                if (seconds%60 >= 59) {
                    setMinutes(minutes => minutes+1)
                }

                const id = setInterval(timer, 1000);
                return () => clearInterval(id);
            },
            [seconds]
        );

    function showTime() {
        let showMinutes = minutes
        let showSeconds = seconds
        if (minutes < 10){
            showMinutes = "0" + minutes
        }
        if (seconds < 10){
            showSeconds = "0" + seconds
        }
        return showMinutes + " : " + showSeconds
    }

    function getBestTime() {

        setBestTime({
            minutes:minutes,
            seconds:seconds
        })

        // setBestTime({
        //     minutes:minutes,
        //     seconds:seconds
        // })
        // if (bestTime.minutes > minutes) {
        //     setBestTime({
        //         minutes:minutes,
        //         seconds:seconds
        //     })
        // }
        // else if (bestTime.minutes = minutes) {
        //     if (bestTime.seconds >= seconds) {
        //         setBestTime({
        //             minutes:minutes,
        //             seconds:seconds
        //         })
        //     }
        // }
    }

    console.log(bestTime)

    React.useEffect(() => {
        localStorage.setItem("bestTime", bestTime)
    },[bestTime])

    return (
        <header>
            <h4>Rolls: <font color="blue" size="3">{props.rollCount}</font></h4>
            <h4>Time: <font color="red" size="3">{showTime()}</font></h4>
            <h4>Best Time: <font color="green" size="3">{bestTime}</font></h4>
        </header>
    )
}