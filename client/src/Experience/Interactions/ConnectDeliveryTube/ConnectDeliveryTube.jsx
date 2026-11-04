import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const ConnectDeliveryTube = ({
  modelRef,

  deliveryTubeScaleX = 1,
  deliveryTubeScaleY = 1,
  deliveryTubeScaleZ = 1,

  deliveryTubeXOffset = 0,
  deliveryTubeYOffset = 0,
  deliveryTubeZOffset = 0,
}) => {
  const deliveryTubeOriginalRef =
    useRef(null)

  const {selectedLesson,lessonStep,setLessonStep} = useContext(MainGuidelineContext)  

  useEffect(()=>{
    if(selectedLesson===13 && lessonStep===14){
      setLessonStep(15)
    }
  },[selectedLesson,lessonStep])  

  useLayoutEffect(() => {
    const model =
      modelRef?.current

    if (!model) return

    let bung = null
    let deliveryTube = null

    // =============================================
    // FIND BUNG
    // =============================================

    model.traverse((child) => {
      const childName =
        child.name?.toLowerCase() || ""

      if (
        !bung &&
        childName.includes("bung")
      ) {
        bung = child
      }
    })

    if (!bung) return

    // =============================================
    // FIND DELIVERY TUBE INSIDE BUNG
    // =============================================

    bung.traverse((child) => {
      const childName =
        child.name?.toLowerCase() || ""

      if (
        child !== bung &&
        !deliveryTube &&
        childName.includes("delivery-tube")
      ) {
        deliveryTube = child
      }
    })

    // =============================================
    // SAVE ORIGINAL DELIVERY TUBE STATE
    // =============================================

    if (
      deliveryTube &&
      !deliveryTubeOriginalRef.current
    ) {
      deliveryTubeOriginalRef.current = {
        object: deliveryTube,
        position:
          deliveryTube.position.clone(),
        scale:
          deliveryTube.scale.clone(),
      }
    }

    // =============================================
    // CONNECT
    // =============================================

    bung.visible = true

    if (deliveryTube) {
      deliveryTube.visible = true

      const original =
        deliveryTubeOriginalRef.current

      if (original) {
        deliveryTube.position.set(
          original.position.x +
            deliveryTubeXOffset,
          original.position.y +
            deliveryTubeYOffset,
          original.position.z +
            deliveryTubeZOffset
        )

        deliveryTube.scale.set(
          original.scale.x *
            deliveryTubeScaleX,
          original.scale.y *
            deliveryTubeScaleY,
          original.scale.z *
            deliveryTubeScaleZ
        )
      }
    }

    // =============================================
    // DISCONNECT / UNMOUNT
    // =============================================

    return () => {
      bung.visible = false

      const original =
        deliveryTubeOriginalRef.current

      if (original?.object) {
        original.object.visible = false

        original.object.position.copy(
          original.position
        )

        original.object.scale.copy(
          original.scale
        )
      }

      deliveryTubeOriginalRef.current =
        null
    }
  }, [
    modelRef,
    deliveryTubeScaleX,
    deliveryTubeScaleY,
    deliveryTubeScaleZ,
    deliveryTubeXOffset,
    deliveryTubeYOffset,
    deliveryTubeZOffset,
  ])

  return null
}

export default ConnectDeliveryTube