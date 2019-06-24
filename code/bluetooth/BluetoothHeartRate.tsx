import { useGlobal } from "reactn"
import * as React from "react"
import { Frame } from "framer"
import { SvgIconBluetooth } from "../SvgIcons"

export function BluetoothHeartRate() {
    const [currentHeartRateArray, setHeartRateArray] = useGlobal(
        "heartRateArray"
    )

    const [isLive, setIsLive] = React.useState(false)

    const requestBluetoothConnection = async () => {
        if (!navigator["bluetooth"]) {
            return
        }

        navigator.bluetooth
            .requestDevice({ filters: [{ services: ["heart_rate"] }] })
            .then(device => {
                return device.gatt.connect()
            })
            .then(server => {
                return server.getPrimaryService("heart_rate")
            })
            .then(service => {
                console.log("service")
                return service.getCharacteristic("heart_rate_measurement")
            })
            .then(characteristic => characteristic.startNotifications())
            .then(characteristic => {
                characteristic.addEventListener(
                    "characteristicvaluechanged",
                    event => {
                        let value = event.target.value.getUint8(1)
                        // Set heart rate array
                        currentHeartRateArray.push(value)
                        setHeartRateArray(currentHeartRateArray)
                    }
                )

                // Set isLive to true to hide connect button
                setIsLive(true)
            })
            .catch(error => {
                console.log(error)
            })

        // const device = await navigator["bluetooth"].requestDevice({
        //     filters: [{ services: ["heart_rate"] }],
        // })

        // const server = await device.gatt.connect()

        // const service = await server.getPrimaryService("heart_rate")

        // const characteristic = await service.getCharacteristic(
        //     "heart_rate_measurement"
        // )

        // const notifications = await characteristic.startNotifications()

        // await characteristic.addEventListener(
        //     "characteristicvaluechanged",
        //     event => {
        //         let value = event.target.value.getUint8(1)

        //         setIsLive(true)

        //         // Print this value out
        //         // console.log(value)

        //         // Save this value to a global state
        //         // setHeartRate(value)

        // // Set heart rate array
        // currentHeartRateArray.push(value)
        // setHeartRateArray(currentHeartRateArray)

        //         // Set chart data
        //         // let updatedChartData = {
        //         //     labels: currentHeartRateArray,
        //         //     datasets: [
        //         //         {
        //         //             backgroundColor: "rgba(245, 35, 35, 0.50)",
        //         //             pointRadius: 0,
        //         //             borderWidth: 2,
        //         //             borderColor: "rgba(245, 35, 35, 1)",
        //         //             label: "Heart Rate",
        //         //             data: currentHeartRateArray,
        //         //         },
        //         //     ],
        //         // }
        //         // setChartData(updatedChartData)
        //     }
        // )
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
                <h4>Connect Heart Rate Monitor</h4>
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
