import { useEffect, useRef } from "react";

import "./painter-pen.css"
import redraw from "./redraw";

function PainterPen({lineWidth , color ,canvas , setPainterPenCheckbox , drawnList}){
    const painterCheckboxRef = useRef(null);


    useEffect(()=>{
      painterCheckboxRef.current.checked = true
    } , [])

    useEffect(()=>{
      if(!canvas) return;
      const painterCheckbox = painterCheckboxRef.current;
      setPainterPenCheckbox(painterCheckbox)

      const context = canvas.getContext("2d")
      let isDrawing = false
      const isPrimaryTouch = {bool : true}
      let stroked = false

      const path = {
        path : new Path2D(), 
        globalCompositeOperation : "source-over", 
        strokeStyle : color , lineWidth : lineWidth
      }
      
      const copyPath = (path) => {
        return {
          path : path.path,
          globalCompositeOperation : path.globalCompositeOperation, 
          strokeStyle : path.strokeStyle, 
          lineWidth : path.lineWidth
        }
      }

      const touchStatus = (redrawCanvas = false)=>{
        if(!isPrimaryTouch.bool){
          if(redrawCanvas){
            redraw(canvas , context , drawnList);
            path.path = new Path2D()
            // canvas.style.touchAction = "auto"
          }
          return "notDrawing"
        }
        else{
          // canvas.style.touchAction = "none"
          return "drawing"
        }
      }

      const pointerdown = (e) =>{
            if(!painterCheckbox.checked) return;
            isPrimaryTouch.bool = e.isPrimary
            if(touchStatus(true) == "notDrawing") return;
            isDrawing = true
            context.strokeStyle = `${color}`
            context.lineWidth = lineWidth
            context.globalCompositeOperation = path.globalCompositeOperation
            if(!isPrimaryTouch.bool) return
            path.path.moveTo(e.offsetX  , e.offsetY);
            path.path.lineTo(e.offsetX  , e.offsetY);
      }
      
      const pointermove = (e) =>{
          if(!painterCheckbox.checked) return;
          if(isDrawing){
            canvas.style.touchAction = "auto"
            if(touchStatus() == "notDrawing") return;
            path.path.lineTo(e.offsetX  , e.offsetY);
            stroked = true
            context.stroke(path.path)
          }
      }
    
      const pointerup = (e) =>{
          if(!painterCheckbox.checked) return;
          canvas.style.touchAction = "none"
          if(touchStatus() == "notDrawing") {
            // canvas.style.touchAction = "none"
            return;
          }
          if(!stroked)context.stroke(path.path)
          drawnList.push(copyPath(path))
          stroked = false
          isDrawing = false
          path.path = new Path2D()
      }
  
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
            <div className="image painte
            r-pen"></div>
        </label>
    </div>
    );
  }

export default PainterPen