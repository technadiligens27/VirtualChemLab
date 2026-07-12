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

  const { lessonStep, setLessonStep } =
    useContext(MainGuidelineContext)

  const fillData =
    hand === "left"
      ? leftBeakerFillData
      : rightBeakerFillData

  const liquidMeshesRef = useRef([])
  const amountRef = useRef(0)
  const speedRef = useRef(1)
  const fillCompletedRef = useRef(false)

  const isConicalFlaskRef = useRef(false)
  const isRoundBottomFlaskRef = useRef(false)

  const startXScaleRef = useRef(1)
  const targetXScaleRef = useRef(1)

  const labelGroupRef = useRef(null)
  const labelPositionRef = useRef(
    new THREE.Vector3()
  )

  const [showLabel, setShowLabel] =
    useState(false)

  useEffect(() => {
    if (
      lessonStep === 5 ||
      lessonStep === 8 ||
      lessonStep === 9
    ) {
      fillCompletedRef.current = false
    }
  }, [lessonStep])

  useEffect(() => {
    if (!beakerRef?.current) return
    if (!fillData?.amount) return

    liquidMeshesRef.current = []
    fillCompletedRef.current = false

    setShowLabel(false)

    const beakerName =
      beakerRef.current.name || ""

    const lowerBeakerName =
      beakerName.toLowerCase()

    const selectedAmount = Number(
      fillData.amount
    )

    console.log('selecetdAmoung:',selectedAmount)

    isConicalFlaskRef.current =
      lowerBeakerName.includes(
        "conical-flask"
      )

    isRoundBottomFlaskRef.current =
      lowerBeakerName.includes(
        "round-bottom-flask"
      )

    let selectedLiquidMesh = null

    /*
      Hide all liquid meshes first.

      For conical flask, select the mesh based
      on the selected amount:

      conical-liquid-25
      conical-liquid-50
      conical-liquid-75
      conical-liquid-100
    */
    beakerRef.current.traverse((child) => {
      if (!child.isMesh) return

      const childName =
        child.name?.toLowerCase() || ""

      if (!childName.includes("liquid")) {
        return
      }

      child.visible = false

      if (isConicalFlaskRef.current) {
        const requiredName = `conical-liquid-${selectedAmount}`

        console.log("Checking:", {
          childName,
          requiredName,
          matches: childName === requiredName,
        })

        if (childName === requiredName) {
          selectedLiquidMesh = child
        }

        return
      }

      /*
        Other containers use their first
        liquid mesh.
      */
      if (!selectedLiquidMesh) {
        selectedLiquidMesh = child
      }
    })

    if (!selectedLiquidMesh) {
      console.log("Liquid mesh not found:", {
        beakerName,
        selectedAmount,
        expectedName:
          `conical-liquid-${selectedAmount}`,
      })

      return
    }

    selectedLiquidMesh.visible = true

    liquidMeshesRef.current.push(
      selectedLiquidMesh
    )

    setShowLabel(true)

    /*
      Clone the material so changing this
      liquid colour does not change the
      other liquid models.
    */
    if (
      Array.isArray(
        selectedLiquidMesh.material
      )
    ) {
      selectedLiquidMesh.material =
        selectedLiquidMesh.material.map(
          (material) => material.clone()
        )

      selectedLiquidMesh.material.forEach(
        (material) => {
          if (!material) return

          material.color?.set(
            fillData.color
          )

          material.needsUpdate = true
        }
      )
    } else if (
      selectedLiquidMesh.material
    ) {
      selectedLiquidMesh.material =
        selectedLiquidMesh.material.clone()

      selectedLiquidMesh.material.color?.set(
        fillData.color
      )

      selectedLiquidMesh.material.needsUpdate =
        true
    }

    /*
      Start the liquid near zero so it grows
      upward from the bottom.
    */
    selectedLiquidMesh.scale.y = 0.001
    selectedLiquidMesh.scale.x = 1

    speedRef.current = 1

    /*
      Conical flask liquid meshes are already
      made at their correct final sizes in Blender.

      Therefore every selected conical liquid
      model grows from scale.y 0.001 to 1.
    */
    if (isConicalFlaskRef.current) {
      amountRef.current = 1
      speedRef.current = 1.5
    }

    /*
      Normal beaker.
    */
    else if (
      lowerBeakerName.includes(
        "normal-beaker"
      )
    ) {
      amountRef.current =
        selectedAmount * 0.55

      speedRef.current = 20
    }

    /*
      Test tube.
    */
    else if (
      lowerBeakerName.includes("testube") ||
      lowerBeakerName.includes("test-tube")
    ) {
      amountRef.current =
        selectedAmount * 1.2

      speedRef.current = 20
    }

    /*
      Round-bottom flask.
    */
    else if (
      isRoundBottomFlaskRef.current
    ) {
      amountRef.current =
        selectedAmount * 0.04

      speedRef.current = 20

      startXScaleRef.current = 0.8
      targetXScaleRef.current = 1.2

      selectedLiquidMesh.scale.x =
        startXScaleRef.current
    }

    /*
      Graduated cylinder.
    */
    else if (
      lowerBeakerName.includes(
        "graduated-cylinder"
      )
    ) {
      amountRef.current =
        selectedAmount * 0.5

      speedRef.current = 20
    }

    /*
      Fallback.
    */
    else {
      amountRef.current =
        selectedAmount * 0.2

      speedRef.current = 20
    }

    console.log(
      "Selected liquid:",
      selectedLiquidMesh.name
    )
  }, [
    beakerRef,
    hand,
    fillData?.color,
    fillData?.amount,
  ])

  useFrame((state, delta) => {
    if (
      liquidMeshesRef.current.length === 0
    ) {
      return
    }

    if (fillCompletedRef.current) return

    let isFillDone = true

    liquidMeshesRef.current.forEach(
      (mesh) => {
        if (!mesh) return

        /*
          CONICAL FLASK

          The selected mesh always grows to
          scale.y = 1.
        */
        if (isConicalFlaskRef.current) {
          mesh.scale.y = Math.min(
            mesh.scale.y +
              speedRef.current * delta,
            1
          )

          if (mesh.scale.y < 1) {
            isFillDone = false
          }
        }

        /*
          OTHER CONTAINERS
        */
        else {
          if (!amountRef.current) {
            isFillDone = false
            return
          }

          mesh.scale.y = Math.min(
            mesh.scale.y +
              speedRef.current * delta,
            amountRef.current
          )

          /*
            Round-bottom flask expands in X
            while filling.
          */
          if (
            isRoundBottomFlaskRef.current
          ) {
            const fillProgress =
              THREE.MathUtils.clamp(
                mesh.scale.y /
                  amountRef.current,
                0,
                1
              )

            mesh.scale.x =
              THREE.MathUtils.lerp(
                startXScaleRef.current,
                targetXScaleRef.current,
                fillProgress
              )
          }

          if (
            mesh.scale.y <
            amountRef.current
          ) {
            isFillDone = false
          }
        }

        /*
          Move the label above the liquid.
        */
        if (labelGroupRef.current) {
          mesh.getWorldPosition(
            labelPositionRef.current
          )

          labelPositionRef.current.y += 1

          labelGroupRef.current.position.copy(
            labelPositionRef.current
          )
        }
      }
    )

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
                borderColor:
                  fillData?.color,
              }}
            >
              {fillData?.name ||
                "Liquid"}
            </div>
          </Html>
        </group>
      )}
    </>
  )
}

export default FillUpBeaker