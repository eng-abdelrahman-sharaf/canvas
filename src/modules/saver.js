import { useEffect, useRef } from "react";
import "./saver.css"

function Saver({canvas}){
    const link = document.createElement('a');
    const saverRef = useRef(null)

    useEffect(()=>{
        if(!canvas) return
        const download = function(){
            link.download = 'filename.png';
            link.href = canvas.toDataURL("image/png")
            link.click();
            saverRef.current.checked = false
        }
        saverRef.current.onclick = download
    },[canvas]);
    return(
        <div>
            <input type="radio" className="tool-checkbox"  id="saver-checkbox" name="tool-selected" value="saver" ref={saverRef}></input>
            <label htmlFor="saver-checkbox" className="tool-checkbox-label" id="saver-checkbox-label">
                <img alt="saver"/>
            </label>
        </div>
    )
}

export default Saver