
function FormHeader({ errorMessage }) {
    return (
        <div>
            <h3>Company Edit Form</h3>
            <p>{errorMessage}</p>
        </div>
    )
}

export default FormHeader