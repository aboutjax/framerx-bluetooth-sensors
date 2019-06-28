import * as React from "react";
import { Frame, addPropertyControls, ControlType } from "framer";
import { useGlobal } from "reactn";
import {
  metricStyle,
  labelStyle,
  statCardStyle,
  metricAccentStyle,
  metricStyleLight,
  labelStyleLight
} from "../../Styles";
// Open Preview (CMD + P)
// API Reference: https://www.framer.com/api

export function StatPeakHeartRate(props) {
  const [currentHeartRateArray, setCurrentHeartRateArray] = useGlobal(
    "heartRateArray"
  );

  let highestData;

  if (currentHeartRateArray.length == 0) {
    highestData = 0;
  } else {
    highestData = Math.max(...currentHeartRateArray);
  }

  return (
    <Frame style={statCardStyle} size={"100%"}>
      <h1 style={props.theme == "dark" ? metricStyle : metricStyleLight}>
        {highestData}
      </h1>
      <span style={props.theme == "dark" ? labelStyle : labelStyleLight}>
        bpm (peak)
      </span>
    </Frame>
  );
}

addPropertyControls(StatPeakHeartRate, {
  theme: {
    type: ControlType.SegmentedEnum,
    defaultValue: "dark",
    options: ["dark", "light"],
    optionTitles: ["Dark", "Light"],
    title: "Theme"
  }
});
