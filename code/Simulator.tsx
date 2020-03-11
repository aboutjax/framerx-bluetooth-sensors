import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"
import { useGlobal } from "reactn"

// Open Preview: Command + P
// Learn more: https://framer.com/api

export function Simulator(props) {
    const [currentHeartRateArray, setCurrentHeartRateArray] = useGlobal(
        "heartRateArray"
    )

    function getRandomInt(min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min)) + min //The maximum is exclusive and the minimum is inclusive
    }

    React.useEffect(() => {
        setInterval(() => {
            currentHeartRateArray.push(getRandomInt(80, 100))
            setCurrentHeartRateArray(currentHeartRateArray)
        }, 1000)
    }, [])

    return <Frame size={"100%"}>Simulator</Frame>
}
