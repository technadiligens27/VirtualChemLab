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

  // Seconds
  colorChangeDelay = 2,

  // Seconds
  colorChangeDuration = 1,
}) => {
  const {
    selectedLesson,
    lessonStep,
    setLessonStep,
  } = useContext(
    MainGuidelineContext
  )


  // =========================================
  // LIQUID REFS
  // =========================================

  const upperMeshesRef =
    useRef([])

  const bottomMeshesRef =
    useRef([])


  // =========================================
  // ANIMATION REFS
  // =========================================

  const elapsedTimeRef =
    useRef(0)

  const initializedRef =
    useRef(false)

  const lessonAdvancedRef =
    useRef(false)
const lessonAdvanceTimerRef =
  useRef(null)

  // =========================================
  // INITIALIZE
  // =========================================

  useEffect(() => {
    const model =
      modelRef?.current


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


    // =========================================
    // PREPARE MATERIAL
    // =========================================

    const prepareMaterial = (
      material
    ) => {
      if (!material) return null


      // =========================================
      // SAVE CURRENT COLOR
      // BEFORE CHANGING ANYTHING
      // =========================================

      const startColor =
        material.color
          ? material.color.clone()
          : new THREE.Color(
              "#ffffff"
            )


      // =========================================
      // CLONE MATERIAL
      // =========================================

      const clonedMaterial =
        material.clone()


      clonedMaterial.transparent =
        true

      clonedMaterial.opacity =
        opacity

      clonedMaterial.depthWrite =
        false

      clonedMaterial.depthTest =
        true

      clonedMaterial.side =
        THREE.DoubleSide

      clonedMaterial.blending =
        THREE.NormalBlending

      clonedMaterial.premultipliedAlpha =
        false

      clonedMaterial.alphaTest =
        0


      // =========================================
      // NORMALIZE MATERIAL
      // =========================================

      if (
        "roughness" in
        clonedMaterial
      ) {
        clonedMaterial.roughness =
          0.15
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
          0
      }


      if (
        "thickness" in
        clonedMaterial
      ) {
        clonedMaterial.thickness =
          0
      }


      if (
        "clearcoat" in
        clonedMaterial
      ) {
        clonedMaterial.clearcoat =
          0
      }


      if (
        "clearcoatRoughness" in
        clonedMaterial
      ) {
        clonedMaterial.clearcoatRoughness =
          0
      }


      if (
        "ior" in
        clonedMaterial
      ) {
        clonedMaterial.ior =
          1.33
      }


      // =========================================
      // IMPORTANT:
      // KEEP ORIGINAL COLOR
      // =========================================

      if (
        clonedMaterial.color
      ) {
        clonedMaterial.color.copy(
          startColor
        )
      }


      clonedMaterial.needsUpdate =
        true


      return {
        material:
          clonedMaterial,

        startColor,
      }
    }


    // =========================================
    // FIND LIQUID MESHES
    // =========================================

    model.traverse(
      (child) => {
        if (!child.isMesh) {
          return
        }


        let currentObject =
          child

        let liquidLayer =
          null


        // =========================================
        // FIND UPPER / BOTTOM LAYER
        // =========================================

        while (
          currentObject &&
          currentObject !==
            model.parent
        ) {
          const normalizedName =
            (
              currentObject.name
                ?.toLowerCase() ||
              ""
            ).replace(
              /[-_\s]/g,
              ""
            )


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
            liquidLayer =
              "upper"

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
            liquidLayer =
              "bottom"

            break
          }


          if (
            currentObject ===
            model
          ) {
            break
          }


          currentObject =
            currentObject.parent
        }


        if (!liquidLayer) {
          return
        }


        // =========================================
        // GET ORIGINAL MATERIALS
        // =========================================

        const originalMaterial =
          child.material


        const originalMaterials =
          Array.isArray(
            originalMaterial
          )
            ? originalMaterial
            : [
                originalMaterial,
              ]


        // =========================================
        // CLONE + SAVE START COLORS
        // =========================================

        const preparedMaterials =
          originalMaterials
            .map(
              prepareMaterial
            )
            .filter(Boolean)


        // =========================================
        // ASSIGN CLONED MATERIALS
        // =========================================

        child.material =
          Array.isArray(
            originalMaterial
          )
            ? preparedMaterials.map(
                ({
                  material,
                }) =>
                  material
              )
            : preparedMaterials[
                0
              ]?.material


        // =========================================
        // VISIBILITY
        // =========================================

        child.visible =
          true

        child.frustumCulled =
          false

        child.renderOrder =
          1


        // =========================================
        // MAKE PARENTS VISIBLE
        // =========================================

        let currentParent =
          child.parent


        while (
          currentParent &&
          currentParent !==
            model
        ) {
          currentParent.visible =
            true

          currentParent =
            currentParent.parent
        }


        model.visible =
          true


        // =========================================
        // SAVE MESH DATA
        // =========================================

        const meshData = {
          object:
            child,

          materials:
            preparedMaterials,
        }


        if (
          liquidLayer ===
          "upper"
        ) {
          upperMeshes.push(
            meshData
          )
        } else {
          bottomMeshes.push(
            meshData
          )
        }
      }
    )


    // =========================================
    // SAVE REFS
    // =========================================

    upperMeshesRef.current =
      upperMeshes

    bottomMeshesRef.current =
      bottomMeshes


    elapsedTimeRef.current =
      0

    initializedRef.current =
      true

    lessonAdvancedRef.current =
      false


    // =========================================
    // DEBUG
    // =========================================

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
      upperMeshes.length ===
      0
    ) {
      console.error(
        "[ChlorinationSeparatingFunnelColorChange] Upper liquid was not found."
      )
    }


    if (
      bottomMeshes.length ===
      0
    ) {
      console.error(
        "[ChlorinationSeparatingFunnelColorChange] Bottom liquid was not found."
      )
    }


    // =========================================
    // CLEANUP
    // =========================================

    return () => {
      if (
        lessonAdvanceTimerRef.current
      ) {
        clearTimeout(
          lessonAdvanceTimerRef.current
        )

        lessonAdvanceTimerRef.current =
          null
      }

      upperMeshesRef.current = []
      bottomMeshesRef.current = []

      elapsedTimeRef.current = 0
      initializedRef.current = false
      lessonAdvancedRef.current = false
    }
  }, [
    modelRef,
    upperLiquidColor,
    bottomLiquidColor,
    liquidOpacity,
  ])


  // =========================================
  // ANIMATION
  // =========================================

  useFrame((_, delta) => {
    if (
      !initializedRef.current
    ) {
      return
    }


    elapsedTimeRef.current +=
      delta


    // =========================================
    // SAFE DURATION
    // =========================================

    const safeDuration =
      Math.max(
        colorChangeDuration,
        0.001
      )


    // =========================================
    // COLOR PROGRESS
    //
    // Before delay:
    // progress = 0
    //
    // After delay:
    // progress 0 -> 1
    // =========================================

    const colorProgress =
      THREE.MathUtils.clamp(
        (
          elapsedTimeRef.current -
          colorChangeDelay
        ) /
          safeDuration,

        0,
        1
      )


    // =========================================
    // TARGET COLORS
    // =========================================

    const targetBottomColor =
      new THREE.Color(
        bottomLiquidColor
      )


    const targetUpperColor =
      new THREE.Color(
        upperLiquidColor
      )


    const opacity =
      THREE.MathUtils.clamp(
        liquidOpacity,
        0,
        1
      )


    // =========================================
    // UPDATE LIQUID
    // =========================================

    const updateLiquidMesh = (
      meshData,
      targetColor
    ) => {
      const {
        object,
        materials,
      } = meshData


      object.visible =
        true

      object.frustumCulled =
        false

      object.renderOrder =
        1


      materials.forEach(
        ({
          material,
          startColor,
        }) => {
          if (!material) {
            return
          }


          // =====================================
          // MATERIAL SETTINGS
          // =====================================

          material.transparent =
            true

          material.opacity =
            opacity

          material.depthWrite =
            false

          material.depthTest =
            true

          material.side =
            THREE.DoubleSide

          material.blending =
            THREE.NormalBlending

          material.premultipliedAlpha =
            false

          material.alphaTest =
            0


          if (
            "roughness" in
            material
          ) {
            material.roughness =
              0.15
          }


          if (
            "metalness" in
            material
          ) {
            material.metalness =
              0
          }


          if (
            "transmission" in
            material
          ) {
            material.transmission =
              0
          }


          if (
            "thickness" in
            material
          ) {
            material.thickness =
              0
          }


          if (
            "clearcoat" in
            material
          ) {
            material.clearcoat =
              0
          }


          // =====================================
          // COLOR ANIMATION
          // =====================================

          if (
            material.color
          ) {
            const currentColor =
              startColor
                .clone()
                .lerp(
                  targetColor,
                  colorProgress
                )


            material.color.copy(
              currentColor
            )
          }


          material.needsUpdate =
            true
        }
      )


      object.updateMatrixWorld(
        true
      )
    }


    // =========================================
    // BOTTOM LIQUID
    // =========================================

    bottomMeshesRef.current.forEach(
      (meshData) => {
        updateLiquidMesh(
          meshData,
          targetBottomColor
        )
      }
    )


    // =========================================
    // UPPER LIQUID
    // =========================================

    upperMeshesRef.current.forEach(
      (meshData) => {
        updateLiquidMesh(
          meshData,
          targetUpperColor
        )
      }
    )


    // =========================================
    // ADVANCE LESSON
    // =========================================

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
        lessonAdvanceTimerRef.current =
          setTimeout(() => {
            setLessonStep(42)
          }, 1000)
      }
    }
  })


  return null
}

export default ChlorinationSeparatingFunnelColorChange