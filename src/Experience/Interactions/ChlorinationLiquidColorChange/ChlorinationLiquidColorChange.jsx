import { useEffect } from "react"
import * as THREE from "three"

const ChlorinationLiquidColorChange = ({
  modelRef,

  upperLiquidEndColor = "#F4D35E",
  bottomLiquidEndColor = "#DCEFF7",

  duration = 3000,
  delay = 0,
}) => {
  useEffect(() => {
    console.log(
      "[ChlorinationColor] Effect started"
    )

    console.log(
      "[ChlorinationColor] modelRef:",
      modelRef
    )

    console.log(
      "[ChlorinationColor] modelRef.current:",
      modelRef?.current
    )

    if (!modelRef?.current) {
      console.warn(
        "[ChlorinationColor] Model is not loaded."
      )

      return
    }

    const upperLiquidName =
      "conical-flask-02-liquid-upper"

    const bottomLiquidName =
      "conical-flask-02-liquid-bottom"

    let upperLiquid = null
    let bottomLiquid = null

    console.log(
      "[ChlorinationColor] Searching model children..."
    )

    modelRef.current.traverse((child) => {
      if (!child.isMesh) return

      const normalizedName =
        child.name
          ?.trim()
          .toLowerCase() || ""

      console.log(
        "[ChlorinationColor] Mesh found:",
        {
          originalName: child.name,
          normalizedName,
          material: child.material,
        }
      )

      if (
        normalizedName === upperLiquidName
      ) {
        upperLiquid = child

        console.log(
          "[ChlorinationColor] Upper liquid found:",
          child
        )
      }

      if (
        normalizedName === bottomLiquidName
      ) {
        bottomLiquid = child

        console.log(
          "[ChlorinationColor] Bottom liquid found:",
          child
        )
      }
    })

    console.log(
      "[ChlorinationColor] Search result:",
      {
        upperLiquid,
        bottomLiquid,
      }
    )

    if (!upperLiquid) {
      console.warn(
        `[ChlorinationColor] Upper liquid not found. Expected: "${upperLiquidName}"`
      )
    }

    if (!bottomLiquid) {
      console.warn(
        `[ChlorinationColor] Bottom liquid not found. Expected: "${bottomLiquidName}"`
      )
    }

    if (!upperLiquid || !bottomLiquid) {
      return
    }
    // Ensure both liquid meshes are visible.
    upperLiquid.visible = true
    bottomLiquid.visible = true

    console.log(
    "[ChlorinationColor] Liquid visibility enabled:",
    {
        upperVisible: upperLiquid.visible,
        bottomVisible: bottomLiquid.visible,
    }
    )

    if (
      Array.isArray(upperLiquid.material) ||
      Array.isArray(bottomLiquid.material)
    ) {
      console.error(
        "[ChlorinationColor] One of the liquid meshes has multiple materials."
      )

      return
    }

    if (
      !upperLiquid.material?.color ||
      !bottomLiquid.material?.color
    ) {
      console.error(
        "[ChlorinationColor] Liquid material does not contain a color property.",
        {
          upperMaterial:
            upperLiquid.material,
          bottomMaterial:
            bottomLiquid.material,
        }
      )

      return
    }

    // Save the original materials.
    const originalUpperMaterial =
      upperLiquid.material

    const originalBottomMaterial =
      bottomLiquid.material

    // Clone them so shared materials are unaffected.
    upperLiquid.material =
      originalUpperMaterial.clone()

    bottomLiquid.material =
      originalBottomMaterial.clone()

    const upperStartColor =
      upperLiquid.material.color.clone()

    const bottomStartColor =
      bottomLiquid.material.color.clone()

    const upperTargetColor =
      new THREE.Color(
        upperLiquidEndColor
      )

    const bottomTargetColor =
      new THREE.Color(
        bottomLiquidEndColor
      )

    console.log(
      "[ChlorinationColor] Animation configuration:",
      {
        upperStart:
          `#${upperStartColor.getHexString()}`,

        upperTarget:
          `#${upperTargetColor.getHexString()}`,

        bottomStart:
          `#${bottomStartColor.getHexString()}`,

        bottomTarget:
          `#${bottomTargetColor.getHexString()}`,

        duration,
        delay,
      }
    )

    let animationFrameId = null
    let timeoutId = null
    let animationStartTime = null
    let cancelled = false

    const safeDuration =
      Math.max(duration, 1)

    const animateColor = (
      currentTime
    ) => {
      if (cancelled) return

      if (
        animationStartTime === null
      ) {
        animationStartTime =
          currentTime

        console.log(
          "[ChlorinationColor] Animation started"
        )
      }

      const elapsedTime =
        currentTime -
        animationStartTime

      const progress =
        THREE.MathUtils.clamp(
          elapsedTime /
            safeDuration,
          0,
          1
        )

      upperLiquid.material.color.lerpColors(
        upperStartColor,
        upperTargetColor,
        progress
      )

      bottomLiquid.material.color.lerpColors(
        bottomStartColor,
        bottomTargetColor,
        progress
      )

      upperLiquid.material.needsUpdate =
        true

      bottomLiquid.material.needsUpdate =
        true

      if (progress < 1) {
        animationFrameId =
          requestAnimationFrame(
            animateColor
          )
      } else {
        console.log(
          "[ChlorinationColor] Animation completed:",
          {
            upperFinal:
              `#${upperLiquid.material.color.getHexString()}`,

            bottomFinal:
              `#${bottomLiquid.material.color.getHexString()}`,
          }
        )
      }
    }

    console.log(
      `[ChlorinationColor] Waiting ${delay}ms before animation`
    )

    timeoutId = setTimeout(() => {
      animationFrameId =
        requestAnimationFrame(
          animateColor
        )
    }, delay)

    return () => {
      console.log(
        "[ChlorinationColor] Cleanup"
      )

      cancelled = true

      clearTimeout(timeoutId)

      if (animationFrameId !== null) {
        cancelAnimationFrame(
          animationFrameId
        )
      }

      // Dispose cloned materials.
      upperLiquid.material.dispose()
      bottomLiquid.material.dispose()

      // Restore original materials.
      upperLiquid.material =
        originalUpperMaterial

      bottomLiquid.material =
        originalBottomMaterial
    }
  }, [
    modelRef,
    upperLiquidEndColor,
    bottomLiquidEndColor,
    duration,
    delay,
  ])

  return null
}

export default ChlorinationLiquidColorChange