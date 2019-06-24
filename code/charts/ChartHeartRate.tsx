import * as React from "react"
import {
    Frame,
    useCycle,
    addPropertyControls,
    ControlType,
    Color,
} from "framer"
import { Line, defaults } from "react-chartjs-2"
import { useGlobal, setGlobal } from "reactn"

ChartHeartRate.defaultProps = {
    color: Color("#EE4444"),
    ShowYAxes: true,
    ShowXAxes: true,
}

addPropertyControls(ChartHeartRate, {
    color: { type: ControlType.Color, title: "Color" },
    ShowYAxes: { type: ControlType.Boolean, title: "Show Y Axes" },
    ShowXAxes: { type: ControlType.Boolean, title: "Show X Axes" },
})

export function ChartHeartRate(props) {
    const [currentHeartRateArray, setCurrentHeartRateArray] = useGlobal(
        "heartRateArray"
    )

    // Temporary set mock data for heart rate array

    // React.useEffect(() => {

    //     setCurrentHeartRateArray([60, 40, 100, 60, 60, 60, 100, 60])
    // })


    let currentHeartRate = currentHeartRateArray.slice(-1)[0]

    let chartBorderColor = Color(props.color)
    let chartBorderColorRgb = Color.toRgbString(chartBorderColor)
    let chartFillColor = Color.alpha(chartBorderColor, 0.6)
    let chartFillColorRgb = Color.toRgbString(chartFillColor)

    let chartFillGradientStep1 = Color.toRgbString(Color.alpha(chartBorderColor, 0.5))
    let chartFillGradientStep2 = Color.toRgbString(Color.alpha(chartBorderColor, 0.4))
    let chartFillGradientStep3 = Color.toRgbString(Color.alpha(chartBorderColor, 0.2))

    let lineChartOptions = {
        maintainAspectRatio: false,
        legend: {
            display: false,
        },
        layout: {
            padding: 0,
        },
        scales: {
            yAxes: [
                {
                    display: props.ShowYAxes,
                    gridLines: {
                        display: false,
                    },
                    ticks: {
                        display: true,
                        autoSkip: true,
                        maxTicksLimit: 10,
                        min: 0,
                        // max: 200,
                    },
                },
            ],
            xAxes: [
                {
                    display: props.ShowXAxes,
                    ticks: {
                        display: false,
                    },
                    gridLines: {
                        display: false,
                    },
                },
            ],
        },
    }

    let data = (canvas) => {
        const ctx = canvas.getContext("2d")
        const gradient = ctx.createLinearGradient(0, 0, 0, props.height);
        gradient.addColorStop(0, chartFillGradientStep1);
        gradient.addColorStop(0.5, chartFillGradientStep2);
        gradient.addColorStop(1, chartFillGradientStep3)

        return {
            labels: [...currentHeartRateArray, currentHeartRate],
            datasets: [
                {
                    backgroundColor: gradient,
                    pointRadius: 0,
                    borderWidth: 1,
                    borderColor: chartBorderColorRgb,
                    label: "Heart Rate",
                    data: [...currentHeartRateArray, currentHeartRate],
                },
            ],
        }
    }

    return (
        <Frame style={style} size={"100%"}>
            <Line data={data} options={lineChartOptions} />
        </Frame>
    )
}

const style = {
    backgroundColor: "clear",
    borderRadius: "6px",
}
