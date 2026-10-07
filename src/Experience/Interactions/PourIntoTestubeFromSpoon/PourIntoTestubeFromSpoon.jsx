import {
  useContext,
  useEffect,
  useRef,
} from "react"

import {
  useFrame,
} from "@react-three/fiber"

import * as THREE from "three"

import {
  MainGuidelineContext,
} from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

import {
  InteractionContext,
} from "../../../Contexts/InteractionContext/InteractionContext"


const PourIntoTestubeFromSpoon = ({
  testubeRef,

  spoonRef,

  hand,

  heightOffset = 0.3,

  xOffset = 0.2,

  // Final powder opacity from 0 to 1.
  powderEndOpacity = 1,
}) => {

  const {
    lessonStep,

    selectedLesson,

    setLessonStep,
  } = useContext(
    MainGuidelineContext
  )


  const {
    isPotassiumTransferred,

    setIsPotassiumTransferred,

    setIsPottasiumCarobnateInTestube01,
  } = useContext(
    InteractionContext
  )


  // =====================================================
  // POWDER LOGIC BLOCK
  // =====================================================

  const isPowderLogicBlocked =
    selectedLesson === 14 ||
    selectedLesson === 14.1 ||
    selectedLesson === 14.2 ||
    selectedLesson === 14.3


  // =====================================================
  // SCROLL CONDITIONS
  // =====================================================
  //
  // Scroll DOWN:
  // Lesson 14.3 / Step 89
  //
  // Scroll UP:
  // Lesson 14.3 / Step 90
  //
  // These are completely separate conditions.
  // =====================================================

  const canScrollDown = (selectedLesson === 14.3 && lessonStep === 89) ||
                        (selectedLesson === 12 && lessonStep === 10)

  const canScrollUp = ((selectedLesson === 14.3 && lessonStep === 90) ||
                        (selectedLesson==12 && lessonStep ==11)                        
)


  const finalPowderOpacity =
    THREE.MathUtils.clamp(
      powderEndOpacity,
      0,
      1
    )


  // =====================================================
  // REFS
  // =====================================================

  const spoonRotationXRef =
    useRef(0)


  const minimumRotationXRef =
    useRef(0)


  const maximumRotationXRef =
    useRef(0)


  const originalSpoonPositionRef =
    useRef(null)


  const originalSpoonRotationRef =
    useRef(null)


  const originalTestTubePositionRef =
    useRef(null)


  const originalTestTubeRotationRef =
    useRef(null)


  const potassiumPiecesRef =
    useRef([])


  const powderMaterialsRef =
    useRef([])


  const isPotassiumFallingRef =
    useRef(false)


  const targetPowderOpacityRef =
    useRef(0)


  const powderRevealFinishedRef =
    useRef(false)


  // =====================================================
  // STEP CHANGES WHEN COMPONENT STARTS
  // =====================================================

  useEffect(() => {

    if (
      selectedLesson === 14.3 &&
      lessonStep === 88
    ) {

      setLessonStep(89)
    }

  }, [
    lessonStep,
    selectedLesson,
    setLessonStep,
  ])


  useEffect(() => {

    if (
      selectedLesson === 14.1 &&
      lessonStep === 28
    ) {

      setLessonStep(29)
    }

  }, [
    lessonStep,
    selectedLesson,
    setLessonStep,
  ])


  useEffect(() => {

    if (
      selectedLesson === 12 &&
      lessonStep === 9
    ) {

      setLessonStep(10)
    }

  }, [
    lessonStep,
    selectedLesson,
    setLessonStep,
  ])


  useEffect(() => {

    if (
      selectedLesson === 8 &&
      lessonStep === 11
    ) {

      setLessonStep(12)
    }

  }, [
    lessonStep,
    selectedLesson,
    setLessonStep,
  ])


  useEffect(() => {

    if (
      selectedLesson === 13 &&
      lessonStep === 18
    ) {

      setLessonStep(19)
    }

  }, [
    lessonStep,
    selectedLesson,
    setLessonStep,
  ])


  useEffect(() => {

    if (
      selectedLesson === 9 &&
      lessonStep === 9
    ) {

      setLessonStep(10)
    }

  }, [
    lessonStep,
    selectedLesson,
    setLessonStep,
  ])


  // =====================================================
  // INITIAL SETUP
  // =====================================================

  useEffect(() => {

    const testTube =
      testubeRef?.current


    const spoon =
      spoonRef?.current


    if (
      !testTube ||
      !spoon
    ) {
      return
    }


    const spoonParent =
      spoon.parent


    if (!spoonParent) {

      console.log(
        "Spoon parent not found"
      )

      return
    }


    let mouth = null


    const potassiumPieces =
      []


    const powderMaterials =
      []


    // ===================================================
    // FIND POTASSIUM PIECES INSIDE SPOON
    // ===================================================

    spoon.traverse(
      (child) => {

        const childName =
          child.name
            ?.toLowerCase() ||
          ""


        if (
          childName.includes(
            "pottasium"
          )
        ) {

          potassiumPieces.push({

            object:
              child,


            originalPosition:
              child.position.clone(),


            originalVisible:
              child.visible,


            startWorldPosition:
              new THREE.Vector3(),


            delay:
              THREE.MathUtils.randFloat(
                0,
                0.4
              ),


            speed:
              THREE.MathUtils.randFloat(
                1.5,
                3
              ),


            zDrift:
              THREE.MathUtils.randFloat(
                -0.12,
                0.12
              ),


            elapsed:
              0,


            finished:
              false,
          })
        }
      }
    )


    potassiumPiecesRef.current =
      potassiumPieces


    // ===================================================
    // TEST TUBE
    // FIND MOUTH + POWDER
    // ===================================================

    testTube.traverse(
      (child) => {

        const childName =
          child.name
            ?.toLowerCase() ||
          ""


        // Mouth may be an Object3D or Empty.

        if (
          !mouth &&
          childName.includes(
            "mouth"
          )
        ) {

          mouth =
            child


          console.log(
            "Test tube mouth found:",
            child.name
          )
        }


        const isPowderMesh =
          child.isMesh &&
          childName.includes(
            "powder"
          ) &&
          !childName.includes(
            "pour"
          ) &&
          child.material


        if (
          !isPowderMesh
        ) {
          return
        }


        // Keep test-tube powder hidden
        // for blocked lessons.

        if (
          isPowderLogicBlocked
        ) {

          child.visible =
            false

          return
        }


        const originalMaterials =
          Array.isArray(
            child.material
          )
            ? child.material
            : [
                child.material,
              ]


        const clonedMaterials =
          originalMaterials.map(
            (
              originalMaterial
            ) => {

              const clonedMaterial =
                originalMaterial.clone()


              clonedMaterial.transparent =
                true


              clonedMaterial.depthWrite =
                false


              clonedMaterial.opacity =
                isPotassiumTransferred
                  ? finalPowderOpacity
                  : 0


              clonedMaterial.needsUpdate =
                true


              powderMaterials.push({

                object:
                  child,

                material:
                  clonedMaterial,
              })


              return clonedMaterial
            }
          )


        child.material =
          Array.isArray(
            child.material
          )
            ? clonedMaterials
            : clonedMaterials[0]


        child.visible =
          isPotassiumTransferred
      }
    )


    powderMaterialsRef.current =
      powderMaterials


    console.log(
      "Potassium spoon pieces:",
      potassiumPieces.length
    )


    console.log(
      "Test tube powder materials:",
      powderMaterials.length
    )


    if (!mouth) {

      console.log(
        "Test tube mouth not found"
      )

      return
    }


    // ===================================================
    // SAVE ORIGINAL TRANSFORMS
    // ===================================================

    originalSpoonPositionRef.current =
      spoon.position.clone()


    originalSpoonRotationRef.current =
      spoon.rotation.clone()


    originalTestTubePositionRef.current =
      testTube.position.clone()


    originalTestTubeRotationRef.current =
      testTube.rotation.clone()


    // ===================================================
    // TRANSFER ALREADY COMPLETED
    // ===================================================

    if (
      isPotassiumTransferred
    ) {

      potassiumPiecesRef.current.forEach(
        (piece) => {

          piece.object.visible =
            false
        }
      )


      if (
        !isPowderLogicBlocked
      ) {

        powderMaterialsRef.current.forEach(
          ({
            object,
            material,
          }) => {

            object.visible =
              true


            material.opacity =
              finalPowderOpacity


            material.needsUpdate =
              true
          }
        )


        targetPowderOpacityRef.current =
          finalPowderOpacity


        powderRevealFinishedRef.current =
          true

      } else {

        targetPowderOpacityRef.current =
          0


        powderRevealFinishedRef.current =
          true
      }

    } else {

      targetPowderOpacityRef.current =
        0


      powderRevealFinishedRef.current =
        false
    }


    // ===================================================
    // TEST TUBE POSITION
    // ===================================================

    testTube.position.x =
      0


    testTube.updateMatrixWorld(
      true
    )


    spoonParent.updateMatrixWorld(
      true
    )


    // ===================================================
    // GET TEST TUBE MOUTH POSITION
    // ===================================================

    const targetPosition =
      new THREE.Vector3()


    mouth.getWorldPosition(
      targetPosition
    )


    targetPosition.y +=
      heightOffset


    targetPosition.x +=
      hand === "right"
        ? xOffset
        : -xOffset


    const localTargetPosition =
      spoonParent.worldToLocal(
        targetPosition.clone()
      )


    spoon.position.copy(
      localTargetPosition
    )


    // ===================================================
    // ROTATION LIMITS
    // ===================================================

    const startingRotationX =
      spoon.rotation.x


    spoonRotationXRef.current =
      startingRotationX


    minimumRotationXRef.current =
      startingRotationX


    maximumRotationXRef.current =
      startingRotationX +
      Math.PI / 2


    spoon.updateMatrixWorld(
      true
    )


    // ===================================================
    // CLEANUP
    // ===================================================

    return () => {

      isPotassiumFallingRef.current =
        false


      const currentSpoon =
        spoonRef?.current


      const currentTestTube =
        testubeRef?.current


      if (
        currentSpoon &&
        originalSpoonPositionRef.current
      ) {

        currentSpoon.position.copy(
          originalSpoonPositionRef.current
        )
      }


      if (
        currentSpoon &&
        originalSpoonRotationRef.current
      ) {

        currentSpoon.rotation.copy(
          originalSpoonRotationRef.current
        )
      }


      if (
        currentTestTube &&
        originalTestTubePositionRef.current
      ) {

        currentTestTube.position.copy(
          originalTestTubePositionRef.current
        )
      }


      if (
        currentTestTube &&
        originalTestTubeRotationRef.current
      ) {

        currentTestTube.rotation.copy(
          originalTestTubeRotationRef.current
        )
      }


      // =================================================
      // RESET POTASSIUM PIECES
      // =================================================

      if (
        !isPotassiumTransferred
      ) {

        potassiumPiecesRef.current.forEach(
          (piece) => {

            piece.object.position.copy(
              piece.originalPosition
            )


            piece.object.visible =
              piece.originalVisible


            piece.elapsed =
              0


            piece.finished =
              false
          }
        )


        powderMaterialsRef.current.forEach(
          ({
            object,
            material,
          }) => {

            object.visible =
              false


            material.opacity =
              0


            material.needsUpdate =
              true
          }
        )

      } else {

        potassiumPiecesRef.current.forEach(
          (piece) => {

            piece.object.visible =
              false
          }
        )
      }


      // Keep blocked lesson powder hidden.

      if (
        isPowderLogicBlocked &&
        currentTestTube
      ) {

        currentTestTube.traverse(
          (child) => {

            const childName =
              child.name
                ?.toLowerCase() ||
              ""


            if (
              child.isMesh &&
              childName.includes(
                "powder"
              ) &&
              !childName.includes(
                "pour"
              )
            ) {

              child.visible =
                false
            }
          }
        )
      }


      potassiumPiecesRef.current =
        []


      powderMaterialsRef.current =
        []


      currentSpoon
        ?.updateMatrixWorld(
          true
        )


      currentTestTube
        ?.updateMatrixWorld(
          true
        )
    }

  }, [
    testubeRef,

    spoonRef,

    hand,

    heightOffset,

    xOffset,

    finalPowderOpacity,

    isPowderLogicBlocked,

    isPotassiumTransferred,
  ])


  // =====================================================
  // SCROLL CONTROL
  // =====================================================

  useEffect(() => {

    const spoon =
      spoonRef?.current


    if (!spoon) {
      return
    }


    const rotationSpeed =
      0.12


    const handleWheel =
      (event) => {

        // =================================================
        // SCROLL DOWN
        // ONLY ALLOWED AT canScrollDown CONDITION
        // =================================================

        if (
          event.deltaY > 0
        ) {

          if (
            !canScrollDown
          ) {
            return
          }


          event.preventDefault()


          spoonRotationXRef.current =
            Math.min(
              spoonRotationXRef.current +
                rotationSpeed,

              maximumRotationXRef.current
            )
        }


        // =================================================
        // SCROLL UP
        // ONLY ALLOWED AT canScrollUp CONDITION
        // =================================================

        else if (
          event.deltaY < 0
        ) {

          if (
            !canScrollUp
          ) {
            return
          }


          event.preventDefault()


          spoonRotationXRef.current =
            Math.max(
              spoonRotationXRef.current -
                rotationSpeed,

              minimumRotationXRef.current
            )
        }


        // Ignore wheel event with no movement.

        else {

          return
        }


        // =================================================
        // APPLY ROTATION
        // =================================================

        spoon.rotation.x =
          spoonRotationXRef.current


        spoon.updateMatrixWorld(
          true
        )


        // =================================================
        // CHECK WHETHER SPOON IS FULLY TILTED
        // =================================================

        const isFullyTilted =
          spoonRotationXRef.current >=
          maximumRotationXRef.current -
            0.001


        if (
          isFullyTilted &&
          !isPotassiumFallingRef.current &&
          !isPotassiumTransferred
        ) {

          isPotassiumFallingRef.current =
            true


          powderRevealFinishedRef.current =
            false


          targetPowderOpacityRef.current =
            0


          // Do not reveal test-tube powder
          // during blocked lessons.

          if (
            !isPowderLogicBlocked
          ) {

            powderMaterialsRef.current.forEach(
              ({
                object,
                material,
              }) => {

                object.visible =
                  true


                material.opacity =
                  0


                material.needsUpdate =
                  true
              }
            )
          }


          // ===============================================
          // START FALLING PIECES
          // ===============================================

          potassiumPiecesRef.current.forEach(
            (piece) => {

              piece.elapsed =
                0


              piece.finished =
                false


              piece.object.visible =
                true


              piece.object.getWorldPosition(
                piece.startWorldPosition
              )
            }
          )
        }
      }


    window.addEventListener(
      "wheel",
      handleWheel,
      {
        passive:
          false,
      }
    )


    return () => {

      window.removeEventListener(
        "wheel",
        handleWheel
      )
    }

  }, [
    spoonRef,

    selectedLesson,

    lessonStep,

    canScrollDown,

    canScrollUp,

    isPotassiumTransferred,

    isPowderLogicBlocked,
  ])


  // =====================================================
  // LESSON 8
  // =====================================================

  useEffect(() => {

    if (
      isPotassiumTransferred &&
      selectedLesson === 8 &&
      lessonStep === 12
    ) {

      setLessonStep(
        13
      )
    }

  }, [
    lessonStep,

    selectedLesson,

    isPotassiumTransferred,

    setLessonStep,
  ])


  // =====================================================
  // LESSON 14.1
  // =====================================================

  useEffect(() => {

    if (
      isPotassiumTransferred &&
      selectedLesson === 14.1 &&
      lessonStep === 29
    ) {

      setLessonStep(
        30
      )
    }

  }, [
    lessonStep,

    selectedLesson,

    isPotassiumTransferred,

    setLessonStep,
  ])


  // =====================================================
  // LESSON 9
  // =====================================================

  useEffect(() => {

    if (
      isPotassiumTransferred &&
      selectedLesson === 9 &&
      lessonStep === 10
    ) {

      setLessonStep(
        11
      )
    }

  }, [
    lessonStep,

    selectedLesson,

    isPotassiumTransferred,

    setLessonStep,
  ])


  // =====================================================
  // LESSON 12
  // =====================================================

  useEffect(() => {

    if (
      isPotassiumTransferred &&
      selectedLesson === 12 &&
      lessonStep === 10
    ) {

      setLessonStep(
        11
      )
    }

  }, [
    lessonStep,

    selectedLesson,

    isPotassiumTransferred,

    setLessonStep,
  ])


  // =====================================================
  // LESSON 13
  // =====================================================

  useEffect(() => {

    if (
      isPotassiumTransferred &&
      selectedLesson === 13 &&
      lessonStep === 19
    ) {

      setLessonStep(
        20
      )
    }

  }, [
    lessonStep,

    selectedLesson,

    isPotassiumTransferred,

    setLessonStep,
  ])


  // =====================================================
  // LESSON 14.3
  // =====================================================

  useEffect(() => {

    if (
      isPotassiumTransferred &&
      selectedLesson === 14.3 &&
      lessonStep === 89
    ) {

      setLessonStep(
        90
      )
    }

  }, [
    lessonStep,

    selectedLesson,

    isPotassiumTransferred,

    setLessonStep,
  ])


  // =====================================================
  // FALLING POWDER ANIMATION
  // =====================================================

  useFrame(
    (
      _,
      delta
    ) => {

      const potassiumPieces =
        potassiumPiecesRef.current


      if (
        isPotassiumFallingRef.current
      ) {

        const maximumFallDistance =
          3.5


        let finishedCount =
          0


        potassiumPieces.forEach(
          (piece) => {

            if (
              piece.finished
            ) {

              finishedCount +=
                1

              return
            }


            piece.elapsed +=
              delta


            if (
              piece.elapsed <
              piece.delay
            ) {

              return
            }


            const object =
              piece.object


            const parent =
              object.parent


            if (!parent) {
              return
            }


            parent.updateMatrixWorld(
              true
            )


            const currentWorldPosition =
              new THREE.Vector3()


            object.getWorldPosition(
              currentWorldPosition
            )


            const distanceFallen =
              piece.startWorldPosition.y -
              currentWorldPosition.y


            if (
              distanceFallen >=
              maximumFallDistance
            ) {

              piece.finished =
                true


              object.visible =
                false


              finishedCount +=
                1


              return
            }


            const fallAmount =
              piece.speed *
              delta


            currentWorldPosition.y -=
              fallAmount


            currentWorldPosition.z +=
              piece.zDrift *
              delta


            const localPosition =
              parent.worldToLocal(
                currentWorldPosition.clone()
              )


            object.position.copy(
              localPosition
            )


            object.updateMatrixWorld(
              true
            )
          }
        )


        // =================================================
        // POWDER OPACITY
        // =================================================

        if (
          potassiumPieces.length >
            0 &&
          !isPowderLogicBlocked
        ) {

          targetPowderOpacityRef.current =
            (
              finishedCount /
              potassiumPieces.length
            ) *
            finalPowderOpacity
        }


        // =================================================
        // FALL COMPLETED
        // =================================================

        if (
          potassiumPieces.length >
            0 &&
          finishedCount ===
            potassiumPieces.length
        ) {

          isPotassiumFallingRef.current =
            false


          targetPowderOpacityRef.current =
            isPowderLogicBlocked
              ? 0
              : finalPowderOpacity


          setIsPotassiumTransferred(
            true
          )


          setIsPottasiumCarobnateInTestube01(
            true
          )


          potassiumPieces.forEach(
            (piece) => {

              piece.object.visible =
                false
            }
          )
        }
      }


      // =================================================
      // COMPLETELY BLOCK POWDER VISIBILITY
      // =================================================

      if (
        isPowderLogicBlocked
      ) {

        return
      }


      if (
        powderRevealFinishedRef.current
      ) {

        return
      }


      // =================================================
      // POWDER REVEAL
      // =================================================

      let allPowderVisible =
        powderMaterialsRef.current
          .length > 0


      powderMaterialsRef.current.forEach(
        ({
          object,
          material,
        }) => {

          const targetOpacity =
            targetPowderOpacityRef.current


          if (
            targetOpacity >
            0
          ) {

            object.visible =
              true
          }


          material.opacity =
            THREE.MathUtils.damp(
              material.opacity,

              targetOpacity,

              4,

              delta
            )


          if (
            Math.abs(
              material.opacity -
                finalPowderOpacity
            ) >
            0.01
          ) {

            allPowderVisible =
              false
          }


          material.needsUpdate =
            true
        }
      )


      // =================================================
      // POWDER REVEAL COMPLETE
      // =================================================

      if (
        isPotassiumTransferred &&
        targetPowderOpacityRef.current ===
          finalPowderOpacity &&
        allPowderVisible
      ) {

        powderMaterialsRef.current.forEach(
          ({
            object,
            material,
          }) => {

            object.visible =
              true


            material.opacity =
              finalPowderOpacity


            material.needsUpdate =
              true
          }
        )


        powderRevealFinishedRef.current =
          true


        console.log(
          "Powder reveal completed. Opacity control released."
        )
      }
    }
  )


  return null
}


export default PourIntoTestubeFromSpoon