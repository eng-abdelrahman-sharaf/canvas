import { useEffect, useRef } from "react";

import "./canvas.css"

function Canvas({lineWidth , id , width , height , color , setContext , setCanvas , colorPenChecked }){
    const canvasRef = useRef(null);
    let mousedown, mousemove , mouseup;
    
    useEffect(()=>{
        const canvas = canvasRef.current
        const context = canvas.getContext("2d")
        context.fillStyle = "white"
        context.fillRect(0,0,canvas.width, canvas.height);
    },[])

    useEffect(()=>{
      console.log(`from canvas ${colorPenChecked}`);
      console.log("changing state");
  
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")
      let isDrawing = false
      let stroked = false
      setContext(context);
      setCanvas(canvas);
      context.strokeStyle = `${color}`
      context.lineCap = "round"
      context.lineJoin = "round"
      context.lineWidth = lineWidth
      
      let test_count = 0;
      
      mousedown = (e) =>{
            if(colorPenChecked) return;
            console.log(`"mousedown" ${colorPenChecked}`);
            test_count++;
            isDrawing = true
            context.beginPath()
            context.moveTo(e.offsetX  , e.offsetY)
            context.lineTo(e.offsetX , e.offsetY)
      }
      mousemove = (e) =>{
          if(colorPenChecked) return;
          if(isDrawing){
            context.lineTo(e.offsetX , e.offsetY)
            context.stroke()
            stroked = true
          }
      }
    
      mouseup = (e) =>{
          if(colorPenChecked) return;
          console.log(`"mouseup" ${colorPenChecked}`);
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
          
    } , [color , lineWidth , colorPenChecked])
    return (<canvas ref={canvasRef} width={width} height={height} id = {id}></canvas>);
  }

  export default Canvas