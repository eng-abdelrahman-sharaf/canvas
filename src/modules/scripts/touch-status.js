import redraw from "./redraw";

const touchStatus = ({isPrimaryTouch ,redrawCanvas = false, canvas = null , drawnList = null, path = null})=>{
    if(!isPrimaryTouch.bool){
      if(redrawCanvas && canvas && drawnList && path){
        redraw(canvas , canvas.getContext("2d") , drawnList);
        path.path = new Path2D()
      }
      return "notDrawing"
    }
    else{
      return "drawing"
    }
}

export default touchStatus