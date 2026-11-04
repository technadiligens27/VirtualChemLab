import { useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"

const ShowBeakerPrecipitate = ({
  modelRef,
  fullOpacity = 1,
  duration = 2,
}) => {
  const materialsRef = useRef([])
  const elapsedRef = useRef(0)
  const finishedRef = useRef(false)

  useEffect(() => {
    if (!modelRef?.current) return

    materialsRef.current = []
    elapsedRef.current = 0
    finishedRef.current = false

    console.log("Searching precipitate children...")

    modelRef.current.traverse((child) => {
      const name =
        child.name?.toLowerCase() || ""

      if (
        child.isMesh &&
        name.includes("precipitate")
      ) {
        console.log(
          "Precipitate found:",
          child.name
        )

        // Make this mesh visible
        child.visible = true

        // IMPORTANT:
        // make all parents visible too
        let parent = child.parent

        while (
          parent &&
          parent !== modelRef.current
        ) {
          parent.visible = true
          parent = parent.parent
        }

        if (Array.isArray(child.material)) {
          child.material =
            child.material.map(
              (material) => {
                const cloned =
                  material.clone()

                cloned.transparent = true
                cloned.opacity = 0
                cloned.needsUpdate = true

                materialsRef.current.push(
                  cloned
                )

                return cloned
              }
            )
        } else if (child.material) {
          child.material =
            child.material.clone()

          child.material.transparent = true
          child.material.opacity = 0
          child.material.needsUpdate = true

          materialsRef.current.push(
            child.material
          )
        }
      }
    })

    console.log(
      "Precipitate materials found:",
      materialsRef.current.length
    )

    return () => {
      materialsRef.current = []
      elapsedRef.current = 0
      finishedRef.current = false
    }
  }, [modelRef])

  useFrame((_, delta) => {
    if (finishedRef.current) return

    if (
      materialsRef.current.length === 0
    ) {
      return
    }

    elapsedRef.current += delta

    const progress = Math.min(
      elapsedRef.current / duration,
      1
    )

    const opacity =
      progress * fullOpacity

    materialsRef.current.forEach(
      (material) => {
        material.opacity = opacity
        material.needsUpdate = true
      }
    )

    if (progress >= 1) {
      finishedRef.current = true

      console.log(
        "Precipitate fully shown"
      )
    }
  })

  return null
}

export default ShowBeakerPrecipitate