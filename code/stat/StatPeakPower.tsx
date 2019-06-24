import * as React from "react"
import { Frame, useCycle } from "framer"
import { useGlobal, setGlobal } from "reactn"
import { metricStyle, labelStyle, statCardStyle } from "../Styles"

// Open Preview (CMD + P)
// API Reference: https://www.framer.com/api

export function StatPeakPower() {
    const [currentPowerArray, setCurrentPowerArray] = useGlobal("powerArray")

    let highestData

    if (currentPowerArray.length == 0) {
        highestData = 0
    } else {
        highestData = Math.max(...currentPowerArray)
    }

    return (
        <Frame style={statCardStyle} size={"100%"}>
            <h4 style={labelStyle}>Peak power</h4>
            <h1 style={metricStyle}>{highestData}</h1>
        </Frame>
    )
}
