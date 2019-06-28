import * as React from "react";
import { Frame, addPropertyControls, ControlType, Color } from "framer";
import { Line } from "react-chartjs-2";
import { useGlobal } from "reactn";

ChartPowerStream.defaultProps = {
  color: Color("#EE4444"),
  fill: true,
  showYAxes: false,
  showXAxes: false,
  borderwidth: 1
};

addPropertyControls(ChartPowerStream, {
  color: { type: ControlType.Color, title: "Color" },
  fill: { type: ControlType.Boolean, title: "Fill Area" },
  borderWidth: {
    type: ControlType.Number,
    title: "Border Width",
    defaultValue: 1,
    min: 0,
    max: 10,
    step: 0.5
  },
  showYAxes: { type: ControlType.Boolean, title: "Show Y Axes" },
  YAxesPosition: {
    type: ControlType.SegmentedEnum,
    defaultValue: "left",
    options: ["left", "right"],
    optionTitles: ["Left", "Right"],
    title: "Y Axes position"
  },
  showXAxes: { type: ControlType.Boolean, title: "Show X Axes" }
});

export function ChartPowerStream(props) {
  const [currentPowerArray, setCurrentPowerArray] = useGlobal("powerArray");
  let currentPower = currentPowerArray.slice(-1)[0];

  let streamPowerArray = currentPowerArray.slice(-10, -1);

  // React.useEffect(() => {

  //     setCurrentPowerArray([200, 500, 60, 40, 200, 100, 600, 60, 100, 200, 100, 800, 500])
  // })

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
          display: props.showYAxes,
          gridLines: {
            display: false
          },
          ticks: {
            display: true,
            // autoSkip: true,
            autoSkipPadding: 50,
            maxTicksLimit: 10,
            min: 0
            // max: 2000,
          }
        }
      ],
      xAxes: [
        {
          display: props.ShowXAxes,
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
      labels: streamPowerArray,
      datasets: [
        {
          backgroundColor: gradient,
          fill: props.fill,
          pointRadius: 0,
          borderWidth: props.borderWidth,
          borderColor: chartBorderColorRgb,
          label: "Power",
          data: streamPowerArray
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
