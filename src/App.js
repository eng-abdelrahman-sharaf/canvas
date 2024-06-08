import { useState } from "react";
import { SketchPicker } from "react-color";
import EyeDropper from "./modules/eye-dropper.js";
import Canvas from "./modules/canvas.js"
import Eraser from "./modules/eraser.js"
import PainterPen from "./modules/painter-pen.js"

import "./App.css"



  
function App() {

    const [color , setColor] = useState("#000000")
    const [context , setContext] = useState(undefined)        
    const [canvas , setCanvas] = useState(undefined)
    const [lineWidth , setLineWidth] = useState(10)
    const [painterPenCheckbox , setPainterPenCheckbox] = useState(null)

    function handleNewColor(color){
      setColor(color.hex);
    }

    return (
    <div id="canvas-container">
      <Eraser canvas={canvas}/>
      <EyeDropper context = {context}  setColor={setColor} canvas={canvas} painterPenCheckbox = {painterPenCheckbox}/>
      <PainterPen lineWidth={lineWidth} canvas={canvas} color={color} setPainterPenCheckbox={setPainterPenCheckbox} />
      <SketchPicker color={color} onChange={handleNewColor} disableAlpha = {true} />
      <Canvas id = "painter-canvas" height="500px" width="700px" setContext={setContext} setCanvas={setCanvas} />
    </div> 
    );

}

export default App;