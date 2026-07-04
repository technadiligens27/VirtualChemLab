import { useContext, useEffect, useRef, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import LitmusReaction from "../LitmusReaction/LitmusReaction"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const LitmusMode = ({ litmusRef, beakerRef, hand, beakerFillData }) => {
  const { camera, gl } = useThree()
  const { rightBeakerFillData, leftBeakerFillData } =
    useContext(InteractionContext);

  const {lessonStep,setLessonStep} = useContext(MainGuidelineContext)

  const [colorChangeAcid, setColorChangeAcid] = useState(false);
  const [colorChangeBase, setColorChangeBase] = useState(false);

  // acids list
  const acids = [
    "Hydrochloric Acid (HCl)",
    "Sulfuric Acid (H2SO4)",
    "Nitric Acid (HNO3)",
    "Acetic Acid (CH3COOH)",
    "Citric Acid",
    "Carbonic Acid (H2CO3)",
  ]

  // bases list
  const bases = [
    "Sodium Hydroxide (NaOH)",
    "Potassium Hydroxide (KOH)",
    "Calcium Hydroxide (Ca(OH)2)",
    "Ammonia (NH3)",
    "Magnesium Hydroxide (Mg(OH)2)",
    "Sodium Carbonate (Na2CO3)",
    "Sodium Bicarbonate (NaHCO3)",
  ]

  // top child = touch/contact point
  const topPointRef = useRef(null)

  // stir child = lowest scroll limit
  const limitPointRef = useRef(null)

  const topWorldRef = useRef(new THREE.Vector3())
  const targetLocalRef = useRef(new THREE.Vector3())

  const limitWorldRef = useRef(new THREE.Vector3())
  const limitLocalRef = useRef(new THREE.Vector3())

  const hasTouchedRef = useRef(false)

  // starts above the top point
  const yOffsetRef = useRef(3.4)

  const originalLitmusPositionRef = useRef(null)
  const originalLitmusRotationRef = useRef(null)
  const originalLitmusScaleRef = useRef(null)

  const originalBeakerPositionRef = useRef(null)
  const originalBeakerRotationRef = useRef(null)
  const originalBeakerScaleRef = useRef(null)

  const xOffset = hand === "right" ? 0.2 : -0.2
  const zOffset = 0

  useEffect(() => {
    if (!litmusRef?.current || !beakerRef?.current) return

    const litmusObject = litmusRef.current
    const beakerObject = beakerRef.current

    originalLitmusPositionRef.current = litmusObject.position.clone()
    originalLitmusRotationRef.current = litmusObject.rotation.clone()
    originalLitmusScaleRef.current = litmusObject.scale.clone()

    originalBeakerPositionRef.current = beakerObject.position.clone()
    originalBeakerRotationRef.current = beakerObject.rotation.clone()
    originalBeakerScaleRef.current = beakerObject.scale.clone()

    const centerWorldPosition = new THREE.Vector3(0, -0.5, -5)

    camera.localToWorld(centerWorldPosition)

    if (beakerObject.parent) {
      beakerObject.parent.worldToLocal(centerWorldPosition)
    }

    beakerObject.position.copy(centerWorldPosition)
    beakerObject.rotation.set(0, 0, 0)
    beakerObject.scale.set(1, 1, 1)

    return () => {
      if (!litmusRef?.current || !beakerRef?.current) return

      if (originalLitmusPositionRef.current) {
        litmusRef.current.position.copy(originalLitmusPositionRef.current)
      }

      if (originalLitmusRotationRef.current) {
        litmusRef.current.rotation.copy(originalLitmusRotationRef.current)
      }

      if (originalLitmusScaleRef.current) {
        litmusRef.current.scale.copy(originalLitmusScaleRef.current)
      }

      if (originalBeakerPositionRef.current) {
        beakerRef.current.position.copy(originalBeakerPositionRef.current)
      }

      if (originalBeakerRotationRef.current) {
        beakerRef.current.rotation.copy(originalBeakerRotationRef.current)
      }

      if (originalBeakerScaleRef.current) {
        beakerRef.current.scale.copy(originalBeakerScaleRef.current)
      }

      litmusRef.current.visible = true
      beakerRef.current.visible = true
    }
  }, [litmusRef, beakerRef, camera]);

  useEffect(()=>{
    console.log("lessonStep:",lessonStep)
    if(lessonStep===7){
      setLessonStep(8)
    }
  },[lessonStep])

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault()
      e.stopPropagation()

      const speed = 0.2

      if (e.deltaY > 0) {
        yOffsetRef.current -= speed
      } else {
        yOffsetRef.current += speed
      }

      yOffsetRef.current = THREE.MathUtils.clamp(
        yOffsetRef.current,
        -10,
        3.4
      )
    }

    gl.domElement.addEventListener("wheel", handleWheel, {
      passive: false,
    })

    return () => {
      gl.domElement.removeEventListener("wheel", handleWheel)
    }
  }, [gl])

  useFrame(() => {
    if (!litmusRef?.current || !beakerRef?.current) return

    topPointRef.current = null
    limitPointRef.current = null

    beakerRef.current.traverse((child) => {
      const name = child.name?.toLowerCase()

      if (name?.includes("top")) {
        topPointRef.current = child
      }

      if (name?.includes("stir")) {
        limitPointRef.current = child
      }
    })

    if (!topPointRef.current || !limitPointRef.current) return

    const litmusObject = litmusRef.current

    topPointRef.current.getWorldPosition(topWorldRef.current)
    limitPointRef.current.getWorldPosition(limitWorldRef.current)

    targetLocalRef.current.copy(topWorldRef.current)

    if (litmusObject.parent) {
      litmusObject.parent.worldToLocal(targetLocalRef.current)
    } else {
      targetLocalRef.current.copy(
        camera.worldToLocal(topWorldRef.current.clone())
      )
    }

    targetLocalRef.current.add(
      new THREE.Vector3(
        xOffset,
        yOffsetRef.current,
        zOffset
      )
    )

    limitLocalRef.current.copy(limitWorldRef.current)

    if (litmusObject.parent) {
      litmusObject.parent.worldToLocal(limitLocalRef.current)
    } else {
      limitLocalRef.current.copy(
        camera.worldToLocal(limitWorldRef.current.clone())
      )
    }

    if (targetLocalRef.current.y < limitLocalRef.current.y) {
      targetLocalRef.current.y = limitLocalRef.current.y
    }

    litmusObject.position.lerp(targetLocalRef.current, 0.2)

    litmusObject.rotation.set(
      Math.PI / 2,
      0,
      hand === "right" ? Math.PI / 8 : -Math.PI / 8
    )

    litmusObject.scale.set(1.5, 1.5, 1.5)
    litmusObject.visible = true
    litmusObject.frustumCulled = false

    const litmusWorldPosition = new THREE.Vector3()
    litmusObject.getWorldPosition(litmusWorldPosition)

    const distance = litmusWorldPosition.distanceTo(topWorldRef.current)

    if (distance < 1.6 && !hasTouchedRef.current) {
      hasTouchedRef.current = true
      console.log("Litmus touched liquid/beaker")

      const chemicalName = beakerFillData?.name?.toLowerCase()

      const isAcid = acids.some(
        (acid) => acid.toLowerCase() === chemicalName
      )

      const isBase = bases.some(
        (base) => base.toLowerCase() === chemicalName
      )

      if (isAcid) {
        setColorChangeAcid(true)
        setColorChangeBase(false)
      }

      if (isBase) {
        setColorChangeBase(true)
        setColorChangeAcid(false)
      }
    }

    if (distance > 1.6) {
      hasTouchedRef.current = false
    }
  })

  return (
    <>
      {colorChangeAcid && (
        <LitmusReaction
          litmusRef={litmusRef}
          type="acid"
        />
      )}

      {colorChangeBase && (
        <LitmusReaction
          litmusRef={litmusRef}
          type="base"
        />
      )}
    </>
  )
}

export default LitmusMode