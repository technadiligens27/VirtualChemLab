import {
  useEffect,
  useRef,
} from "react"

const ResetRotationOnScroll = ({modelRef}) => {
 
  const originalRotationRef = useRef(null)
   console.log("reset") 

  useEffect(() => {
    if (!modelRef?.current) return

    originalRotationRef.current = modelRef.current.rotation.clone()

    const handleWheel = () => {
      if (!modelRef?.current || !originalRotationRef.current) return

      modelRef.current.rotation.copy(
        originalRotationRef.current
      )

      modelRef.current.updateMatrixWorld(true)

      console.log("Model rotation reset")
    }

    window.addEventListener(
      "wheel",
      handleWheel
    )

    return () => {
      window.removeEventListener(
        "wheel",
        handleWheel
      )
    }
  }, [modelRef])

  return null
}

export default ResetRotationOnScroll