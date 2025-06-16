
function FormHeader({ errorMessage }) {
    return (
        <div>
            <h3>Category form</h3>
            <p>{errorMessage}</p>
        </div>
    )
}

export default FormHeader