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
    ftp: Number
}

addPropertyControls(ZonePower, {
    animationDuration: {
        type: ControlType.Number,
        defaultValue: 1,
        min: 0,
        max: 3,
        step: 0.1,
        displayStepper: true,
    },
    ftp: {
        type: ControlType.Number,
        defaultValue: 140,
        min: 0,
        max: 600,
        step: 5,
    },
    zone1: { type: ControlType.Color, defaultValue: "#E6E6E8" },
    zone2: { type: ControlType.Color, defaultValue: "#1A3768" },
    zone3: { type: ControlType.Color, defaultValue: "#0796CE" },
    zone4: { type: ControlType.Color, defaultValue: "#38D948" },
    zone5: { type: ControlType.Color, defaultValue: "#FCEA00" },
    zone6: { type: ControlType.Color, defaultValue: "#FB6402" },
})

ZonePower.defaultProps = {
    animationDuration: 1,
}

export function ZonePower(props) {
    const [currentPowerArray, setCurrentPowerArray] = useGlobal("powerArray")

    const [powerZone, setPowerZone] = React.useState("active recovery")

    const animation = useAnimation()

    let currentPower

    if (currentPowerArray.length == 0) {
        currentPower = 0
    } else {
        currentPower = currentPowerArray.slice(-1)[0]
    }

    let ftp = props.ftp
    let activeRecoveryMin = 0
    let aerobicThresholdMin = Math.round(ftp * 0.56)
    let tempoMin = Math.round(ftp * 0.76)
    let lactateThresholdMin = Math.round(ftp * 0.91)
    let aerobicCapacityMin = Math.round(ftp * 1.06)
    let anarobicCapacityMin = Math.round(ftp * 1.211)

    console.log(
        activeRecoveryMin,
        aerobicThresholdMin,
        tempoMin,
        lactateThresholdMin,
        aerobicCapacityMin,
        anarobicCapacityMin
    )

    let powerZones = {
        activeRecovery: activeRecoveryMin,
        aerobicThreshold: aerobicThresholdMin,
        tempo: tempoMin,
        lactateThreshold: lactateThresholdMin,
        aerobicCapacity: aerobicCapacityMin,
        anarobicCapacity: anarobicCapacityMin,
    }

    React.useEffect(() => {
        if (currentPower < powerZones.activeRecovery) {
            setPowerZone("active recovery")
            animation.start({
                background: props.zone1,
            })
        } else if (
            currentPower > powerZones.aerobicThreshold &&
            currentPower < powerZones.tempo
        ) {
            setPowerZone("aerobic threshold")
            animation.start({
                background: props.zone2,
            })
        } else if (
            currentPower > powerZones.tempo &&
            currentPower < powerZones.lactateThreshold
        ) {
            setPowerZone("tempo")
            animation.start({
                background: props.zone3,
            })
        } else if (
            currentPower > powerZones.lactateThreshold &&
            currentPower < powerZones.aerobicCapacity
        ) {
            setPowerZone("lactate threshold")
            animation.start({
                background: props.zone4,
            })
        } else if (
            currentPower > powerZones.aerobicCapacity &&
            currentPower < powerZones.anarobicCapacity
        ) {
            setPowerZone("aerobic capacity")
            animation.start({
                background: props.zone5,
            })
        } else if (currentPower > powerZones.anarobicCapacity) {
            setPowerZone("anarobic capacity")
            animation.start({
                background: props.zone6,
            })
        }
    })

    return (
        <Frame
            style={cardStyle}
            background={"#E6E6E8"}
            transition={{ duration: props.animationDuration }}
            animate={animation}
            size={"100%"}
        >
            <h4 style={labelStyle}>Power zone</h4>
            <h1 style={metricStyle}>{powerZone}</h1>
        </Frame>
    )
}

const cardStyle = {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
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
    fontWeight: "bold",
    textShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
    margin: 0,
}
