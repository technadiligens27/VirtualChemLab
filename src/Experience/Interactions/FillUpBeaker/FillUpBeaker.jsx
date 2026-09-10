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

const FillUpBeaker = ({
  beakerRef,
  hand,
}) => {
  const {
    leftBeakerFillData,
    rightBeakerFillData,
    setIsFillUpBeaker,
  } = useContext(InteractionContext)

  const {
    lessonStep,
    setLessonStep,
    selectedLesson,
  } = useContext(MainGuidelineContext)

  const fillData =
    hand === "left"
      ? leftBeakerFillData
      : rightBeakerFillData

  const liquidMeshesRef = useRef([])

  const amountRef = useRef(0)
  const speedRef = useRef(1)

  const fillCompletedRef =
    useRef(false)

  const isRoundBottomFlaskRef =
    useRef(false)

  const startXScaleRef =
    useRef(1)

  const targetXScaleRef =
    useRef(1)

  const labelGroupRef =
    useRef(null)

  const labelPositionRef =
    useRef(
      new THREE.Vector3()
    )

  const [
    showLabel,
    setShowLabel,
  ] = useState(false)

  // ==========================================
  // RESET COMPLETION
  // ==========================================

  useEffect(() => {
    if (
      lessonStep === 5 ||
      lessonStep === 8 ||
      lessonStep === 9
    ) {
      fillCompletedRef.current =
        false
    }
  }, [lessonStep])

  // ==========================================
  // FIND LIQUID + PREPARE FILL
  // ==========================================

  useEffect(() => {
    if (!beakerRef?.current) return
    if (!fillData?.amount) return

    liquidMeshesRef.current = []

    fillCompletedRef.current =
      false

    setShowLabel(false)

    const beakerName =
      beakerRef.current.name || ""

    const lowerBeakerName =
      beakerName.toLowerCase()

    const selectedAmount =
      Number(fillData.amount)

    const liquidName =
      fillData?.name?.toLowerCase() ||
      ""

    const isWater =
      liquidName.includes("water") ||
      liquidName.includes("h2o")

    const isEthanol =
      liquidName.includes(
        "ethanol"
      ) ||
      liquidName.includes(
        "c2h5oh"
      )

    const isEthanoicAcid =
        liquidName.includes(
          "ethanoic acid"
        ) ||
        liquidName.includes(
          "ch3cooh"
        ) ||
        liquidName.includes(
          "acetic acid"
        )
        

    const isHCL =
      liquidName.includes("hydrochloric acid") ||
      liquidName.includes("hcl")  

    console.log(
      "Selected amount:",
      selectedAmount
    )

    console.log(
      "Selected liquid:",
      {
        liquidName,
        isWater,
        isEthanol,
      }
    )

    isRoundBottomFlaskRef.current =
      lowerBeakerName.includes(
        "round-bottom-flask"
      )

    let selectedLiquidMesh =
      null

    // ========================================
    // FIND FIRST CHILD CONTAINING "LIQUID"
    // ========================================

    beakerRef.current.traverse(
      (child) => {
        if (!child.isMesh) return

        const childName =
          child.name?.toLowerCase() ||
          ""

        if (
          !childName.includes(
            "liquid"
          )
        ) {
          return
        }

        if (!selectedLiquidMesh) {
          selectedLiquidMesh =
            child
        }
      }
    )

    // ========================================
    // CHECK LIQUID
    // ========================================

    if (!selectedLiquidMesh) {
      console.log(
        "❌ Liquid mesh not found:",
        beakerName
      )

      return
    }

    console.log(
      "✅ Liquid mesh found:",
      selectedLiquidMesh.name
    )

    // ========================================
    // SHOW LIQUID
    // ========================================

    selectedLiquidMesh.visible =
      true

    liquidMeshesRef.current.push(
      selectedLiquidMesh
    )

    setShowLabel(true)

    // ========================================
    // MATERIAL
    // ========================================

    const updateMaterial = (
      material
    ) => {
      if (!material) {
        return material
      }

      const clonedMaterial =
        material.clone()

      clonedMaterial.color?.set(
        fillData.color
      )
      
      // ======================================
      // ETHANOL
      // ======================================

      if (isEthanol || isEthanoicAcid) {
        clonedMaterial.color?.set(
          "#f5fbff"
        )

        clonedMaterial.transparent =
          true

        clonedMaterial.opacity =
          0.58

        clonedMaterial.depthWrite =
          false

        if (
          "roughness" in
          clonedMaterial
        ) {
          clonedMaterial.roughness =
            0.1
        }

        if (
          "metalness" in
          clonedMaterial
        ) {
          clonedMaterial.metalness =
            0
        }

        if (
          "transmission" in
          clonedMaterial
        ) {
          clonedMaterial.transmission =
            0.3
        }

        if (
          "thickness" in
          clonedMaterial
        ) {
          clonedMaterial.thickness =
            0.2
        }
      }

      // ======================================
      // WATER
      // ======================================

      else if (isWater) {
        clonedMaterial.transparent =
          true

        clonedMaterial.opacity =
          0.35

        clonedMaterial.depthWrite =
          false

        if (
          "roughness" in
          clonedMaterial
        ) {
          clonedMaterial.roughness =
            0.1
        }

        if (
          "metalness" in
          clonedMaterial
        ) {
          clonedMaterial.metalness =
            0
        }
      }else if (isHCL) {
        clonedMaterial.color?.set("#f5fbff")

        clonedMaterial.transparent = true
        clonedMaterial.opacity = 0.4
        clonedMaterial.depthWrite = false

        if ("roughness" in clonedMaterial) {
          clonedMaterial.roughness = 0.1
        }

        if ("metalness" in clonedMaterial) {
          clonedMaterial.metalness = 0
        }
      }

      // ======================================
      // OTHER LIQUIDS
      // ======================================

      else {
        clonedMaterial.transparent =
          false

        clonedMaterial.opacity =
          1

        clonedMaterial.depthWrite =
          true
      }
      if (lowerBeakerName.includes("main-buirette")) {
        clonedMaterial.transparent = true
        clonedMaterial.opacity = 0.6
        clonedMaterial.depthWrite = false
      }
      clonedMaterial.needsUpdate =
        true

      return clonedMaterial
    }

    // ========================================
    // APPLY MATERIAL
    // ========================================

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

    // ========================================
    // START LIQUID NEAR ZERO
    // ========================================

    selectedLiquidMesh.scale.y =
      0.001

    selectedLiquidMesh.scale.x =
      1

    speedRef.current = 1

    // ========================================
    // CONICAL FLASK
    // ========================================

    if (
      lowerBeakerName.includes(
        "conical-flask"
      )
    ) {
      amountRef.current = selectedAmount/100

      speedRef.current = 0.6
    }

    // ========================================
    // NORMAL BEAKER
    // ========================================

    else if (
      lowerBeakerName.includes(
        "normal-beaker"
      )
    ) {
      if ( selectedLesson === 11 && selectedAmount === 250) {
        amountRef.current = 1
      }else if(selectedLesson === 12 && selectedAmount === 100){
        amountRef.current = 0.4
      }else if(selectedLesson === 13 && selectedAmount === 100){
        amountRef.current = 0.5
      } else {
        amountRef.current =
        selectedAmount /100
      }

      speedRef.current = 0.3
    }

    // ========================================
    // TEST TUBE
    // ========================================

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

    // ========================================
    // ROUND BOTTOM FLASK
    // ========================================

    else if (
      isRoundBottomFlaskRef.current
    ) {
      amountRef.current =
        selectedAmount * 0.04

      speedRef.current = 20

      startXScaleRef.current =
        0.8

      targetXScaleRef.current =
        1.2

      selectedLiquidMesh.scale.x =
        startXScaleRef.current
    }

    // ========================================
    // GRADUATED CYLINDER
    // ========================================

 // ========================================
// 100 cm³ GRADUATED CYLINDER
// ========================================

else if (
  lowerBeakerName.includes(
    "main-graduated-cylinder-100"
  )
) {
  if (
    selectedLesson === 13 &&
    selectedAmount === 100
  ) {
    amountRef.current = 0.92
    speedRef.current = 0.4
  } else {
    amountRef.current =
      0.6

    speedRef.current = 1
  }
}

// ========================================
// NORMAL GRADUATED CYLINDER
// ========================================

else if (
  lowerBeakerName === "main-graduated-cylinder" 
) {
  if(selectedLesson===13 && selectedAmount===30){
    amountRef.current = 0.61
    speedRef.current = 0.45
  }
  else if(selectedLesson===14 && selectedAmount===35){
    amountRef.current = 0.7
    speedRef.current = 0.47
  }  
  else if(selectedLesson===14 && selectedAmount===10){
    amountRef.current = 0.2
    speedRef.current = 0.25
  }
  else{
  amountRef.current =
    selectedAmount * 1.1

  speedRef.current = 20
  }

}
          // ========================================
    // BURETTE
    // ========================================

    else if (
      lowerBeakerName.includes(
        "main-buirette"
      )
    ) {
      amountRef.current =
        selectedAmount / 63

      speedRef.current = 0.4
    }

    // ========================================
    // FALLBACK
    // ========================================

    else {
      amountRef.current =
        selectedAmount * 0.2

      speedRef.current = 20
    }

    console.log(
      "🎯 Target liquid scale:",
      amountRef.current
    )
  }, [
    beakerRef,
    hand,
    fillData?.name,
    fillData?.color,
    fillData?.amount,
    selectedLesson
  ])

  // ==========================================
  // FILL ANIMATION
  // ==========================================

  useFrame((_, delta) => {
    if (
      liquidMeshesRef.current
        .length === 0
    ) {
      return
    }

    if (
      fillCompletedRef.current
    ) {
      return
    }

    let isFillDone = true

    liquidMeshesRef.current.forEach(
      (mesh) => {
        if (!mesh) return

        if (!amountRef.current) {
          isFillDone = false
          return
        }

        // ====================================
        // SCALE LIQUID UP
        // ====================================

        mesh.scale.y = Math.min(
          mesh.scale.y +
            speedRef.current *
              delta,
          amountRef.current
        )

        // ====================================
        // ROUND BOTTOM FLASK X SCALE
        // ====================================

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

        // ====================================
        // CHECK IF FINISHED
        // ====================================

        if (
          mesh.scale.y <
          amountRef.current
        ) {
          isFillDone = false
        }

        mesh.updateMatrixWorld(
          true
        )

        // ====================================
        // LABEL POSITION
        // ====================================

        if (
          labelGroupRef.current
        ) {
          mesh.getWorldPosition(
            labelPositionRef.current
          )

          labelPositionRef.current.y +=
            1

          labelGroupRef.current.position.copy(
            labelPositionRef.current
          )
        }
      }
    )

    if (!isFillDone) return

    // ========================================
    // FILL FINISHED
    // ========================================

    fillCompletedRef.current =
      true

    setIsFillUpBeaker(false)

    console.log(
      "✅ Liquid filling completed"
    )

    // ========================================
    // LESSON STEPS
    // ========================================

    if (
      selectedLesson === 8 &&
      lessonStep === 20
    ) {
      setLessonStep(21)
    }

    if (
      selectedLesson === 10 &&
      lessonStep === 20.5
    ) {
      setLessonStep(21)
    }

    if (
      selectedLesson === 9 &&
      lessonStep === 18
    ) {
      setLessonStep(19)
    }

    if (
      selectedLesson === 10 &&
      lessonStep === 28
    ) {
      setLessonStep(29)
    }

    if (
      selectedLesson === 10 &&
      lessonStep === 35
    ) {
      setLessonStep(36)
    }

    if (
      selectedLesson === 10 &&
      lessonStep === 91
    ) {
      setLessonStep(92)
    }

    if (
      selectedLesson === 10 &&
      lessonStep === 94
    ) {
      setLessonStep(95)
    }

    if (
      selectedLesson === 10 &&
      lessonStep === 98
    ) {
      setLessonStep(99)
    }

    if (
      selectedLesson === 11 &&
      lessonStep === 5
    ) {
      setLessonStep(6)
    }

    if (
      selectedLesson === 11 &&
      lessonStep === 19
    ) {
      setLessonStep(20)
    }

    if (
      selectedLesson === 11 &&
      lessonStep === 32
    ) {
      setLessonStep(33)
    }

    if (
      selectedLesson === 11.1 &&
      lessonStep === 56
    ) {
      setLessonStep(57)
    }

    if (
      selectedLesson === 11.1 &&
      lessonStep === 65
    ) {
      setLessonStep(66)
    }

    if (
      selectedLesson === 12 &&
      lessonStep === 17
    ) {
      setLessonStep(18)
    }

    if (
      selectedLesson === 12.1 &&
      lessonStep === 31
    ) {
      setLessonStep(32)
    }

    if (
      selectedLesson === 12.1 &&
      lessonStep === 37
    ) {
      setLessonStep(38)
    } 

    if (
      selectedLesson === 12.2 &&
      lessonStep === 65
    ) {
      setLessonStep(66)
    }  

    if(selectedLesson==13 && lessonStep ===7){
      setLessonStep(8)
    }
    if(selectedLesson==13 && lessonStep ===10){
      setLessonStep(11)
    }

     if(selectedLesson==13 && lessonStep ===3.3){
      setLessonStep(3.4)
    }   

    if ( selectedLesson === 14 && lessonStep === 5 ) {
      setLessonStep(6)
    }  
    
    if ( selectedLesson === 14 && lessonStep === 11 ) {
      setLessonStep(12)
    }     
  }
)

  // ==========================================
  // UI
  // ==========================================

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