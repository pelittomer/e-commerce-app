import { useState } from 'react'
import Button from '../../../common/components/button/Button'
import ShipperForm from './components/ShipperForm'
import { FormProvider, useForm } from 'react-hook-form'
import { shipperDefaultValues, ShipperValidationSchema, type ShipperFormValues } from './schema/shipper.create.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import ShipperList from './components/ShipperList'

function Shipper() {
    const [openForm, setOpenForm] = useState<boolean>(false)
    const methods = useForm<ShipperFormValues>({
        mode: 'all',
        resolver: zodResolver(ShipperValidationSchema),
        defaultValues: shipperDefaultValues
    })
    return (
        <div>
            <h1>Shipper page</h1>
            <Button onClick={() => setOpenForm(true)}>Create</Button>
            {openForm && (
                <FormProvider {...methods}>
                    <div>
                        <p onClick={() => setOpenForm(false)}>X</p>
                        <ShipperForm />
                    </div>
                </FormProvider>
            )}
            <ShipperList />
        </div>
    )
}

export default Shipper