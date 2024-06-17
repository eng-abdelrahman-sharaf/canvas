import { useState } from "react";
import EyeDropper from "./modules/eye-dropper.js";
import Canvas from "./modules/canvas.js"
import Eraser from "./modules/eraser.js"
import PainterPen from "./modules/painter-pen.js"
import ImageUploader from "./modules/image-uploader.js";
import Saver from "./modules/saver.js"
import CustomColorPicker from "./modules/custom-color-picker.js";

import "./App.css"
import "./modules/tool-selector.css"


  
function App() {
    const [color , setColor] = useState("#000000")
    const [context , setContext] = useState(undefined)        
    const [canvas , setCanvas] = useState(undefined)
    const [lineWidth , setLineWidth] = useState(10)
    const [painterPenCheckbox , setPainterPenCheckbox] = useState(null)
    const [eyeDropperCursorCheckbox , setEyeDropperCursorCheckbox] = useState(false)
    const [drawnList, setDrawnList] = useState([]);




    return (
    <div id="painter-container">
      <div id="tools-container">
        <ImageUploader  canvas={canvas} drawnList={drawnList} />
        <Eraser canvas={canvas} drawnList={drawnList}/>
        <EyeDropper context = {context}  setColor={setColor} canvas={canvas} painterPenCheckbox = {painterPenCheckbox} eyeDropperCursorCheckbox = {eyeDropperCursorCheckbox}/>
        <PainterPen lineWidth={lineWidth} canvas={canvas} color={color} setPainterPenCheckbox={setPainterPenCheckbox} drawnList={drawnList}/>
        <CustomColorPicker color={color} setColor={setColor}/>
        <Saver canvas={canvas}/>
      </div>
      <Canvas id = "painter-canvas" height="500px" width="700px" setContext={setContext} setCanvas={setCanvas} setEyeDropperCursorCheckbox = {setEyeDropperCursorCheckbox} />
    </div> 
    );

}

export default App;