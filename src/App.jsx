import { useEffect, useRef, useState } from "react";
import EyeDropper from "./modules/eye-dropper.jsx";
import Canvas from "./modules/canvas.jsx"
import Eraser from "./modules/eraser.jsx"
import PainterPen from "./modules/painter-pen.jsx"
import ImageUploader from "./modules/image-uploader.jsx";
import Saver from "./modules/saver.jsx"
import CustomColorPicker from "./modules/custom-color-picker.jsx";
import Undo from "./modules/undo.jsx"
import Redo from "./modules/redo.jsx"

import "./App.css"
import "./modules/tool-selector.css"


  
function App() {
    const [color , setColor] = useState("#000000")
    const [context , setContext] = useState(undefined)        
    const [canvas , setCanvas] = useState(undefined)
    const [lineWidth , ] = useState(10)
    const [painterPenCheckbox , setPainterPenCheckbox] = useState(null)
    const [eyeDropperCursorCheckbox , setEyeDropperCursorCheckbox] = useState(false)
    const [isRedoWorking , setIsRedoWorking] = useState(null)
    const [isUndoWorking , setIsUndoWorking] = useState(null)

    const [drawnList,] = useState([])
    const [redos ,] = useState([])

    return (
    <>
      <div id="motif1" className="motifs"></div>
      <div id="motif2" className="motifs"></div>
      <div id="motif3" className="motifs"></div>
      <header>Canvas</header>
      <div id="painter-container">
        <div id="tools-container">
          <PainterPen lineWidth={lineWidth} canvas={canvas} color={color} setIsRedoWorking={setIsRedoWorking} setIsUndoWorking={setIsUndoWorking} setPainterPenCheckbox={setPainterPenCheckbox} drawnList={drawnList} redos={redos}/>
          <CustomColorPicker color={color} setColor={setColor}/>
          <Undo drawnList={drawnList} canvas={canvas} redos={redos} setIsRedoWorking = {setIsRedoWorking} setIsUndoWorking={setIsUndoWorking} isUndoWorking={isUndoWorking}/>
          <Redo drawnList={drawnList} canvas={canvas} redos={redos} isRedoWorking = {isRedoWorking} setIsRedoWorking = {setIsRedoWorking} setIsUndoWorking={setIsUndoWorking}/>
          <EyeDropper context = {context}  setColor={setColor} canvas={canvas} painterPenCheckbox = {painterPenCheckbox} eyeDropperCursorCheckbox = {eyeDropperCursorCheckbox}/>
          <Eraser canvas={canvas} drawnList={drawnList} redos={redos} setIsRedoWorking={setIsRedoWorking} setIsUndoWorking={setIsUndoWorking}/>
          <ImageUploader  canvas={canvas} drawnList={drawnList} redos={redos} setIsRedoWorking={setIsRedoWorking} setIsUndoWorking={setIsUndoWorking} />
          <Saver canvas={canvas}/>
        </div>
        <Canvas id={"painter-canvas"}  setContext={setContext} setCanvas={setCanvas} setEyeDropperCursorCheckbox = {setEyeDropperCursorCheckbox} drawnList={drawnList} />
      </div> 
    </>
    );

}

export default App;