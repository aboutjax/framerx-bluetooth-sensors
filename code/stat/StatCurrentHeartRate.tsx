import * as React from "react"
import { Frame, useCycle } from "framer"
import { useGlobal, setGlobal } from "reactn"
import { metricStyle, labelStyle, statCardStyle } from "../Styles"

// Open Preview (CMD + P)
// API Reference: https://www.framer.com/api

export function StatCurrentHeartRate() {
    const [currentHeartRateArray] = useGlobal(
        "heartRateArray"
    )

    let currentHeartRate

    if (currentHeartRateArray.length == 0) {
        currentHeartRate = 0
    } else {
        currentHeartRate = currentHeartRateArray.slice(-1)[0]
    }

    return (
        <Frame style={statCardStyle} size={"100%"}>
            <h1 style={metricStyle}>{currentHeartRate}</h1>
            <span style={labelStyle}>bpm</span>
        </Frame>
    )
}
