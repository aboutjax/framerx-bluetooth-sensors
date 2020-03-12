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

addPropertyControls(StatCurrentHeartRate, {
    theme: {
        type: ControlType.SegmentedEnum,
        defaultValue: "dark",
        options: ["dark", "light"],
        optionTitles: ["Dark", "Light"],
        title: "Theme",
    },
})

export function StatCurrentHeartRate(props) {
    const [heartRateArray] = useGlobal("heartRateArray")

    let currentHeartRate

    if (heartRateArray.length == 0) {
        currentHeartRate = 0
    } else {
        currentHeartRate = heartRateArray.slice(-1)[0]
    }

    return (
        <Frame style={statCardStyle} size={"100%"}>
            <h1 style={props.theme == "dark" ? metricStyle : metricStyleLight}>
                {currentHeartRate}
            </h1>
            <span style={props.theme == "dark" ? labelStyle : labelStyleLight}>
                bpm
            </span>
        </Frame>
    )
}
