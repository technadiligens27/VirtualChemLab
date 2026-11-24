import { useContext, useEffect, useId, useRef } from "react"

import { InteractionContext } from "../../Contexts/InteractionContext/InteractionContext"
import "./ErrorBox.css"

const ErrorBox = () => {
  const titleId = useId()
  const messageId = useId()
  const dialogRef = useRef(null)
  const okButtonRef = useRef(null)

  const { setShowError } = useContext(InteractionContext)

  useEffect(() => {
    const dialog = dialogRef.current

    dialog.showModal()
    okButtonRef.current.focus()

    return () => {
      dialog.close()
    }
  }, [])

  const closeError = () => {
    setShowError(false)
  }

  return (
    <dialog
      ref={dialogRef}
      className="lesson-error-box"
      role="alertdialog"
      aria-labelledby={titleId}
      aria-describedby={messageId}
      onCancel={(event) => {
        event.preventDefault()
        closeError()
      }}
    >
      <div className="lesson-error-box__text">
        <h2 id={titleId} className="lesson-error-box__title">
          Something went wrong.
        </h2>

        <p id={messageId} className="lesson-error-box__message">
          If the issue persists, please contact{" "}
          <a
            className="lesson-error-box__email"
            href="mailto:technadiligens@gmail.com"
          >
            technadiligens@gmail.com
          </a>
          
        </p>
      </div>

      <button
        ref={okButtonRef}
        type="button"
        className="lesson-error-box__button"
        onClick={closeError}
      >
        OK
      </button>
    </dialog>
  )
}

export default ErrorBox