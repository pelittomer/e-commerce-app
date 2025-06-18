import FormHeader from './form/FormHeader'
import FormBody from './form/FormBody'
import FormFooter from './form/FormFooter'
import { useFormContext } from 'react-hook-form'
import { useState } from 'react'
import type { CompanyFormValues } from '../schema/company.create.schema'
import { useAddNewCompanyMutation } from '../store/companyApiSlice'

function CompanyForm() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const { handleSubmit } = useFormContext<CompanyFormValues>()
    const [addNewCompany, { isLoading, isSuccess, data: companyData }] = useAddNewCompanyMutation()
    const onSubmit = async (data: CompanyFormValues) => {
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
        formData.append('tax_id', data.tax_id)
        formData.append('tax_office', data.tax_office)
        try {
            await addNewCompany(formData).unwrap()
            if (isSuccess && !isLoading) {
                console.log("company data : ", companyData)
            }
        } catch (error: any) {
            const { data } = error
            setErrorMessage(data.error.message || 'Failed to sign up. Please try again.')
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

export default CompanyForm