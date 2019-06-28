import { useGlobal } from "reactn";
import * as React from "react";
import { Frame, useAnimation, addPropertyControls, ControlType } from "framer";

addPropertyControls(ZoneHeartRate, {
  maxHeartRate: {
    type: ControlType.Number,
    defaultValue: 198,
    min: 0,
    max: 210,
    title: "❤️ Max"
  },
  zone1: { type: ControlType.Color, defaultValue: "#E6E6E8" },
  zone2: { type: ControlType.Color, defaultValue: "#1A3768" },
  zone3: { type: ControlType.Color, defaultValue: "#0796CE" },
  zone4: { type: ControlType.Color, defaultValue: "#38D948" },
  zone5: { type: ControlType.Color, defaultValue: "#FCEA00" }
});

const transition = {
  type: "spring",
  stiffness: 200,
  damping: 20
};

export function ZoneHeartRate(props) {
  const [currentHeartRateArray, setCurrentHeartRateArray] = useGlobal(
    "heartRateArray"
  );

  const [heartRateZone, setHeartRateZone] = React.useState("easy");

  const animation = useAnimation();
  const scaleAnimation = useAnimation();
  const scale2Animation = useAnimation();

  let currentHeartRate: number;

  if (currentHeartRateArray.length == 0) {
    currentHeartRate = 0;
  } else {
    currentHeartRate = currentHeartRateArray.slice(-1)[0];
  }

  let maxHeartRate = props.maxHeartRate;
  let easyMin = 0;
  let fatBurnMin = Math.round(maxHeartRate * 0.6);
  let cardioMin = Math.round(maxHeartRate * 0.7);
  let hardMin = Math.round(maxHeartRate * 0.78);
  let peakMin = Math.round(maxHeartRate * 0.89);

  let heartRateZones = {
    easy: easyMin,
    fatBurn: fatBurnMin,
    cardio: cardioMin,
    hard: hardMin,
    peak: peakMin
  };

  // React.useEffect(() => {
  //     setcurrentHeartRateArray([100, 200])
  // })

  let zoneBaseSize = props.width;
  let zoneBaseOuterRing = 100;
  let zoneSizeStep = 50;

  React.useEffect(() => {
    if (
      currentHeartRate > heartRateZones.fatBurn &&
      currentHeartRate < heartRateZones.cardio
    ) {
      setHeartRateZone("fat burn");

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
      currentHeartRate > heartRateZones.cardio &&
      currentHeartRate < heartRateZones.hard
    ) {
      setHeartRateZone("cardio");

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
      currentHeartRate > heartRateZones.hard &&
      currentHeartRate < heartRateZones.peak
    ) {
      setHeartRateZone("hard");

      scaleAnimation.start({
        background: props.zone4,
        size: zoneBaseSize + zoneSizeStep * 4
      });
      scale2Animation.start({
        background: props.zone4,
        size: zoneBaseSize + zoneSizeStep * 4 + zoneBaseOuterRing
      });
    } else if (currentHeartRate > heartRateZones.peak) {
      setHeartRateZone("peak");

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
    } else {
      setHeartRateZone("easy");

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
        size={zoneBaseSize}
        borderRadius={500}
        center
      />
      <Frame
        animate={scale2Animation}
        background={props.zone1}
        size={zoneBaseSize + zoneBaseOuterRing}
        opacity={0.2}
        borderRadius={500}
        center
      />
      <Frame style={cardStyle} background={"clear"} width={props.width} center>
        {/* <h4 style={labelStyle}>Heart rate zone</h4> */}
        <h1 style={metricStyle}>{heartRateZone}</h1>
        <span style={labelStyle}>Max: {props.maxHeartRate}</span>
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
  textWrap: "nowrap",
  opacity: 0.7,
  margin: 0,
  marginTop: "4px",
  color: "white",
  fontWeight: "400",
  textShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)"
};

const metricStyle = {
  fontSize: "24px",
  color: "white",
  fontWeight: "700",
  textShadow: "0px 1px 3px rgba(0, 0, 0, 0.3)",
  margin: 0
};
