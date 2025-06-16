import { useState } from 'react'
import Button from '../../../common/components/button/Button'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { categoryDefaultValues, CategoryValidationSchema, type CategoryFormValues } from './schema/category.create.schema'
import CategoryForm from './components/CategoryForm'
import CategoryTree from './components/CategoryTree'

function Category() {
    const [openForm, setOpenForm] = useState<boolean>(false)
    const methods = useForm<CategoryFormValues>({
        mode: 'all',
        resolver: zodResolver(CategoryValidationSchema),
        defaultValues: categoryDefaultValues
    })
    return (
        <div>
            <h1>Category page</h1>
            <Button onClick={() => setOpenForm(true)}>Create</Button>
            {openForm && (
                <FormProvider {...methods}>
                    <div>
                        <p onClick={() => setOpenForm(false)}>X</p>
                        <CategoryForm />
                    </div>
                </FormProvider>
            )}
            <CategoryTree />
        </div>
    )
}

export default Category