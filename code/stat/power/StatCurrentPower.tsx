import * as React from "react";
import { Frame, addPropertyControls, ControlType } from "framer";
import { useGlobal, setGlobal } from "reactn";
import {
  metricStyle,
  labelStyle,
  statCardStyle,
  metricAccentStyle,
  metricAccentStyleLight,
  metricStyleLight,
  labelStyleLight
} from "../../Styles";
import { checkPropTypes } from "prop-types";

// Open Preview (CMD + P)
// API Reference: https://www.framer.com/api

addPropertyControls(StatCurrentPower, {
  theme: {
    type: ControlType.SegmentedEnum,
    defaultValue: "dark",
    options: ["dark", "light"],
    optionTitles: ["Dark", "Light"],
    title: "Theme"
  }
});

export function StatCurrentPower(props) {
  const [currentPowerArray, setCurrentPowerArray] = useGlobal("powerArray");

  let currentPower;

  if (currentPowerArray.length == 0) {
    currentPower = 0;
  } else {
    currentPower = currentPowerArray.slice(-1)[0];
  }

  return (
    <Frame style={statCardStyle} size={"100%"}>
      <h1 style={props.theme == "dark" ? metricStyle : metricStyleLight}>
        {currentPower}
      </h1>
      <span style={props.theme == "dark" ? labelStyle : labelStyleLight}>
        watts
      </span>
    </Frame>
  );
}
