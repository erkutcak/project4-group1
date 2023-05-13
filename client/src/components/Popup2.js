import '../Popup2.css'

function Popup2(props) {
    return(props.trigger) ? (
        <div className="popup2">
            <div className="popup-inner2">
                <button className="close-btn" onClick={() => props.setTrigger(false)}>❌</button>
                {props.children}
            </div>
        </div>
    ) : "";
}

export default Popup2;