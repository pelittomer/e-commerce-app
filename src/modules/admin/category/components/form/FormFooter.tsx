import Button from '../../../../../common/components/button/Button'

function FormFooter({ isLoading }) {
    return (
        <div>
            <Button disabled={isLoading}
                type='submit'>
                Create category{isLoading && "..."}
            </Button>

            <p></p>
        </div>
    )
}

export default FormFooter