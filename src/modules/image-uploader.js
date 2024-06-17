import { useEffect, useRef } from "react"

import "./image-uploader.css"

function ImageUploader({canvas , drawnList}){
    const imageUploaderCheckboxRef = useRef(null)
    const uploaderRef = useRef(null)
    const image = {image: undefined , x : undefined , y :undefined ,  width : undefined , height : undefined};
    

    useEffect(()=>{
        if(!canvas) return;
        const uploader = uploaderRef.current;
        const context = canvas.getContext("2d")

        const copyImage = (image) => {
            return {image: image.image ,x : image.x , y :image.y ,  width : image.width , height : image.height }
        }

        const onload = (image) =>{
            return ()=>{
                        
                console.log( "nature",image.image.naturalWidth , image.image.naturalHeight);
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

                context.drawImage(image.image , image.x , image.y , image.width , image.height)
                drawnList.push(copyImage(image))
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
        
        function isTouching( mouseX , mouseY , object){
            if(mouseX < object.x || mouseX > object.width + object.x) return false
            if (mouseY < object.y || mouseY > object.height + object.y) return false
            return true

        }

        function redraw(){
            context.clearRect(0 , 0 , canvas.width , canvas.height)
            drawnList.forEach((element)=>{
                if(element.path) {
                    if(element.strokeStyle) context.strokeStyle = element.strokeStyle
                    if(element.globalCompositeOperation) context.globalCompositeOperation = element.globalCompositeOperation
                    if(element.lineWidth) context.lineWidth = element.lineWidth
                    context.stroke(element.path)
                }
                if(element.image) context.drawImage(element.image , element.x , element.y , element.width , element.height);
            })
        }

        let selectedObject = undefined , isImageClicked;
        let dx,dy 

        const mousedown = (e)=>{
            if(!imageUploaderCheckboxRef.current.checked) {
                canvas.style.cursor = ""
                return
            }
            let selectedIndex;
            for(let index = 0 ; index < drawnList.length ; index++){
                const element = drawnList[index];
                if(element.image && isTouching(e.offsetX, e.offsetY, element)){
                    selectedObject = element       
                    selectedIndex = index;         
                }
            }
            redraw();
            if(!selectedObject) return
            
            drawnList.splice(selectedIndex , 1)
            selectedObject = copyImage(selectedObject)
            drawnList.push(selectedObject);

            // drawnList.forEach((element)=> {
            //     if(element.image)if(isTouching(e.offsetX, e.offsetY, element)) selectedObject = element
            // })
            showBorder( selectedObject.x , selectedObject.y , selectedObject.width , selectedObject.height );
            dx = e.offsetX - selectedObject.x
            dy = e.offsetY - selectedObject.y
        }

        const mousemove = (e)=>{
            if(!imageUploaderCheckboxRef.current.checked){
                canvas.style.cursor = ""
                return
            }   
            if(!selectedObject){
                let hovering = false

                drawnList.forEach((element)=> {
                    if(element.image)if(isTouching(e.offsetX, e.offsetY, element)) hovering = true;
                });
                if(hovering) canvas.style.cursor = "move"
                else canvas.style.cursor = ""
                return
            }
            selectedObject.x = e.offsetX - dx
            selectedObject.y = e.offsetY - dy
            redraw();
            showBorder( selectedObject.x , selectedObject.y , selectedObject.width , selectedObject.height );
        }

        const  mouseup = ()=>{
            if(!imageUploaderCheckboxRef.current.checked) {
                canvas.style.cursor = ""
                return
            }
            if(!selectedObject) redraw();
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
        canvas.addEventListener("mousedown" , mousedown)
        canvas.addEventListener("mousemove" , mousemove)
        canvas.addEventListener("mouseup" , mouseup)
        
        return () => {
            uploader.removeEventListener("change" , readURL)
            canvas.removeEventListener("mousedown" , mousedown)
            canvas.removeEventListener("mousemove" , mousemove)
            canvas.removeEventListener("mouseup" , mouseup)   
        }

    } , [canvas , drawnList])

    return(
        <div>
            <input ref={imageUploaderCheckboxRef} className="tool-checkbox" type="radio" name="tool-selected" id="image-uploader-checkbox" value="image-uploader"></input>
            <label id="image-uploader-checkbox-label" className="tool-checkbox-label">
                <img  alt="image-uploader" />
                <input type='file' onClick={()=>{imageUploaderCheckboxRef.current.checked = true}} ref={uploaderRef}></input>
            </label>
        </div>
    )
}
export default ImageUploader