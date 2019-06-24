import { useGlobal } from "reactn"
import * as React from "react"
import { Frame } from "framer"
import { SvgIconBluetooth } from "../SvgIcons"

export function BluetoothPower() {
    const [currentPowerArray, setPowerArray] = useGlobal("powerArray")

    const [isLive, setIsLive] = React.useState(false)

    const requestBluetoothConnection = async () => {
        if (!navigator["bluetooth"]) {
            return
        }

        const device = await navigator["bluetooth"].requestDevice({
            filters: [{ services: ["cycling_power"] }],
        })

        const server = await device.gatt.connect()

        const service = await server.getPrimaryService("cycling_power")

        const characteristic = await service.getCharacteristic(
            "cycling_power_measurement"
        )

        async function startNotifications() {
            const notifications = await characteristic.startNotifications()
            return notifications
        }

        // Hide button after bluetooth connection is established
        startNotifications().then(() => {
            setIsLive(true)
        })

        await characteristic.addEventListener(
            "characteristicvaluechanged",
            event => {
                let value = event.target.value.getInt16(1)

                // Set heart rate array
                currentPowerArray.push(value)
                setPowerArray(currentPowerArray)

                console.log(value)
            }
        )
    }

    if (isLive) {
        return (
            <Frame opacity={0} size={"100%"} style={style} background={"green"}>
                Connect
            </Frame>
        )
    } else {
        return (
            <Frame
                size={"100%"}
                style={style}
                onTap={requestBluetoothConnection}
            >
                <SvgIconBluetooth color="#ffffff" />
                <h4>Connect Power Meter</h4>
            </Frame>
        )
    }
}

const style = {
    fontSize: "16px",
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#1199EE",
    boxShadow:
        "rgba(0, 0, 0, 0.05) 0px 1px 0px, rgba(0, 0, 0, 0.3) 0px 1px 2px, rgba(0, 0, 0, 0.05) 0px 5px 15px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
}
