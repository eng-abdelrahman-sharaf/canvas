import { useEffect, useRef } from "react";

import "./canvas.css"

function Canvas({id , width , height , setContext , setCanvas}){
    const canvasRef = useRef(null);
    
    useEffect(()=>{

      const canvas = canvasRef.current
      const context = canvas.getContext("2d")
      setContext(context);
      setCanvas(canvas);
      context.lineCap = "round"
      context.lineJoin = "round"
    } , [])
    return (
      <canvas ref={canvasRef} width={width} height={height} id = {id}></canvas>
    );
  }

  export default Canvas