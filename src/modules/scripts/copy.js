const copyPath = (path) => {
    return {
      path : path.path,
      globalCompositeOperation : path.globalCompositeOperation, 
      strokeStyle : path.strokeStyle, 
      lineWidth : path.lineWidth
    }
}


const copyImage = (image) => {
    return {
        image: image.image,
        x : image.x,
        y :image.y,  
        width : image.width, 
        height : image.height 
    }
}


export default {copyImage , copyPath}
export {copyImage , copyPath}