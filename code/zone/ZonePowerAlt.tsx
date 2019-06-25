import { useGlobal, setGlobal } from "reactn";
import * as React from "react";
import {
  Frame,
  useCycle,
  Color,
  useAnimation,
  addPropertyControls,
  ControlType
} from "framer";

// Open Preview (CMD + P)
// API Reference: https://www.framer.com/api

interface Props {
  animationDuration: Number;
  ftp: Number;
}

addPropertyControls(ZonePowerAlt, {
  animationDuration: {
    type: ControlType.Number,
    defaultValue: 1,
    min: 0,
    max: 3,
    step: 0.1,
    displayStepper: true
  },
  ftp: {
    type: ControlType.Number,
    defaultValue: 140,
    min: 0,
    max: 600,
    step: 5
  },
  zone1: { type: ControlType.Color, defaultValue: "#E6E6E8" },
  zone2: { type: ControlType.Color, defaultValue: "#1A3768" },
  zone3: { type: ControlType.Color, defaultValue: "#0796CE" },
  zone4: { type: ControlType.Color, defaultValue: "#38D948" },
  zone5: { type: ControlType.Color, defaultValue: "#FCEA00" },
  zone6: { type: ControlType.Color, defaultValue: "#FB6402" }
});

ZonePowerAlt.defaultProps = {
  animationDuration: 1
};

const transition = {
  type: "spring",
  stiffness: 200,
  damping: 20
};

export function ZonePowerAlt(props) {
  const [currentPowerArray, setCurrentPowerArray] = useGlobal("powerArray");

  const [powerZone, setPowerZone] = React.useState("active recovery");

  const animation = useAnimation();
  const scaleAnimation = useAnimation();
  const scale2Animation = useAnimation();

  let currentPower;

  if (currentPowerArray.length == 0) {
    currentPower = 0;
  } else {
    currentPower = currentPowerArray.slice(-1)[0];
  }

  let ftp = props.ftp;
  let activeRecoveryMin = 0;
  let aerobicThresholdMin = Math.round(ftp * 0.56);
  let tempoMin = Math.round(ftp * 0.76);
  let lactateThresholdMin = Math.round(ftp * 0.91);
  let aerobicCapacityMin = Math.round(ftp * 1.06);
  let anarobicCapacityMin = Math.round(ftp * 1.211);

  console.log(
    activeRecoveryMin,
    aerobicThresholdMin,
    tempoMin,
    lactateThresholdMin,
    aerobicCapacityMin,
    anarobicCapacityMin
  );

  let powerZones = {
    activeRecovery: activeRecoveryMin,
    aerobicThreshold: aerobicThresholdMin,
    tempo: tempoMin,
    lactateThreshold: lactateThresholdMin,
    aerobicCapacity: aerobicCapacityMin,
    anarobicCapacity: anarobicCapacityMin
  };

  // React.useEffect(() => {
  //     setCurrentPowerArray([100, 200])
  // })

  let zoneBaseSize = 400;
  let zoneBaseOuterRing = 100;
  let zoneSizeStep = 50;

  React.useEffect(() => {
    if (
      currentPower > powerZones.aerobicThreshold &&
      currentPower < powerZones.tempo
    ) {
      setPowerZone("aerobic threshold");

      scaleAnimation.start({
        background: props.zone2,
        size: zoneBaseSize + zoneSizeStep * 2,
        transition: transition
      });
      scale2Animation.start({
        background: props.zone2,
        size: zoneBaseSize + zoneSizeStep * 2 + zoneBaseOuterRing,
        transition: transition
      });
    } else if (
      currentPower > powerZones.tempo &&
      currentPower < powerZones.lactateThreshold
    ) {
      setPowerZone("tempo");

      scaleAnimation.start({
        background: props.zone3,
        size: zoneBaseSize + zoneSizeStep * 3,
        transition: transition
      });
      scale2Animation.start({
        background: props.zone3,
        size: zoneBaseSize + zoneSizeStep * 3 + zoneBaseOuterRing,
        transition: transition
      });
    } else if (
      currentPower > powerZones.lactateThreshold &&
      currentPower < powerZones.aerobicCapacity
    ) {
      setPowerZone("lactate threshold");

      scaleAnimation.start({
        background: props.zone4,
        size: zoneBaseSize + zoneSizeStep * 4
      });
      scale2Animation.start({
        background: props.zone4,
        size: zoneBaseSize + zoneSizeStep * 4 + zoneBaseOuterRing
      });
    } else if (
      currentPower > powerZones.aerobicCapacity &&
      currentPower < powerZones.anarobicCapacity
    ) {
      setPowerZone("aerobic capacity");

      scaleAnimation.start({
        background: props.zone5,
        size: zoneBaseSize + zoneSizeStep * 5,
        transition: transition
      });
      scale2Animation.start({
        background: props.zone5,
        size: zoneBaseSize + zoneSizeStep * 5 + zoneBaseOuterRing,
        transition: transition
      });
    } else if (currentPower > powerZones.anarobicCapacity) {
      setPowerZone("anarobic capacity");

      scaleAnimation.start({
        background: props.zone6,
        size: zoneBaseSize + zoneSizeStep * 6,
        transition: transition
      });
      scale2Animation.start({
        background: props.zone6,
        size: zoneBaseSize + zoneSizeStep * 6 + zoneBaseOuterRing,
        transition: transition
      });
    } else {
      setPowerZone("active recovery");

      scaleAnimation.start({
        background: props.zone1,
        size: zoneBaseSize,
        transition: transition
      });

      scale2Animation.start({
        background: props.zone1,
        size: zoneBaseSize + zoneBaseOuterRing,
        transition: transition
      });
    }
  });

  return (
    <Frame
      background={"clear"}
      transition={transition}
      animate={animation}
      size={"100%"}
    >
      <Frame
        animate={scaleAnimation}
        background={props.zone1}
        size={100}
        borderRadius={500}
        center
      />
      <Frame
        animate={scale2Animation}
        background={props.zone1}
        size={150}
        opacity={0.2}
        borderRadius={500}
        center
      />
      <Frame style={cardStyle} background={"clear"} width={props.width} center>
        <h4 style={labelStyle}>Power zone</h4>
        <h1 style={metricStyle}>{powerZone}</h1>
      </Frame>
    </Frame>
  );
}

const cardStyle = {
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center"
};

const labelStyle = {
  fontSize: "16px",
  opacity: 0.7,
  margin: 0,
  color: "white",
  fontWeight: "400",
  textShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)"
};

const metricStyle = {
  fontSize: "30px",
  color: "white",
  fontWeight: "700",
  textShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
  margin: 0
};
