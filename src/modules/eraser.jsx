import { useEffect, useRef } from "react"

import "./eraser.css"
import drawFunctions from "./scripts/draw";

function Eraser({canvas , drawnList ,  redos, setIsRedoWorking, setIsUndoWorking}){
    const eraserCheckboxRef = useRef(null);

    useEffect(()=>{
        if(!canvas) return;

        const eraserCheckbox = eraserCheckboxRef.current;
    
        const {pointerdown , pointermove , pointerup} = drawFunctions({globalCompositeOperation : "destination-out" , canvas , drawerCheckbox : eraserCheckbox , drawnList , redos, setIsRedoWorking, setIsUndoWorking})

        canvas.addEventListener("pointerdown" , pointerdown);
        canvas.addEventListener("pointermove" , pointermove);            
        canvas.addEventListener("pointerup" , pointerup);
    
        return ()=>{
            canvas.removeEventListener("pointerdown", pointerdown);
            canvas.removeEventListener("pointermove", pointermove);
            canvas.removeEventListener("pointerup", pointerup);  
        }    

    },[canvas])


    return(
        <div>
            <input ref={eraserCheckboxRef} type="radio" className="tool-checkbox" name="tool-selected" id="eraser-checkbox" value="eraser"></input>
            <label className="tool-checkbox-label" htmlFor="eraser-checkbox" id="eraser-checkbox-label">
                <div className="image eraser"></div>
            </label>
        </div>
    )
}

export default Eraser   