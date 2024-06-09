import { useEffect, useRef } from "react";

import "./canvas.css"

function Canvas({id , width , height , setContext , setCanvas , setEyeDropperCursorCheckbox}){
    const canvasRef = useRef(null);
    const eyeDropperCursorCheckboxRef = useRef(null)
    useEffect(()=>{

      const canvas = canvasRef.current
      const context = canvas.getContext("2d")
      const eyeDropperCursorCheckbox = eyeDropperCursorCheckboxRef.current
      setEyeDropperCursorCheckbox(eyeDropperCursorCheckbox)
      setContext(context);
      setCanvas(canvas);
      context.lineCap = "round"
      context.lineJoin = "round"
    } , [])
    return (
      <>
        <input  type="checkbox" id="eyeDropperCursorCheckbox" ref={eyeDropperCursorCheckboxRef} />
        <canvas ref={canvasRef} width={width} height={height} id = {id}></canvas>
      </>
    );
  }

  export default Canvas