import { Html } from "@react-three/drei"
import { createPortal } from "@react-three/fiber"
import { useEffect, useState } from "react"
import "./BalanceReading.css"

const BalanceReading = ({
  balanceRef,
  isWeighTestube,
  finalMass = 24.7,
}) => {
  const [displayPoint, setDisplayPoint] =
    useState(null)

  const [displayMass, setDisplayMass] =
    useState(0)

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
        console.log("Balance child:", child.name)

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
          finalMass + fluctuation
        )
      }, 150)

      timeout = setTimeout(() => {
        clearInterval(interval)
        setDisplayMass(finalMass)
      }, 1500)
    } else {
      setDisplayMass(0)
    }

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [isWeighTestube, finalMass])

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