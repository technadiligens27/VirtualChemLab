import { useContext } from "react"

import "./MobileDialogBox.css"

import { InteractionContext } from "../../Contexts/InteractionContext/InteractionContext"

import { MainGuidelineContext } from "../../Contexts/MainGuidelineContext/MainGuidelineContext"

const MobileDialogBox = ({

  button1Text = "Interact",

  onbtnClick,

}) => {

  const {
    isTouchDevice,
    isFillBeakerBoxOpen,
  } = useContext(InteractionContext)

  const {
    isExplanationOpen,
    showPowderBox,
  } = useContext(MainGuidelineContext)


  if (!isTouchDevice) return null

  if (!onbtnClick) return null


  return (

    <div
      className={`
        mobile-dialog-box-container

        ${
          (isFillBeakerBoxOpen || showPowderBox)
            ? "mobile-dialog-z-index"
            : ""
        }

        ${
          isExplanationOpen
            ? "mobile-dialog-box-blurred"
            : ""
        }
      `}
    >

      <button
        type="button"
        className="mobile-result-btn"
        onClick={onbtnClick}
        disabled={isExplanationOpen}
      >

        {button1Text}

      </button>

    </div>

  )
}

export default MobileDialogBox