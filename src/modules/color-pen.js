import { useEffect, useRef } from "react";

import "./color-pen.css"

function ColorPen({ canvas , setColor , painterPenCheckbox}){
    
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
                if(imgData[3] == 0) imgData = [255 , 255 , 255]
                setColor(rgbToHex(imgData[0] , imgData[1] , imgData[2]))
                colorPen.checked = false
                painterPenCheckbox.checked = true
            }
        }    

        canvas.addEventListener("click" , whenClicked);        
        
        return(
            () => {
                canvas.removeEventListener("click" , whenClicked); 
            }
        )

    } , [canvas , painterPenCheckbox])

    return (
    <div>
      <input type="radio"  ref = {colorPenRef} name="tool-selected" id = "color-pen-input" value="picker-pen" ></input>
      <label id = "color-pen-input-label" for = "color-pen-input">
        <img alt="color-pen" />
      </label>
    </div>
    );
}

export default ColorPen;