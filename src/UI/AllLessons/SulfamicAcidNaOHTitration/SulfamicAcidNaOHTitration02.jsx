import {
  useContext,
  useEffect,
} from "react"

import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"
import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"

import DialogBox from "../../AllDialogBox/DialogBox/DialogBox.jsx"

import SulfamicGuidelines from "../../SulfamicGuidelines/SulfamicGuidelines.jsx"

import {guidelineData} from "../../Data/SulfamicNaOHTitrationData/SulfamicNaOHTitrationData.jsx"

import SulfamicAcidNaOHTitration03 from "./SulfamicAcidNaOHTitration03.jsx"
import SulfamicTitrationLiveDataPanel from "./SulfamicTitrationLiveDataPanel/SulfamicTitrationLiveDataPanel.jsx"


const SulfamicAcidNaOHTitration02 = () => {
  const {
    setSelectedRightHand,
    setSelectedLeftHand,selectedLeftHand
  } = useContext(
    InteractionContext
  )

  const {
    lessonStep,
    selectedLesson,
    setSafetyStep,
    setLessonStep,
  } = useContext(
    MainGuidelineContext
  )

  const {
    gogglesRef,
    gloverightRef,
    gloveleftRef,
    normalBeakerRef,
  } = useContext(
    ModelContext
  )


  // =========================================================
  // INITIALIZE PART 2
  // =========================================================

  useEffect(() => {
    if (
      selectedLesson !== 12.1
    ) {
      return
    }

    if (
      !normalBeakerRef?.current
    ) {
      return
    }

    // =======================================================
    // SAFETY STATE
    // =======================================================

    setSafetyStep(4)

    setLessonStep(22)

    if (
      gogglesRef?.current
    ) {
      gogglesRef.current.visible =
        false
    }

    if (
      gloverightRef?.current
    ) {
      gloverightRef.current.visible =
        false
    }

    if (
      gloveleftRef?.current
    ) {
      gloveleftRef.current.visible =
        false
    }


    // =======================================================
    // NORMAL BEAKER STATE
    // =======================================================

    normalBeakerRef.current.traverse(
      (child) => {
        const name =
          child.name?.toLowerCase() || ""


        // ===================================================
        // LIQUID / WATER
        // ===================================================

        if (
          child.isMesh &&
          name.includes("liquid")
        ) {
          child.visible =
            true

          child.scale.y =
            0.4

          child.renderOrder =
            1


          const makeWaterMaterial = (
            material
          ) => {
            if (
              !material
            ) {
              return material
            }

            const cloned =
              material.clone()

            cloned.color?.set(
              "#0073a0"
            )

            cloned.transparent =
              true

            cloned.opacity =
              0.35

            cloned.depthWrite =
              false

            cloned.depthTest =
              true

            if (
              "roughness" in cloned
            ) {
              cloned.roughness =
                0.1
            }

            if (
              "metalness" in cloned
            ) {
              cloned.metalness =
                0
            }

            cloned.needsUpdate =
              true

            return cloned
          }


          if (
            Array.isArray(
              child.material
            )
          ) {
            child.material =
              child.material.map(
                makeWaterMaterial
              )
          }
          else if (
            child.material
          ) {
            child.material =
              makeWaterMaterial(
                child.material
              )
          }


          child.updateMatrixWorld(
            true
          )


          console.log(
            "Water liquid initialized:",
            child.name
          )
        }


        // ===================================================
        // ALL PRECIPITATE CHILDREN
        // ===================================================

        if (
          child.isMesh &&
          name.includes(
            "precipitate"
          )
        ) {
          child.visible =
            true

          child.renderOrder =
            10


          // -----------------------------------------------
          // MAKE EVERY PARENT GROUP VISIBLE
          // -----------------------------------------------

          let parent =
            child.parent

          while (
            parent &&
            parent !==
              normalBeakerRef.current
          ) {
            parent.visible =
              true

            parent =
              parent.parent
          }


          // -----------------------------------------------
          // PRECIPITATE MATERIAL
          // -----------------------------------------------

          const makePrecipitateMaterial =
            (
              material
            ) => {
              if (
                !material
              ) {
                return material
              }

              const cloned =
                material.clone()

              cloned.transparent =
                true

              cloned.opacity =
                1

              cloned.depthWrite =
                false

              cloned.depthTest =
                true

              cloned.needsUpdate =
                true

              return cloned
            }


          if (
            Array.isArray(
              child.material
            )
          ) {
            child.material =
              child.material.map(
                makePrecipitateMaterial
              )
          }
          else if (
            child.material
          ) {
            child.material =
              makePrecipitateMaterial(
                child.material
              )
          }


          child.updateMatrixWorld(
            true
          )


          console.log(
            "Precipitate visible:",
            child.name
          )
        }
      }
    )


    // =======================================================
    // NORMAL BEAKER -> LEFT HAND
    // =======================================================

      if (
      selectedLeftHand?.name !==
      "main-normal-beaker"
    ) {
      const normalBeaker =
        normalBeakerRef.current

      setSelectedLeftHand({
        hand: "left",

        name: "main-normal-beaker",

        ref: normalBeakerRef,

        originalParent:
          normalBeaker.parent,

        originalPosition:
          normalBeaker.position.clone(),

        originalRotation:
          normalBeaker.rotation.clone(),
      })
    }


    // =======================================================
    // RIGHT HAND EMPTY
    // =======================================================

    setSelectedRightHand(
      null
    )


    console.log(
      "Sulfamic Acid NaOH Titration Part 2 initialized"
    )

  }, [
    selectedLesson,

    setSafetyStep,
    setLessonStep,

    setSelectedLeftHand,
    setSelectedRightHand,

    gloveleftRef,
    gloverightRef,
    gogglesRef,

    normalBeakerRef,
  ])


  // =========================================================
  // GUIDELINES
  // =========================================================

  return (
    <>

      {/* =====================================================
          GUIDELINE 4

          MIX / DISSOLVE SULFAMIC ACID

          STEPS:
          22 - 25
      ===================================================== */}

      {
        lessonStep === 22 &&
        (
          <SulfamicGuidelines
            guidelineData={
              guidelineData[3]
            }
          />
        )
      }


      {
        lessonStep === 22 &&
        (
          <DialogBox
            text={
              <>
              Take Spatula into <strong>Right Hand</strong>
              </>
            }
          />
        )
      }


      {
        lessonStep === 23 &&
        (
          <DialogBox
            text={
              <>
              Click Held Spatula and Select <strong>Stir Mode</strong>
              </>
              
            }
          />
        )
      }


      {
        lessonStep === 24 &&
        (
          <DialogBox
            text={
              <>
                Keep <strong>Scrolling Down</strong> to Stir the Mixture
              </>
              
            }
          />
        )
      }


      {
        lessonStep === 24.5 &&
        (
          <DialogBox
            text={
              <>
                Now click the Spatula and Select <strong>Exit Stir Mode</strong>
              </>
            }
          />
        )
      }


      {
        lessonStep === 25 &&
        (
          <DialogBox
            text={
              <>
                Keep <strong>Spatula</strong> back on the Table
              </>
              
            }
          />
        )
      }



      {/* =====================================================
          GUIDELINE 5

          TRANSFER SULFAMIC ACID SOLUTION
          TO VOLUMETRIC FLASK

          STEPS:
          26 - 29
      ===================================================== */}

      {
        lessonStep === 26 &&
        (
          <SulfamicGuidelines
            guidelineData={
              guidelineData[4]
            }
          />
        )
      }


      {
        lessonStep === 26 &&
        (
          <DialogBox
            text={
              <>
              Take Volumetric Flask to <strong>Right Hand</strong>
              </>
              
            }
          />
        )
      }


      {
        lessonStep === 27 &&
        (
          <DialogBox
            text={
              <>
              Press <strong>Shift + P</strong> to enter Pour Mode
              </>
              
            }
          />
        )
      }


      {
        lessonStep === 28 &&
        (
          <DialogBox
            text={
              <>
                <strong>Scroll Down</strong> to Pour The Mixture
              </>
              
            }
          />
        )
      }


      {lessonStep === 29 && (
          <DialogBox
            text={
              <>
                Press <strong>Shift + P</strong> to exit{" "}
                <strong>Pouring Mode</strong>.
              </>
            }
          />
        )}



      {/* =====================================================
          GUIDELINE 6

          RINSE BEAKER AND TRANSFER WASHINGS

          STEPS:
          30 - 41
      ===================================================== */}

      {
        lessonStep === 30 &&
        (
          <SulfamicGuidelines
            guidelineData={
              guidelineData[5]
            }
          />
        )
      }


      {lessonStep === 30 && (
        <DialogBox
          text={
            <>
              Click the normal beaker, then select{" "}
              <strong>Add Liquid</strong>.
            </>
          }
        />
      )}


      {
        lessonStep === 31 &&
        (
          <DialogBox
            text={
              <>
              Fill the beaker with{" "}
              <strong>30 cm³ of water (H₂O)</strong>
            </>
            }
          />
        )
      }


      {lessonStep === 32 && (
        <DialogBox
          text={
            <>
              Keep <strong>scrolling down</strong> to swirl the beaker{" "}
              <strong>3 times</strong> and rinse it.
            </>
          }
        />
      )}

      {lessonStep === 33 && (
        <DialogBox
          text={
            <>
              Press <strong>Shift + P</strong> to enter{" "}
              <strong>Pouring Mode</strong>.
            </>
          }
        />
      )}

      {lessonStep === 34 && (
        <DialogBox
          text={
            <>
              <strong>Scroll down</strong> to pour the washings into the volumetric flask.
            </>
          }
        />
      )}


      {lessonStep === 35 && (
        <DialogBox
          text={
            <>
              Press <strong>Shift + P</strong> to exit{" "}
              <strong>Pouring Mode</strong>.
            </>
          }
        />
      )}

      {lessonStep === 36 && (
        <DialogBox
          text={
            <>
              Click the held beaker, then select{" "}
              <strong>Add Liquid</strong>.
            </>
          }
        />
      )}


      {
        lessonStep === 37 &&
        (
          <DialogBox
            text={
              <>
              Fill the beaker with{" "}
              <strong>30 cm³ of water (H₂O)</strong>
              </>

            }
          />
        )
      }


      {
        lessonStep === 38 &&
        (
          <DialogBox
            text={
              <>
              Keep <strong>scrolling down</strong> to swirl the beaker{" "}
              <strong>3 times</strong> and rinse it.
            </>
            }
          />
        )
      }


      {lessonStep === 39 && (
        <DialogBox
          text={
            <>
              Press <strong>Shift + P</strong> to enter{" "}
              <strong>Pouring Mode</strong>.
            </>
          }
        />
      )}

      {lessonStep === 40 && (
        <DialogBox
          text={
            <>
              <strong>Scroll down</strong> to pour the washings into the volumetric flask.
            </>
          }
        />
      )}

      {lessonStep === 41 && (
        <DialogBox
          text={
            <>
              Press <strong>Shift + P</strong> to exit{" "}
              <strong>Pouring Mode</strong>.
            </>
          }
        />
      )}



      {/* =====================================================
          GUIDELINE 7

          FILL VOLUMETRIC FLASK TO 250 cm³ MARK

          STEP:
          42
      ===================================================== */}

      {
        lessonStep === 42 &&
        (
          <SulfamicGuidelines
            guidelineData={
              guidelineData[6]
            }
          />
        )
      }


      {lessonStep === 42 && (
        <DialogBox
          text={
            <>
              Click the volumetric flask, then select{" "}
              <strong>Add Water</strong>.
            </>
          }
        />
      )}


      {/* =====================================================
          GUIDELINE 8

          BUNG + MIX STANDARD SOLUTION

          STEPS:
          43 - 49
      ===================================================== */}

      {
        lessonStep === 43 &&
        (
          <SulfamicGuidelines
            guidelineData={
              guidelineData[7]
            }
          />
        )
      }


      {lessonStep === 43 && (
        <DialogBox
          text={
            <>
              Click the volumetric flask, then select{" "}
              <strong>Place Bung</strong>.
            </>
          }
        />
      )}

      {lessonStep === 44 && (
        <DialogBox
          text={
            <>
              <strong>Scroll down</strong> to invert the volumetric flask.{" "}
              <strong>0/3</strong>
            </>
          }
        />
      )}

      {lessonStep === 45 && (
        <DialogBox
          text={
            <>
              <strong>Scroll up</strong> to return the flask upright.{" "}
              <strong>0/3</strong>
            </>
          }
        />
      )}

      {lessonStep === 46 && (
        <DialogBox
          text={
            <>
              <strong>Scroll down</strong> to invert the volumetric flask again.{" "}
              <strong>1/3</strong>
            </>
          }
        />
      )}

      {lessonStep === 47 && (
        <DialogBox
          text={
            <>
              <strong>Scroll up</strong> to return the flask upright.{" "}
              <strong>1/3</strong>
            </>
          }
        />
      )}

      {lessonStep === 48 && (
        <DialogBox
          text={
            <>
              <strong>Scroll down</strong> for the final inversion.{" "}
              <strong>2/3</strong>
            </>
          }
        />
      )}

      {lessonStep === 49 && (
        <DialogBox
          text={
            <>
              <strong>Scroll up</strong> to return the flask upright and complete mixing.{" "}
              <strong>3/3</strong>
            </>
          }
        />
      )}



      {/* =====================================================
          CONTINUE TO PART 3
      ===================================================== */}

      {
        lessonStep >= 49.5 &&
        (
          <SulfamicAcidNaOHTitration03 />
        )
      }

      {[12, 12.1, 12.2].includes(selectedLesson) && (
        <SulfamicTitrationLiveDataPanel
          emptyTestTubeMass={lessonStep >=6 ? 21.72 : null}
          testTubeWithSulfamicMass={lessonStep >= 13 ? 24.22 : null}
          sulfamicAcidMass={lessonStep >= 13 ? 2.50 : null}
          beakerWaterAmount={lessonStep >= 18 && lessonStep < 42 ? 100 : null}
          volumetricFlaskAmount={lessonStep >= 44 ? 250 : lessonStep >= 41 ? 190 : lessonStep >= 35 ? 160 : lessonStep >= 28 ? 130 : lessonStep >= 20 ? 100 : null}
          buretteSulfamicAmount={(lessonStep >= 50) ? 50 : null}
          conicalFlaskNaOHAmount={selectedLesson === 12.2 && lessonStep >= 74 ? 25 : null}
          indicatorStatus={selectedLesson === 12.2 && lessonStep >= 79 ? "Added" : null}
          initialBuretteReading={selectedLesson === 12.2 && lessonStep >= 82 ? 0 : null}
          currentBuretteReading={selectedLesson === 12.2 && lessonStep === 84 ? 24.80 : selectedLesson === 12.2 && lessonStep === 103 ? 24.70 : null}
          sulfamicAcidDelivered={selectedLesson === 12.2 && lessonStep === 84 ? 24.80 : selectedLesson === 12.2 && lessonStep === 103 ? 24.70 : null}
          endpointStatus={selectedLesson === 12.2 && [84, 103].includes(lessonStep) ? "Endpoint reached" : "Waiting"}
          roughTitre={selectedLesson === 12.2 && lessonStep >= 85 ? 24.75 : null}
          trialOne={selectedLesson === 12.2 && lessonStep >= 84 ? 24.70 : null}
          trialTwo={selectedLesson === 12.2 && lessonStep >= 104 ? 24.80 : null}
          meanTitre={selectedLesson === 12.2 && lessonStep >= 104 ? 24.75 : null}
          sulfamicAcidConcentration={null}
          naohConcentration={null}
          selectedLesson={selectedLesson}
          lessonStep={lessonStep}
          autoShowConditions={[
            { selectedLesson: 12, lessonStep: 6 },
            { selectedLesson: 12, lessonStep: 13 },
            { selectedLesson: 12.1, lessonStep: 42 },
            { selectedLesson: 12.2, lessonStep: 58 },
            { selectedLesson: 12.2, lessonStep: 76 },
            { selectedLesson: 12.2, lessonStep: 85 },
            { selectedLesson: 12.2, lessonStep: 103 },
          ]}
          autoHideConditions={[
            { selectedLesson: 12, lessonStep: 3 },
            { selectedLesson: 12.1, lessonStep: 22 },
            { selectedLesson: 12.2, lessonStep: 50 },
          ]}
        />
      )}

    </>
  )
}


export default SulfamicAcidNaOHTitration02