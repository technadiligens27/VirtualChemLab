import { useContext, useEffect, useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import * as THREE from "three"
import "./FillUpBeaker.css"

import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const FillUpBeaker = ({ beakerRef, hand }) => {
  const {
    leftBeakerFillData,
    rightBeakerFillData,
    setIsFillUpBeaker,
  } = useContext(InteractionContext)

  const { lessonStep, setLessonStep } = useContext(MainGuidelineContext)

  const fillData =
    hand === "left" ? leftBeakerFillData : rightBeakerFillData

  const liquidMeshesRef = useRef([])
  const amountRef = useRef(0)
  const speedRef = useRef(1)
  const fillCompletedRef = useRef(false)

  const isRoundBottomFlaskRef = useRef(false)
  const startXScaleRef = useRef(1)
  const targetXScaleRef = useRef(1)

  const labelGroupRef = useRef(null)
  const labelPositionRef = useRef(new THREE.Vector3())

  const [showLabel, setShowLabel] = useState(false)

  useEffect(() => {
    if (lessonStep === 5 || lessonStep === 9) {
      fillCompletedRef.current = false
    }
  }, [lessonStep])

  useEffect(() => {
    if (!beakerRef?.current) return
    if (!fillData?.amount) return

    liquidMeshesRef.current = []
    fillCompletedRef.current = false
    setShowLabel(false)

    let firstLiquidMesh = null

    beakerRef.current.traverse((child) => {
      if (!child.name?.toLowerCase().includes("liquid")) return

      child.traverse((innerChild) => {
        if (!innerChild.isMesh || !innerChild.material) return

        innerChild.visible = false

        if (!firstLiquidMesh) {
          firstLiquidMesh = innerChild
        }
      })
    })

    if (!firstLiquidMesh) return

    firstLiquidMesh.visible = true
    liquidMeshesRef.current.push(firstLiquidMesh)

    setShowLabel(true)

    // Give this liquid its own material
    if (Array.isArray(firstLiquidMesh.material)) {
      firstLiquidMesh.material = firstLiquidMesh.material.map((material) =>
        material.clone()
      )

      firstLiquidMesh.material.forEach((material) => {
        material?.color?.set(fillData.color)
        material.needsUpdate = true
      })
    } else {
      firstLiquidMesh.material = firstLiquidMesh.material.clone()
      firstLiquidMesh.material.color?.set(fillData.color)
      firstLiquidMesh.material.needsUpdate = true
    }

    const beakerName = beakerRef.current.name || ""

    isRoundBottomFlaskRef.current = beakerName.includes(
      "main-Round-bottom-flask"
    )

    firstLiquidMesh.scale.y = 0

    if (isRoundBottomFlaskRef.current) {
      startXScaleRef.current = 0.8
      targetXScaleRef.current = 1.2

      firstLiquidMesh.scale.x = startXScaleRef.current
    } else {
      firstLiquidMesh.scale.x = 1
    }

    speedRef.current = 1

    if (beakerName.includes("normal-beaker")) {
      amountRef.current = Number(fillData.amount) * 0.55
      speedRef.current = 20
    } else if (beakerName.includes("Conical-Flask")) {
      amountRef.current = Number(fillData.amount) * 0.2
      speedRef.current = 15
    } else if (beakerName.includes("testube")) {
      amountRef.current = Number(fillData.amount) * 1.2
      speedRef.current = 20
    } else if (beakerName.includes("main-Round-bottom-flask")) {
      amountRef.current = Number(fillData.amount) * 0.04
      speedRef.current = 20
    } else if (beakerName.includes("main-graduated-cylinder")) {
      amountRef.current = Number(fillData.amount) * 0.5
      speedRef.current = 20
    } else {
      amountRef.current = Number(fillData.amount) * 0.2
      speedRef.current = 20
    }
  }, [
    beakerRef,
    hand,
    fillData?.color,
    fillData?.amount,
  ])

  useFrame((state, delta) => {
    if (!liquidMeshesRef.current.length) return
    if (!amountRef.current) return
    if (fillCompletedRef.current) return

    let isFillDone = true

    liquidMeshesRef.current.forEach((mesh) => {
      mesh.scale.y = Math.min(
        mesh.scale.y + speedRef.current * delta,
        amountRef.current
      )

      if (isRoundBottomFlaskRef.current) {
        const fillProgress = THREE.MathUtils.clamp(
          mesh.scale.y / amountRef.current,
          0,
          1
        )

        mesh.scale.x = THREE.MathUtils.lerp(
          startXScaleRef.current,
          targetXScaleRef.current,
          fillProgress
        )
      }

      if (labelGroupRef.current) {
        mesh.getWorldPosition(labelPositionRef.current)

        labelPositionRef.current.y += 1

        labelGroupRef.current.position.copy(
          labelPositionRef.current
        )
      }

      if (mesh.scale.y < amountRef.current) {
        isFillDone = false
      }
    })

    if (!isFillDone) return

    fillCompletedRef.current = true
    setIsFillUpBeaker(false)

    if (lessonStep === 5) {
      setLessonStep(6)
    }

    if (lessonStep === 8) {
      setLessonStep(9)
    }
  })

  return (
    <>
      {showLabel && (
        <group ref={labelGroupRef}>
          <Html center>
            <div
              className="liquid-label"
              style={{
                borderColor: fillData?.color,
              }}
            >
              {fillData?.name || "Liquid"}
            </div>
          </Html>
        </group>
      )}
    </>
  )
}

export default FillUpBeaker