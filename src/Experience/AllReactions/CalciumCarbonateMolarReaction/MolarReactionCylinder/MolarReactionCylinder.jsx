import {
  useEffect,
} from "react"

const MolarReactionCylinder = ({
  modelRef,

  // ==========================================
  // LIQUID
  // ==========================================
  liquidOffsetY = 0.5,
  liquidScaleDecrease = 0.12,
  startDelay = 3000,
  decreaseSpeed = 0.5,

  // ==========================================
  // GAS BUBBLES
  // ==========================================
  bubbleRiseHeight = 3.5,
  bubbleRiseSpeed = 0.3,
  bubbleRandomness = 1500,
  bubbleLoop = false,
  bubbleLoopDelay =4000,
}) => {
  useEffect(() => {
    const model =
      modelRef?.current

    if (!model) return

    let liquidChild = null

    const bubbleChildren = []

    // ==========================================
    // FIND LIQUID + BUBBLES
    // ==========================================

    model.traverse((child) => {
      const childName =
        child.name?.toLowerCase() || ""

      // ------------------------------------------
      // LIQUID
      // ------------------------------------------

      if (
        childName.includes("liquid")
      ) {
        liquidChild = child
      }

      // ------------------------------------------
      // BUBBLES
      // ------------------------------------------

      if (
        childName.includes("bubble")
      ) {
        child.visible = true

        child.traverse(
          (bubbleChild) => {
            bubbleChild.visible =
              true
          }
        )

        bubbleChildren.push(
          child
        )
      }
    })

    // ==========================================
    // SAVE ORIGINAL BUBBLE POSITIONS + MATERIALS
    // ==========================================

    const bubbleOriginalStates =
      bubbleChildren.map(
        (bubble) => {
          const materialStates = []

          bubble.traverse(
            (bubbleChild) => {
              if (
                !bubbleChild.material
              ) {
                return
              }

              if (
                Array.isArray(
                  bubbleChild.material
                )
              ) {
                bubbleChild.material =
                  bubbleChild.material.map(
                    (
                      material
                    ) => {
                      const clonedMaterial =
                        material.clone()

                      clonedMaterial.transparent =
                        true

                      clonedMaterial.opacity =
                        material.opacity ?? 1

                      materialStates.push(
                        {
                          material:
                            clonedMaterial,

                          originalOpacity:
                            material.opacity ??
                            1,
                        }
                      )

                      return clonedMaterial
                    }
                  )
              } else {
                const originalMaterial =
                  bubbleChild.material

                const clonedMaterial =
                  originalMaterial.clone()

                clonedMaterial.transparent =
                  true

                clonedMaterial.opacity =
                  originalMaterial.opacity ??
                  1

                bubbleChild.material =
                  clonedMaterial

                materialStates.push(
                  {
                    material:
                      clonedMaterial,

                    originalOpacity:
                      originalMaterial.opacity ??
                      1,
                  }
                )
              }
            }
          )

          return {
            bubble,
            originalY:
              bubble.position.y,
            materialStates,
          }
        }
      )

    const bubbleTimeouts = []

    const bubbleAnimationFrames =
      []

    // ==========================================
    // LIQUID ANIMATION
    // ==========================================

    let liquidTimeout = null

    let liquidAnimationFrame =
      null

    let originalLiquidScaleY =
      null

    let originalLiquidPositionY =
      null

    if (liquidChild) {
      originalLiquidScaleY =
        liquidChild.scale.y

      originalLiquidPositionY =
        liquidChild.position.y

      const targetScaleY =
        Math.max(
          0,
          originalLiquidScaleY -
            liquidScaleDecrease
        )

      const targetPositionY =
        originalLiquidPositionY +
        liquidOffsetY

      let lastTime = null

      liquidTimeout =
        setTimeout(() => {
          const animateLiquid = (
            time
          ) => {
            if (
              lastTime === null
            ) {
              lastTime = time
            }

            const delta =
              (time - lastTime) /
              1000

            lastTime = time

            // ======================================
            // REDUCE LIQUID SCALE Y
            // ======================================

            if (
              liquidChild.scale.y >
              targetScaleY
            ) {
              liquidChild.scale.y =
                Math.max(
                  targetScaleY,
                  liquidChild.scale.y -
                    decreaseSpeed *
                      delta
                )
            }

            // ======================================
            // MOVE LIQUID ON Y
            // ======================================

            const positionDifference =
              targetPositionY -
              liquidChild.position.y

            if (
              Math.abs(
                positionDifference
              ) > 0.001
            ) {
              const direction =
                Math.sign(
                  positionDifference
                )

              liquidChild.position.y +=
                direction *
                decreaseSpeed *
                delta

              if (
                direction > 0 &&
                liquidChild.position.y >
                  targetPositionY
              ) {
                liquidChild.position.y =
                  targetPositionY
              }

              if (
                direction < 0 &&
                liquidChild.position.y <
                  targetPositionY
              ) {
                liquidChild.position.y =
                  targetPositionY
              }
            }

            // ======================================
            // CHECK COMPLETION
            // ======================================

            const scaleComplete =
              liquidChild.scale.y <=
              targetScaleY

            const positionComplete =
              Math.abs(
                liquidChild.position.y -
                  targetPositionY
              ) < 0.001

            if (
              !scaleComplete ||
              !positionComplete
            ) {
              liquidAnimationFrame =
                requestAnimationFrame(
                  animateLiquid
                )
            }
          }

          liquidAnimationFrame =
            requestAnimationFrame(
              animateLiquid
            )
        }, startDelay)
    }

    // ==========================================
    // GAS BUBBLE ANIMATION
    // ==========================================

    bubbleOriginalStates.forEach(
      (
        {
          bubble,
          originalY,
          materialStates,
        },
        index
      ) => {
        const targetY =
          originalY -
          bubbleRiseHeight

        const randomDelay =
          Math.random() *
          bubbleRandomness

        const staggerDelay =
          index * 50

        const bubbleTimeout =
          setTimeout(() => {
            let lastTime = null

            const animateBubble = (
              time
            ) => {
              if (
                lastTime === null
              ) {
                lastTime = time
              }

              const delta =
                (time - lastTime) /
                1000

              lastTime = time

              // ==================================
              // MOVE BUBBLE UP
              // ==================================

              bubble.position.y -=
                bubbleRiseSpeed *
                delta

              // ==================================
              // CALCULATE PROGRESS
              // ==================================

              const travelledDistance =
                originalY -
                bubble.position.y

              const progress =
                Math.min(
                  1,
                  Math.max(
                    0,
                    travelledDistance /
                      bubbleRiseHeight
                  )
                )

              // ==================================
              // FADE OUT AS IT RISES
              // ==================================

              const opacity =
                1 - progress

              materialStates.forEach(
                ({
                  material,
                }) => {
                  material.opacity =
                    opacity
                }
              )

              // ==================================
              // REACHED TOP
              // ==================================

              if (
                bubble.position.y <=
                targetY
              ) {
                bubble.position.y =
                  targetY

                materialStates.forEach(
                  ({
                    material,
                  }) => {
                    material.opacity =
                      0
                  }
                )

                // ------------------------------
                // LOOP
                // ------------------------------

                if (bubbleLoop) {
                  const restartTimeout =
                    setTimeout(() => {
                      bubble.position.y =
                        originalY

                      materialStates.forEach(
                        ({
                          material,
                          originalOpacity,
                        }) => {
                          material.opacity =
                            originalOpacity
                        }
                      )

                      lastTime = null

                      const restartFrame =
                        requestAnimationFrame(
                          animateBubble
                        )

                      bubbleAnimationFrames.push(
                        restartFrame
                      )
                    },
                    bubbleLoopDelay
                  )

                  bubbleTimeouts.push(
                    restartTimeout
                  )
                }

                return
              }

              const frame =
                requestAnimationFrame(
                  animateBubble
                )

              bubbleAnimationFrames.push(
                frame
              )
            }

            const frame =
              requestAnimationFrame(
                animateBubble
              )

            bubbleAnimationFrames.push(
              frame
            )
          },
          startDelay +
            randomDelay +
            staggerDelay
        )

        bubbleTimeouts.push(
          bubbleTimeout
        )
      }
    )

    // ==========================================
    // CLEANUP
    // ==========================================

    return () => {
      if (liquidTimeout) {
        clearTimeout(
          liquidTimeout
        )
      }

      if (
        liquidAnimationFrame
      ) {
        cancelAnimationFrame(
          liquidAnimationFrame
        )
      }

      if (
        liquidChild &&
        originalLiquidScaleY !==
          null
      ) {
        liquidChild.scale.y =
          originalLiquidScaleY
      }

      if (
        liquidChild &&
        originalLiquidPositionY !==
          null
      ) {
        liquidChild.position.y =
          originalLiquidPositionY
      }

      bubbleTimeouts.forEach(
        (timeout) => {
          clearTimeout(timeout)
        }
      )

      bubbleAnimationFrames.forEach(
        (frame) => {
          cancelAnimationFrame(
            frame
          )
        }
      )

      bubbleOriginalStates.forEach(
        ({
          bubble,
          originalY,
          materialStates,
        }) => {
          bubble.position.y =
            originalY

          bubble.visible = false

          materialStates.forEach(
            ({
              material,
              originalOpacity,
            }) => {
              material.opacity =
                originalOpacity
            }
          )

          bubble.traverse(
            (bubbleChild) => {
              bubbleChild.visible =
                false
            }
          )
        }
      )
    }
  }, [
    modelRef,

    liquidOffsetY,
    liquidScaleDecrease,
    startDelay,
    decreaseSpeed,

    bubbleRiseHeight,
    bubbleRiseSpeed,
    bubbleRandomness,
    bubbleLoop,
    bubbleLoopDelay,
  ])

  return null
}

export default MolarReactionCylinder