import { useEffect, useRef } from "react"
import "./eraser.css"

function Eraser({canvas}){
    const eraserCheckboxRef = useRef(null);
    useEffect(()=>{
        if(!canvas) return;

        const eraserCheckbox = eraserCheckboxRef.current;

        let isDrawing = false
        let stroked = false
        let context = canvas.getContext("2d")

        const mousedown = (e) =>{
            if(!eraserCheckbox.checked) return;
            context.globalCompositeOperation = "destination-out"
            isDrawing = true
            context.beginPath()
            context.moveTo(e.offsetX  , e.offsetY)
            context.lineTo(e.offsetX , e.offsetY)
        }
        const mousemove = (e) =>{
            if(!eraserCheckbox.checked) return;
            if(isDrawing){
                context.lineTo(e.offsetX , e.offsetY)
                context.stroke()
                stroked = true
            }
        }
    
        const mouseup = (e) =>{
            if(!eraserCheckbox.checked) return;
            if(!stroked)context.stroke()
            stroked = false
            isDrawing = false
            context.closePath()
        }
    
        canvas.addEventListener("mousedown" , mousedown);
        canvas.addEventListener("mousemove" , mousemove);            
        canvas.addEventListener("mouseup" , mouseup);
    
        return ()=>{
            canvas.removeEventListener("mousedown", mousedown);
            canvas.removeEventListener("mousemove", mousemove);
            canvas.removeEventListener("mouseup", mouseup);  
        }    

    },[canvas])
    return(
        <div>
            <input ref={eraserCheckboxRef} type="radio" name="tool-selected" id="eraser-checkbox" value="eraser"></input>
            <label htmlFor="eraser-checkbox" id="eraser-checkbox-label">
                <img alt="eraser"/>
            </label>
        </div>
    )
}

export default Eraser