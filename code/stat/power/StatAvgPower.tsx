import * as React from "react";
import * as _ from "lodash";
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

addPropertyControls(StatAvgPower, {
  theme: {
    type: ControlType.SegmentedEnum,
    defaultValue: "dark",
    options: ["dark", "light"],
    optionTitles: ["Dark", "Light"],
    title: "Theme"
  }
});

export function StatAvgPower(props) {
  const [currentPowerArray, setCurrentPowerArray] = useGlobal("powerArray");

  let avgPower: number;

  if (currentPowerArray.length == 0) {
    avgPower = 0;
  } else {
    avgPower = Math.round(_.mean(currentPowerArray));
  }

  return (
    <Frame style={statCardStyle} size={"100%"}>
      <h1 style={props.theme == "dark" ? metricStyle : metricStyleLight}>
        {avgPower}
      </h1>
      <span style={props.theme == "dark" ? labelStyle : labelStyleLight}>
        watts (Avg)
      </span>
    </Frame>
  );
}
