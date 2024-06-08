import { useEffect, useRef } from "react";

import "./painter-pen.css"

function PainterPen({lineWidth , color ,canvas , setPainterPenCheckbox}){
    const painterCheckboxRef = useRef(null);

    useEffect(()=>{
      if(!canvas) return;
      const painterCheckbox = painterCheckboxRef.current;
      setPainterPenCheckbox(painterCheckbox)

      const context = canvas.getContext("2d")
      let isDrawing = false
      let stroked = false
      context.strokeStyle = `${color}`
      context.lineWidth = lineWidth
      
      
      const mousedown = (e) =>{
            if(!painterCheckbox.checked) return;
            context.globalCompositeOperation = "source-over"
            isDrawing = true
            context.beginPath()
            context.moveTo(e.offsetX  , e.offsetY)
            context.lineTo(e.offsetX , e.offsetY)
      }
      
      const mousemove = (e) =>{
          if(!painterCheckbox.checked) return;
          if(isDrawing){
            context.lineTo(e.offsetX , e.offsetY)
            context.stroke()
            stroked = true
          }
      }
    
      const mouseup = (e) =>{
          if(!painterCheckbox.checked) return;
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
          
    } , [color , lineWidth , canvas])
    return (
    <div>
        <input type="radio"  id="painter-pen-checkbox" name="tool-selected" value="painter-pen" ref={painterCheckboxRef}></input>
        <label htmlFor="painter-pen-checkbox" id="painter-pen-checkbox-label">
            <img alt="painter-pen"/>
        </label>
    </div>
    );
  }

export default PainterPen