import { useContext, useEffect, useState } from "react"
import "./ErrorMsg.css"
import { MainGuidelineContext } from "../../Contexts/MainGuidelineContext/MainGuidelineContext";

const ErrorMsg = ({ text }) => {
  const [show, setShow] = useState(true);

  const {setShowErrorMsgNo} = useContext(MainGuidelineContext)

  useEffect(() => {
    setShow(true)

    const timer = setTimeout(() => {
      setShow(false)
      setShowErrorMsgNo(0);
    }, 2000)


    return () => clearTimeout(timer)
  }, [text])

  if (!show) return null

  return (
    <div className="error-msg">
      <div className="error-icon-container">
        <img src={'./cross.png'}/>
      </div>
      <div className="error-content-container">
        <p className="try-again">Try Again</p>
        <p className="error-text">{text}</p>
      </div>
      {/* <p>{text}</p> */}
    </div>
  )
}

export default ErrorMsg