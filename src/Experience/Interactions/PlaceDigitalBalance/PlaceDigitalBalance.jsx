import { useContext, useEffect } from "react"
import * as THREE from "three"

import { ModelContext } from "../../../Contexts/ModelContext/ModelContext"
import { MainGuidelineContext } from "../../../Contexts/MainGuidelineContext/MainGuidelineContext"

const PlaceDigitalBalance = () => {
  const {
    balancePositionRef,
    digitalBalanceRef,
  } = useContext(ModelContext)

  const {lessonStep,selectedLesson,setLessonStep} = useContext(MainGuidelineContext)

  useEffect(()=>{
    if(selectedLesson===8 && lessonStep === 14){
        setLessonStep(15)
    }
  },[lessonStep,selectedLesson])
  

  useEffect(() => {
    const balancePosition= balancePositionRef?.current
    const digitalBalance = digitalBalanceRef?.current

    if (!balancePosition || !digitalBalance) return

    const balanceWorldPosition = new THREE.Vector3()

    balancePosition.getWorldPosition(balanceWorldPosition)

    const balanceParent = digitalBalance.parent

    if (balanceParent) {
      balanceParent.worldToLocal(balanceWorldPosition)
    }

    digitalBalance.position.copy(balanceWorldPosition)
  }, [balancePositionRef, digitalBalanceRef])

  return null
}

export default PlaceDigitalBalance