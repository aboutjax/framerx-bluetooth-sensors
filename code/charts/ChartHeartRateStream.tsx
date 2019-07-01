import * as React from "react";
import { Frame, addPropertyControls, ControlType, Color } from "framer";
import { Line } from "react-chartjs-2";
import { useGlobal } from "reactn";

ChartHeartRateStream.defaultProps = {
  color: Color("#EE4444"),
  fill: true,
  ShowYAxes: false,
  ShowXAxes: false,
  borderWidth: 1
};

addPropertyControls(ChartHeartRateStream, {
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

export function ChartHeartRateStream(props) {
  const [currentHeartRateArray, setCurrentHeartRateArray] = useGlobal(
    "heartRateArray"
  );

  let streamHeartRateArray = currentHeartRateArray.slice(-10, -1);

  // Temporary set mock data for heart rate array

  //   React.useEffect(() => {
  //     setCurrentHeartRateArray([60, 40, 100, 60, 60, 60, 100, 60]);
  //   });

  let currentHeartRate = currentHeartRateArray.slice(-1)[0];

  let chartBorderColor = Color(props.color);
  let chartBorderColorRgb = Color.toRgbString(chartBorderColor);
  let chartFillColor = Color.alpha(chartBorderColor, 0.6);
  let chartFillColorRgb = Color.toRgbString(chartFillColor);

  let chartFillGradientStep1 = Color.toRgbString(
    Color.alpha(chartBorderColor, 0.5)
  );
  let chartFillGradientStep2 = Color.toRgbString(
    Color.alpha(chartBorderColor, 0.4)
  );
  let chartFillGradientStep3 = Color.toRgbString(
    Color.alpha(chartBorderColor, 0.1)
  );

  let lineChartOptions = {
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    layout: {
      padding: {
        top: 20
      }
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
            // max: 200,
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
      labels: streamHeartRateArray,
      datasets: [
        {
          backgroundColor: gradient,
          fill: props.fill,
          pointRadius: 0,
          borderWidth: props.borderWidth,
          borderColor: chartBorderColorRgb,
          label: "Heart Rate",
          data: streamHeartRateArray
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
