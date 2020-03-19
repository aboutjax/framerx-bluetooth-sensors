import { setGlobal, useGlobal } from "reactn"
import * as React from "react"
import * as _ from "lodash"
import { Frame } from "framer"

let heartRateArrayInit = []
let powerArrayInit = []

// Initialise with dummy data
let numberOfData = _.range(10)

numberOfData.map(() => {
    heartRateArrayInit = [...heartRateArrayInit, _.random(90, 100)]
    powerArrayInit = [...powerArrayInit, _.random(50, 300)]
})

setGlobal({
    heartRateArray: [],
    heartRateIsConnected: false,
    powerIsConnected: false,
    powerArray: [],
})

// Uncomment this for dummy data
// setGlobal({
//     heartRateArray: heartRateArrayInit,
//     powerArray: powerArrayInit,
//     powerIsConnected: true,
//     heartRateIsConnected: true,
// })

// // Simulator (TO-DO)
// export function Simulator(props) {
//     const [currentHeartRateArray, setCurrentHeartRateArray] = useGlobal(
//         "heartRateArray"
//     )

//     function getRandomInt(min, max) {
//         min = Math.ceil(min)
//         max = Math.floor(max)
//         return Math.floor(Math.random() * (max - min)) + min //The maximum is exclusive and the minimum is inclusive
//     }

//     React.useEffect(() => {
//         setInterval(() => {
//             currentHeartRateArray.push(getRandomInt(80, 100))
//             setCurrentHeartRateArray(currentHeartRateArray)
//         }, 1000)
//     }, [])

//     return <Frame size={"100%"}>Simulator</Frame>
// }
