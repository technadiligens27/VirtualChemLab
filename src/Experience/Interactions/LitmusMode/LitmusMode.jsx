import { useContext, useEffect, useRef, useState, useCallback } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import LitmusReaction from "../LitmusReaction/LitmusReaction"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const LitmusMode = ({ litmusRef, beakerRef, hand, beakerFillData }) => {
  const { camera, gl } = useThree()

  const { lessonStep, setLessonStep, setShowErrorMsgNo } =
    useContext(MainGuidelineContext)

  const [colorChangeAcid, setColorChangeAcid] = useState(false)
  const [colorChangeBase, setColorChangeBase] = useState(false)

  const acids = [
    "Hydrochloric Acid (HCl)",
    "Sulfuric Acid (H2SO4)",
    "Nitric Acid (HNO3)",
    "Acetic Acid (CH3COOH)",
    "Citric Acid",
    "Carbonic Acid (H2CO3)",
  ]

  const bases = [
    "Sodium Hydroxide (NaOH)",
    "Potassium Hydroxide (KOH)",
    "Calcium Hydroxide (Ca(OH)2)",
    "Ammonia (NH3)",
    "Magnesium Hydroxide (Mg(OH)2)",
    "Sodium Carbonate (Na2CO3)",
    "Sodium Bicarbonate (NaHCO3)",
  ]

  const topPointRef = useRef(null)
  const limitPointRef = useRef(null)

  const topWorldRef = useRef(new THREE.Vector3())
  const targetLocalRef = useRef(new THREE.Vector3())

  const limitWorldRef = useRef(new THREE.Vector3())
  const limitLocalRef = useRef(new THREE.Vector3())

  const hasTouchedRef = useRef(false)
  const checkedLiquidOnStartRef = useRef(false)

  const yOffsetRef = useRef(3.4)

  const originalLitmusPositionRef = useRef(null)
  const originalLitmusRotationRef = useRef(null)
  const originalLitmusScaleRef = useRef(null)

  const originalBeakerPositionRef = useRef(null)
  const originalBeakerRotationRef = useRef(null)
  const originalBeakerScaleRef = useRef(null)

  const xOffset = hand === "right" ? 0.2 : -0.2
  const zOffset = 0

  const hasLiquidInBeaker = useCallback((beakerObject) => {
    if (!beakerObject) return false

    let hasLiquid = false

    beakerObject.traverse((child) => {
      const childName = child.name?.toLowerCase()

      if (
        childName?.includes("liquid") &&
        child.visible &&
        child.scale.y > 0
      ) {
        hasLiquid = true
      }
    })

    return hasLiquid
  }, [])

  const canUseLitmusTest = useCallback(() => {
    const hasLiquid = hasLiquidInBeaker(beakerRef?.current)
    const chemicalName = beakerFillData?.name

    return hasLiquid && chemicalName
  }, [beakerRef, beakerFillData, hasLiquidInBeaker])

useEffect(() => {
  if (!beakerRef?.current) return
  if (checkedLiquidOnStartRef.current) return

  checkedLiquidOnStartRef.current = true

  if (!canUseLitmusTest()) {
    setShowErrorMsgNo(11)
    setColorChangeAcid(false)
    setColorChangeBase(false)
  }
}, [beakerRef, canUseLitmusTest, setShowErrorMsgNo])

// Put the new positioning effect here
useEffect(() => {
  if (!litmusRef?.current || !beakerRef?.current) {
    return
  }

  const beakerObject = beakerRef.current

  const centerWorldPosition =
    new THREE.Vector3(0, -0.5, -5)

  camera.localToWorld(centerWorldPosition)

  if (beakerObject.parent) {
    beakerObject.parent.worldToLocal(
      centerWorldPosition
    )
  }

  beakerObject.position.copy(
    centerWorldPosition
  )

  beakerObject.rotation.set(0, 0, 0)
  beakerObject.scale.set(1, 1, 1)
  beakerObject.updateMatrixWorld(true)

  return () => {
    yOffsetRef.current = 3.4
    hasTouchedRef.current = false
    checkedLiquidOnStartRef.current = false

    topPointRef.current = null
    limitPointRef.current = null
  }
}, [litmusRef, beakerRef, camera])

useEffect(() => {
  if (lessonStep === 7) {
    setLessonStep(8)
  }
}, [lessonStep, setLessonStep])

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault()
      e.stopPropagation()

      if (!canUseLitmusTest()) {
        setShowErrorMsgNo(11)
        setColorChangeAcid(false)
        setColorChangeBase(false)
        return
      }

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
  }, [gl, canUseLitmusTest, setShowErrorMsgNo])

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
      new THREE.Vector3(xOffset, yOffsetRef.current, zOffset)
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

      if (!canUseLitmusTest()) {
        setColorChangeAcid(false)
        setColorChangeBase(false)
        return
      }

      const chemicalName = beakerFillData?.name?.toLowerCase()

      console.log("Litmus touched liquid/beaker")

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