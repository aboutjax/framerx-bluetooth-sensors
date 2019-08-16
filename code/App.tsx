import { Override, Color, Data } from "framer"
import { useGlobal } from "reactn"
import * as React from "react"

// Override Docs: https://framer.com/docs/overrides

const slideData = Data({ currentSlide: 0 })

export function HeartRateCards(): Override {
    const [heartRateIsConnected, setHeartRateIsConnected] = useGlobal(
        "heartRateIsConnected"
    )

    if (heartRateIsConnected) {
        return {
            animate: { top: 0, opacity: 1 },
            transition: {
                top: { type: "spring", damping: 20, tension: 500 },
                opacity: { duration: 0.1 },
            },
        }
    } else {
        return {
            initial: { top: 40, opacity: 0 },
            animate: { top: 40, opacity: 0 },
        }
    }
}

export function PowerCards(): Override {
    const [powerIsConnected, setPowerIsConnected] = useGlobal(
        "powerIsConnected"
    )

    if (powerIsConnected) {
        return {
            animate: { top: 0, opacity: 1 },
            transition: {
                top: { type: "spring", damping: 20, tension: 500 },
                opacity: { duration: 0.1 },
            },
        }
    } else {
        return {
            initial: { top: 40, opacity: 0 },
            animate: { top: 40, opacity: 0 },
        }
    }
}
export function PageOverride(): Override {
    const [heartRateIsConnected, setHeartRateIsConnected] = useGlobal(
        "heartRateIsConnected"
    )

    if (heartRateIsConnected) {
        return {
            animate: { top: 0 },
            transition: {
                height: { type: "spring", damping: 20, tension: 500 },
                opacity: { duration: 0.1 },
            },
        }
    } else {
        return {
            top: 500,
        }
    }
}

export function BluetoothPulseAnimation(props): Override {
    return {
        animate: {
            scale: 2,
            opacity: 0,
            backgroundColor: Color("#9FD5FF"),
            transition: {
                scale: {
                    duration: 1.2,
                    ease: "easeOut",
                    loop: Infinity,
                },
                opacity: {
                    duration: 1.2,
                    ease: "easeOut",
                    loop: Infinity,
                },
            },
        },
    }
}

export function SlideControls(props): Override {
    // This sets the slidesNumber dynamically from the Page component
    const slidesNumber = props.children[0].props.children.length

    // This creates a listener for the arrow keys
    React.useEffect(() => {
        function pressKey(event) {
            if (event.key === "ArrowRight") goRight()
            if (event.key === "ArrowLeft") goLeft()
        }
        document.addEventListener("keydown", pressKey)
        return function removeListener() {
            document.removeEventListener("keydown", pressKey)
        }
    })

    // These navigate through the slides
    function goRight() {
        if (slideData.currentSlide < slidesNumber - 1) slideData.currentSlide++
    }

    function goLeft() {
        if (slideData.currentSlide > 0) slideData.currentSlide--
    }

    return { currentPage: slideData.currentSlide }
}
