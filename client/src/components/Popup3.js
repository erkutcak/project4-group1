import '../Popup3.css'

function Popup3(props) {
    return(props.trigger) ? (
        <div className="popup3">
            <div className="popup-inner3">
                <button className="close-btn" onClick={() => props.setTrigger(false)}>❌</button>
                {props.children}
            </div>
        </div>
    ) : "";
}

export default Popup3;