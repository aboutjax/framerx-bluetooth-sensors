import * as React from "react"
import { Frame, useCycle } from "framer"
import { useGlobal, setGlobal } from "reactn"
import { metricStyle, labelStyle, statCardStyle } from "../Styles"

// Open Preview (CMD + P)
// API Reference: https://www.framer.com/api

export function StatPeakHeartRate() {
    const [currentHeartRateArray, setCurrentHeartRateArray] = useGlobal(
        "heartRateArray"
    )

    let highestData

    if (currentHeartRateArray.length == 0) {
        highestData = 0
    } else {
        highestData = Math.max(...currentHeartRateArray)
    }

    return (
        <Frame style={statCardStyle} size={"100%"}>
            <h1 style={metricStyle}>{highestData}</h1>
            <span style={labelStyle}>bpm</span>
        </Frame>
    )
}
