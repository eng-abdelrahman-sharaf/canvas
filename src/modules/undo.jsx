import { useEffect, useRef } from "react";

import "./undo.css"
import redraw from "./scripts/redraw";

function Undo({drawnList , canvas , redos , setIsRedoWorking , setIsUndoWorking , isUndoWorking}){
    const undoCheckboxRef = useRef(null);

    const onChange = (e)=>{
        if(!canvas) return
        if(drawnList.length >= 1){
            redos.push(drawnList.pop());
            redraw(canvas , canvas.getContext("2d") , drawnList)
            setIsRedoWorking(true);
        }
        if(drawnList.length == 0){
            setIsUndoWorking(false)
        }
        else{
            e.target.checked = true
            setIsUndoWorking(true)
        }
    }

    useEffect(()=>{
        if(!isUndoWorking){
            undoCheckboxRef.current.checked = false
            undoCheckboxRef.current.disabled = true
        }
        else{
            undoCheckboxRef.current.checked = true
            undoCheckboxRef.current.disabled = false
        }
    } , [isUndoWorking])

    return (
    <div>
        <input type="checkbox" className="tool-checkbox" id="undo-checkbox" onChange={onChange} ref={undoCheckboxRef} disabled></input>
        <label className="tool-checkbox-label" htmlFor="undo-checkbox">
            <div className="image undo"></div>
        </label>
    </div>
    );
  }

export default Undo