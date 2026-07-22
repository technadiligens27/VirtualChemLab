import './LessonDetails.css'

const LessonDetails = ()=>{
    return(
        <div className='lesson-details-overlay'>
        <div className="lesson-details-container">
            <div className='lesson-header-container'>
                <h1>Lesson Overview</h1>
            </div>
            <div className="lesson-details-left">
                <div className='lesson-details-overview'>
                    <div className='lesson-details-content'>
                        <h1 className='lesson-sub-title'>Salt Dissolving in Water</h1>
                        <p>In this lesson, we observe how salt (sodium chloride) dissolves in water
                             to form a clear solution. This helps us understand the concept of solubility
                              and how substances can mix at the molecular level.</p>
                    </div>
                    <div className='lesson-images-container'>
                        <div className='lesson-images'>
                            <img src={'./beaker+Spoon.png'}/>
                            <button>Water</button>
                        </div>
                        <div className='lesson-images'>
                            <img src={'./beaker+Spoon.png'}/>
                            <button>Water</button>
                        </div>
                        <div className='lesson-images'>
                            <img src={'./beaker+Spoon.png'}/>
                            <button>Water</button>
                        </div>

                    </div>
                        <div className='lesson-hint-container'>
                            <img/>
                            <p>Salt disappears because its particles break apart and spread evenly throughout the water.</p>
                        </div>
                </div>

            </div>

            <div className="lesson-details-right">
                <div className='lesson-objectives-container'>
                    <div className=''>
                        <img src={''}/>
                        <h1 className='lesson-sub-title'>Objectives</h1>
                        <div className='objective-container'>
                            <p>lsson stepaw 01</p>
                            <p>lsson stepawdawd 01</p>
                            <p>lsson stepawd 01</p>
                            <p>lsson stepwad 01</p>
                        </div>
                    </div>
                </div>

                <div className='lesson-objectives-container lesson-materials-container'>
                    <div className=''>
                        <img src={''}/>
                        <h1 className='lesson-sub-title'>Materials</h1>
                        <div className='objective-container'>
                            <p>lsson step 01</p>
                            <p>lsson step 01</p>
                            <p>lsson step 01</p>
                            <p>lsson step 01</p>
                        </div>
                    </div>
                </div>
                <div className='lesson-objectives-container lesson-procedure-container'>
                    <div className=' '>
                        <img src={''}/>
                        <h1 className='lesson-sub-title'>Procedure</h1>
                        <div className='objective-container procedure-container'>
                            <p>lsson step 01</p>
                            <p>lsson step 01</p>
                            <p>lsson step 01</p>
                            <p>lsson step 01</p>
                        </div>
                    </div>
                </div>

            </div>

            <div className="lesson-detail-btn-container">

            </div>
        </div>
        
        </div>
    )
}

export default LessonDetails