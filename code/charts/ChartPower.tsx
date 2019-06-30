import * as React from "react";
import { Frame, addPropertyControls, ControlType, Color } from "framer";
import { Line } from "react-chartjs-2";
import { useGlobal } from "reactn";

ChartPower.defaultProps = {
  color: Color("#EE4444"),
  fill: true,
  borderWidth: 1,
  showYAxes: false,
  showXAxes: false
};

addPropertyControls(ChartPower, {
  color: { type: ControlType.Color, title: "Color" },
  fill: { type: ControlType.Boolean, title: "Fill" },
  borderWidth: {
    type: ControlType.Number,
    title: "Border",
    defaultValue: 1,
    min: 0,
    max: 10,
    step: 0.5
  },
  showYAxes: {
    type: ControlType.SegmentedEnum,
    defaultValue: "show",
    options: ["show", "hide"],
    optionTitles: ["Show", "Hide"],
    title: "Y Axes"
  },
  YAxesPosition: {
    type: ControlType.SegmentedEnum,
    defaultValue: "left",
    options: ["left", "right"],
    optionTitles: ["Left", "Right"],
    title: "Position",
    hidden(props) {
      if (props.showYAxes == "hide") {
        return true;
      } else {
        return false;
      }
    }
  },
  showXAxes: {
    type: ControlType.SegmentedEnum,
    defaultValue: "show",
    options: ["show", "hide"],
    optionTitles: ["Show", "Hide"],
    title: "X Axes"
  }
});

export function ChartPower(props) {
  const [currentPowerArray, setCurrentPowerArray] = useGlobal("powerArray");
  let currentPower = currentPowerArray.slice(-1)[0];

  let chartBorderColor = Color(props.color);
  let chartBorderColorRgb = Color.toRgbString(chartBorderColor);
  let chartFillColor = Color.alpha(chartBorderColor, 0.3);
  let chartFillColorRgb = Color.toRgbString(chartFillColor);

  let chartFillGradientStep1 = Color.toRgbString(
    Color.alpha(chartBorderColor, 0.5)
  );
  let chartFillGradientStep2 = Color.toRgbString(
    Color.alpha(chartBorderColor, 0.4)
  );
  let chartFillGradientStep3 = Color.toRgbString(
    Color.alpha(chartBorderColor, 0.2)
  );

  let lineChartOptions = {
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    layout: {
      padding: { top: 20 }
    },
    scales: {
      yAxes: [
        {
          position: props.YAxesPosition,
          display: props.showYAxes == "show" ? true : false,
          gridLines: {
            display: false
          },
          ticks: {
            display: true,
            autoSkip: true,
            maxTicksLimit: 10,
            min: 0
          }
        }
      ],
      xAxes: [
        {
          display: props.showXAxes == "show" ? true : false,
          ticks: {
            display: false
          },
          gridLines: {
            display: false
          }
        }
      ]
    }
  };

  let data = canvas => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, props.height);
    gradient.addColorStop(0, chartFillGradientStep1);
    gradient.addColorStop(0.5, chartFillGradientStep2);
    gradient.addColorStop(1, chartFillGradientStep3);

    return {
      labels: [...currentPowerArray, currentPower],
      datasets: [
        {
          backgroundColor: gradient,
          fill: props.fill,
          pointRadius: 0,
          borderWidth: props.borderWidth,
          borderColor: chartBorderColorRgb,
          label: "Power",
          data: [...currentPowerArray, currentPower]
        }
      ]
    };
  };

  return (
    <Frame style={style} size={"100%"}>
      <Line data={data} options={lineChartOptions} />
    </Frame>
  );
}

const style = {
  backgroundColor: "clear",
  borderRadius: "6px"
};
