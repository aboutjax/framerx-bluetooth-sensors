import * as React from "react";
import { Frame, addPropertyControls, ControlType } from "framer";
import { useGlobal } from "reactn";
import {
  metricStyle,
  labelStyle,
  statCardStyle,
  metricStyleLight,
  labelStyleLight
} from "../../Styles";

export function StatAvgHeartRate(props) {
  const [currentHeartRateArray, setCurrentHeartRateArray] = useGlobal(
    "heartRateArray"
  );

  let avgHeartRate: number;

  if (currentHeartRateArray.length == 0) {
    avgHeartRate = 0;
  } else {
    avgHeartRate = Math.round(_.mean(currentHeartRateArray));
  }

  return (
    <Frame style={statCardStyle} size={"100%"}>
      <h1 style={props.theme == "dark" ? metricStyle : metricStyleLight}>
        {avgHeartRate}
      </h1>
      <span style={props.theme == "dark" ? labelStyle : labelStyleLight}>
        bpm (avg)
      </span>
    </Frame>
  );
}

addPropertyControls(StatAvgHeartRate, {
  theme: {
    type: ControlType.SegmentedEnum,
    defaultValue: "dark",
    options: ["dark", "light"],
    optionTitles: ["Dark", "Light"],
    title: "Theme"
  }
});
