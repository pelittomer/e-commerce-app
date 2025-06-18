import React, { useState } from 'react'
import Button from '../../../../common/components/button/Button'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { companyDefaultValues, CompanyValidationSchema, type CompanyFormValues } from '../schema/compant.create.schema'
import CompanyForm from './CompanyForm'

function CompanyEdit() {
    const [openForm, setOpenForm] = useState<boolean>(false)
    const methods = useForm<CompanyFormValues>({
        mode: 'all',
        resolver: zodResolver(CompanyValidationSchema),
        defaultValues: companyDefaultValues
    })
    return (
        <div>
            <Button onClick={() => setOpenForm(true)}>Edit</Button>
            {openForm && (
                <FormProvider {...methods}>
                    <div>
                        <p onClick={() => setOpenForm(false)}>X</p>
                        <CompanyForm />
                    </div>
                </FormProvider>
            )}
        </div>
    )
}

export default CompanyEdit