import FormHeader from './form/FormHeader'
import FormBody from './form/FormBody'
import FormFooter from './form/FormFooter'
import { useFormContext } from 'react-hook-form'
import { useState } from 'react'
import type { BrandFormValues } from '../constants/brand-validation-message'
import { useAddNewBrandMutation } from '../store/brandApiSlice'

function BrandForm() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const { handleSubmit } = useFormContext<BrandFormValues>()
    const [addNewBrand, { isLoading }] = useAddNewBrandMutation()

    const onSubmit = async (data: BrandFormValues) => {
        if (!imageFile) {
            setErrorMessage('Please select an image to upload.')
            return
        }
        const formData = new FormData()
        formData.append('image', imageFile)
        formData.append('name', data.name)
        try {
            await addNewBrand(formData).unwrap()
        } catch (error: any) {
            setErrorMessage(error?.data?.error?.message || 'Failed to sign up. Please try again.')
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormHeader errorMessage={errorMessage} />
            <FormBody setImageFile={setImageFile} />
            <FormFooter isLoading={isLoading} />
        </form>
    )
}

export default BrandForm