import {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"

import {
  useFrame,
  useThree,
} from "@react-three/fiber"

import * as THREE from "three"

import PouringLiquid from "../PouringLiquid/PouringLiquid"

import {
  InteractionContext,
} from "../../../Contexts/InteractionContext/InteractionContext"

import FillUpBeaker from "../FillUpBeaker/FillUpBeaker"
import PouringMode from "../PouringMode/PouringMode"
import StirMode from "../StirMode/StirMode"
import LitmusMode from "../LitmusMode/LitmusMode"
import FoldFilter from "../FoldFilter/FoldFilter"

import {
  ModelContext,
} from "../../../Contexts/ModelContext/ModelContext"

import PlaceFilterFunnel from "../PlaceFilterFunnel/PlaceFilterFunnel"
import FunnelMode from "../FunnelMode/FunnelMode"

import {
  MainGuidelineContext,
} from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

import LiquidLabels from "../../../UI/LiquidLabels/LiquidLabels"

import {
  ReactionContext,
} from "../../../Contexts/ReactionContext/ReactionContext"

import VolumetricPipetteMode from "../VolumetricPipetteMode/VolumetricPipetteMode"
import VolumetricRubberAnimation from "../VolumetricRubberAnimation/VolumetricRubberAnimation"

const HoldLeft = ({
  modeldata,
}) => {
  const {
    isFillUpBeaker,
    selectedLeftHand,
    fillBeakerHand,
    setIsPouring,
    isStirMode,
    isLitmusMode,
    selectedRightHand,
    setPouredFromLeft,
    rightBeakerFillData,
    isFilterFolded,
    setIsFilterFolded,
    isFilterInFunnel,
    setIsFilterInFunnel,
    isPouringMode,
    isFunnelMode,
    setIsFunnelMode,
    selectedModelLeft,
    isDropperPlaced,
    isPottasiumCarobnateInTestube01,
  } = useContext(
    InteractionContext
  )

  const {
    filterFoldedPaperRef,
    filterPaperRef,
    funnelRef,
  } = useContext(
    ModelContext
  )

  const {
    lessonStep,
    setLessonStep,
    isMainGuideline,
    setShowNormalBeakerArrow,
    selectedLesson,
  } = useContext(
    MainGuidelineContext
  )

  const {
    isReactionRef,
  } = useContext(
    ReactionContext
  )

  const {
    camera,
    gl,
    scene,
  } = useThree()

  /* =====================================
     COMPACT SCREEN DETECTION
     900px AND BELOW
  ===================================== */

  const [
    isCompactScreen,
    setIsCompactScreen,
  ] = useState(() => {
    if (typeof window === "undefined") {
      return false
    }

    return window.innerWidth <=1024
  })

  useEffect(() => {
    const checkScreenSize = () => {
      setIsCompactScreen(
        window.innerWidth <= 1024
      )
    }

    checkScreenSize()

    window.addEventListener(
      "resize",
      checkScreenSize
    )

    return () => {
      window.removeEventListener(
        "resize",
        checkScreenSize
      )
    }
  }, [])

  useEffect(() => {
    selectedModelLeft.current =
      modeldata.ref.current
  }, [])

  useEffect(() => {
    console.log(
      "selectedModelLeft:",
      selectedModelLeft
    )
  }, [
    selectedModelLeft,
  ])

  const defaultOffsetRef =
    useRef(
      new THREE.Vector3(
        -4,
        -0.5,
        -5
      )
    )

  const rotationZRef =
    useRef(0)

  const raycasterRef =
    useRef(
      new THREE.Raycaster()
    )

  const mouseRef =
    useRef(
      new THREE.Vector2()
    )

  const isDraggingRef =
    useRef(false)

  /* =====================================
     HELD OBJECT TRANSFORMS

     desktop = above 900px
     compact = 900px and below
  ===================================== */

  const objectTransforms = {
    default: {
      desktop: {
        position: [
          -4,
          -0.5,
          -5,
        ],

        rotation: [
          0,
          0,
          0,
        ],

        scale: [
          1,
          1,
          1,
        ],
      },

      compact: {
        position: [
          -3.3,
          -0.65,
          -4.5,
        ],

        rotation: [
          0,
          0,
          0,
        ],

        scale: [
          0.82,
          0.82,
          0.82,
        ],
      },
    },

    "main-spoon": {
      desktop: {
        position: [
          -4,
          -0.5,
          -5,
        ],

        rotation: [
          Math.PI / 2,
          0,
          Math.PI / 6,
        ],

        scale: [
          1,
          1,
          1,
        ],
      },

      compact: {
        position: [
          -3.2,
          -0.7,
          -4.5,
        ],

        rotation: [
          Math.PI / 2,
          0,
          Math.PI / 6,
        ],

        scale: [
          0.82,
          0.82,
          0.82,
        ],
      },
    },

    "main-red-litmus": {
      desktop: {
        position: [
          -4,
          -0.5,
          -5,
        ],

        rotation: [
          Math.PI / 2,
          0,
          0,
        ],

        scale: [
          1.5,
          1.5,
          1.5,
        ],
      },

      compact: {
        position: [
          -3.3,
          -0.65,
          -4.5,
        ],

        rotation: [
          Math.PI / 2,
          0,
          0,
        ],

        scale: [
          1.2,
          1.2,
          1.2,
        ],
      },
    },

    "main-blue-litmus": {
      desktop: {
        position: [
          -4,
          -0.5,
          -5,
        ],

        rotation: [
          Math.PI / 2,
          0,
          0,
        ],

        scale: [
          1.5,
          1.5,
          1.5,
        ],
      },

      compact: {
        position: [
          -3.3,
          -0.65,
          -4.5,
        ],

        rotation: [
          Math.PI / 2,
          0,
          0,
        ],

        scale: [
          1.2,
          1.2,
          1.2,
        ],
      },
    },

    "main-testube-01": {
      desktop: {
        position: [
          -4,
          -0.5,
          -5,
        ],

        rotation: [
          0,
          0,
          0,
        ],

        scale: [
          1.5,
          1.5,
          1.5,
        ],
      },

      compact: {
        position: [
          -3.3,
          -0.7,
          -4.5,
        ],

        rotation: [
          0,
          0,
          0,
        ],

        scale: [
          1.2,
          1.2,
          1.2,
        ],
      },
    },

    "main-testube-02": {
      desktop: {
        position: [
          -4,
          -0.5,
          -5,
        ],

        rotation: [
          0,
          0,
          0,
        ],

        scale: [
          1.5,
          1.5,
          1.5,
        ],
      },

      compact: {
        position: [
          -3.3,
          -0.7,
          -4.5,
        ],

        rotation: [
          0,
          0,
          0,
        ],

        scale: [
          1.2,
          1.2,
          1.2,
        ],
      },
    },

    "main-testube-03": {
      desktop: {
        position: [
          -4,
          -0.5,
          -5,
        ],

        rotation: [
          0,
          0,
          0,
        ],

        scale: [
          1.5,
          1.5,
          1.5,
        ],
      },

      compact: {
        position: [
          -3.3,
          -0.7,
          -4.5,
        ],

        rotation: [
          0,
          0,
          0,
        ],

        scale: [
          1.2,
          1.2,
          1.2,
        ],
      },
    },

    "main-testube-04": {
      desktop: {
        position: [
          -4,
          -0.5,
          -5,
        ],

        rotation: [
          0,
          0,
          0,
        ],

        scale: [
          1.5,
          1.5,
          1.5,
        ],
      },

      compact: {
        position: [
          -3.3,
          -0.7,
          -4.5,
        ],

        rotation: [
          0,
          0,
          0,
        ],

        scale: [
          1.2,
          1.2,
          1.2,
        ],
      },
    },

    "main-testube-05": {
      desktop: {
        position: [
          -4,
          -0.5,
          -5,
        ],

        rotation: [
          0,
          0,
          0,
        ],

        scale: [
          1.5,
          1.5,
          1.5,
        ],
      },

      compact: {
        position: [
          -3.3,
          -0.7,
          -4.5,
        ],

        rotation: [
          0,
          0,
          0,
        ],

        scale: [
          1.2,
          1.2,
          1.2,
        ],
      },
    },

    "main-testube-06": {
      desktop: {
        position: [
          -4,
          -0.5,
          -5,
        ],

        rotation: [
          0,
          0,
          0,
        ],

        scale: [
          1.5,
          1.5,
          1.5,
        ],
      },

      compact: {
        position: [
          -3.3,
          -0.7,
          -4.5,
        ],

        rotation: [
          0,
          0,
          0,
        ],

        scale: [
          1.2,
          1.2,
          1.2,
        ],
      },
    },

    "main-filter-paper": {
      desktop: {
        position: [
          -4,
          -0.5,
          -5,
        ],

        rotation: [
          Math.PI / 3,
          0,
          2,
        ],

        scale: [
          1.3,
          1.3,
          1.3,
        ],
      },

      compact: {
        position: [
          -3.3,
          -0.7,
          -4.5,
        ],

        rotation: [
          Math.PI / 3,
          0,
          2,
        ],

        scale: [
          1.05,
          1.05,
          1.05,
        ],
      },
    },

    "main-graduated-cylinder-100": {
      desktop: {
        position: [
          -4,
          -0.5,
          -5,
        ],

        rotation: [
          0,
          Math.PI / 3,
          0,
        ],

        scale: [
          0.8,
          1.2,
          0.8,
        ],
      },

      compact: {
        position: [
          -3.3,
          -0.7,
          -4.5,
        ],

        rotation: [
          0,
          Math.PI / 3,
          0,
        ],

        scale: [
          0.65,
          0.96,
          0.65,
        ],
      },
    },

    "main-normal-beaker": {
      desktop: {
        position: [
          -4,
          -0.5,
          -5,
        ],

        rotation: [
          0,
          0,
          0,
        ],

        scale: [
          0.9,
          0.9,
          0.9,
        ],
      },

      compact: {
        position: [
          -3,
          -0.75,
          -4.5,
        ],

        rotation: [
          0,
          0,
          0,
        ],

        scale: [
          0.72,
          0.72,
          0.72,
        ],
      },
    },

    "main-buirette": {
      desktop: {
        position: [
          -4,
          0.5,
          -5,
        ],

        rotation: [
          0,
          0,
          0,
        ],

        scale: [
          0.8,
          0.8,
          0.8,
        ],
      },

      compact: {
        position: [
          -3.3,
          0.1,
          -4.5,
        ],

        rotation: [
          0,
          0,
          0,
        ],

        scale: [
          0.64,
          0.64,
          0.64,
        ],
      },
    },

    "volumetric-pipette": {
      desktop: {
        position: [
          -4,
          -0.5,
          -5,
        ],

        rotation: [
          0,
          0,
          0,
        ],

        scale: [
          0.4,
          0.4,
          0.4,
        ],
      },

      compact: {
        position: [
          -3.3,
          -0.65,
          -4.5,
        ],

        rotation: [
          0,
          0,
          0,
        ],

        scale: [
          0.32,
          0.32,
          0.32,
        ],
      },
    },

    "water-bottle": {
      desktop: {
        position: [
          -4,
          -1.5,
          -5,
        ],

        rotation: [
          0,
          0,
          0,
        ],

        scale: [
          0.8,
          0.8,
          0.8,
        ],
      },

      compact: {
        position: [
          -3.3,
          -1.25,
          -4.5,
        ],

        rotation: [
          0,
          0,
          0,
        ],

        scale: [
          0.65,
          0.65,
          0.65,
        ],
      },
    },

    "phenopthaline-dropper-bottle": {
      desktop: {
        position: [
          -4,
          -0.5,
          -5,
        ],

        rotation: [
          0,
          0,
          0,
        ],

        scale: [
          1,
          1.2,
          1,
        ],
      },

      compact: {
        position: [
          -3.3,
          -0.65,
          -4.5,
        ],

        rotation: [
          0,
          0,
          0,
        ],

        scale: [
          0.8,
          0.96,
          0.8,
        ],
      },
    },
  }

  // useEffect(()=>{
  //   if(lessonStep===3 && isMainGuideline){
  //     setLessonStep(4);
  //     setShowNormalBeakerArrow(false)
  //   }
  // },[lessonStep])

  useEffect(() => {
    if (
      selectedLesson === 15 &&
      lessonStep == 14
    ) {
      setLessonStep(15)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 14.3 &&
      lessonStep == 121
    ) {
      setLessonStep(123)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      lessonStep === 106.1 &&
      selectedLesson === 14.3
    ) {
      setLessonStep(106.2)
    }
  }, [
    lessonStep,
    selectedLesson,
  ])

  useEffect(() => {
    if (
      lessonStep === 86 &&
      selectedLesson === 14.3
    ) {
      setLessonStep(87)
    }
  }, [
    lessonStep,
    selectedLesson,
  ])

  useEffect(() => {
    if (
      lessonStep === 6 &&
      selectedLesson === 14
    ) {
      setLessonStep(7)
    }
  }, [
    lessonStep,
    selectedLesson,
  ])

  useEffect(() => {
    if (
      lessonStep === 8 &&
      selectedLesson === 13
    ) {
      setLessonStep(9)
    }
  }, [
    lessonStep,
    selectedLesson,
  ])

  useEffect(() => {
    if (
      lessonStep === 3 &&
      selectedLesson === 13
    ) {
      setLessonStep(3.1)
    }
  }, [
    lessonStep,
    selectedLesson,
  ])

  useEffect(() => {
    if (
      lessonStep === 15 &&
      selectedLesson === 13
    ) {
      setLessonStep(16)
    }
  }, [
    lessonStep,
    selectedLesson,
  ])

  useEffect(() => {
    if (
      lessonStep === 3 &&
      selectedLesson === 8
    ) {
      setLessonStep(4)
    }
  }, [
    lessonStep,
    selectedLesson,
  ])

  useEffect(() => {
    if (
      selectedLesson === 8 &&
      lessonStep === 8
    ) {
      setLessonStep(9)
    }
  }, [
    lessonStep,
    selectedLesson,
  ])

  useEffect(() => {
    if (
      selectedLesson === 8 &&
      lessonStep === 18
    ) {
      setLessonStep(19)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 9 &&
      lessonStep === 2
    ) {
      setLessonStep(3)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 9 &&
      lessonStep === 6
    ) {
      setLessonStep(7)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 9 &&
      lessonStep === 16
    ) {
      setLessonStep(17)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 10 &&
      lessonStep === 3
    ) {
      setLessonStep(4)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 10 &&
      lessonStep === 10
    ) {
      setLessonStep(11)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 10 &&
      lessonStep === 15
    ) {
      setLessonStep(16)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 10 &&
      lessonStep === 21
    ) {
      setLessonStep(22)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 10 &&
      lessonStep === 26
    ) {
      setLessonStep(27)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 10 &&
      lessonStep === 33
    ) {
      setLessonStep(34)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 10 &&
      lessonStep === 41
    ) {
      setLessonStep(42)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 10 &&
      lessonStep === 48
    ) {
      setLessonStep(49)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 10 &&
      lessonStep === 53
    ) {
      setLessonStep(54)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 10 &&
      lessonStep === 58
    ) {
      setLessonStep(59)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 10 &&
      lessonStep === 63
    ) {
      setLessonStep(64)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 10 &&
      lessonStep === 74
    ) {
      setLessonStep(75)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 10 &&
      lessonStep === 68
    ) {
      setLessonStep(69)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 10 &&
      lessonStep === 79
    ) {
      setLessonStep(80)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 10 &&
      lessonStep === 89
    ) {
      setLessonStep(90)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 10 &&
      lessonStep === 82
    ) {
      setLessonStep(83)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 10 &&
      lessonStep === 100
    ) {
      setLessonStep(101)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 11 &&
      lessonStep === 6
    ) {
      setLessonStep(7)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 11 &&
      lessonStep === 17
    ) {
      setLessonStep(20)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 11 &&
      lessonStep === 30
    ) {
      setLessonStep(31)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 11 &&
      lessonStep === 34
    ) {
      setLessonStep(35)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 11.1 &&
      lessonStep === 45
    ) {
      setLessonStep(46)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 11.1 &&
      lessonStep === 58
    ) {
      setLessonStep(59)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 12 &&
      lessonStep === 3
    ) {
      setLessonStep(4)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 12 &&
      lessonStep === 15
    ) {
      setLessonStep(16)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 12.2 &&
      lessonStep === 52
    ) {
      setLessonStep(53)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 12.2 &&
      lessonStep === 66
    ) {
      setLessonStep(67)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 12.2 &&
      lessonStep === 77
    ) {
      setLessonStep(78)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 12.2 &&
      lessonStep === 90
    ) {
      setLessonStep(91)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 12.2 &&
      lessonStep === 100.1
    ) {
      setLessonStep(100.2)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 15 &&
      lessonStep === 9
    ) {
      setLessonStep(10)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    const canvas =
      gl.domElement

    const handleMouseDown = (e) => {
      if (
        !modeldata?.ref?.current
      ) {
        return
      }

      const rect =
        canvas.getBoundingClientRect()

      mouseRef.current.x =
        (
          (e.clientX - rect.left) /
          rect.width
        ) *
          2 -
        1

      mouseRef.current.y =
        -(
          (e.clientY - rect.top) /
          rect.height
        ) *
          2 +
        1

      raycasterRef.current.setFromCamera(
        mouseRef.current,
        camera
      )

      const hits =
        raycasterRef.current.intersectObject(
          modeldata.ref.current,
          true
        )

      if (hits.length === 0) {
        return
      }

      isDraggingRef.current = true
    }

    const handleWheel = (e) => {
      if (isFunnelMode) {
        return
      }

      if (selectedRightHand) {
        return
      }

      e.preventDefault()

      const maxRotation =
        Math.PI / 5

      if (e.deltaY > 0) {
        rotationZRef.current =
          Math.max(
            rotationZRef.current - 0.15,
            -maxRotation
          )
      } else {
        rotationZRef.current =
          Math.min(
            rotationZRef.current + 0.15,
            maxRotation
          )
      }
    }

    canvas.addEventListener(
      "mousedown",
      handleMouseDown
    )

    window.addEventListener(
      "wheel",
      handleWheel,
      {
        passive: false,
      }
    )

    return () => {
      canvas.removeEventListener(
        "mousedown",
        handleMouseDown
      )

      window.removeEventListener(
        "wheel",
        handleWheel
      )
    }
  }, [
    camera,
    gl,
    modeldata,
    isFunnelMode,
    selectedRightHand,
  ])

  /* =====================================
     ATTACH LEFT-HAND OBJECT TO CAMERA
  ===================================== */

  useEffect(() => {
    if (
      !modeldata?.ref?.current
    ) {
      return
    }

    if (
      !scene.children.includes(camera)
    ) {
      scene.add(camera)
    }

    const object =
      modeldata.ref.current

    camera.add(object)

    const transformData =
      objectTransforms[object.name] ||
      objectTransforms.default

    const selectedTransform =
      isCompactScreen
        ? transformData.compact
        : transformData.desktop

    object.position.set(
      ...selectedTransform.position
    )

    object.rotation.set(
      ...selectedTransform.rotation
    )

    object.scale.set(
      ...selectedTransform.scale
    )

    object.visible = true
    object.frustumCulled = false

    return () => {
      object.scale.set(1, 1, 1)
      object.updateMatrixWorld(true)
    }
  }, [
    camera,
    scene,
    modeldata,
    isCompactScreen,
  ])

  useFrame(() => {
    if (
      !modeldata?.ref?.current
    ) {
      return
    }

    const object =
      modeldata.ref.current
  })

  // useEffect(()=>{
  //   console.log("selectedLeftHand",selectedLeftHand)
  // },[selectedLeftHand])

  useEffect(() => {
  }, [
    isFilterInFunnel,
  ])

  const isLitmus = (name) =>
    name
      ?.toLowerCase()
      .includes("litmus")

  return (
    <>
      {isFillUpBeaker &&
        fillBeakerHand === "left" && (
          <FillUpBeaker
            beakerRef={
              selectedLeftHand.ref
            }
            hand="left"
          />
        )}

      {!isStirMode &&
        !isLitmusMode &&
        !isFunnelMode &&
        selectedLeftHand &&
        selectedRightHand &&
        ![
          14.3,
          14.4,
          11,
          12,
          12.1,
          12.2,
          15,
          10,
        ].includes(selectedLesson) && (
          <PouringMode hand="left" />
        )}

      {isStirMode &&
        selectedLeftHand?.name ===
          "main-spoon" &&
        selectedRightHand && (
          <StirMode
            spoonRef={
              selectedLeftHand.ref
            }
            beakerRef={
              selectedRightHand.ref
            }
            hand="left"
          />
        )}

      {isLitmusMode &&
        selectedLeftHand &&
        selectedRightHand &&
        isLitmus(
          selectedLeftHand.name
        ) && (
          <LitmusMode
            litmusRef={
              selectedLeftHand.ref
            }
            beakerRef={
              selectedRightHand.ref
            }
            hand="left"
            beakerFillData={
              rightBeakerFillData
            }
          />
        )}

      {isFilterFolded && (
        <FoldFilter
          filterPaperRef={
            filterPaperRef
          }
          filterFoldedPaperRef={
            filterFoldedPaperRef
          }
        />
      )}

      {isFilterInFunnel &&
        selectedLeftHand?.name ===
          "main-folded-paper" &&
        selectedRightHand?.name ===
          "main-funnel" && (
          <PlaceFilterFunnel
            foldedFilterRef={
              filterFoldedPaperRef
            }
            funnelRef={funnelRef}
            hand="left"
          />
        )}

      {modeldata?.name ===
        "volumetric-pipette" && (
        <VolumetricRubberAnimation
          modelRef={modeldata.ref}
        />
      )}

      {/* {
       !isStirMode && !isLitmusMode &&
       !isDropperPlaced &&
       isReactionRef.current === false &&
       !isPouringMode &&
       <LiquidLabels
         modelRef={modeldata.ref}
         hand="left"
       />
      } */}
    </>
  )
}

export default HoldLeft