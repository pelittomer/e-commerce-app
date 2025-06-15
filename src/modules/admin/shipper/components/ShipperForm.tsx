import FormHeader from './form/FormHeader'
import FormBody from './form/FormBody'
import FormFooter from './form/FormFooter'
import { useFormContext } from 'react-hook-form'
import type { ShipperFormValues } from '../schema/shipper.create.schema'
import { useAddNewShipperMutation } from '../store/shipperApiSlice'
import { useState } from 'react'

function ShipperForm() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const { handleSubmit } = useFormContext<ShipperFormValues>()
    const [addNewShipper, { isLoading }] = useAddNewShipperMutation()

    const onSubmit = async (data: ShipperFormValues) => {
        if (!imageFile) {
            setErrorMessage('Please select an image to upload.')
            return
        }
        const formData = new FormData()
        formData.append('image', imageFile)
        formData.append('name', data.name)
        formData.append('description', data.description)
        formData.append('website', data.website)
        formData.append('phone', data.phone)
        formData.append('email', data.email)
        formData.append('address', data.address)
        try {
            await addNewShipper(formData).unwrap()
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

export default ShipperForm