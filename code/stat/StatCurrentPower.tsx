import * as React from "react"
import { Frame, useCycle } from "framer"
import { useGlobal, setGlobal } from "reactn"
import { metricStyle, labelStyle, statCardStyle } from "../Styles"

// Open Preview (CMD + P)
// API Reference: https://www.framer.com/api

export function StatCurrentPower() {
    const [currentPowerArray, setCurrentPowerArray] = useGlobal("powerArray")

    let currentPower

    if (currentPowerArray.length == 0) {
        currentPower = 0
    } else {
        currentPower = currentPowerArray.slice(-1)[0]
    }

    return (
        <Frame style={statCardStyle} size={"100%"}>
            <h1 style={metricStyle}>{currentPower}</h1>
            <span style={labelStyle}>watts</span>
        </Frame>
    )
}
