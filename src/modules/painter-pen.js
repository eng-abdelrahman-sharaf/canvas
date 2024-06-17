import { useEffect, useRef } from "react";

import "./painter-pen.css"

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
      let stroked = false
      const path = {path : new Path2D() , globalCompositeOperation : "source-over" , strokeStyle : color , lineWidth : lineWidth}
      
      const copyPath = (path) => {return {path : path.path , globalCompositeOperation : path.globalCompositeOperation , strokeStyle : path.strokeStyle , lineWidth : path.lineWidth}}

      const mousedown = (e) =>{
            if(!painterCheckbox.checked) return;
            context.strokeStyle = `${color}`
            context.lineWidth = lineWidth
            context.globalCompositeOperation = path.globalCompositeOperation
            isDrawing = true
            // context.beginPath()
            path.path.moveTo(e.offsetX  , e.offsetY);
            path.path.lineTo(e.offsetX  , e.offsetY);
            // context.moveTo(e.offsetX  , e.offsetY)
            // context.lineTo(e.offsetX , e.offsetY)
      }
      
      const mousemove = (e) =>{
          if(!painterCheckbox.checked) return;
          if(isDrawing){
            path.path.lineTo(e.offsetX  , e.offsetY);
            // context.lineTo(e.offsetX , e.offsetY)
            context.stroke(path.path)
            stroked = true
          }
      }
    
      const mouseup = (e) =>{
          if(!painterCheckbox.checked) return;
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
          
    } , [color , lineWidth , canvas])
    return (
    <div>
        <input type="radio" className="tool-checkbox"  id="painter-pen-checkbox" name="tool-selected" value="painter-pen" ref={painterCheckboxRef}></input>
        <label htmlFor="painter-pen-checkbox" className="tool-checkbox-label" id="painter-pen-checkbox-label">
            <img alt="painter-pen"/>
        </label>
    </div>
    );
  }

export default PainterPen