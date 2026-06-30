import { useContext } from 'react'
import './LessonGuide.css'
import { MainGuidelineContext } from '../../Contexts/MainGuidelineContext/MainGuidelineContext'

const LessonGuide = ({title,text,button})=>{

    const {isLessonStart,setIsLessonStart} = useContext(MainGuidelineContext)

    const AcidIndicatorTest=[{
        step1: "In this experiment, hydrochloric acid is mixed with universal indicator. The indicator changes the solution to a red or orange-red color, showing that the solution is acidic. This helps students understand how indicators are used to identify acids in the lab."
    }]


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
                    <button className='main-guidelines-btn'>Continue</button>
                </div>
            </div>
        </div>
    )
}

export default LessonGuide