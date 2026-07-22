import {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
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
  const isRoundBottomFlaskRef =
    useRef(false)

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

    const liquidName =
      fillData?.name?.toLowerCase() || ""

    const isWater =
      liquidName.includes("water") ||
      liquidName.includes("h2o")

    console.log(
      "Selected amount:",
      selectedAmount
    )

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

      The conical flask selects its liquid
      mesh based on the chosen amount:

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
        const requiredName =
          `conical-liquid-${selectedAmount}`

        console.log("Checking:", {
          childName,
          requiredName,
          matches:
            childName === requiredName,
        })

        if (childName === requiredName) {
          selectedLiquidMesh = child
        }

        return
      }

      /*
        Other containers use their first
        available liquid mesh.
      */
      if (!selectedLiquidMesh) {
        selectedLiquidMesh = child
      }
    })

    if (!selectedLiquidMesh) {
      console.log(
        "Liquid mesh not found:",
        {
          beakerName,
          selectedAmount,
          expectedName:
            `conical-liquid-${selectedAmount}`,
        }
      )

      return
    }

    selectedLiquidMesh.visible = true

    liquidMeshesRef.current.push(
      selectedLiquidMesh
    )

    setShowLabel(true)

    /*
      Apply the selected liquid colour.

      Water is made slightly transparent.
      Other liquids remain fully opaque.
    */
    const updateMaterial = (material) => {
      if (!material) return material

      const clonedMaterial =
        material.clone()

      clonedMaterial.color?.set(
        fillData.color
      )

      if (isWater) {
        clonedMaterial.transparent = true
        clonedMaterial.opacity = 0.35
        clonedMaterial.depthWrite = false
      } else {
        clonedMaterial.transparent = false
        clonedMaterial.opacity = 1
        clonedMaterial.depthWrite = true
      }

      clonedMaterial.needsUpdate = true

      return clonedMaterial
    }

    if (
      Array.isArray(
        selectedLiquidMesh.material
      )
    ) {
      selectedLiquidMesh.material =
        selectedLiquidMesh.material.map(
          updateMaterial
        )
    } else if (
      selectedLiquidMesh.material
    ) {
      selectedLiquidMesh.material =
        updateMaterial(
          selectedLiquidMesh.material
        )
    }

    /*
      Start near zero so the liquid grows
      upward from the container bottom.
    */
    selectedLiquidMesh.scale.y = 0.001
    selectedLiquidMesh.scale.x = 1

    speedRef.current = 1

    /*
      Conical flask liquid meshes already
      have their correct final size.
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
      lowerBeakerName.includes(
        "testube"
      ) ||
      lowerBeakerName.includes(
        "test-tube"
      )
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
      Fallback container.
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
    fillData?.name,
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
          Conical flask.
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
          Other containers.
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
            Expand round-bottom flask liquid
            horizontally while filling.
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
      {/* {showLabel && (
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
      )} */}
    </>
  )
}

export default FillUpBeaker