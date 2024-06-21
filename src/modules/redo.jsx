

import { useEffect, useRef } from "react";
import "./redo.css"
import redraw from "./scripts/redraw";

function Redo({drawnList , canvas , redos , isRedoWorking , setIsRedoWorking , setIsUndoWorking}){
    const redoCheckboxRef = useRef(null);

    const onChange = (e)=>{
        if(!canvas) return
        if(redos.length >= 1){
            drawnList.push(redos.pop())
            redraw(canvas , canvas.getContext("2d") , drawnList)
            setIsUndoWorking(true);
        }
        if(redos.length == 0){
            setIsRedoWorking(false)
        }
        else{
            e.target.checked = true
            setIsRedoWorking(true)
        }
    }

    useEffect(()=>{
        if(!isRedoWorking){
            redoCheckboxRef.current.checked = false
            redoCheckboxRef.current.disabled = true
        }
        else{
            redoCheckboxRef.current.checked = true
            redoCheckboxRef.current.disabled = false
        }
    },[isRedoWorking])

    return (
    <div>
        <input type="checkbox" className="tool-checkbox" id="redo-checkbox" onChange={onChange} ref={redoCheckboxRef} disabled></input>
        <label className="tool-checkbox-label" htmlFor="redo-checkbox">
            <div className="image redo"></div>
        </label>
    </div>
    );
  }

export default Redo