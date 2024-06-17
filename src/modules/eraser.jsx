import { useEffect, useRef } from "react"
import "./eraser.css"

function Eraser({canvas , drawnList}){
    const eraserCheckboxRef = useRef(null);

    useEffect(()=>{
        if(!canvas) return;

        const eraserCheckbox = eraserCheckboxRef.current;

        let isDrawing = false
        let stroked = false
        let context = canvas.getContext("2d")

        const path = {path : new Path2D() , globalCompositeOperation : "destination-out" }

        const copyPath = (path) => {return {path : path.path , globalCompositeOperation : path.globalCompositeOperation }}

        const mousedown = (e) =>{
            if(!eraserCheckbox.checked) return;
            context.globalCompositeOperation = path.globalCompositeOperation
            isDrawing = true
            path.path.moveTo(e.offsetX  , e.offsetY)
            path.path.lineTo(e.offsetX , e.offsetY)
        }
        const mousemove = (e) =>{
            if(!eraserCheckbox.checked) return;
            if(isDrawing){
                path.path.lineTo(e.offsetX , e.offsetY)
                // context.lineTo(e.offsetX , e.offsetY)
                context.stroke(path.path)
                stroked = true
            }
        }
    
        const mouseup = (e) =>{
            if(!eraserCheckbox.checked) return;
            if(!stroked)context.stroke(path.path)
            drawnList.push(copyPath(path))
            stroked = false
            isDrawing = false
            path.path = new Path2D()
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
            <input ref={eraserCheckboxRef} type="radio" className="tool-checkbox" name="tool-selected" id="eraser-checkbox" value="eraser"></input>
            <label className="tool-checkbox-label" htmlFor="eraser-checkbox" id="eraser-checkbox-label">
                <div className="image eraser"></div>
            </label>
        </div>
    )
}

export default Eraser