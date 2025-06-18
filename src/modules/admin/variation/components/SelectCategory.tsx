import { useGetCategoryLeafsQuery } from '../../category/store/categoryApiSlice';
import { MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useState } from 'react';

interface SelectCategoryProps {
    setCategoryId: (categoryId: string) => void;
    initialCategoryId?: string;
}

function SelectCategory({ setCategoryId, initialCategoryId = '' }: SelectCategoryProps) {
    const { data: categories, isLoading, isSuccess } = useGetCategoryLeafsQuery('categoryLeafs')
    const [selectedValue, setSelectedValue] = useState<string>(initialCategoryId)

    let menuItemsContent

    if (isLoading) {
        menuItemsContent = <MenuItem disabled>Loading categories...</MenuItem>
    } else if (isSuccess && categories?.ids?.length) {
        menuItemsContent = categories.ids.map((categoryId) => {
            const categoryData = categories.entities[categoryId]
            return (
                <MenuItem key={categoryId} value={categoryId}>
                    {categoryData.name}
                </MenuItem>
            )
        })
    } else {
        menuItemsContent = <MenuItem disabled>No categories available</MenuItem>
    }

    const handleChange = (event: any) => {
        const value = event.target.value as string
        setSelectedValue(value)
        setCategoryId(value)
    }

    return (
        <FormControl fullWidth>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
                labelId="category-select-label"
                id="category-select"
                name='categoryId'
                value={selectedValue}
                label='Category'
                onChange={handleChange}
                displayEmpty
            >
                {menuItemsContent}
            </Select>
        </FormControl>
    )
}

export default SelectCategory