import FormHeader from './form/FormHeader'
import FormBody from './form/FormBody'
import FormFooter from './form/FormFooter'
import { useFormContext } from 'react-hook-form'
import { useState } from 'react'
import { useAddNewVariationMutation } from '../store/variationApiSlice'
import type { VariationFormValues } from '../schema/variation.create.schema'

function VariationForm() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const { handleSubmit } = useFormContext<VariationFormValues>()
    const [addNewVariation, { isLoading, data: variationData, isSuccess }] = useAddNewVariationMutation()

    const onSubmit = async (data: VariationFormValues) => {
        try {
            await addNewVariation(data).unwrap()
            if (!isLoading && isSuccess) {
                console.log("variation data : ", variationData)
            }
        } catch (error: any) {
            setErrorMessage(error?.data?.error?.message || 'Failed to sign up. Please try again.')
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormHeader errorMessage={errorMessage} />
            <FormBody />
            <FormFooter isLoading={isLoading} />
        </form>
    )
}

export default VariationForm