import '../Popup4.css'

function Popup4(props) {
    return(props.trigger) ? (
        <div className="popup4">
            <div className="popup-inner4">
                <button className="close-btn" onClick={() => props.setTrigger(false)}>❌</button>
                {props.children}
            </div>
        </div>
    ) : "";
}

export default Popup4;