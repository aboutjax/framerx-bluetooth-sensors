import { useGlobal, setGlobal } from "reactn"
import * as React from "react"
import {
    Frame,
    useCycle,
    Color,
    useAnimation,
    addPropertyControls,
    ControlType,
} from "framer"

// Open Preview (CMD + P)
// API Reference: https://www.framer.com/api

interface Props {
    animationDuration: Number
}

addPropertyControls(ZoneHeartRate, {
    animationDuration: {
        type: ControlType.Number,
        defaultValue: 1,
        min: 0,
        max: 3,
        step: 0.1,
        displayStepper: true,
    },
    maxHeartRate: {
        type: ControlType.Number,
        defaultValue: 198,
        min: 0,
        max: 210,
    },
    zone1: { type: ControlType.Color, defaultValue: "#E6E6E8" },
    zone2: { type: ControlType.Color, defaultValue: "#1A3768" },
    zone3: { type: ControlType.Color, defaultValue: "#0796CE" },
    zone4: { type: ControlType.Color, defaultValue: "#38D948" },
    zone5: { type: ControlType.Color, defaultValue: "#FCEA00" },
})

ZoneHeartRate.defaultProps = {
    animationDuration: 1,
    maxHeartRate: 200,
}

export function ZoneHeartRate(props) {
    const [currentHeartRateArray, setCurrentHeartRateArray] = useGlobal(
        "heartRateArray"
    )

    const [heartRateZone, setHeartRateZone] = React.useState("easy")

    const animation = useAnimation()
    let currentHeartRate

    if (currentHeartRateArray.length == 0) {
        currentHeartRate = 0
    } else {
        currentHeartRate = currentHeartRateArray.slice(-1)[0]
    }

    let maxHeartRate = props.maxHeartRate
    let easyMin = 0
    let fatBurnMin = Math.round(maxHeartRate * 0.6)
    let cardioMin = Math.round(maxHeartRate * 0.7)
    let hardMin = Math.round(maxHeartRate * 0.78)
    let peakMin = Math.round(maxHeartRate * 0.89)

    let heartRateZones = {
        easy: easyMin,
        fatBurn: fatBurnMin,
        cardio: cardioMin,
        hard: hardMin,
        peak: peakMin,
    }

    React.useEffect(() => {
        if (currentHeartRate < heartRateZones.fatBurn) {
            setHeartRateZone("easy")
            animation.start({
                background: props.zone1,
            })
            // setHeartRateZoneColor(Color("blue"))
        } else if (
            currentHeartRate > heartRateZones.fatBurn &&
            currentHeartRate < heartRateZones.cardio
        ) {
            setHeartRateZone("fat burn")
            animation.start({
                background: props.zone2,
            })
            // setHeartRateZoneColor(Color("red"))
        } else if (
            currentHeartRate > heartRateZones.cardio &&
            currentHeartRate < heartRateZones.hard
        ) {
            setHeartRateZone("cardio")
            animation.start({
                background: props.zone3,
            })
            // setHeartRateZoneColor(Color("green"))
        } else if (
            currentHeartRate > heartRateZones.hard &&
            currentHeartRate < heartRateZones.peak
        ) {
            setHeartRateZone("hard")
            animation.start({
                background: props.zone4,
            })
            // setHeartRateZoneColor(Color("purple"))
        } else if (currentHeartRate > heartRateZones.peak) {
            setHeartRateZone("peak")
            animation.start({
                background: props.zone5,
            })
            // setHeartRateZoneColor(Color("cyan"))
        }

        // backgroundHexString = Color.toHexString(heartRateZoneBackground)
    })

    return (
        <Frame
            style={cardStyle}
            background={"#0098CE"}
            transition={{ duration: props.animationDuration }}
            animate={animation}
            size={"100%"}
        >
            <h4 style={labelStyle}>Heart rate zone</h4>
            <h1 style={metricStyle}>{heartRateZone}</h1>
        </Frame>
    )
}

const cardStyle = {
    textAlign: "center",
    borderRadius: "6px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
}

const labelStyle = {
    fontSize: "16px",
    opacity: 0.7,
    margin: 0,
    color: "white",
    textShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
}

const metricStyle = {
    fontSize: "34px",
    color: "white",
    textShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
    fontWeight: "bold",
    margin: 0,
    marginBottom: '3em',
}
