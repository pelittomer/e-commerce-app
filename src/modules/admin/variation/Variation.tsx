import { useState } from 'react'
import Button from '../../../common/components/button/Button'
import { FormProvider, useForm } from 'react-hook-form'
import VariationForm from './components/VariationForm'
import { variationDefaultValues, VariationValidationSchema, type VariationFormValues } from './schema/variation.create.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import VariationList from './components/VariationList'

function Variation() {
    const [openForm, setOpenForm] = useState<boolean>(false)
    const methods = useForm<VariationFormValues>({
        mode: 'all',
        resolver: zodResolver(VariationValidationSchema),
        defaultValues: variationDefaultValues
    })
    return (
        <div>
            <h1>Variation page</h1>
            <Button onClick={() => setOpenForm(true)}>Create</Button>
            {
                openForm && (
                    <FormProvider {...methods}>
                        <div>
                            <p onClick={() => setOpenForm(false)}>X</p>
                            <VariationForm />
                        </div>
                    </FormProvider>
                )
            }
            <VariationList />
        </div>
    )
}

export default Variation