import {copyPath} from "./copy"
import touchStatus from "./touch-status"

const drawFunctions = ({globalCompositeOperation = "source-over" , lineWidth = null , color = null ,canvas ,drawerCheckbox , drawnList , redos, setIsRedoWorking, setIsUndoWorking})=>{

    const context = canvas.getContext("2d")
    let isDrawing = false
    const isPrimaryTouch = {bool : true}
    let stroked = false

    const path = {
    path : new Path2D(), 
    globalCompositeOperation : globalCompositeOperation, 
    strokeStyle : color , lineWidth : lineWidth
    }

    const pointerdown = (e) =>{
        if(!drawerCheckbox.checked) return;
        isPrimaryTouch.bool = e.isPrimary
        const touchStatusArgs = {
        isPrimaryTouch : isPrimaryTouch,
        redrawCanvas : true,
        canvas : canvas,
        drawnList : drawnList,
        path : path
        }
        if(touchStatus(touchStatusArgs) == "notDrawing") return;
        isDrawing = true
        if(color && lineWidth){
            context.strokeStyle = `${color}`
            context.lineWidth = lineWidth
        }
        context.globalCompositeOperation = path.globalCompositeOperation
        if(!isPrimaryTouch.bool) return          
        path.path.moveTo(e.offsetX  , e.offsetY);
        path.path.lineTo(e.offsetX  , e.offsetY);
    }

    const pointermove = (e) =>{
    if(!drawerCheckbox.checked) return;
    if(isDrawing){
        if(touchStatus({isPrimaryTouch}) == "notDrawing") return;
        path.path.lineTo(e.offsetX  , e.offsetY);
        stroked = true
        context.stroke(path.path)
    }
    }

    const pointerup = (e) =>{
    if(!drawerCheckbox.checked) return;
    if(touchStatus({isPrimaryTouch}) == "notDrawing") {
        return;
    }
    if(!stroked)context.stroke(path.path)
    drawnList.push(copyPath(path))
    stroked = false
    isDrawing = false
    path.path = new Path2D()

    redos.splice(0 , redos.length);
    setIsRedoWorking(false);
    setIsUndoWorking(true);
    }
    return {
        pointerdown,
        pointermove,
        pointerup
    }
}

export default drawFunctions