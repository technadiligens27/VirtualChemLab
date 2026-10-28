import {
  useEffect,
} from "react"

const MolarReactionCylinder = ({
  modelRef,

  // ==========================================
  // LIQUID
  // ==========================================
  liquidOffsetY = 1.2,
  liquidScaleDecrease = 0.32,
  startDelay = 4000,
  decreaseSpeed = 0.2,

  // ==========================================
  // GAS BUBBLES
  // ==========================================
  bubbleRiseHeight = 3.5,
  bubbleRiseSpeed = 0.2,
  bubbleRandomness = 2500,

  bubbleLoop = false,
  bubbleLoopDelay = 5000,

  // Total times each bubble rises.
  loopTimes = 3,
}) => {
  useEffect(() => {
    const model =
      modelRef?.current

    if (!model) {
      return
    }

    let liquidChild = null

    const bubbleChildren = []

    // ==========================================
    // FIND LIQUID + BUBBLES
    // ==========================================

    model.traverse((child) => {
      const childName =
        child.name?.toLowerCase() || ""

      if (
        childName.includes("liquid")
      ) {
        liquidChild = child
      }

      if (
        childName.includes("bubble")
      ) {
        bubbleChildren.push(child)
      }
    })

    // ==========================================
    // SAVE BUBBLE STATES + CLONE MATERIALS
    // ==========================================

    const bubbleOriginalStates =
      bubbleChildren.map((bubble) => {
        const materialStates = []

        bubble.traverse((bubbleChild) => {
          if (!bubbleChild.material) {
            return
          }

          if (
            Array.isArray(
              bubbleChild.material
            )
          ) {
            bubbleChild.material =
              bubbleChild.material.map(
                (material) => {
                  const clonedMaterial =
                    material.clone()

                  clonedMaterial.transparent =
                    true

                  clonedMaterial.opacity =
                    material.opacity ?? 1

                  materialStates.push({
                    material: clonedMaterial,

                    originalOpacity:
                      material.opacity ?? 1,
                  })

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
              originalMaterial.opacity ?? 1

            bubbleChild.material =
              clonedMaterial

            materialStates.push({
              material: clonedMaterial,

              originalOpacity:
                originalMaterial.opacity ?? 1,
            })
          }
        })

        // Hide bubbles immediately.
        // They only become visible after
        // their individual delay is complete.
        bubble.visible = false

        bubble.traverse((bubbleChild) => {
          bubbleChild.visible = false
        })

        return {
          bubble,

          originalY:
            bubble.position.y,

          materialStates,
        }
      })

    const bubbleTimeouts = []
    const bubbleAnimationFrames = []

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
            if (lastTime === null) {
              lastTime = time
            }

            const delta =
              (time - lastTime) /
              1000

            lastTime = time

            if (
              liquidChild.scale.y >
              targetScaleY
            ) {
              liquidChild.scale.y =
                Math.max(
                  targetScaleY,
                  liquidChild.scale.y -
                    decreaseSpeed * delta
                )
            }

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

        let completedLoops = 0
        let lastBubbleTime = null

        // ----------------------------------------
        // HIDE BUBBLE
        // ----------------------------------------

        const hideBubble = () => {
          bubble.visible = false

          bubble.traverse(
            (bubbleChild) => {
              bubbleChild.visible = false
            }
          )

          materialStates.forEach(
            ({
              material,
            }) => {
              material.opacity = 0
            }
          )
        }

        // ----------------------------------------
        // RESET + SHOW BUBBLE
        // Called only when its delay finishes.
        // ----------------------------------------

        const showBubble = () => {
          bubble.position.y = originalY

          bubble.visible = true

          bubble.traverse(
            (bubbleChild) => {
              bubbleChild.visible = true
            }
          )

          materialStates.forEach(
            ({
              material,
              originalOpacity,
            }) => {
              material.opacity =
                originalOpacity
            }
          )
        }

        // ----------------------------------------
        // ANIMATE ONE RISE
        // ----------------------------------------

        const animateBubble = (
          time
        ) => {
          if (
            lastBubbleTime === null
          ) {
            lastBubbleTime = time
          }

          const delta =
            (time - lastBubbleTime) /
            1000

          lastBubbleTime = time

          bubble.position.y -=
            bubbleRiseSpeed * delta

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

          const opacity =
            1 - progress

          materialStates.forEach(
            ({
              material,
            }) => {
              material.opacity = opacity
            }
          )

          // --------------------------------------
          // BUBBLE REACHED TOP
          // --------------------------------------

          if (
            bubble.position.y <=
            targetY
          ) {
            bubble.position.y = targetY

            completedLoops += 1

            hideBubble()

            // Stop after requested loop count.
            if (
              !bubbleLoop ||
              completedLoops >= loopTimes
            ) {
              return
            }

            // Wait while hidden before
            // showing the next loop.
            const restartTimeout =
              setTimeout(() => {
                showBubble()

                lastBubbleTime = null

                const restartFrame =
                  requestAnimationFrame(
                    animateBubble
                  )

                bubbleAnimationFrames.push(
                  restartFrame
                )
              }, bubbleLoopDelay)

            bubbleTimeouts.push(
              restartTimeout
            )

            return
          }

          const frame =
            requestAnimationFrame(
              animateBubble
            )

          bubbleAnimationFrames.push(frame)
        }

        // ----------------------------------------
        // INITIAL DELAY
        // Bubble stays invisible here.
        // ----------------------------------------

        const initialTimeout =
          setTimeout(() => {
            showBubble()

            lastBubbleTime = null

            const frame =
              requestAnimationFrame(
                animateBubble
              )

            bubbleAnimationFrames.push(frame)
          },
          startDelay +
            randomDelay +
            staggerDelay
        )

        bubbleTimeouts.push(
          initialTimeout
        )
      }
    )

    // ==========================================
    // CLEANUP
    // ==========================================

    return () => {
      if (liquidTimeout) {
        clearTimeout(liquidTimeout)
      }

      if (liquidAnimationFrame) {
        cancelAnimationFrame(
          liquidAnimationFrame
        )
      }

      if (
        liquidChild &&
        originalLiquidScaleY !== null
      ) {
        liquidChild.scale.y =
          originalLiquidScaleY
      }

      if (
        liquidChild &&
        originalLiquidPositionY !== null
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
          cancelAnimationFrame(frame)
        }
      )

      bubbleOriginalStates.forEach(
        ({
          bubble,
          originalY,
          materialStates,
        }) => {
          bubble.position.y = originalY

          bubble.visible = false

          bubble.traverse(
            (bubbleChild) => {
              bubbleChild.visible = false
            }
          )

          materialStates.forEach(
            ({
              material,
              originalOpacity,
            }) => {
              material.opacity =
                originalOpacity
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
    loopTimes,
  ])

  return null
}

export default MolarReactionCylinder