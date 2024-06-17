function redraw( canvas, context , drawnList){
    context.clearRect(0 , 0 , canvas.width , canvas.height)
    drawnList.forEach((element)=>{
        if(element.path) {
            if(element.strokeStyle) context.strokeStyle = element.strokeStyle
            if(element.globalCompositeOperation) context.globalCompositeOperation = element.globalCompositeOperation
            if(element.lineWidth) context.lineWidth = element.lineWidth
            context.stroke(element.path)
        }
        if(element.image) {
            context.globalCompositeOperation = "source-over"
            context.drawImage(element.image , element.x , element.y , element.width , element.height);
        }
    })
}

export default redraw