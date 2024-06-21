import { useEffect, useRef } from "react";

import "./painter-pen.css"
import drawFunctions from "./scripts/draw";
function PainterPen({lineWidth , color ,canvas , setPainterPenCheckbox , drawnList , redos, setIsRedoWorking, setIsUndoWorking}){
    const painterCheckboxRef = useRef(null);


    useEffect(()=>{
      painterCheckboxRef.current.checked = true
    } , [])

    useEffect(()=>{
      if(!canvas) return;
      const painterCheckbox = painterCheckboxRef.current;
      setPainterPenCheckbox(painterCheckbox)
      
        const {pointerdown , pointermove , pointerup} = drawFunctions({lineWidth , color ,canvas , drawerCheckbox: painterCheckbox , drawnList , redos, setIsRedoWorking, setIsUndoWorking})
        canvas.addEventListener("pointerdown" , pointerdown);
        canvas.addEventListener("pointermove" , pointermove);            
        canvas.addEventListener("pointerup" , pointerup);
  
        return ()=>{
          canvas.removeEventListener("pointerdown", pointerdown);
          canvas.removeEventListener("pointermove", pointermove);
          canvas.removeEventListener("pointerup", pointerup);  
        }    
          
    } , [color , lineWidth , canvas])
    return (
    <div>
        <input type="radio" className="tool-checkbox"  id="painter-pen-checkbox" name="tool-selected" value="painter-pen" ref={painterCheckboxRef}></input>
        <label htmlFor="painter-pen-checkbox" className="tool-checkbox-label" id="painter-pen-checkbox-label">
            <div className="image painter-pen"></div>
        </label>
    </div>
    );
  }

export default PainterPen