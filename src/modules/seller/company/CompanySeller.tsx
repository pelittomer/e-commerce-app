import { useState } from 'react'
import Button from '../../../common/components/button/Button'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { companyDefaultValues, CompanyValidationSchema, type CompanyFormValues } from './schema/company.create.schema'
import CompanyForm from './components/CompanyForm'
import CompanyItem from './components/CompanyItem'
import { useGetCompanyQuery } from './store/companyApiSlice'

function CompanySeller() {
    const [openForm, setOpenForm] = useState<boolean>(false)
    const methods = useForm<CompanyFormValues>({
        mode: 'all',
        resolver: zodResolver(CompanyValidationSchema),
        defaultValues: companyDefaultValues
    })

    const { data: company, isLoading, isSuccess } = useGetCompanyQuery('company')
    let content;
    if (isLoading) <p>Loading...</p>
    if (isSuccess && company) {
        const tableContent = <CompanyItem
            key={company._id}
            company={company}
        />
        content = (
            <div>
                {tableContent}
            </div>
        )
    }
    return (
        <div>
            <h1>Company page</h1>
            {!company && !isLoading && <Button onClick={() => setOpenForm(true)}>Create</Button>}
            {openForm && (
                <FormProvider {...methods}>
                    <div>
                        <p onClick={() => setOpenForm(false)}>X</p>
                        <CompanyForm />
                    </div>
                </FormProvider>
            )}
            {content}
        </div>
    )
}

export default CompanySeller