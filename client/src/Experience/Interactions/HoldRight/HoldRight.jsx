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

import {
  InteractionContext,
} from "../../../Contexts/InteractionContext/InteractionContext"

import {
  ModelContext,
} from "../../../Contexts/ModelContext/ModelContext"

import PouringMode from "../PouringMode/PouringMode"
import FillUpBeaker from "../FillUpBeaker/FillUpBeaker"
import StirMode from "../StirMode/StirMode"
import LitmusMode from "../LitmusMode/LitmusMode"
import FoldFilter from "../FoldFilter/FoldFilter"
import PlaceFilterFunnel from "../PlaceFilterFunnel/PlaceFilterFunnel"
import FunnelMode from "../FunnelMode/FunnelMode"

import {
  MainGuidelineContext,
} from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

import LiquidLabels from "../../../UI/LiquidLabels/LiquidLabels"

import {
  TransformControls,
} from "@react-three/drei"

import DropperPlaced from "../DropperPlaced/DropperPlaced"
import DropperScrollAnimation from "../DropperScrollAnimation/DropperScrollAnimation"

import {
  ReactionContext,
} from "../../../Contexts/ReactionContext/ReactionContext"

import PlacePolysterene from "../PlacePolysterene/PlacePolysterene"
import PourIntoTestubeFromSpoon from "../PourIntoTestubeFromSpoon/PourIntoTestubeFromSpoon"
import PipetteRubberAnimation from "../PipetteRubberAnimation/PipetteRubberAnimation"
import VolumetricPipetteMode from "../VolumetricPipetteMode/VolumetricPipetteMode"
import VolumetricRubberAnimation from "../VolumetricRubberAnimation/VolumetricRubberAnimation"
import InvertModel from "../InvertModel/InvertModel"
import ReleaseGasBubbles from "../../ReleaseGasBubbles/ReleaseGasBubbles"

