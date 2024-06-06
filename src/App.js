
import { useEffect, useRef, useState } from "react";
import { SketchPicker } from "react-color";
import ColorPicker from "./modules/color-picker.js";
import Canvas from "./modules/canvas.js"

import "./App.css"



  
function App() {

    const [color , setColor] = useState("#000000")
    const [context , setContext] = useState(undefined)        
    const [canvas , setCanvas] = useState(undefined)
    const [colorPenChecked , setColorPenChecked] = useState(false)

    console.log(`from app : ${colorPenChecked}`);

    function handleNewColor(color){
      setColor(color.hex);
    }

    return (
      <div id="canvas-container">
      <SketchPicker color={color} onChange={handleNewColor} disableAlpha = {true} />
      <Canvas lineWidth = "10" color = {color} id = "painter-canvas" height="500px" width="700px"   colorPenChecked = {colorPenChecked} setContext={setContext} setCanvas={setCanvas} />
      <ColorPicker context = {context}  setColor={setColor} canvas={canvas} setColorPenChecked = {setColorPenChecked} />
    </div> 
    );

}

export default App;