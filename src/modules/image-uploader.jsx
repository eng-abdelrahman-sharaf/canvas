import { useEffect, useRef } from "react"
import redraw from "./scripts/redraw"
import {copyImage} from "./scripts/copy"

import "./image-uploader.css"

function ImageUploader({canvas , drawnList ,  redos, setIsRedoWorking, setIsUndoWorking}){
    const imageUploaderCheckboxRef = useRef(null)
    const uploaderRef = useRef(null)
    const image = {image: undefined , x : undefined , y :undefined ,  width : undefined , height : undefined};
    

    useEffect(()=>{
        if(!canvas) return;
        const uploader = uploaderRef.current;
        const context = canvas.getContext("2d")

        const onload = (image) =>{
            return ()=>{
                if(image.image.naturalWidth > image.image.naturalHeight){
                    image.width = canvas.width / 2;
                    image.height= image.image.naturalHeight/image.image.naturalWidth * image.width
                }
                else{
                    image.height = canvas.height / 2;
                    image.width = image.image.naturalWidth/image.image.naturalHeight * image.height
                }

                image.x = Math.round(canvas.width/2 - image.width/2);
                image.y = Math.round(canvas.height/2 - image.height/2);
                image.width = Math.round(image.width)
                image.height = parseInt(image.height)
                context.globalCompositeOperation = "source-over"
                context.drawImage(image.image , image.x , image.y , image.width , image.height)
                drawnList.push(copyImage(image))

                redos.splice(0 , redos.length);
                setIsRedoWorking(false);
                setIsUndoWorking(true);
            }
        }

        function readURL(e) {
            const input = e.target
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    image.image = new Image();
                    image.image.src = e.target.result;
                    image.image.onload = onload(image)
                }
                reader.readAsDataURL(input.files[0]);
            }
        }
        
        function ispointering( pointerX , pointerY , object){
            if(pointerX < object.x || pointerX > object.width + object.x) return false
            if (pointerY < object.y || pointerY > object.height + object.y) return false
            return true

        }

        let selectedObject = undefined;
        let dx,dy 

        const pointerdown = (e)=>{
            if(!imageUploaderCheckboxRef.current.checked) {
                canvas.style.cursor = ""
                return
            }

            const lastElement = drawnList[drawnList.length-1]
            if(lastElement.image && ispointering(e.offsetX, e.offsetY, lastElement)){
                selectedObject = lastElement
            }

            if(!selectedObject) return
            
            showBorder( selectedObject.x , selectedObject.y , selectedObject.width , selectedObject.height );
            dx = e.offsetX - selectedObject.x
            dy = e.offsetY - selectedObject.y
        }

        const pointermove = (e)=>{
            if(!imageUploaderCheckboxRef.current.checked){
                canvas.style.cursor = ""
                return
            }   

            if(!selectedObject){
                const lastElement = drawnList[drawnList.length-1]
                if(lastElement.image && ispointering(e.offsetX, e.offsetY, lastElement)){
                    canvas.style.cursor = "move"
                }
                else canvas.style.cursor = ""
                return
            }

            selectedObject.x = e.offsetX - dx
            selectedObject.y = e.offsetY - dy
            redraw(canvas , canvas.getContext("2d") , drawnList);
            showBorder( selectedObject.x , selectedObject.y , selectedObject.width , selectedObject.height );
        }

        const  pointerup = ()=>{
            if(!imageUploaderCheckboxRef.current.checked) {
                canvas.style.cursor = ""
                return
            }
            // to delete the border after moving the image
            redraw(canvas , canvas.getContext("2d") , drawnList);
            selectedObject = undefined
        }
        
        const showBorder = ( x , y , width , height)=>{
            const path = new Path2D()
            path.moveTo(x , y);
            path.lineTo(x , y);
            path.lineTo(x+width , y);
            path.lineTo(x+width , y+height);
            path.lineTo(x , y+height);
            path.closePath()
            context.lineWidth = 2
            context.strokeStyle = "black"
            context.globalCompositeOperation = "source-over"
            context.stroke(path)
        }


        uploader.addEventListener("change", readURL);
        canvas.addEventListener("pointerdown" , pointerdown)
        canvas.addEventListener("pointermove" , pointermove)
        canvas.addEventListener("pointerup" , pointerup)
        
        return () => {
            uploader.removeEventListener("change" , readURL)
            canvas.removeEventListener("pointerdown" , pointerdown)
            canvas.removeEventListener("pointermove" , pointermove)
            canvas.removeEventListener("pointerup" , pointerup)   
        }

    } , [canvas , drawnList])

    return(
        <div>
            <input ref={imageUploaderCheckboxRef} className="tool-checkbox" type="radio" name="tool-selected" id="image-uploader-checkbox" value="image-uploader"></input>
            <label id="image-uploader-checkbox-label" className="tool-checkbox-label">
                <div className="image image-uploader"></div>
                <input type='file' onClick={()=>{imageUploaderCheckboxRef.current.checked = true}} ref={uploaderRef}></input>
            </label>
        </div>
    )
}
export default ImageUploader