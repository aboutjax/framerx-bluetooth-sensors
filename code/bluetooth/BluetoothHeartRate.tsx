import { useGlobal } from "reactn";
import * as React from "react";
import { Frame } from "framer";
import { SvgIconBluetooth } from "../SvgIcons";

export function BluetoothHeartRate() {
  const [currentHeartRateArray, setHeartRateArray] = useGlobal(
    "heartRateArray"
  );

  const [isLive, setIsLive] = React.useState(false);

  const requestBluetoothConnection = async () => {
    if (!navigator["bluetooth"]) {
      return;
    }

    const device = await navigator["bluetooth"].requestDevice({
      filters: [{ services: ["cycling_power"] }]
    });

    const server = await device.gatt.connect();

    const service = await server.getPrimaryService("cycling_power");

    const characteristic = await service.getCharacteristic(
      "cycing_power_measurement"
    );

    async function startNotifications() {
      const notifications = await characteristic.startNotifications();
      return notifications;
    }

    startNotifications().then(() => {
      setIsLive(true);
    });

    await characteristic.addEventListener(
      "characteristicvaluechanged",
      event => {
        let value = event.target.value.getUint8(1);

        // set heart rate array
        // currentHeartRateArray.push(value)
        setHeartRateArray([[...currentHeartRateArray, value]]);
      }
    );
  };

  if (isLive) {
    return (
      <Frame opacity={0} size={"100%"} style={style} background={"green"}>
        Connect
      </Frame>
    );
  } else {
    return (
      <Frame size={"100%"} style={style} onTap={requestBluetoothConnection}>
        <SvgIconBluetooth color="#ffffff" />
        <h4>Connect Heart Rate Monitor</h4>
      </Frame>
    );
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
  alignItems: "center"
};
