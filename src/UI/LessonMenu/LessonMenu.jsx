import { useContext, useEffect } from 'react'
import './LessonMenu.css'
import { MainGuidelineContext } from '../../Contexts/MainGuidelineContext/MainGuidelineContext'

const LessonMenu=()=>{

    const {isMainGuideline,setIsMainGuideline} = useContext(MainGuidelineContext)

    useEffect(()=>{
        setIsMainGuideline(true)
    },[isMainGuideline])


    return(
        <div className="main-guidelines">
            <div className="lesson-container">
                <h1>Select A Lesson</h1>
                <div className="lesson-btn-container">
                    <button>Button 01</button>
                    <button>Button 01</button>
                    <button>Button 01</button>
                    <button>Button 01</button>
                    <button>Button 01</button>
                </div>
            </div>
        </div>
    )
}

export default LessonMenu