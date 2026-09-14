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

const ChlorinationSeparatingFunnelColorChange = ({
  modelRef,

  upperLiquidColor = "#F4D35E",
  bottomLiquidColor = "#DCEFF7",

  liquidOpacity = 0.35,

  colorChangeDelay = 2,
  colorChangeDuration = 1,
}) => {
  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(MainGuidelineContext)

  const upperMeshesRef = useRef([])
  const bottomMeshesRef = useRef([])

  const elapsedTimeRef = useRef(0)
  const initializedRef = useRef(false)
  const lessonAdvancedRef = useRef(false)

  useEffect(() => {
    const model = modelRef?.current

    if (!model) {
      console.error(
        "[ChlorinationSeparatingFunnelColorChange] modelRef.current is missing."
      )

      return
    }

    const upperMeshes = []
    const bottomMeshes = []

    const opacity =
      THREE.MathUtils.clamp(
        liquidOpacity,
        0,
        1
      )

    const initialColor =
      new THREE.Color(
        bottomLiquidColor
      )

    // Apply exactly the same material
    // properties to both liquid layers.
    const prepareMaterial = (
      material
    ) => {
      if (!material) return null

      const clonedMaterial =
        material.clone()

      clonedMaterial.transparent = true
      clonedMaterial.opacity = opacity

      clonedMaterial.depthWrite = false
      clonedMaterial.depthTest = true

      clonedMaterial.side =
        THREE.DoubleSide

      clonedMaterial.blending =
        THREE.NormalBlending

      clonedMaterial.premultipliedAlpha =
        false

      clonedMaterial.alphaTest = 0

      // Normalize lighting properties.
      if (
        "roughness" in clonedMaterial
      ) {
        clonedMaterial.roughness = 0.15
      }

      if (
        "metalness" in clonedMaterial
      ) {
        clonedMaterial.metalness = 0
      }

      if (
        "transmission" in clonedMaterial
      ) {
        clonedMaterial.transmission = 0
      }

      if (
        "thickness" in clonedMaterial
      ) {
        clonedMaterial.thickness = 0
      }

      if (
        "clearcoat" in clonedMaterial
      ) {
        clonedMaterial.clearcoat = 0
      }

      if (
        "clearcoatRoughness" in
        clonedMaterial
      ) {
        clonedMaterial.clearcoatRoughness =
          0
      }

      if (
        "ior" in clonedMaterial
      ) {
        clonedMaterial.ior = 1.33
      }

      if (clonedMaterial.color) {
        clonedMaterial.color.copy(
          initialColor
        )
      }

      clonedMaterial.needsUpdate = true

      return clonedMaterial
    }

    model.traverse((child) => {
      if (!child.isMesh) return

      let currentObject = child
      let liquidLayer = null

      // Check the mesh and its parents
      // to determine its liquid layer.
      while (
        currentObject &&
        currentObject !== model.parent
      ) {
        const normalizedName =
          (
            currentObject.name?.toLowerCase() ||
            ""
          ).replace(/[-_\s]/g, "")

        const isLiquid =
          normalizedName.includes(
            "liquid"
          )

        if (
          isLiquid &&
          normalizedName.includes(
            "upper"
          )
        ) {
          liquidLayer = "upper"
          break
        }

        if (
          isLiquid &&
          (
            normalizedName.includes(
              "bottom"
            ) ||
            normalizedName.includes(
              "lower"
            )
          )
        ) {
          liquidLayer = "bottom"
          break
        }

        if (
          currentObject === model
        ) {
          break
        }

        currentObject =
          currentObject.parent
      }

      if (!liquidLayer) return

      const originalMaterial =
        child.material

      const originalMaterials =
        Array.isArray(
          originalMaterial
        )
          ? originalMaterial
          : [originalMaterial]

      const clonedMaterials =
        originalMaterials.map(
          prepareMaterial
        )

      child.material =
        Array.isArray(
          originalMaterial
        )
          ? clonedMaterials
          : clonedMaterials[0]

      child.visible = true
      child.frustumCulled = false

      // Use the same render order for
      // the upper and bottom layers.
      child.renderOrder = 1

      // Make all parent groups visible.
      let currentParent =
        child.parent

      while (
        currentParent &&
        currentParent !== model
      ) {
        currentParent.visible = true

        currentParent =
          currentParent.parent
      }

      model.visible = true

      const meshData = {
        object: child,
        materials: clonedMaterials,
      }

      if (
        liquidLayer === "upper"
      ) {
        upperMeshes.push(meshData)
      } else {
        bottomMeshes.push(meshData)
      }
    })

    upperMeshesRef.current =
      upperMeshes

    bottomMeshesRef.current =
      bottomMeshes

    elapsedTimeRef.current = 0
    initializedRef.current = true
    lessonAdvancedRef.current = false

    console.log(
      "[Chlorination] Upper liquid meshes:",
      upperMeshes.map(
        ({ object }) =>
          object.name
      )
    )

    console.log(
      "[Chlorination] Bottom liquid meshes:",
      bottomMeshes.map(
        ({ object }) =>
          object.name
      )
    )

    if (
      upperMeshes.length === 0
    ) {
      console.error(
        "[ChlorinationSeparatingFunnelColorChange] Upper liquid was not found."
      )
    }

    if (
      bottomMeshes.length === 0
    ) {
      console.error(
        "[ChlorinationSeparatingFunnelColorChange] Bottom liquid was not found."
      )
    }

    return () => {
      upperMeshesRef.current = []
      bottomMeshesRef.current = []

      elapsedTimeRef.current = 0
      initializedRef.current = false
      lessonAdvancedRef.current = false

      // Keep final colours and visibility.
    }
  }, [
    modelRef,
    bottomLiquidColor,
    liquidOpacity,
  ])

  useFrame((_, delta) => {
    if (
      !initializedRef.current
    ) {
      return
    }

    elapsedTimeRef.current += delta

    const safeDuration =
      Math.max(
        colorChangeDuration,
        0.001
      )

    const colorProgress =
      THREE.MathUtils.clamp(
        (
          elapsedTimeRef.current -
          colorChangeDelay
        ) / safeDuration,
        0,
        1
      )

    const bottomColor =
      new THREE.Color(
        bottomLiquidColor
      )

    const upperEndColor =
      new THREE.Color(
        upperLiquidColor
      )

    const currentUpperColor =
      bottomColor
        .clone()
        .lerp(
          upperEndColor,
          colorProgress
        )

    const opacity =
      THREE.MathUtils.clamp(
        liquidOpacity,
        0,
        1
      )

    const updateLiquidMesh = (
      meshData,
      color
    ) => {
      const {
        object,
        materials,
      } = meshData

      object.visible = true
      object.frustumCulled = false

      // Both layers use the same order.
      object.renderOrder = 1

      materials.forEach(
        (material) => {
          if (!material) return

          material.transparent = true
          material.opacity = opacity

          material.depthWrite = false
          material.depthTest = true

          material.side =
            THREE.DoubleSide

          material.blending =
            THREE.NormalBlending

          material.premultipliedAlpha =
            false

          material.alphaTest = 0

          if (
            "roughness" in material
          ) {
            material.roughness = 0.15
          }

          if (
            "metalness" in material
          ) {
            material.metalness = 0
          }

          if (
            "transmission" in material
          ) {
            material.transmission = 0
          }

          if (
            "thickness" in material
          ) {
            material.thickness = 0
          }

          if (
            "clearcoat" in material
          ) {
            material.clearcoat = 0
          }

          if (material.color) {
            material.color.copy(color)
          }

          material.needsUpdate = true
        }
      )

      object.updateMatrixWorld(true)
    }

    // ============================================
    // BOTTOM LIQUID
    // ============================================

    bottomMeshesRef.current.forEach(
      (meshData) => {
        updateLiquidMesh(
          meshData,
          bottomColor
        )
      }
    )

    // ============================================
    // UPPER LIQUID
    // ============================================

    upperMeshesRef.current.forEach(
      (meshData) => {
        updateLiquidMesh(
          meshData,
          currentUpperColor
        )
      }
    )

    // ============================================
    // ADVANCE LESSON
    // ============================================

    if (
      colorProgress >= 1 &&
      !lessonAdvancedRef.current
    ) {
      lessonAdvancedRef.current =
        true

      if (
        selectedLesson === 14.1 &&
        lessonStep === 41
      ) {
        setLessonStep(42)
      }
    }
  })

  return null
}

export default ChlorinationSeparatingFunnelColorChange