import { useEffect, useRef } from "react";
// import ContentProvider from "./contentProvider"
import "./canvas.css"


function Canvas({id , width , height , setContext , setCanvas , setEyeDropperCursorCheckbox}){
    const canvasRef = useRef(null);
    const eyeDropperCursorCheckboxRef = useRef(null)
    const canvasContainerRef = useRef(null)
    
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
        <div id="canvas-container" ref={canvasContainerRef}>
          <input  type="checkbox" id="eyeDropperCursorCheckbox" ref={eyeDropperCursorCheckboxRef} />
          <canvas ref={canvasRef} width={width} height={height} id = {id}></canvas>
          {/* <ContentProvider draggableElement={<p>Ali is good</p>} /> */}
        </div>
      </>
    );
  }

  export default Canvas