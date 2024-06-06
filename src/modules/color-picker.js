import { useEffect, useRef } from "react";

import "./color-picker.css"

function ColorPicker({ canvas , setColor , setColorPenChecked}){
    
    const colorPenRef = useRef(null);
    
    useEffect(()=>{

        if(canvas == undefined) return;
        
        function rgbToHex(r , g , b) {
          return `#${r.toString(16).padStart(2 , "0") + g.toString(16).padStart(2 , "0") + b.toString(16).padStart(2 , "0")}`;
        }

          
        let colorPen = colorPenRef.current
        const whenClicked = (e)=>{
            if(colorPen.checked){
                let x = e.offsetX
                let y = e.offsetY
                let context = canvas.getContext("2d");
                let imgData = context.getImageData(x , y , 1 , 1).data;
                setColor(rgbToHex(imgData[0] , imgData[1] , imgData[2]))
                colorPen.checked = false
                setColorPenChecked(false);
            }
        }    
        
        const whenChecked = ()=>{
            if(colorPen.checked){
                setColorPenChecked(true);
            }
            else{ 
                setColorPenChecked(false)
            }
        }

        colorPen.addEventListener("change" , whenChecked);
        canvas.addEventListener("click" , whenClicked);        
        
        return(
            () => {
                colorPen.removeEventListener("change", whenChecked);
                canvas.removeEventListener("click" , whenClicked);        
            }
        )

    } , [canvas])

    return (
    <>
      <label id = "color-picker-input-label" for = "color-picker-input">
        <svg fill="#000000" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg"><title/><path d="M90,24.0217a17.9806,17.9806,0,0,0-5.2969-12.7968,18.5331,18.5331,0,0,0-25.6054,0L46.23,24.0972,41.9121,19.78a5.9994,5.9994,0,1,0-8.4844,8.4844l4.3184,4.3184L7.7578,62.5647A5.9956,5.9956,0,0,0,6,66.8069V83.9221a5.9966,5.9966,0,0,0,6,6H29.1152a5.9956,5.9956,0,0,0,4.2422-1.7578L63.34,58.176l4.3184,4.3184A5.9994,5.9994,0,0,0,76.1426,54.01L71.825,49.6924,84.6973,36.8245A17.9861,17.9861,0,0,0,90,24.0217Zm-63.3691,53.9H18V69.2913L46.2305,41.0667l8.625,8.625Z"/></svg>
      </label>
      <input ref = {colorPenRef} type="checkbox" id = "color-picker-input"/>
    </>
    );
}

export default ColorPicker;