import { useContext, useEffect } from "react"
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"

const WeighTestube = ({ testubeRef }) => {
  const { trayPointRef } = useContext(ModelContext)
  const {setIsWeighTestube,isWeighTestube} = useContext(InteractionContext)

  console.log("rendered")

  useEffect(() => {
    const trayPoint = trayPointRef?.current
    const testube = testubeRef?.current

    if (!trayPoint || !testube) {
      console.log(
        "Tray point or test tube was not found"
      )
      return
    }

    // Show cap while weighing
    testube.traverse((child) => {
      if (
        child.isMesh &&
        child.name?.toLowerCase().includes("cap")
      ) {
        child.visible = true
      }
    })

    // Move the test tube onto the balance
    trayPoint.add(testube)

    testube.position.set(0, 0, 0)

    testube.rotation.set(
      0,
      0,
      Math.PI / 2
    )

    testube.scale.set(1, 1, 1)

    testube.updateMatrixWorld(true)

    return () => {
      // Hide cap when WeighTestube unmounts
      testube.traverse((child) => {
        if (
          child.isMesh &&
          child.name?.toLowerCase().includes("cap")
        ) {
          child.visible = false
        }
      })

      console.log("WeighTestube unmounted - cap hidden")
    }
  }, [trayPointRef, testubeRef])

  return null
}

export default WeighTestube