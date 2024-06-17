
import { useEffect, useRef } from "react";

import "./eye-dropper.css"

function EyeDropper({ canvas , setColor , painterPenCheckbox , eyeDropperCursorCheckbox}){
    
    const eyeDropperCheckboxRef = useRef(null);
    
    useEffect(()=>{

        if(canvas == undefined) return;
        
        function rgbToHex(r , g , b) {
          return `#${r.toString(16).padStart(2 , "0") + g.toString(16).padStart(2 , "0") + b.toString(16).padStart(2 , "0")}`;
        }

          
        let eyeDropperCheckbox = eyeDropperCheckboxRef.current

        const showEyeDropperCursor = (e)=>{
          eyeDropperCursorCheckbox.checked = eyeDropperCheckbox.checked
        }

        const whenClicked = (e)=>{
            if(eyeDropperCheckbox.checked){
                let x = e.offsetX
                let y = e.offsetY
                let context = canvas.getContext("2d");
                let imgData = context.getImageData(x , y , 1 , 1).data;
                if(imgData[3] == 0) imgData = [255 , 255 , 255]
                setColor(rgbToHex(imgData[0] , imgData[1] , imgData[2]))
                eyeDropperCheckbox.checked = false
                painterPenCheckbox.checked = true
                eyeDropperCursorCheckbox.checked = false
            }
        }    

        canvas.addEventListener("mouseup" , showEyeDropperCursor )
        canvas.addEventListener("mousedown" , showEyeDropperCursor)
        canvas.addEventListener("mousemove" , showEyeDropperCursor)
        canvas.addEventListener("click" , whenClicked);        
        
        return(
            () => {
                canvas.removeEventListener("click" , whenClicked); 
                canvas.removeEventListener("mouseup" , showEyeDropperCursor )
                canvas.removeEventListener("mousedown" , showEyeDropperCursor)
                canvas.removeEventListener("mousemove" , showEyeDropperCursor)
            }
        )

    } , [canvas , painterPenCheckbox , eyeDropperCursorCheckbox])

    return (
    <div>
      <input type="radio" className="tool-checkbox" ref = {eyeDropperCheckboxRef} name="tool-selected" id = "eye-dropper-input" value="eye-dropper" ></input>
      <label id = "eye-dropper-input-label" className="tool-checkbox-label" htmlFor = "eye-dropper-input">
        <div className="image eye-dropper"></div>
      </label>
    </div>
    );
}

export default EyeDropper;