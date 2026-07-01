import { useContext } from 'react'
import './LessonGuide.css'
import { MainGuidelineContext } from '../../Contexts/MainGuidelineContext/MainGuidelineContext'

const LessonGuide = ({title,text,onButton1})=>{

    const {isLessonStart,setIsLessonStart} = useContext(MainGuidelineContext)




    return(
        <div className="main-guidelines">
            <div className="lesson-guide-container">
                <div>
                    <h1>{title}</h1>
                </div>
                <div className="guideline-inner-container">
                   <p>{text}</p> 
                </div>
                <div className='main-guidelines-btn-container'>
                    <button onClick={onButton1} className='main-guidelines-btn'>Continue</button>
                </div>
            </div>
        </div>
    )
}

export default LessonGuide