import { Html } from "@react-three/drei"
import { createPortal } from "@react-three/fiber"
import {
  useContext,
  useEffect,
  useState,
} from "react"

import "./BalanceReading.css"

import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const BalanceReading = ({
  balanceRef,
  isWeighTestube,
  finalMass = 24.7,
}) => {
  const {
    selectedLesson,
    lessonStep,
  } = useContext(MainGuidelineContext)

  const [displayPoint, setDisplayPoint] =
    useState(null)

  const [displayMass, setDisplayMass] =
    useState(0)

  const currentFinalMass =
    selectedLesson === 8 &&
    lessonStep === 40
      ? 21.7
      : finalMass

  useEffect(() => {
    let attempts = 0

    const findDisplayPoint = () => {
      const balance = balanceRef?.current

      if (!balance) {
        attempts++

        if (attempts < 20) {
          requestAnimationFrame(findDisplayPoint)
        }

        return
      }

      let foundPoint = null

      balance.traverse((child) => {
        console.log(
          "Balance child:",
          child.name
        )

        if (
          child.name
            ?.toLowerCase()
            .includes("displaypoint")
        ) {
          foundPoint = child
        }
      })

      if (foundPoint) {
        console.log(
          "Display point found:",
          foundPoint.name
        )

        setDisplayPoint(foundPoint)
      } else {
        console.log(
          "DisplayPoint not found in balance"
        )
      }
    }

    findDisplayPoint()
  }, [balanceRef])

  useEffect(() => {
    let interval
    let timeout

    if (isWeighTestube) {
      interval = setInterval(() => {
        const fluctuation =
          (Math.random() - 0.5) * 0.1

        setDisplayMass(
          currentFinalMass + fluctuation
        )
      }, 150)

      timeout = setTimeout(() => {
        clearInterval(interval)
        setDisplayMass(currentFinalMass)
      }, 1500)
    } else {
      setDisplayMass(0)
    }

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [
    isWeighTestube,
    currentFinalMass,
  ])

  if (!displayPoint) return null

  return createPortal(
    <Html
      transform
      center
      distanceFactor={0.5}
      position={[0, -0.35, 0.02]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <div className="balance-model-screen">
        {displayMass.toFixed(2)}
        <span>g</span>
      </div>
    </Html>,
    displayPoint
  )
}

export default BalanceReading