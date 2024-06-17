import { useEffect, useRef } from "react";
import { SketchPicker } from "react-color";

import "./custom-color-picker.css"

function CustomColorPicker({color , setColor}){
    
    const colorPickerCheckboxLabelRef = useRef(null)


    function handleNewColor(color){
        setColor(color.hex);
        colorPickerCheckboxLabelRef.current.style.backgroundColor = color.hex;
    }

    useEffect(()=>{
        colorPickerCheckboxLabelRef.current.style.backgroundColor = color;
    },[color])
    return(
        <div id="color-picker-container">
            <input type="checkbox" id="color-picker-checkbox"/>
            <label htmlFor="color-picker-checkbox" id="color-picker-checkbox-label" ref={colorPickerCheckboxLabelRef}></label>
            <div id="custom-color-picker">
                <SketchPicker color={color} onChange={handleNewColor} disableAlpha = {true} />
            </div>
        </div>
    )
}

export default CustomColorPicker