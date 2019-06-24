import * as React from "react"
import { Frame, useCycle } from "framer"

// Open Preview (CMD + P)
// API Reference: https://www.framer.com/api

export function SvgIconBluetooth(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke={props.color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
        >
            <path d="M6.5 6.5l11 11L12 23V1l5.5 5.5-11 11" />
        </svg>
    )
}
