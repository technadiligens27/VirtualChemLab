import {
  useEffect,
  useMemo,
  useRef,
} from "react"

import {
  useFrame,
  useThree,
} from "@react-three/fiber"

import * as THREE from "three"


const FOCUS_LAYER = 31


const ModelFocusMode = ({
  modelRef,

  active = true,

  // Lower = better performance
  blurResolution = 320,

  // Final blur amount
  blurStrength = 2.5,

  // Tint applied to blurred background
  blurColor="#f2ebeb",

  // 0 = no tint
  // 1 = full tint colour
  blurColorStrength=0.1,

  // Seconds for the WHOLE blur effect to fade in
  transitionTime = 0.5,
}) => {
  const {
    gl,
    scene,
    camera,
  } = useThree()


  // =============================================
  // TRANSITION
  // =============================================

  const transitionElapsedRef =
    useRef(0)


  // =============================================
  // RENDER TARGET 1
  // =============================================

  const firstRenderTarget =
    useMemo(() => {
      return new THREE.WebGLRenderTarget(
        1,
        1,
        {
          minFilter:
            THREE.LinearFilter,

          magFilter:
            THREE.LinearFilter,

          format:
            THREE.RGBAFormat,

          depthBuffer: true,

          stencilBuffer: false,
        }
      )
    }, [])


  // =============================================
  // RENDER TARGET 2
  // =============================================

  const secondRenderTarget =
    useMemo(() => {
      return new THREE.WebGLRenderTarget(
        1,
        1,
        {
          minFilter:
            THREE.LinearFilter,

          magFilter:
            THREE.LinearFilter,

          format:
            THREE.RGBAFormat,

          depthBuffer: false,

          stencilBuffer: false,
        }
      )
    }, [])


  // =============================================
  // BLUR SCENE
  // =============================================

  const blurScene =
    useMemo(() => {
      return new THREE.Scene()
    }, [])


  const blurCamera =
    useMemo(() => {
      return new THREE.OrthographicCamera(
        -1,
        1,
        1,
        -1,
        0,
        1
      )
    }, [])


  // =============================================
  // HORIZONTAL BLUR MATERIAL
  // =============================================

  const horizontalBlurMaterial =
    useMemo(() => {
      return new THREE.ShaderMaterial({
        uniforms: {
          tDiffuse: {
            value: null,
          },

          resolution: {
            value:
              new THREE.Vector2(
                1,
                1
              ),
          },

          direction: {
            value:
              new THREE.Vector2(
                1,
                0
              ),
          },

          blurStrength: {
            value:
              blurStrength,
          },

          blurColor: {
            value:
              new THREE.Color(
                blurColor
              ),
          },

          blurColorStrength: {
            value: 0,
          },

          transitionOpacity: {
            value: 1,
          },
        },


        vertexShader: `
          varying vec2 vUv;

          void main() {
            vUv = uv;

            gl_Position =
              vec4(
                position.xy,
                0.0,
                1.0
              );
          }
        `,


        fragmentShader: `
          uniform sampler2D tDiffuse;

          uniform vec2 resolution;

          uniform vec2 direction;

          uniform float blurStrength;

          uniform vec3 blurColor;

          uniform float blurColorStrength;

          uniform float transitionOpacity;

          varying vec2 vUv;


          void main() {

            vec2 texel =
              direction *
              blurStrength /
              resolution;


            vec4 color =
              vec4(0.0);


            color +=
              texture2D(
                tDiffuse,
                vUv -
                texel * 4.0
              ) * 0.0162162162;


            color +=
              texture2D(
                tDiffuse,
                vUv -
                texel * 3.0
              ) * 0.0540540541;


            color +=
              texture2D(
                tDiffuse,
                vUv -
                texel * 2.0
              ) * 0.1216216216;


            color +=
              texture2D(
                tDiffuse,
                vUv -
                texel
              ) * 0.1945945946;


            color +=
              texture2D(
                tDiffuse,
                vUv
              ) * 0.2270270270;


            color +=
              texture2D(
                tDiffuse,
                vUv +
                texel
              ) * 0.1945945946;


            color +=
              texture2D(
                tDiffuse,
                vUv +
                texel * 2.0
              ) * 0.1216216216;


            color +=
              texture2D(
                tDiffuse,
                vUv +
                texel * 3.0
              ) * 0.0540540541;


            color +=
              texture2D(
                tDiffuse,
                vUv +
                texel * 4.0
              ) * 0.0162162162;


            // =====================================
            // TINT
            // =====================================

            color.rgb =
              mix(
                color.rgb,
                blurColor,
                blurColorStrength
              );


            // =====================================
            // WHOLE EFFECT OPACITY
            // =====================================

            gl_FragColor =
              vec4(
                color.rgb,
                transitionOpacity
              );
          }
        `,


        transparent: true,

        depthTest: false,

        depthWrite: false,

        blending:
          THREE.NormalBlending,
      })
    }, [])


  // =============================================
  // VERTICAL BLUR MATERIAL
  // =============================================

  const verticalBlurMaterial =
    useMemo(() => {
      return horizontalBlurMaterial.clone()
    }, [
      horizontalBlurMaterial,
    ])


  // =============================================
  // FULLSCREEN QUAD
  // =============================================

  const fullscreenQuad =
    useMemo(() => {
      const geometry =
        new THREE.PlaneGeometry(
          2,
          2
        )


      const mesh =
        new THREE.Mesh(
          geometry,
          horizontalBlurMaterial
        )


      mesh.frustumCulled =
        false


      return mesh
    }, [
      horizontalBlurMaterial,
    ])


  // =============================================
  // SCREEN SIZE
  // =============================================

  const drawingBufferSize =
    useMemo(() => {
      return new THREE.Vector2()
    }, [])


  const targetWidthRef =
    useRef(1)


  const targetHeightRef =
    useRef(1)


  // =============================================
  // ORIGINAL LAYERS
  // =============================================

  const originalModelLayersRef =
    useRef(
      new Map()
    )


  const originalLightLayersRef =
    useRef(
      new Map()
    )


  const originalCameraLayerRef =
    useRef(null)


  // =============================================
  // RESET TRANSITION
  // =============================================

  useEffect(() => {
    transitionElapsedRef.current =
      0


    verticalBlurMaterial
      .uniforms
      .transitionOpacity
      .value =
      0
  }, [
    active,
    modelRef,
    verticalBlurMaterial,
  ])


  // =============================================
  // UPDATE BLUR STRENGTH
  // =============================================

  useEffect(() => {
    horizontalBlurMaterial
      .uniforms
      .blurStrength
      .value =
      blurStrength


    verticalBlurMaterial
      .uniforms
      .blurStrength
      .value =
      blurStrength
  }, [
    blurStrength,
    horizontalBlurMaterial,
    verticalBlurMaterial,
  ])


  // =============================================
  // UPDATE BLUR COLOR
  // =============================================

  useEffect(() => {
    const color =
      new THREE.Color(
        blurColor
      )


    horizontalBlurMaterial
      .uniforms
      .blurColor
      .value
      .copy(color)


    verticalBlurMaterial
      .uniforms
      .blurColor
      .value
      .copy(color)


    horizontalBlurMaterial
      .uniforms
      .blurColorStrength
      .value =
      0


    verticalBlurMaterial
      .uniforms
      .blurColorStrength
      .value =
      THREE.MathUtils.clamp(
        blurColorStrength,
        0,
        1
      )
  }, [
    blurColor,
    blurColorStrength,
    horizontalBlurMaterial,
    verticalBlurMaterial,
  ])


  // =============================================
  // SET FOCUSED MODEL LAYER
  // =============================================

  useEffect(() => {
    if (!active) {
      return
    }


    const model =
      modelRef?.current


    if (!model) {
      return
    }


    originalCameraLayerRef.current =
      camera.layers.mask


    // =========================================
    // MODEL
    // =========================================

    model.traverse(
      (child) => {
        originalModelLayersRef.current.set(
          child,
          child.layers.mask
        )


        child.layers.enable(
          FOCUS_LAYER
        )
      }
    )


    // =========================================
    // LIGHTS
    // =========================================

    scene.traverse(
      (child) => {
        if (!child.isLight) {
          return
        }


        originalLightLayersRef.current.set(
          child,
          child.layers.mask
        )


        child.layers.enable(
          FOCUS_LAYER
        )
      }
    )


    // =========================================
    // CLEANUP
    // =========================================

    return () => {
      originalModelLayersRef.current.forEach(
        (
          layerMask,
          object
        ) => {
          object.layers.mask =
            layerMask
        }
      )


      originalLightLayersRef.current.forEach(
        (
          layerMask,
          light
        ) => {
          light.layers.mask =
            layerMask
        }
      )


      originalModelLayersRef.current.clear()

      originalLightLayersRef.current.clear()


      if (
        originalCameraLayerRef.current !==
        null
      ) {
        camera.layers.mask =
          originalCameraLayerRef.current
      }
    }
  }, [
    active,
    modelRef,
    scene,
    camera,
  ])


  // =============================================
  // ADD FULLSCREEN QUAD
  // =============================================

  useEffect(() => {
    blurScene.add(
      fullscreenQuad
    )


    return () => {
      blurScene.remove(
        fullscreenQuad
      )
    }
  }, [
    blurScene,
    fullscreenQuad,
  ])


  // =============================================
  // SELECTIVE RENDER
  // =============================================

  useFrame(
    (_, delta) => {
      if (!active) {
        return
      }


      const model =
        modelRef?.current


      if (!model) {
        gl.setRenderTarget(
          null
        )

        gl.render(
          scene,
          camera
        )

        return
      }


      // =========================================
      // WHOLE BLUR FADE-IN
      // =========================================

      transitionElapsedRef.current +=
        delta


      const safeTransitionTime =
        Math.max(
          transitionTime,
          0.001
        )


      const linearProgress =
        THREE.MathUtils.clamp(
          transitionElapsedRef.current /
            safeTransitionTime,
          0,
          1
        )


      const easedProgress =
        linearProgress *
        linearProgress *
        (
          3 -
          2 * linearProgress
        )


      verticalBlurMaterial
        .uniforms
        .transitionOpacity
        .value =
        easedProgress


      // =========================================
      // GET SCREEN SIZE
      // =========================================

      gl.getDrawingBufferSize(
        drawingBufferSize
      )


      const screenWidth =
        Math.max(
          1,
          drawingBufferSize.x
        )


      const screenHeight =
        Math.max(
          1,
          drawingBufferSize.y
        )


      // =========================================
      // LOW RESOLUTION BLUR
      // =========================================

      const resolutionScale =
        Math.min(
          1,

          blurResolution /
            screenHeight
        )


      const targetWidth =
        Math.max(
          1,

          Math.floor(
            screenWidth *
              resolutionScale
          )
        )


      const targetHeight =
        Math.max(
          1,

          Math.floor(
            screenHeight *
              resolutionScale
          )
        )


      // =========================================
      // RESIZE TARGETS
      // =========================================

      if (
        targetWidth !==
          targetWidthRef.current ||
        targetHeight !==
          targetHeightRef.current
      ) {
        targetWidthRef.current =
          targetWidth


        targetHeightRef.current =
          targetHeight


        firstRenderTarget.setSize(
          targetWidth,
          targetHeight
        )


        secondRenderTarget.setSize(
          targetWidth,
          targetHeight
        )


        horizontalBlurMaterial
          .uniforms
          .resolution
          .value
          .set(
            targetWidth,
            targetHeight
          )


        verticalBlurMaterial
          .uniforms
          .resolution
          .value
          .set(
            targetWidth,
            targetHeight
          )
      }


      // =========================================
      // SAVE RENDERER STATE
      // =========================================

      const previousAutoClear =
        gl.autoClear


      const originalCameraMask =
        camera.layers.mask


      gl.autoClear =
        true


      // =========================================
      // PASS 1
      //
      // RENDER NORMAL SCENE INTO TEXTURE
      // =========================================

      camera.layers.set(
        0
      )


      gl.setRenderTarget(
        firstRenderTarget
      )


      gl.clear(
        true,
        true,
        true
      )


      gl.render(
        scene,
        camera
      )


      // =========================================
      // PASS 2
      //
      // HORIZONTAL BLUR
      // =========================================

      horizontalBlurMaterial
        .uniforms
        .tDiffuse
        .value =
        firstRenderTarget.texture


      horizontalBlurMaterial
        .uniforms
        .direction
        .value
        .set(
          1,
          0
        )


      horizontalBlurMaterial
        .uniforms
        .transitionOpacity
        .value =
        1


      fullscreenQuad.material =
        horizontalBlurMaterial


      gl.setRenderTarget(
        secondRenderTarget
      )


      gl.clear(
        true,
        true,
        true
      )


      gl.render(
        blurScene,
        blurCamera
      )


      // =========================================
      // PASS 3
      //
      // VERTICAL BLUR + TINT
      // =========================================

      verticalBlurMaterial
        .uniforms
        .tDiffuse
        .value =
        secondRenderTarget.texture


      verticalBlurMaterial
        .uniforms
        .direction
        .value
        .set(
          0,
          1
        )


      fullscreenQuad.material =
        verticalBlurMaterial


      // =========================================
      // PASS 4
      //
      // DRAW NORMAL SCENE FIRST
      // =========================================

      gl.setRenderTarget(
        null
      )


      gl.clear(
        true,
        true,
        true
      )


      camera.layers.set(
        0
      )


      gl.render(
        scene,
        camera
      )


      // =========================================
      // PASS 5
      //
      // FADE BLURRED IMAGE OVER NORMAL SCENE
      // =========================================

      gl.autoClear =
        false


      gl.render(
        blurScene,
        blurCamera
      )


      // =========================================
      // PASS 6
      //
      // SHARP FOCUSED MODEL ON TOP
      // =========================================

      gl.clearDepth()


      camera.layers.set(
        FOCUS_LAYER
      )


      gl.render(
        scene,
        camera
      )


      // =========================================
      // RESTORE
      // =========================================

      camera.layers.mask =
        originalCameraMask


      gl.autoClear =
        previousAutoClear
    },

    1
  )


  // =============================================
  // CLEANUP GPU RESOURCES
  // =============================================

  useEffect(() => {
    return () => {
      firstRenderTarget.dispose()

      secondRenderTarget.dispose()

      horizontalBlurMaterial.dispose()

      verticalBlurMaterial.dispose()

      fullscreenQuad.geometry.dispose()
    }
  }, [
    firstRenderTarget,
    secondRenderTarget,
    horizontalBlurMaterial,
    verticalBlurMaterial,
    fullscreenQuad,
  ])


  return null
}


export default ModelFocusMode