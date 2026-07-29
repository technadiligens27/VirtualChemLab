import {
  useContext,
  useEffect,
  useRef,
} from "react"
import * as THREE from 'three'
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const PlaceThermometer = ({
  beakerParentRef,
  beakerRef,
  heightOffset = 3,
  xOffset = 0,
  zOffset = 0,
}) => {
  const { mainThermometerRef } = useContext(ModelContext)
  const {selectedLesson,lessonStep,setLessonStep} = useContext(MainGuidelineContext)

  const {
    selectedRightHand,
    setSelectedRightHand,
    selectedLeftHand,
    setSelectedLeftHand,
  } = useContext(InteractionContext)

  const originalThermometerTransformRef =
    useRef(null)

  const originalBeakerParentPositionRef =
    useRef(null)

    useEffect(()=>{
      if(lessonStep===31 && selectedLesson===8){
        setLessonStep(32)
      }
    },[lessonStep,selectedLesson])

  useEffect(() => {
    if (
      selectedRightHand?.name ===
      "mainThermometer"
    ) {
      setSelectedRightHand(null)
    }

    if (
      selectedLeftHand?.name ===
      "mainThermometer"
    ) {
      setSelectedLeftHand(null)
    }
  }, [
    selectedLeftHand,
    selectedRightHand,
    setSelectedLeftHand,
    setSelectedRightHand,
  ])

  useEffect(() => {
    const beakerParent =
      beakerParentRef?.current

    const beaker =
      beakerRef?.current

    const thermometer =
      mainThermometerRef?.current

    if (!beaker || !thermometer) {
      console.log(
        "Beaker or thermometer was not found"
      )
      return
    }

    let stirPoint = null

    beaker.traverse((child) => {
      if (
        !stirPoint &&
        child.name
          ?.toLowerCase()
          .includes("stir")
      ) {
        stirPoint = child
      }
    })

    if (!stirPoint) {
      console.log(
        'Beaker child containing "stir" was not found'
      )
      return
    }

    if (
      !originalThermometerTransformRef.current
    ) {
      originalThermometerTransformRef.current = {
        parent: thermometer.parent,
        position:
          thermometer.position.clone(),
        rotation:
          thermometer.rotation.clone(),
        scale:
          thermometer.scale.clone(),
      }
    }

    if (
      beakerParent &&
      !originalBeakerParentPositionRef.current
    ) {
      originalBeakerParentPositionRef.current =
        beakerParent.position.clone()
    }

    beaker.updateMatrixWorld(true)
    thermometer.updateMatrixWorld(true)

    // Change thermometer parent to the beaker
    // while preserving its current world transform.
    beaker.attach(thermometer)

    const stirWorldPosition =
      stirPoint.getWorldPosition(
        new THREE.Vector3()
      )

    const stirLocalPosition =
      beaker.worldToLocal(
        stirWorldPosition.clone()
      )

    thermometer.position.set(
      stirLocalPosition.x + xOffset,
      stirLocalPosition.y + heightOffset,
      stirLocalPosition.z + zOffset
    )

    thermometer.rotation.set(
      0,
      0,
      -Math.PI / 8
    )

    thermometer.scale.set(1, 1, 1)
    thermometer.updateMatrixWorld(true)

    console.log(
      "Thermometer attached to beaker"
    )

    return () => {
      const originalThermometer =
        originalThermometerTransformRef.current

      if (originalThermometer) {
        if (originalThermometer.parent) {
          originalThermometer.parent.add(
            thermometer
          )
        }

        thermometer.position.copy(
          originalThermometer.position
        )

        thermometer.rotation.copy(
          originalThermometer.rotation
        )

        thermometer.scale.copy(
          originalThermometer.scale
        )
      }

      const originalBeakerParentPosition =
        originalBeakerParentPositionRef.current

      if (
        beakerParent &&
        originalBeakerParentPosition
      ) {
        beakerParent.position.copy(
          originalBeakerParentPosition
        )

        beakerParent.updateMatrixWorld(true)
      }

      thermometer.updateMatrixWorld(true)
    }
  }, [
    beakerParentRef,
    beakerRef,
    mainThermometerRef,
    heightOffset,
    xOffset,
    zOffset,
  ])

  return null
}

export default PlaceThermometer