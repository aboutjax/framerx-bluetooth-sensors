import { useGlobal } from "reactn";
import * as React from "react";
import { Frame, Color, addPropertyControls, ControlType } from "framer";
import { thumbBluetoothHeartPower } from "../thumbnails";
import { SvgIconBluetooth } from "../SvgIcons";

// ------------ Variants ---------------

const isConnectedVariants = {
  connected: {
    backgroundColor: Color("#0073FF"),
    transition: {
      duration: 0.3,
      backgroundColor: {
        duration: 0.3
      }
    }
  },
  disconnected: {
    backgroundColor: Color("#d7d7d7"),
    transition: {
      duration: 1
    }
  }
};

const isConnectedPulseVariants = {
  connected: {
    scale: 2,
    opacity: 0,
    backgroundColor: Color("#9FD5FF"),
    transition: {
      scale: {
        duration: 1.2,
        ease: "easeOut",
        loop: Infinity
      },
      opacity: {
        duration: 1.2,
        ease: "easeOut",
        loop: Infinity
      }
    }
  },
  disconnected: {
    scale: 1,
    opacity: 1,
    backgroundColor: Color("#9FD5FF")
  }
};

addPropertyControls(BluetoothHeartRate, {
  instruction: {
    type: ControlType.String,
    defaultValue: "Tap to connect"
  }
});

// ------------ Bluetooth Component ---------------

export function BluetoothHeartRate(props) {
  // Listen to global state of heart rate array
  const [currentHeartRateArray, setHeartRateArray] = useGlobal(
    "heartRateArray"
  );

  // Listen to global state of whether bluetooth heart rate monitor is connecte
  const [heartRateIsConnected, setHeartRateIsConnected] = useGlobal(
    "heartRateIsConnected"
  );

  // Async function for requesting web bluetooth connection.
  // Note: This function must be trigger by user gesture.
  // Please refer to https://developers.google.com/web/updates/2015/07/interact-with-ble-devices-on-the-web
  const requestBluetoothConnection = async () => {
    if (!navigator["bluetooth"]) {
      return;
    }

    const device = await navigator["bluetooth"].requestDevice({
      filters: [{ services: ["heart_rate"] }]
    });

    const server = await device.gatt.connect();

    const service = await server.getPrimaryService("heart_rate");

    const characteristic = await service.getCharacteristic(
      "heart_rate_measurement"
    );

    async function startNotifications() {
      const notifications = await characteristic.startNotifications();
      return notifications;
    }

    startNotifications().then(() => {
      setHeartRateIsConnected(true);
    });

    await characteristic.addEventListener(
      "characteristicvaluechanged",
      event => {
        // Refer to https://www.bluetooth.com/specifications/gatt/characteristics/
        let value = event.target.value.getUint8(1);

        // set heart rate array
        currentHeartRateArray.push(value);
        setHeartRateArray(currentHeartRateArray);
      }
    );
  };
  return (
    <Frame
      size={"100%"}
      style={style}
      borderRadius={props.height < 100 && props.width < 100 ? 100 : 24}
      onTap={requestBluetoothConnection}
    >
      <Frame
        size={24}
        borderRadius={24}
        left={props.height < 100 && props.width < 100 ? 16 : 24}
        top={props.height < 100 && props.width < 100 ? 16 : 24}
        variants={isConnectedPulseVariants}
        animate={heartRateIsConnected ? "connected" : "disconnected"}
      />
      <Frame
        size={24}
        borderRadius={24}
        border={"1px solid rgba(0, 0, 0, 0.1)"}
        left={props.height < 100 && props.width < 100 ? 16 : 24}
        top={props.height < 100 && props.width < 100 ? 16 : 24}
        variants={isConnectedVariants}
        animate={heartRateIsConnected ? "connected" : "disconnected"}
        initial="disconnected"
      />
      <Frame
        size={24}
        scale={0.7}
        background={"clear"}
        left={props.height < 100 && props.width < 100 ? 16 : 24}
        top={props.height < 100 && props.width < 100 ? 16 : 24}
      >
        <SvgIconBluetooth color={heartRateIsConnected ? "#FFF" : "#9e9e9e"} />
      </Frame>
      <div
        style={
          props.height < 100 && props.width < 100
            ? labelContainerHideStyle
            : labelContainerStyle
        }
      >
        <h2 style={headerStyle}>Heart rate</h2>

        {heartRateIsConnected ? (
          <h4 style={subHeaderStyleActive}>Connected</h4>
        ) : (
          <h4 style={subHeaderStyle}>{props.instruction}</h4>
        )}
      </div>
    </Frame>
  );
}

const style = {
  fontSize: "20px",
  fontWeight: "bold",
  backgroundImage:
    "linear-gradient(180deg, #FFFFFF 1%, #FFFFFF 74%, #F5F5F5 100%)",
  boxShadow:
    "rgba(0, 0, 0, 0.05) 0px 1px 0px, rgba(0, 0, 0, 0.3) 0px 1px 2px, rgba(0, 0, 0, 0.05) 0px 5px 15px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
};

const headerStyle = {
  margin: "0",
  color: "black",
  fontWeight: "600",
  fontSize: "24px"
};

const subHeaderStyle = {
  margin: "0",
  marginTop: "4px",
  color: "black",
  fontWeight: "400",
  fontSize: "20px",
  opacity: 0.5
};

const subHeaderStyleActive = {
  color: "#0073FF",
  margin: "0",
  marginTop: "4px",
  fontWeight: "400",
  fontSize: "20px",
  opacity: 1
};

const labelContainerStyle = {
  textAlign: "center"
};

const labelContainerHideStyle = {
  display: "none"
};
