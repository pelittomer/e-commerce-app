import FormHeader from './form/FormHeader'
import FormBody from './form/FormBody'
import FormFooter from './form/FormFooter'
import { useFormContext } from 'react-hook-form'
import { useState } from 'react'
import type { CategoryFormValues } from '../schema/category.create.schema'
import { useAddNewCategoryMutation } from '../store/categoryApiSlice'

function CategoryForm() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [iconFile, setIconFile] = useState<File | null>(null)
    const { handleSubmit } = useFormContext<CategoryFormValues>()
    const [addNewCategory, { isLoading, data: categoryData, isSuccess }] = useAddNewCategoryMutation()

    const onSubmit = async (data: CategoryFormValues) => {
        if (!imageFile || !iconFile) {
            setErrorMessage('Please select an image to upload.')
            return
        }
        const formData = new FormData()
        formData.append('image', imageFile)
        formData.append('icon', iconFile)
        formData.append('name', data.name)
        formData.append('description', data.description)
        if (data.parent) formData.append('parent', data.parent)
        try {
            await addNewCategory(formData).unwrap()
            console.log("category response : ", categoryData)
        } catch (error: any) {
            setErrorMessage(error?.data?.error?.message || 'Failed to sign up. Please try again.')
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormHeader errorMessage={errorMessage} />
            <FormBody setImageFile={setImageFile} setIconFile={setIconFile} />
            <FormFooter isLoading={isLoading} />
        </form>
    )
}

export default CategoryForm