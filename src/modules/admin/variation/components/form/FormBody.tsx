import { FormInputText } from '../../../../../common/components/form/FormInputText'
import { FormSelect } from '../../../../../common/components/form/FormSelect'
import type { VariationFormValues } from '../../schema/variation.create.schema'
import { useGetCategoryLeafsQuery } from '../../../category/store/categoryApiSlice'
import { MenuItem } from '@mui/material'
import { FormInputAutocomplete } from '../../../../../common/components/form/FormInputAutocomplete'

function FormBody() {
    const { data: categories, isLoading, isSuccess } = useGetCategoryLeafsQuery('categoryLeafs')
    let content;
    if (isLoading) <p>Loading...</p>
    if (isSuccess) {
        const { ids } = categories
        content = ids?.length && ids.map((categoryId, index) => {
            const categoryData = categories.entities[categoryId]
            return (
                <MenuItem value={categoryId}>{categoryData.name}</MenuItem>
            )
        }
        )
    }
    const commonVariationOptions = ['Red', 'Black', 'Blue', 'Small', 'Medium', 'Large', 'Cotton', 'Polyester']
    return (
        <div>
            <FormInputText<VariationFormValues>
                name='name'
                label='Variation Name'
                type='text'
                placeholder='e.g., Color, Size, Material, Weight, Style, Edition...'
            />
            {
                isSuccess && (
                    <FormSelect<VariationFormValues>
                        name='category'
                        label='Select Category'
                    >
                        <MenuItem defaultChecked>-- Select Category --</MenuItem>
                        {content}
                    </FormSelect>
                )
            }
            <FormInputAutocomplete<VariationFormValues, string>
                name='options'
                label='Variation Options'
                placeholder='e.g., Red, Black, Medium, Large...'
                options={commonVariationOptions}
            />
        </div>
    )
}

export default FormBody