
const Options = ({ addOptions, deleteOptions, uid,  updatedText }) => {
    return (
        <>
            <div className="col-md-6 offset-md-3 col-12 input-group my-3">
                <input type="text" className="form-control" placeholder="OptionText" onChange={event => {updatedText(uid, event.target.value)}} />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button" onClick={() => addOptions()}>+</button>
                    <button className="btn btn-outline-secondary" type="button" onClick={() => deleteOptions()}>-</button>
                </div>
            </div>
        </>
    )
}


export default Options;