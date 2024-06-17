import { useEffect, useRef, useState } from "react";
import EyeDropper from "./modules/eye-dropper.jsx";
import Canvas from "./modules/canvas.jsx"
import Eraser from "./modules/eraser.jsx"
import PainterPen from "./modules/painter-pen.jsx"
import ImageUploader from "./modules/image-uploader.jsx";
import Saver from "./modules/saver.jsx"
import CustomColorPicker from "./modules/custom-color-picker.jsx";

import "./App.css"
import "./modules/tool-selector.css"


  
function App() {
    const [color , setColor] = useState("#000000")
    const [context , setContext] = useState(undefined)        
    const [canvas , setCanvas] = useState(undefined)
    const [lineWidth , ] = useState(10)
    const [painterPenCheckbox , setPainterPenCheckbox] = useState(null)
    const [eyeDropperCursorCheckbox , setEyeDropperCursorCheckbox] = useState(false)
    const [drawnList, ] = useState([]);



    return (
    <>
      <header>Canvas</header>
      <div id="painter-container">
        <div id="tools-container">
          <PainterPen lineWidth={lineWidth} canvas={canvas} color={color} setPainterPenCheckbox={setPainterPenCheckbox} drawnList={drawnList}/>
          <CustomColorPicker color={color} setColor={setColor}/>
          <EyeDropper context = {context}  setColor={setColor} canvas={canvas} painterPenCheckbox = {painterPenCheckbox} eyeDropperCursorCheckbox = {eyeDropperCursorCheckbox}/>
          <Eraser canvas={canvas} drawnList={drawnList}/>
          <ImageUploader  canvas={canvas} drawnList={drawnList} />
          <Saver canvas={canvas}/>
        </div>
        <Canvas id={"painter-canvas"}  setContext={setContext} setCanvas={setCanvas} setEyeDropperCursorCheckbox = {setEyeDropperCursorCheckbox} drawnList={drawnList} />
      </div> 
    </>
    );

}

export default App;