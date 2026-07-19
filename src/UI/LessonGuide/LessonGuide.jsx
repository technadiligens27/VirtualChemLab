import { useContext } from 'react'
import './LessonGuide.css'
import { MainGuidelineContext } from '../../Contexts/MainGuidelineContext/MainGuidelineContext'

const LessonGuide = ({title,text,onButton1,subTitle,icon})=>{

    const {isLessonStart,setIsLessonStart} = useContext(MainGuidelineContext)




    return(
        <div className="main-guidelines">
            <div className="lesson-guide-container">
                <div className='top-bar'>
                    <img src='./clipboard.png'/>
                   <h1>{title}</h1>
                </div>
                <div className='lesson-guide-inner-container'>
                    <div className='lesson-overview-img'>
                        <img src='./saltLesson.png' src={icon}/>
                    </div>
                    <div className='lesson-overview-sub-heading'>
                        <h1>{subTitle}</h1>
                    </div>
                    <div className="lesson-guide-text">
                    <p>{text}</p> 
                    </div>
                    <div className='lesson-guide-btn-container'>
                        <div className='continue-arrow-container'>
                            <img src='./continue-arrow.png'/>
                        </div>
                        <button onClick={onButton1} className='lesson-continue-btn'>Continue</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default LessonGuide