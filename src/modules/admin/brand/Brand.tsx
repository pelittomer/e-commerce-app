import { useState } from 'react'
import Button from '../../../common/components/button/Button'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { brandDefaultValues, BrandValidationSchema, type BrandFormValues } from './constants/brand-validation-message'
import BrandList from './components/BrandList'
import BrandForm from './components/BrandForm'

function Brand() {
    const [openForm, setOpenForm] = useState<boolean>(false)
    const methods = useForm<BrandFormValues>({
        mode: 'all',
        resolver: zodResolver(BrandValidationSchema),
        defaultValues: brandDefaultValues
    })
    return (
        <div>
            <h1>Brand page</h1>
            <Button onClick={() => setOpenForm(true)}>Create</Button>
            {openForm && (
                <FormProvider {...methods}>
                    <div>
                        <p onClick={() => setOpenForm(false)}>X</p>
                        <BrandForm />
                    </div>
                </FormProvider>
            )}
            <BrandList />
        </div>
    )
}

export default Brand