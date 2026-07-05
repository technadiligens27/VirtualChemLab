import { useContext, useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { InteractionContext } from "../../../Contexts/InteractionContext/InteractionContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const FillUpBeaker = ({ beakerRef, hand }) => {
  const {
    leftBeakerFillData,
    rightBeakerFillData,
  } = useContext(InteractionContext)

  const {
    lessonStep,
    setLessonStep,
    selectedLesson,
  } = useContext(MainGuidelineContext)

  const fillData = hand === "left" ? leftBeakerFillData : rightBeakerFillData

  const liquidMeshesRef = useRef([])
  const amountRef = useRef(0)
  const fillCompletedRef = useRef(false)

  useEffect(() => {
    if (lessonStep === 5 || lessonStep === 9) {
      fillCompletedRef.current = false
    }
  }, [lessonStep])

  useEffect(()=>{
    
  })

useEffect(() => {
  if (!beakerRef?.current) return
  if (!fillData?.amount) return

  liquidMeshesRef.current = []
  fillCompletedRef.current = false

  let firstLiquidMesh = null

  beakerRef.current.traverse((child) => {
    if (!child.name?.toLowerCase().includes("liquid")) return

    child.traverse((innerChild) => {
      if (!innerChild.isMesh || !innerChild.material) return

      innerChild.visible = false

      if (!firstLiquidMesh) {
        firstLiquidMesh = innerChild
      }
    })
  })

  if (!firstLiquidMesh) return

  firstLiquidMesh.visible = true

  liquidMeshesRef.current.push(firstLiquidMesh)

  if (Array.isArray(firstLiquidMesh.material)) {
    firstLiquidMesh.material = firstLiquidMesh.material.map((mat) =>
      mat.clone()
    )

    firstLiquidMesh.material.forEach((mat) => {
      mat?.color?.set(fillData.color)
    })
  } else {
    firstLiquidMesh.material = firstLiquidMesh.material.clone()
    firstLiquidMesh.material.color?.set(fillData.color)
  }

  firstLiquidMesh.scale.y = 0

  const beakerName = beakerRef.current.name

  if (beakerName.includes("normal-beaker")) {
    amountRef.current = Number(fillData.amount) * 0.55
  } else if (beakerName.includes("Conical-Flask")) {
    amountRef.current = Number(fillData.amount) * 2
  } else if (beakerName.includes("testube")) {
    amountRef.current = Number(fillData.amount) * 1.2
  } else {
    amountRef.current = Number(fillData.amount) * 0.2
  }
}, [beakerRef, hand, fillData?.color, fillData?.amount])

  useFrame((state, delta) => {
    if (!liquidMeshesRef.current.length) return
    if (!amountRef.current) return

    let isFillDone = true

    liquidMeshesRef.current.forEach((mesh) => {
      mesh.scale.y = Math.min(
        mesh.scale.y + 45 * delta,
        amountRef.current
      )

      if (mesh.scale.y < amountRef.current) {
        isFillDone = false
      }
    })

    if (!isFillDone) return
    if (fillCompletedRef.current) return
    // if (selectedLesson !== 2) return

    fillCompletedRef.current = true

    if (lessonStep === 5) {
      setLessonStep(6)
    }

    if (lessonStep === 8) {
      setLessonStep(9)
    }
  })

  return null
}

export default FillUpBeaker