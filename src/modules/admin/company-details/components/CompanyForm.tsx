import FormHeader from './form/FormHeader'
import FormBody from './form/FormBody'
import FormFooter from './form/FormFooter'
import { useFormContext } from 'react-hook-form'
import { useState } from 'react'
import { CompanyStatus, type CompanyFormValues } from '../schema/compant.create.schema'
import { useParams } from 'react-router'
import { useUpdateCompanyStatusMutation } from '../../../seller/company/store/companyApiSlice'

function CompanyForm() {
    const { companyId } = useParams();
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const { handleSubmit } = useFormContext<CompanyFormValues>()
    const [addNewShipper, { isLoading, isSuccess, data: companyData }] = useUpdateCompanyStatusMutation()

    const onSubmit = async (data: CompanyFormValues) => {
        try {
            if (
                !data.rejection_reason === CompanyStatus.Rejected &&
                data.rejection_reason === null
            ) {
                setErrorMessage('Rejection reason required!')
                return
            }
            await addNewShipper({ query: companyId, initialData: data }).unwrap()
            if (isSuccess) {
                console.log("company data: ", companyData)
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

export default CompanyForm