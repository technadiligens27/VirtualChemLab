import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"

import {
  useFrame,
  useThree,
} from "@react-three/fiber"

import * as THREE from "three"

import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import PouringLiquid from "../PouringLiquid/PouringLiquid"
import PourFromTestube from "../PourFromTestube/PourFromTestube"
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import PourPowderFromTestube from "../PourPowderFromTestube/PourPowderFromTestube"
import PourFromKettle from "../Pouring/PourFromKettle/PourFromKettle"
import PourFromGraduatedCylinder from "../Pouring/PourFromGraduatedCylinder/PourFromGraduatedCylinder"
import PourFromBeaker from "../Pouring/PourFromBeaker/PourFromBeaker"
import PourFromWaterBottle from "../Pouring/PourFromWaterBottle/PourFromWaterBottle"

const PouringMode = ({
  hand,
  isFunnelMode,
}) => {
  const { camera } = useThree()

  const {
    selectedRightHand,
    selectedLeftHand,

    setPouredFromLeft,
    setPouredFromRight,

    isPouring,
    setIsPouring,

    pouringModeHand,
    setPouringModeHand,

    isPouringMode,
    setIsPouringMode,

    rightBeakerFillData,
    leftBeakerFillData,

    isPottasiumCarobnateInTestube01,
    setShowBubbles,
    beakerFillFinished,
  } = useContext(InteractionContext)

  const {
    testube01Ref,
    testube04Ref,
    testube05Ref,
    testube06Ref,
    normalBeakerRef,
    volumetricRef,waterBottleRef
  } = useContext(ModelContext)

  const {
    lessonStep,
    setLessonStep,
    setShowErrorMsgNo,
    labResetKey,
    isTutorialMode,
    selectedLesson,
  } = useContext(
    MainGuidelineContext
  )

  const emptyRef =
    useRef(null)

  const rotationZRef =
    useRef(0)

  const baseRotationRef =
    useRef(
      new THREE.Euler(
        0,
        0,
        0
      )
    )

  const originalPositionRef =
    useRef(null)

  const originalRotationRef =
    useRef(null)

  const otherOriginalPositionRef =
    useRef(null)

  const otherOriginalRotationRef =
    useRef(null)

  const activeOtherObjectRef =
    useRef(null)

  const volumetricOriginalScaleRef =
    useRef(null)

  const [
    activeObject,
    setActiveObject,
  ] = useState(null)

  // =====================================================
  // FUNNEL MODE
  // SCALE VOLUMETRIC FLASK IF IT IS IN RIGHT HAND
  // =====================================================

  useEffect(() => {
    if (!isFunnelMode) return

    if (
      selectedRightHand?.name !==
      "volumetric-flask"
    ) {
      return
    }

    if (!volumetricRef?.current) {
      return
    }

    const volumetricFlask =
      volumetricRef.current

    volumetricOriginalScaleRef.current =
      volumetricFlask.scale.clone()

    volumetricFlask.scale.setScalar(
      0.7
    )

    volumetricFlask.updateMatrixWorld(
      true
    )

    return () => {
      if (
        volumetricRef?.current &&
        volumetricOriginalScaleRef.current
      ) {
        volumetricRef.current.scale.copy(
          volumetricOriginalScaleRef.current
        )

        volumetricRef.current.updateMatrixWorld(
          true
        )
      }
    }
  }, [
    isFunnelMode,
    selectedRightHand,
    volumetricRef,
  ])

  /*
   * Find mouth of receiving object.
   */
  useEffect(() => {
    emptyRef.current = null

    const receivingObject =
      hand === "right"
        ? selectedLeftHand?.ref?.current
        : selectedRightHand?.ref?.current

    if (!receivingObject) return

    receivingObject.traverse(
      (child) => {
        const childName =
          child.name?.toLowerCase() ||
          ""

        if (
          childName.includes(
            "mouth"
          )
        ) {
          emptyRef.current =
            child
        }
      }
    )
  }, [
    hand,
    selectedLeftHand,
    selectedRightHand,
  ])

  /*
   * Hide Test Tube 01 cap when selected.
   */
  useEffect(() => {
    const isTestube01Selected =
      selectedLeftHand?.name ===
        "main-testube-01" ||
      selectedRightHand?.name ===
        "main-testube-01"

    if (
      !isTestube01Selected
    ) {
      return
    }

    const testTube =
      testube01Ref.current

    if (!testTube) return

    testTube.traverse(
      (child) => {
        const childName =
          child.name?.toLowerCase() ||
          ""

        if (
          childName.includes(
            "cap"
          )
        ) {
          child.visible = false
        }
      }
    )
  }, [
    selectedLeftHand,
    selectedRightHand,
    testube01Ref,
  ])

  /*
   * Clear local pouring state after reset.
   */
  useLayoutEffect(() => {
    if (
      pouringModeHand ===
      hand
    ) {
      return
    }

    rotationZRef.current = 0

    baseRotationRef.current.set(
      0,
      0,
      0
    )

    originalPositionRef.current =
      null

    originalRotationRef.current =
      null

    otherOriginalPositionRef.current =
      null

    otherOriginalRotationRef.current =
      null

    activeOtherObjectRef.current =
      null

    setActiveObject(null)
  }, [
    labResetKey,
    pouringModeHand,
    hand,
  ])

  /*
   * Enter / Exit Pouring Mode
   *
   * P         = Right Hand
   * Shift + P = Left Hand
   */
  useEffect(() => {
    const getPouringObjects =
      () => {
        if (
          hand === "right"
        ) {
          return {
            targetObject:
              selectedRightHand
                ?.ref?.current,

            otherObject:
              selectedLeftHand
                ?.ref?.current,
          }
        }

        return {
          targetObject:
            selectedLeftHand
              ?.ref?.current,

          otherObject:
            selectedRightHand
              ?.ref?.current,
        }
      }

    const saveOriginalTransforms =
      (
        targetObject,
        otherObject
      ) => {
        originalPositionRef.current =
          targetObject.position.clone()

        originalRotationRef.current =
          targetObject.rotation.clone()

        if (otherObject) {
          otherOriginalPositionRef.current =
            otherObject.position.clone()

          otherOriginalRotationRef.current =
            otherObject.rotation.clone()
        } else {
          otherOriginalPositionRef.current =
            null

          otherOriginalRotationRef.current =
            null
        }

        activeOtherObjectRef.current =
          otherObject
      }

    const restoreOriginalTransforms =
      (
        targetObject,
        otherObject
      ) => {
        if (
          targetObject &&
          originalPositionRef.current
        ) {
          targetObject.position.copy(
            originalPositionRef.current
          )
        }

        if (
          targetObject &&
          originalRotationRef.current
        ) {
          targetObject.rotation.copy(
            originalRotationRef.current
          )
        }

        if (
          otherObject &&
          otherOriginalPositionRef.current
        ) {
          otherObject.position.copy(
            otherOriginalPositionRef.current
          )
        }

        if (
          otherObject &&
          otherOriginalRotationRef.current
        ) {
          otherObject.rotation.copy(
            otherOriginalRotationRef.current
          )
        }

        targetObject?.updateMatrixWorld(
          true
        )

        otherObject?.updateMatrixWorld(
          true
        )
      }

    const resetLocalPouringState =
      () => {
        rotationZRef.current =
          0

        baseRotationRef.current.set(
          0,
          0,
          0
        )

        setIsPouring(false)

        setPouredFromLeft(
          false
        )

        setPouredFromRight(
          false
        )

        setActiveObject(null)

        originalPositionRef.current =
          null

        originalRotationRef.current =
          null

        otherOriginalPositionRef.current =
          null

        otherOriginalRotationRef.current =
          null

        activeOtherObjectRef.current =
          null
      }

    const moveRightHandObject =
      (
        targetObject,
        otherObject
      ) => {
        if (
          !emptyRef.current
        ) {
          return
        }

        if (otherObject) {
          otherObject.position.set(
            -1,
            -0.5,
            -5
          )
        }

        const targetObjectName =
          targetObject?.name?.toLowerCase() ||
          ""

        const otherObjectName =
          otherObject?.name?.toLowerCase() ||
          ""

        const isKettle =
          targetObjectName.includes(
            "kettle"
          )

        const isGraduatedCylinder =
          targetObjectName.includes(
            "main-graduated-cylinder"
          )

        const isTestube04 =
          targetObjectName.includes(
            "main-testube-04"
          )

        const isTestube05 =
          targetObjectName.includes(
            "main-testube-05"
          )

        const isTestube06 =
          targetObjectName.includes(
            "main-testube-06"
          )

        const isConicalFlask =
          otherObjectName.includes(
            "main-conical-flask"
          )

        if (
          isConicalFlask &&
          otherObject
        ) {
          otherObject.rotation.y =
            Math.PI
        }

        const worldPosition =
          new THREE.Vector3()

        emptyRef.current.getWorldPosition(
          worldPosition
        )

        const localPosition =
          camera.worldToLocal(
            worldPosition.clone()
          )

        if (isKettle) {
          localPosition.add(
            new THREE.Vector3(
              1.5,
              0.3,
              -0.8
            )
          )
        } else if (
          isConicalFlask
        ) {
          localPosition.add(
            new THREE.Vector3(
              2,
              -0.3,
              -0.5
            )
          )
        } else if (
          isGraduatedCylinder
        ) {
          localPosition.add(
            new THREE.Vector3(
              3,
              -0.5,
              -0.5
            )
          )
        } else if (
          isTestube04 ||
          isTestube05 ||
          isTestube06
        ) {
          localPosition.add(
            new THREE.Vector3(
              2.5,
              -0.4,
              -0.5
            )
          )
        } else {
          localPosition.add(
            new THREE.Vector3(
              1,
              -0.3,
              -0.5
            )
          )
        }

        targetObject.position.copy(
          localPosition
        )

        targetObject.updateMatrixWorld(
          true
        )

        otherObject?.updateMatrixWorld(
          true
        )
      }

    const moveLeftHandObject =
      (
        targetObject,
        otherObject
      ) => {
        if (
          !emptyRef.current
        ) {
          return
        }

        if (otherObject) {
          otherObject.position.set(
            1,
            -0.5,
            -5
          )
        }

        const targetObjectName =
          targetObject?.name?.toLowerCase() ||
          ""

        const otherObjectName =
          otherObject?.name?.toLowerCase() ||
          ""

        const isKettle =
          targetObjectName.includes(
            "kettle"
          )

        const isNormalBeaker =
          otherObjectName.includes(
            "main-normal-beaker"
          )

        const isWaterBottle =
          otherObjectName.includes(
            "water-bottle"
          )  

        const isVolumetricFlask =
          otherObjectName.includes(
            "volumetric-flask"
          )   

        const worldPosition =
          new THREE.Vector3()

        emptyRef.current.getWorldPosition(
          worldPosition
        )

        const localPosition =
          camera.worldToLocal(
            worldPosition.clone()
          )

          


        if (isKettle) {
          localPosition.add(
            new THREE.Vector3(
              -1.5,
              0.3,
              -0.8
            )
          )
        } else if (
          isNormalBeaker
        ) {
          localPosition.add(
            new THREE.Vector3(
              -1,
              0.1,
              -0.5
            )
          )
        } else if (
        isVolumetricFlask
      ) {
        localPosition.add(
          new THREE.Vector3(
            -2.2, // X offset of water bottle
            -0,  // Y offset of water bottle
            -0.5
          )
        )
      } else {
          localPosition.add(
            new THREE.Vector3(
              -2,
              0.1,
              -0.5
            )
          )
        }

        targetObject.position.copy(
          localPosition
        )

        targetObject.updateMatrixWorld(
          true
        )

        otherObject?.updateMatrixWorld(
          true
        )
      }

    const setStartingRotation =
      (targetObject) => {
        rotationZRef.current =
          0

        baseRotationRef.current.set(
          0,
          0,
          0
        )

        const targetName =
          targetObject.name?.toLowerCase() ||
          ""

        const isRightNormalBeaker =
          hand === "right" &&
          targetName.includes(
            "main-normal-beaker"
          )

        if (
          isRightNormalBeaker
        ) {
          baseRotationRef.current.y =
            Math.PI
        }

        targetObject.rotation.copy(
          baseRotationRef.current
        )

        targetObject.updateMatrixWorld(
          true
        )
      }

    const handleKeyDown =
      (event) => {
        if (
          event.code !== "KeyP"
        ) {
          return
        }

        const requestedHand =
          event.shiftKey
            ? "left"
            : "right"

        if (
          requestedHand !==
          hand
        ) {
          return
        }

        if (
          requestedHand ===
            "left" &&
          selectedLesson ===
            11 &&
          lessonStep === 20
        ) {
          setLessonStep(21)
        }

        /*
         * Prevent both hands entering pouring mode.
         */
        if (
          pouringModeHand &&
          pouringModeHand !==
            requestedHand
        ) {
          setShowErrorMsgNo(
            3
          )

          return
        }

        const {
          targetObject,
          otherObject,
        } =
          getPouringObjects()

        /*
         * EXIT POURING MODE
         */
        if (
          pouringModeHand ===
            requestedHand &&
          activeObject
        ) {
          restoreOriginalTransforms(
            activeObject,
            activeOtherObjectRef.current
          )

          resetLocalPouringState()

          setPouringModeHand(
            null
          )

          // Lesson 8
          if (
            selectedLesson ===
              8 &&
            lessonStep === 36
          ) {
            setLessonStep(39)

            setShowBubbles(
              false
            )
          }

          // Lesson 9
          if (
            selectedLesson ===
              9 &&
            lessonStep === 33
          ) {
            setLessonStep(34)

            setShowBubbles(
              false
            )
          }

          // Lesson 10
          if (
            selectedLesson ===
              10 &&
            lessonStep === 7
          ) {
            setLessonStep(8)

            setShowBubbles(
              false
            )
          }

          if (
            selectedLesson ===
              10 &&
            lessonStep === 24
          ) {
            setLessonStep(25)
          }

          if (
            selectedLesson ===
              10 &&
            lessonStep === 31
          ) {
            setLessonStep(32)
          }

          if (
            selectedLesson ===
              10 &&
            lessonStep === 38
          ) {
            setLessonStep(39)
          }

          if (
            selectedLesson ===
              10 &&
            lessonStep === 112
          ) {
            setLessonStep(113)
          }

          if (
            selectedLesson ===
              10 &&
            lessonStep === 120
          ) {
            setLessonStep(121)
          }

          if (
            selectedLesson ===
              11 &&
            lessonStep === 22
          ) {
            setLessonStep(23)
          }

          if (
            selectedLesson ===
              12 &&
            lessonStep === 20
          ) {
            setLessonStep(21)
          }

          if (
            selectedLesson ===
              12.1 &&
            lessonStep === 29
          ) {
            setLessonStep(30)
          }

          if (
            selectedLesson ===
              12.1 &&
            lessonStep === 35
          ) {
            setLessonStep(36)
          }

          if (
            selectedLesson ===
              12.1 &&
            lessonStep === 41
          ) {
            setLessonStep(42)
          }

          return
        }

        /*
         * ENTER POURING MODE
         */
        if (
          !emptyRef.current ||
          !targetObject
        ) {
          return
        }

        setIsPouringMode(
          true
        )

        saveOriginalTransforms(
          targetObject,
          otherObject
        )

        if (
          hand === "right"
        ) {
          moveRightHandObject(
            targetObject,
            otherObject
          )
        } else {
          moveLeftHandObject(
            targetObject,
            otherObject
          )
        }

        setStartingRotation(
          targetObject
        )

        setIsPouring(false)

        setPouredFromLeft(
          false
        )

        setPouredFromRight(
          false
        )

        setActiveObject(
          targetObject
        )

        setPouringModeHand(
          requestedHand
        )

        // Lesson 8
        if (
          selectedLesson ===
            8 &&
          lessonStep === 34
        ) {
          setLessonStep(35)
        }

        // Lesson 9
        if (
          selectedLesson ===
            9 &&
          lessonStep === 31
        ) {
          setLessonStep(32)
        }

        // Lesson 10
        if (
          selectedLesson ===
            10 &&
          lessonStep === 5
        ) {
          setLessonStep(6)
        }

        if (
          selectedLesson ===
            10 &&
          lessonStep === 22
        ) {
          setLessonStep(23)
        }

        if (
          selectedLesson ===
            10 &&
          lessonStep === 29
        ) {
          setLessonStep(30)
        }

        if (
          selectedLesson ===
            10 &&
          lessonStep === 36
        ) {
          setLessonStep(37)
        }

        if (
          selectedLesson ===
            10 &&
          lessonStep === 109
        ) {
          setLessonStep(110)
        }

        if (
          selectedLesson ===
            10 &&
          lessonStep === 117
        ) {
          setLessonStep(118)
        }

        if (
          selectedLesson ===
            12 &&
          lessonStep === 18
        ) {
          setLessonStep(19)
        }

        if (
          selectedLesson ===
            12.1 &&
          lessonStep === 27
        ) {
          setLessonStep(28)
        }

        if (
          selectedLesson ===
            12.1 &&
          lessonStep === 33
        ) {
          setLessonStep(34)
        }

        if (
          selectedLesson ===
            12.1 &&
          lessonStep === 39
        ) {
          setLessonStep(40)
        }
      }

    window.addEventListener(
      "keydown",
      handleKeyDown
    )

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      )
    }
  }, [
    hand,
    selectedRightHand,
    selectedLeftHand,
    camera,
    activeObject,
    pouringModeHand,
    setIsPouring,
    setPouredFromLeft,
    setPouredFromRight,
    setLessonStep,
    setShowErrorMsgNo,
    setPouringModeHand,
    isPouringMode,
    lessonStep,
    isTutorialMode,
    selectedLesson,
  ])

  /*
   * Hide cap for Lesson 8
   */
  useEffect(() => {
    if (
      selectedLesson !== 8
    ) {
      return
    }

    const testTube =
      testube01Ref.current

    if (!testTube) return

    testTube.traverse(
      (child) => {
        if (
          child.name
            ?.toLowerCase()
            .includes("cap")
        ) {
          child.visible =
            false
        }
      }
    )
  }, [
    selectedLesson,
    testube01Ref,
  ])

  /*
   * Mouse wheel pouring rotation
   */
  useEffect(() => {
    const handleWheel =
      (event) => {
        if (
          !activeObject ||
          pouringModeHand !==
            hand
        ) {
          return
        }

        event.preventDefault()

        const maxRotation =
          Math.PI / 5

        const rotationSpeed =
          0.15

        if (
          event.deltaY > 0
        ) {
          if (
            hand === "left"
          ) {
            rotationZRef.current =
              Math.max(
                rotationZRef.current -
                  rotationSpeed,
                -maxRotation
              )
          } else {
            rotationZRef.current =
              Math.min(
                rotationZRef.current +
                  rotationSpeed,
                maxRotation
              )
          }
        }

        if (
          event.deltaY < 0
        ) {
          if (
            hand === "left"
          ) {
            rotationZRef.current =
              Math.min(
                rotationZRef.current +
                  rotationSpeed,
                0
              )
          } else {
            rotationZRef.current =
              Math.max(
                rotationZRef.current -
                  rotationSpeed,
                0
              )
          }
        }
      }

    window.addEventListener(
      "wheel",
      handleWheel,
      {
        passive: false,
      }
    )

    return () => {
      window.removeEventListener(
        "wheel",
        handleWheel
      )
    }
  }, [
    activeObject,
    pouringModeHand,
    hand,
  ])

  /*
   * Apply pouring rotation
   */
  useFrame(() => {
    if (
      !activeObject ||
      pouringModeHand !== hand
    ) {
      return
    }

    activeObject.rotation.set(
      baseRotationRef.current.x,
      baseRotationRef.current.y,
      baseRotationRef.current.z +
        rotationZRef.current
    )

    const pouringAngle =
      Math.PI / 5

    const pouringNow =
      (selectedLesson !== 9 ||
        !beakerFillFinished) &&
      Math.abs(
        rotationZRef.current
      ) >= pouringAngle

    if (
      pouringNow !==
      isPouring
    ) {
      setIsPouring(
        pouringNow
      )
    }
  })

  return (
      <>
        {selectedLesson !== 12 && selectedLesson !==8 && hand === "right" && selectedRightHand?.name === "main-testube-01" && !isPottasiumCarobnateInTestube01 &&  
        <PourFromTestube isPouring={isPouring} hand="right" 
        model={testube01Ref.current} liquidColor={rightBeakerFillData.color} />}

        {hand === "right" && selectedRightHand?.name === "main-testube-04" && 
        <PourFromTestube isPouring={isPouring} hand="right" model={testube04Ref.current} liquidColor={rightBeakerFillData.color} />}

        {hand === "right" && selectedRightHand?.name === "main-testube-05" && 
        <PourFromTestube isPouring={isPouring} hand="right" model={testube05Ref.current} liquidColor={rightBeakerFillData.color} />}

        {hand === "right" && selectedRightHand?.name === "main-testube-06" && 
        <PourFromTestube isPouring={isPouring} hand="right" model={testube06Ref.current} liquidColor={rightBeakerFillData.color} />}

        {hand === "left" && selectedLeftHand?.name === "main-testube-01" && isPottasiumCarobnateInTestube01 &&
         <PourPowderFromTestube isPouring={isPouring} model={testube01Ref.current} />}

        {hand === "right" && selectedRightHand?.name === "main-testube-01" && isPottasiumCarobnateInTestube01 && 
        <PourPowderFromTestube isPouring={isPouring} model={testube01Ref.current} />}

        {hand === "right" && !beakerFillFinished && selectedRightHand?.name === "kettle" && selectedLeftHand?.name === "main-normal-beaker" && <PourFromKettle color="#0073a0" isPouring={isPouring} />}

        {hand === "right" && selectedRightHand?.name === "main-graduated-cylinder" && 
        <PourFromGraduatedCylinder isPouring={isPouring} />}

        {[11, 11.1].includes(selectedLesson) && hand === "left" && selectedLeftHand?.name === "main-normal-beaker" && selectedRightHand?.name === "volumetric-flask" && 
        <PourFromBeaker modelRef={normalBeakerRef} otherModelRef={volumetricRef} isPouring={isPouring} otherLiquidColor={"##f8fafc"}/>}

        {selectedLesson === 12.1 && [ 34, 40].includes(lessonStep) && hand === "left" && selectedLeftHand?.name === "main-normal-beaker" && selectedRightHand?.name === "volumetric-flask" &&
         <PourFromBeaker pourAmount={0.1} modelRef={normalBeakerRef} isPouring={isPouring} otherModelRef={volumetricRef} liquidAmount={0.1} otherLiquidOpacity={0.35} otherLiquidColor={"#EAFBFF"} />}

        {selectedLesson === 12.1 && [28].includes(lessonStep) && hand === "left" && selectedLeftHand?.name === "main-normal-beaker" && selectedRightHand?.name === "volumetric-flask" &&
         <PourFromBeaker pourAmount={0.1} modelRef={normalBeakerRef} isPouring={isPouring} otherModelRef={volumetricRef} liquidAmount={0.4} otherLiquidOpacity={0.35} otherLiquidColor={"#EAFBFF"} />}

        {selectedLeftHand?.name==="water-bottle" && selectedRightHand?.name ==="volumetric-flask" && (
         <PourFromWaterBottle
            isPouring={isPouring}
            modelRef={waterBottleRef}
            otherModelRef={volumetricRef}
            otherLiquidAmount={0.9}
            otherLiquidColor="#EAFBFF"
            otherLiquidColorOpacity={0.35}
            otherLiquidSpeed={0.1}
            pourSpeed={5}
        />
        )}  



      </>
  )
}

export default PouringMode