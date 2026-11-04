import {
  useContext,
  useEffect,
  useRef,
} from "react"

import { ModelContext } from "../../Contexts/ModelContext/ModelContext"
import { MainGuidelineContext } from "../../Contexts/MainGuidelineContext/MainGuidelineContext";

const CoverPolysterene = () => {
  const {
    mainPolystereneLid,
    mainPolystereneRef,
  } = useContext(ModelContext)

  const originalTransformRef = useRef(null);

  const {lessonStep,selectedLesson,setLessonStep} = useContext(MainGuidelineContext)

  useEffect(()=>{
    if(lessonStep ===28.5 && selectedLesson===8){
      setLessonStep(29)
    }
  },[lessonStep,selectedLesson])

  useEffect(()=>{
    if(lessonStep ===26 && selectedLesson===9){
      setLessonStep(27)
    }
  },[lessonStep,selectedLesson])  

  useEffect(() => {
    const lid = mainPolystereneLid?.current
    const polysterene = mainPolystereneRef?.current

    if (!lid || !polysterene) return

    const topPoint = polysterene.children.find((child) =>
        child.name.toLowerCase().includes("top")
    )

    if (!topPoint) {
      console.warn(
        'No child containing the name "top" was found inside the polystyrene cup.'
      )
      return
    }

    // Store the lid's original parent and transform
    if (!originalTransformRef.current) {
      originalTransformRef.current = {
        parent: lid.parent,
        position: lid.position.clone(),
        rotation: lid.rotation.clone(),
        quaternion: lid.quaternion.clone(),
        scale: lid.scale.clone(),
      }
    }

    // Attach the lid to the top marker.
    // It will now follow the polystyrene cup and the camera.
    topPoint.add(lid)

    // Position the lid exactly at the top marker
    lid.position.set(0, 0, 0)
    lid.rotation.set(0, 0, 0)

    // Adjust these values only if your Blender model needs correction
    lid.position.y = 0
    lid.rotation.x = 0
    lid.rotation.y = 0
    lid.rotation.z = 0

    return () => {
      const original = originalTransformRef.current

      if (!original || !lid) return

      // Return the lid to its original parent
      if (original.parent) {
        original.parent.add(lid)
      }

      lid.position.copy(original.position)
      lid.rotation.copy(original.rotation)
      lid.quaternion.copy(original.quaternion)
      lid.scale.copy(original.scale)

      originalTransformRef.current = null
    }
  }, [mainPolystereneLid,mainPolystereneRef])

  return null
}

export default CoverPolysterene