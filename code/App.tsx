import { Override } from "framer";
import { useGlobal } from "reactn";

// Override Docs: https://framer.com/docs/overrides

export function HeartRateCards(): Override {
  const [heartRateIsConnected, setHeartRateIsConnected] = useGlobal(
    "heartRateIsConnected"
  );

  if (heartRateIsConnected) {
    return {
      animate: { top: 0, opacity: 1 },
      transition: {
        top: { type: "spring", damping: 20, tension: 500 },
        opacity: { duration: 0.1 }
      }
    };
  } else {
    return {
      initial: { top: 40, opacity: 0 },
      animate: { top: 40, opacity: 0 }
    };
  }
}

export function PowerCards(): Override {
  const [powerIsConnected, setPowerIsConnected] = useGlobal("powerIsConnected");

  if (powerIsConnected) {
    return {
      animate: { top: 0, opacity: 1 },
      transition: {
        top: { type: "spring", damping: 20, tension: 500 },
        opacity: { duration: 0.1 }
      }
    };
  } else {
    return {
      initial: { top: 40, opacity: 0 },
      animate: { top: 40, opacity: 0 }
    };
  }
}
