import './DialogBox.css'

const DialogBox = ({text})=>{
    
    return(
        <div className="dialog-box-container">
            <div className="dialog-box-inner-container">
                <div className='dialog-icon-container'>
                    <img src='./info.png'/>
                </div>
                <p>{text}</p>
            </div>
        </div>
    )
}

export default DialogBox