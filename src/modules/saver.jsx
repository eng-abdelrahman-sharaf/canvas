import { useEffect, useRef } from "react";
import "./saver.css"

function Saver({canvas}){
    const link = document.createElement('a');
    const saverRef = useRef(null)

    useEffect(()=>{
        if(!canvas) return
        const download = function(){
            const context = canvas.getContext("2d")
            context.globalCompositeOperation = "destination-over"
            context.fillStyle = "#FFFFFF"
            context.fillRect(0 , 0 , canvas.width , canvas.height)
            link.download = 'CANVAS-PAINTING.png';
            link.href = canvas.toDataURL("image/png")
            link.click();
            setTimeout(() => {
                saverRef.current.checked = false
            }, 100);
        }
        saverRef.current.onclick = download
    },[canvas]);
    return(
        <div>
            <input type="radio" className="tool-checkbox"  id="saver-checkbox" name="tool-selected" value="saver" ref={saverRef}></input>
            <label htmlFor="saver-checkbox" className="tool-checkbox-label" id="saver-checkbox-label">
                <div className="image saver"></div>
            </label>
        </div>
    )
}

export default Saver