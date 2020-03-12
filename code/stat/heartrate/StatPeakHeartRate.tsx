import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"
import { useGlobal } from "reactn"
import {
    metricStyle,
    labelStyle,
    statCardStyle,
    metricAccentStyle,
    metricStyleLight,
    labelStyleLight,
} from "../../Styles"
// Open Preview (CMD + P)
// API Reference: https://www.framer.com/api

export function StatPeakHeartRate(props) {
    const [heartRateArray] = useGlobal("heartRateArray")

    let peakHeartRate

    if (heartRateArray.length == 0) {
        peakHeartRate = 0
    } else {
        peakHeartRate = Math.max(...heartRateArray)
    }

    return (
        <Frame style={statCardStyle} size={"100%"}>
            <h1 style={props.theme == "dark" ? metricStyle : metricStyleLight}>
                {peakHeartRate}
            </h1>
            <span style={props.theme == "dark" ? labelStyle : labelStyleLight}>
                bpm (peak)
            </span>
        </Frame>
    )
}

addPropertyControls(StatPeakHeartRate, {
    theme: {
        type: ControlType.SegmentedEnum,
        defaultValue: "dark",
        options: ["dark", "light"],
        optionTitles: ["Dark", "Light"],
        title: "Theme",
    },
})
