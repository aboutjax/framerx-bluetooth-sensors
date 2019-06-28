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

export function StatPeakPower(props) {
  const [currentPowerArray, setCurrentPowerArray] = useGlobal("powerArray");

  let highestData;

  if (currentPowerArray.length == 0) {
    highestData = 0;
  } else {
    highestData = Math.max(...currentPowerArray);
  }

  return (
    <Frame style={statCardStyle} size={"100%"}>
      <h1 style={props.theme == "dark" ? metricStyle : metricStyleLight}>
        {highestData}
      </h1>
      <span style={props.theme == "dark" ? labelStyle : labelStyleLight}>
        Peak power
      </span>
    </Frame>
  );
}

addPropertyControls(StatPeakPower, {
  theme: {
    type: ControlType.SegmentedEnum,
    defaultValue: "dark",
    options: ["dark", "light"],
    optionTitles: ["Dark", "Light"],
    title: "Theme"
  }
});
