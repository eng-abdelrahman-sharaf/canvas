import { useEffect, useRef } from "react";
import { SketchPicker } from "react-color";

import "./custom-color-picker.css";

function CustomColorPicker({ color, setColor }) {
    const colorPickedRef = useRef(null);

    function handleNewColor(color) {
        setColor(color.hex);
        colorPickedRef.current.style.backgroundColor = color.hex;
    }

    useEffect(() => {
        colorPickedRef.current.style.backgroundColor = color;
    }, [color]);
    return (
        <div id="color-picker-container">
            <input
                type="checkbox"
                id="color-picker-checkbox"
                className="tool-checkbox"
            />
            <label
                htmlFor="color-picker-checkbox"
                id="color-picker-checkbox-label"
                className="tool-checkbox-label">
                <div className="image picker" ref={colorPickedRef}></div>
            </label>
            <div id="custom-color-picker">
                <SketchPicker
                    color={color}
                    onChange={handleNewColor}
                    disableAlpha={true}
                />
            </div>
        </div>
    );
}

export default CustomColorPicker;
