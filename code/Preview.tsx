import * as React from "react"
import { Frame, RenderTarget } from "framer"
import { url } from "framer/resource"

// @steveruizok

export function OpenInBrowser() {
    let localUrl = url()

    if (localUrl.includes("node_modules")) {
        localUrl = localUrl.match(/http:\/\/localhost:.\d*\//)[0]
    }

    return (
        <Frame size={"100%"} border="1px solid #0099ff" background="#222222">
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    fontWeight: 600,
                    fontFamily: "Helvetica Neue",
                    color: "#0099ff",
                    padding: 16,
                }}
            >
                {RenderTarget.current() === "CANVAS" ? (
                    <span style={{ fontSize: 16, textAlign: "left" }}>
                        This component will help you open your project's preview
                        in your browser.
                        <br />
                        <br />
                        To use it:
                        <br />
                        <ol>
                            <li>select this component</li>
                            <li>open the preview window</li>
                            <li>click the displayed link</li>
                        </ol>
                    </span>
                ) : (
                    <a
                        href={localUrl}
                        target="_blank"
                        style={{ color: "#0099ff", textAlign: "center" }}
                    >
                        Click here to open
                        <br />
                        this preview in your browser.
                    </a>
                )}
            </div>
        </Frame>
    )
}

OpenInBrowser.defaultProps = {
    height: 360,
    width: 360,
}
