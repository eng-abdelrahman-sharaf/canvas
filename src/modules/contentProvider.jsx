
const { useEffect ,useRef, useState } = require("react");

/**
 * provides content that is resizable and draggable
 */
function ContentProvider({draggableElement}){    
    const draggingBoxesRef = useRef(null)
    const isDraggableRef = useRef(null)
    const [style , setStyle] = useState({})
    const textInputCheckboxRef =  useRef(null)
    const rectRef = useRef(null)

    
    useEffect(()=>{
      const mousemove = (e)=>{
        
        if(!textInputCheckboxRef.current.checked) return
        const rect = rectRef.current.getBoundingClientRect()
        const dy = rect.top, dx = rect.left
        if(e.clientY - dy < 0 || e.clientX - dx < 0) return
        if(e.clientY - dy > rect.height  || e.clientX - dx  >  rect.width ) return
        setStyle({top:`${e.clientY - dy}px`,left:`${e.clientX - dx}px`})
      }
      // rectRef.current.addEventListener("drag" , mousemove);
      rectRef.current.addEventListener("dragover" , (e)=>{e.preventDefault()});
      rectRef.current.addEventListener("drop" , ()=>{rectRef.current.prepend(draggableElement)});

      return ()=> rectRef.current.removeEventListener("drag" , mousemove)
    },[])


    return(
        <div className="content-container" ref={rectRef}>
          <div className="trans-boundaries" style={style} ref={draggingBoxesRef} draggable="true" contentEditable>
              <label htmlFor="text-input">click</label>
              <input type="radio"  ref = {textInputCheckboxRef} name="tool-selected" id = "text-input" value="text-input" ></input>
              <div className ="top-left"></div>
              <div className ="top-right"></div>
              <div className ="bottom-left"></div>
              <div className ="bottom-right"></div>
              <input type="checkbox" ref={isDraggableRef} />
              {draggableElement}
          </div>
        </div>
    )
}

export default ContentProvider