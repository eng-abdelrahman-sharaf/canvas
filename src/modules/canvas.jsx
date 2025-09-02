import { useEffect, useRef, useState } from "react";
import redraw from "./scripts/redraw";

import "./canvas.css";

function Canvas({
    id,
    setContext,
    setCanvas,
    setEyeDropperCursorCheckbox,
    drawnList,
}) {
    const [canvasHeight, setCanvasHeight] = useState(null);
    const [canvasWidth, setCanvasWidth] = useState(null);

    const canvasRef = useRef(null);
    const eyeDropperCursorCheckboxRef = useRef(null);

    const observer = new ResizeObserver(() => {
        if (!canvasRef.current) return;

        setCanvasWidth(canvasRef.current.offsetWidth);
        setCanvasHeight(canvasRef.current.offsetHeight);
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.lineCap = "round";
        context.lineJoin = "round";
        redraw(
            canvasRef.current,
            canvasRef.current.getContext("2d"),
            drawnList
        );
    }, [canvasHeight, canvasWidth]);

    useEffect(() => {
        observer.observe(canvasRef.current);
        const eyeDropperCursorCheckbox = eyeDropperCursorCheckboxRef.current;
        setEyeDropperCursorCheckbox(eyeDropperCursorCheckbox);
        setCanvas(canvasRef.current);
        setContext(canvasRef.current.getContext("2d"));
    }, []);
    return (
        <>
            <div id="canvas-container">
                <header>Canvas</header>
                <input
                    type="checkbox"
                    id="eyeDropperCursorCheckbox"
                    ref={eyeDropperCursorCheckboxRef}
                />
                <canvas
                    ref={canvasRef}
                    width={canvasWidth}
                    height={canvasHeight}
                    id={id}></canvas>
            </div>
        </>
    );
}

export default Canvas;