const HoldRight = ({
  modeldata,
}) => {
  const {
    isFillUpBeaker,
    fillBeakerHand,

    selectedRightHand,
    selectedLeftHand,

    isStirMode,
    isLitmusMode,

    leftBeakerFillData,

    isFilterFolded,
    isFilterInFunnel,

    isFunnelMode,
    selectedModelRight,
    isDropperPlaced,
    isDropperFilled,

    setIsPlacePolysterene,
    isPlacePolysterene,
    isPourIntoTestube,

    isPottasiumCarobnateInSpoon,
    isPouringMode,
    isVolumetricPipetteMode,
  } = useContext(
    InteractionContext
  )

  const {
    filterFoldedPaperRef,
    filterPaperRef,
    funnelRef,
    graduatedPipetteRef,
    spoonRef,
    volumetricRef,
    seperatingFunnelRef,
  } = useContext(
    ModelContext
  )

  const {
    lessonStep,
    isMainGuideline,
    setLessonStep,
    selectedLesson,
    isTutorialMode,
    setSelectedLesson,
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

  const transformControlsRef =
    useRef()

  const [
    isCompactScreen,
    setIsCompactScreen,
  ] = useState(() => {
    if (typeof window === "undefined") {
      return false
    }

    return window.innerWidth <= 1024
  })

  const defaultOffsetRef =
    useRef(
      new THREE.Vector3(
        4.5,
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

  const previousMouseRef =
    useRef({
      x: 0,
      y: 0,
    })

  /* =====================================
     SCREEN SIZE DETECTION
  ===================================== */

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

  /* =====================================
     HELD OBJECT TRANSFORMS

     Change compact values to adjust
     objects for screens <= 900px.
  ===================================== */

  const objectTransforms = {
    default: {
      desktop: {
        position: [
          4.5,
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
          3.7,
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

    "main-normal-beaker": {
      desktop: {
        position: [
          4.5,
          -0.5,
          -5,
        ],

        rotation: [
          0,
          Math.PI,
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
          3.6,
          -0.75,
          -4.5,
        ],

        rotation: [
          0,
          Math.PI,
          0,
        ],

        scale: [
          0.65,
          0.65,
          0.65,
        ],
      },
    },

    "main-spoon": {
      desktop: {
        position: [
          3.5,
          -0.5,
          -5,
        ],

        rotation: [
          -1.4285088984579244,
          -0.30110700753116976,
          -1.0212733683935664,
        ],

        scale: [
          1,
          1,
          1,
        ],
      },

      compact: {
        position: [
          2.9,
          -0.7,
          -4.4,
        ],

        rotation: [
          -1.4285088984579244,
          -0.30110700753116976,
          -1.0212733683935664,
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
          4.5,
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
          3.7,
          -0.6,
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
          4.5,
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
          3.7,
          -0.6,
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
          4.5,
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
          3.7,
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
          4.5,
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
          3.7,
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
          4.5,
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
          3.7,
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
          4.5,
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
          3.7,
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
          4.5,
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
          3.7,
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
          4.5,
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
          3.7,
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
          4.5,
          -0.5,
          -5,
        ],

        rotation: [
          Math.PI / 3,
          0,
          -2,
        ],

        scale: [
          1.3,
          1.3,
          1.3,
        ],
      },

      compact: {
        position: [
          3.7,
          -0.7,
          -4.5,
        ],

        rotation: [
          Math.PI / 3,
          0,
          -2,
        ],

        scale: [
          1.05,
          1.05,
          1.05,
        ],
      },
    },

    "main-graduated-cylinder": {
      desktop: {
        position: [
          4.5,
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
          3.7,
          -0.75,
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

    "main-buirette": {
      desktop: {
        position: [
          4.5,
          0.5,
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
          3.7,
          0.1,
          -4.5,
        ],

        rotation: [
          0,
          0,
          0,
        ],

        scale: [
          0.7,
          0.7,
          0.7,
        ],
      },
    },

    pipette: {
      desktop: {
        position: [
          4.5,
          -0.5,
          -5,
        ],

        rotation: [
          0,
          0,
          0,
        ],

        scale: [
          1.1,
          1.8,
          1.1,
        ],
      },

      compact: {
        position: [
          3.7,
          -0.65,
          -4.5,
        ],

        rotation: [
          0,
          0,
          0,
        ],

        scale: [
          0.88,
          1.44,
          0.88,
        ],
      },
    },

    mainThermometer: {
      desktop: {
        position: [
          4.5,
          -0.5,
          -5,
        ],

        rotation: [
          0,
          0,
          0,
        ],

        scale: [
          1.3,
          1.3,
          1.3,
        ],
      },

      compact: {
        position: [
          3.7,
          -0.7,
          -4.5,
        ],

        rotation: [
          0,
          0,
          0,
        ],

        scale: [
          1.05,
          1.05,
          1.05,
        ],
      },
    },

    kettle: {
      desktop: {
        position: [
          4.5,
          -0.5,
          -5,
        ],

        rotation: [
          0,
          0,
          0,
        ],

        scale: [
          0.75,
          0.75,
          0.75,
        ],
      },

      compact: {
        position: [
          3.6,
          -0.75,
          -4.5,
        ],

        rotation: [
          0,
          0,
          0,
        ],

        scale: [
          0.6,
          0.6,
          0.6,
        ],
      },
    },

    "graduated-pipette": {
      desktop: {
        position: [
          4.5,
          -0.5,
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
          3.7,
          -0.7,
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

    "volumetric-flask": {
      desktop: {
        position: [
          4.5,
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
          3.7,
          -0.75,
          -4.5,
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
    },

    "metal-salt-container": {
      desktop: {
        position: [
          4.5,
          -0.5,
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
          3.7,
          -0.7,
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
    "mainPolysterene": {
      compact: {
        position: [
          3.7,
          -0.7,
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
    }


  }

  useEffect(() => {
    selectedModelRight.current =
      modeldata.ref.current
  }, [])

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

      isDraggingRef.current =
        true

      previousMouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      }
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
          Math.min(
            rotationZRef.current + 0.15,
            maxRotation
          )
      } else {
        rotationZRef.current =
          Math.max(
            rotationZRef.current - 0.15,
            -maxRotation
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
     ATTACH OBJECT TO CAMERA
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
  }, [
    camera,
    scene,
    modeldata,
    isCompactScreen,
  ])

  const isLitmus = (name) =>
    name
      ?.toLowerCase()
      .includes("litmus")

  useEffect(() => {
    if (
      selectedLesson === 15 &&
      lessonStep === 6
    ) {
      setLessonStep(7)
    }

    if (
      selectedLesson == 15 &&
      lessonStep == 25
    ) {
      setLessonStep(26)
      setSelectedLesson(15.2)
    }
  }, [
    lessonStep,
    selectedLesson,
  ])

  useEffect(() => {
    if (
      selectedLesson === 14.1 &&
      lessonStep === 62
    ) {
      setLessonStep(63)
    }
  }, [
    lessonStep,
    selectedLesson,
  ])

  useEffect(() => {
    if (
      selectedLesson === 14.1 &&
      lessonStep === 44
    ) {
      setLessonStep(45)
    }
  }, [
    lessonStep,
    selectedLesson,
  ])

  useEffect(() => {
    if (
      selectedLesson === 13 &&
      lessonStep === 3.1
    ) {
      setLessonStep(3.2)
    }
  }, [
    lessonStep,
    selectedLesson,
  ])

  useEffect(() => {
    if (
      selectedLesson === 13 &&
      lessonStep === 5
    ) {
      setLessonStep(6)
    }
  }, [
    lessonStep,
    selectedLesson,
  ])

  useEffect(() => {
    if (
      selectedLesson === 13 &&
      lessonStep === 16
    ) {
      setLessonStep(17)
    }
  }, [
    lessonStep,
    selectedLesson,
  ])

  useEffect(() => {
    if (
      selectedLesson === 8 &&
      lessonStep === 5
    ) {
      setLessonStep(6)
    }
  }, [
    lessonStep,
    selectedLesson,
  ])

  useEffect(() => {
    if (
      selectedLesson === 8 &&
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
      selectedLesson === 8 &&
      lessonStep === 32
    ) {
      setLessonStep(34)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 8 &&
      lessonStep === 21
    ) {
      setLessonStep(22)
    }
  }, [
    lessonStep,
    selectedLesson,
  ])

  useEffect(() => {
    if (
      selectedLesson === 8 &&
      lessonStep === 9
    ) {
      setLessonStep(10)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 10 &&
      lessonStep === 4
    ) {
      setLessonStep(5)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 12 &&
      lessonStep === 7
    ) {
      setLessonStep(8)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 12.1 &&
      lessonStep === 22
    ) {
      setLessonStep(23)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 12.1 &&
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
      lessonStep === 4 &&
      selectedLesson === 8 &&
      isTutorialMode
    ) {
      setLessonStep(5)
    }
  }, [
    lessonStep,
    isMainGuideline,
  ])

  useEffect(() => {
    if (
      lessonStep === 3 &&
      selectedLesson === 9
    ) {
      setLessonStep(4)
    }
  }, [
    lessonStep,
    isMainGuideline,
  ])

  useEffect(() => {
    if (
      lessonStep === 7 &&
      selectedLesson === 9
    ) {
      setLessonStep(8)
    }
  }, [
    lessonStep,
    isMainGuideline,
  ])

  useEffect(() => {
    if (
      lessonStep === 110 &&
      selectedLesson === 14.3
    ) {
      setLessonStep(111)
    }
  }, [
    lessonStep,
    selectedLesson,
  ])

  useEffect(() => {
    if (
      lessonStep === 94 &&
      selectedLesson === 14.3
    ) {
      setLessonStep(95)
    }
  }, [
    lessonStep,
    selectedLesson,
  ])

  useEffect(() => {
    if (
      lessonStep === 34 &&
      selectedLesson === 14.1
    ) {
      setLessonStep(35)
    }
  }, [
    lessonStep,
    selectedLesson,
  ])

  useEffect(() => {
    if (
      lessonStep === 26 &&
      selectedLesson === 14.1
    ) {
      setLessonStep(27)
    }
  }, [
    lessonStep,
    selectedLesson,
  ])

  useEffect(() => {
    if (
      lessonStep === 19 &&
      selectedLesson === 9
    ) {
      setLessonStep(20)
    }
  }, [
    lessonStep,
    selectedLesson,
  ])

  useEffect(() => {
    if (
      lessonStep === 28 &&
      selectedLesson === 9
    ) {
      setLessonStep(29)
    }
  }, [
    lessonStep,
    selectedLesson,
  ])

  useEffect(() => {
    if (
      lessonStep === 3 &&
      selectedLesson === 14
    ) {
      setLessonStep(4)
    }
  }, [
    lessonStep,
    selectedLesson,
  ])

  useEffect(() => {
    if (
      lessonStep === 30 &&
      selectedLesson === 9
    ) {
      setLessonStep(31)
    }
  }, [
    lessonStep,
    selectedLesson,
  ])

  useEffect(() => {
    if (
      lessonStep === 12 &&
      selectedLesson === 10
    ) {
      setLessonStep(13)
    }
  }, [
    lessonStep,
    selectedLesson,
  ])

  useEffect(() => {
    if (
      lessonStep === 19 &&
      selectedLesson === 10
    ) {
      setLessonStep(20)
    }
  }, [
    lessonStep,
    selectedLesson,
  ])

  useEffect(() => {
    if (
      lessonStep === 42 &&
      selectedLesson === 10
    ) {
      setLessonStep(43)
    }
  }, [
    lessonStep,
    selectedLesson,
  ])

  useEffect(() => {
    if (
      lessonStep === 76 &&
      selectedLesson === 10
    ) {
      setLessonStep(77)
    }
  }, [
    lessonStep,
    selectedLesson,
  ])

  useEffect(() => {
    if (
      lessonStep === 84 &&
      selectedLesson === 10
    ) {
      setLessonStep(85)
    }
  }, [
    lessonStep,
    selectedLesson,
  ])

  useEffect(() => {
    if (
      lessonStep === 86 &&
      selectedLesson === 10
    ) {
      console.log("87")
      setLessonStep(87)
    }
  }, [
    lessonStep,
    selectedLesson,
  ])

  useEffect(() => {
    if (
      lessonStep === 92 &&
      selectedLesson === 10
    ) {
      setLessonStep(93)
    }
  }, [
    lessonStep,
    selectedLesson,
  ])

  useEffect(() => {
    if (
      lessonStep === 96 &&
      selectedLesson === 10
    ) {
      setLessonStep(97)
    }
  }, [
    lessonStep,
    selectedLesson,
  ])

  useEffect(() => {
    if (
      selectedLesson === 10 &&
      lessonStep === 102
    ) {
      setLessonStep(103)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 10 &&
      lessonStep === 104
    ) {
      setLessonStep(105)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 11 &&
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
      selectedLesson === 11 &&
      lessonStep === 12
    ) {
      setLessonStep(13)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 11 &&
      lessonStep === 40
    ) {
      setLessonStep(41)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 12.2 &&
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
      selectedLesson === 12.2 &&
      lessonStep === 55
    ) {
      setLessonStep(56)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 12.2 &&
      lessonStep === 63
    ) {
      setLessonStep(66)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 12.2 &&
      lessonStep === 72
    ) {
      setLessonStep(73)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 12.2 &&
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
      selectedLesson === 12.2 &&
      lessonStep === 96
    ) {
      setLessonStep(97)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 14.3 &&
      lessonStep === 85
    ) {
      setLessonStep(86)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 14.3 &&
      lessonStep == 115
    ) {
      setLessonStep(116)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 14.3 &&
      lessonStep == 127
    ) {
      setLessonStep(128)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    if (
      selectedLesson === 14.3 &&
      lessonStep == 133
    ) {
      setLessonStep(134)
      setSelectedLesson(14.4)
    }

    if (
      selectedLesson == 14.4 &&
      lessonStep == 141
    ) {
      setLessonStep(142)
    }

    if (
      selectedLesson == 14.4 &&
      lessonStep == 147
    ) {
      setLessonStep(148)
    }
  }, [
    selectedLesson,
    lessonStep,
  ])

  useEffect(() => {
    const handleKeyDown = (
      event
    ) => {
      if (event.code === "KeyP") {
        if (
          selectedLesson == 12 &&
          lessonStep == 18
        ) {
          setLessonStep(19)
        }

        if (
          selectedLesson == 12.2 &&
          lessonStep == 56
        ) {
          setLessonStep(57)
        }

        if (
          selectedLesson == 12.1 &&
          lessonStep == 27
        ) {
          setLessonStep(28)
        }

        if (
          selectedLesson == 12.1 &&
          lessonStep == 33
        ) {
          setLessonStep(34)
        }

        if (
          selectedLesson == 12.1 &&
          lessonStep == 39
        ) {
          setLessonStep(40)
        }

        if (
          selectedLesson == 14.3 &&
          lessonStep == 95
        ) {
          setLessonStep(96)
        }

        if (
          selectedLesson == 14.3 &&
          lessonStep == 111
        ) {
          setLessonStep(112)
        }

        if (
          selectedLesson == 14.3 &&
          lessonStep == 130
        ) {
          setLessonStep(131)
        }

        if (
          selectedLesson === 11 &&
          lessonStep === 20
        ) {
          setLessonStep(21)
        }

        if (
          selectedLesson === 15 &&
          lessonStep === 10
        ) {
          setLessonStep(11)
        }

        if (
          selectedLesson === 10 &&
          lessonStep === 5
        ) {
          setLessonStep(6)
        }

        if (
          selectedLesson === 10 &&
          lessonStep === 22
        ) {
          setLessonStep(23)
        }

        if (
          selectedLesson === 10 &&
          lessonStep === 29
        ) {
          setLessonStep(30)
        }

        if (
          selectedLesson === 10 &&
          lessonStep === 35
        ) {
          setLessonStep(36)
        }
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
    selectedLesson,
    lessonStep,
    setLessonStep,
  ])

  return (
    <>
      {isFillUpBeaker &&
        fillBeakerHand === "right" &&
        selectedRightHand && (
          <FillUpBeaker
            beakerRef={
              selectedRightHand.ref
            }
            hand="right"
          />
        )}

      {!isStirMode &&
        selectedLeftHand &&
        selectedRightHand &&
        !isFunnelMode &&
        ![
          14.3,
          11,
          12,
          12.1,
          12.2,
          14.4,
          15,
          10,
        ].includes(selectedLesson) && (
          <PouringMode hand="right" />
        )}

      {isStirMode &&
        selectedRightHand?.name ===
          "main-spoon" &&
        selectedLeftHand && (
          <StirMode
            spoonRef={
              selectedRightHand.ref
            }
            beakerRef={
              selectedLeftHand.ref
            }
            hand="right"
          />
        )}

      {isLitmusMode &&
        selectedLeftHand &&
        selectedRightHand &&
        isLitmus(
          selectedRightHand.name
        ) && (
          <LitmusMode
            litmusRef={
              selectedRightHand.ref
            }
            beakerRef={
              selectedLeftHand.ref
            }
            hand="right"
            beakerFillData={
              leftBeakerFillData
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
        selectedRightHand?.name ===
          "main-folded-paper" &&
        selectedLeftHand?.name ===
          "main-funnel" && (
          <PlaceFilterFunnel
            foldedFilterRef={
              filterFoldedPaperRef
            }
            funnelRef={funnelRef}
            hand="right"
          />
        )}

      {isDropperPlaced && (
        <DropperPlaced
          hand="right"
          beakerRef={
            selectedLeftHand.ref
          }
        />
      )}

      {(selectedRightHand?.name ===
        "main-dropper" ||
        isDropperPlaced) && (
        <DropperScrollAnimation
          hand="right"
        />
      )}

      {isPlacePolysterene &&
        selectedRightHand?.name ===
          "mainPolysterene" && (
          <PlacePolysterene
            hand="right"
            beakerRef={
              selectedLeftHand.ref
            }
            polystereneRef={
              selectedRightHand.ref
            }
          />
        )}

      {isPourIntoTestube &&
        selectedLeftHand?.name ===
          "main-testube-01" && (
          <PourIntoTestubeFromSpoon
            testubeRef={
              selectedLeftHand.ref
            }
            spoonRef={spoonRef}
            hand="right"
            heightOffset={0.6}
            xOffset={0.7}
          />
        )}

      {isPourIntoTestube &&
        selectedLeftHand?.name ===
          "main-Conical-Flask-02" && (
          <PourIntoTestubeFromSpoon
            testubeRef={
              selectedLeftHand.ref
            }
            spoonRef={spoonRef}
            hand="right"
            heightOffset={0.6}
            xOffset={0.7}
          />
        )}

      {isPourIntoTestube &&
        selectedLeftHand?.name ===
          "main-testube-03" && (
          <PourIntoTestubeFromSpoon
            testubeRef={
              selectedLeftHand.ref
            }
            spoonRef={spoonRef}
            hand="right"
            heightOffset={0.6}
            xOffset={0.8}
          />
        )}

      {selectedRightHand.name ===
        "pipette" && (
        <PipetteRubberAnimation />
      )}

      {selectedRightHand.name ===
        "graduated-pipette" && (
        <PipetteRubberAnimation
          modelRef={
            graduatedPipetteRef
          }
        />
      )}

      {selectedRightHand?.name ===
        "volumetric-pipette" && (
        <VolumetricRubberAnimation />
      )}

      {selectedLesson === 11 &&
        [
          24,
          25,
          26,
          27,
          28,
          29,
        ].includes(lessonStep) &&
        selectedRightHand?.name ===
          "volumetric-flask" &&
        !isVolumetricPipetteMode && (
          <InvertModel
            modelRef={volumetricRef}
          />
        )}

      {selectedLesson === 12.1 &&
        [
          44,
          45,
          46,
          47,
          48,
          49,
        ].includes(lessonStep) &&
        selectedRightHand?.name ===
          "volumetric-flask" && (
          <InvertModel
            modelRef={volumetricRef}
          />
        )}

      {selectedLesson == 14.1 &&
        lessonStep == 53.1 && (
          <ReleaseGasBubbles
            sidewaysMovement={0.1}
            loopTimes={2}
            modelRef={
              seperatingFunnelRef
            }
            minimumSpeed={0.5}
            maximumSpeed={0.8}
          />
        )}

      {selectedLesson == 14.1 &&
        lessonStep == 56.1 && (
          <ReleaseGasBubbles
            loopTimes={1}
            bubblePercentage={70}
            modelRef={
              seperatingFunnelRef
            }
            minimumSpeed={0.5}
            maximumSpeed={0.8}
            sidewaysMovement={0.1}
          />
        )}

      {selectedLesson == 14.2 &&
        lessonStep == 73 && (
          <ReleaseGasBubbles
            loopTimes={1}
            bubblePercentage={60}
            modelRef={
              seperatingFunnelRef
            }
            minimumSpeed={0.5}
            maximumSpeed={0.8}
            sidewaysMovement={0.1}
          />
        )}

      {selectedLesson == 14.2 &&
        lessonStep == 77 && (
          <ReleaseGasBubbles
            loopTimes={1}
            bubblePercentage={40}
            modelRef={
              seperatingFunnelRef
            }
            minimumSpeed={0.5}
            maximumSpeed={0.8}
            sidewaysMovement={0.1}
          />
        )}
    </>
  )
}

export default HoldRight