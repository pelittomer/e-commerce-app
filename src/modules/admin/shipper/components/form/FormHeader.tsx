
function FormHeader({ errorMessage }) {
    return (
        <div>
            <h3>Shipper form</h3>
            <p>{errorMessage}</p>
        </div>
    )
}

export default FormHeader