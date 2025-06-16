import { useState } from 'react';
import { useGetCategoryTreeQuery } from '../store/categoryApiSlice';
import Button from '../../../../common/components/button/Button';
import CategoryParent from './CategoryParent';

function CategoryTree() {
    const [categoryQuery, setCategoryQuery] = useState<string>()
    const { data: categories, isLoading, isSuccess } = useGetCategoryTreeQuery(categoryQuery)
    let content;
    if (isLoading) <p>Loading...</p>
    if (isSuccess) {
        const { ids } = categories
        const tableContent = ids?.length && ids.map((categoryId, index) => <CategoryParent
            key={index}
            categoryId={categoryId}
            categoryQuery={categoryQuery}
            setCategoryQuery={setCategoryQuery} />)
        content = (
            <div>
                <Button onClick={() => setCategoryQuery(null)}>All Categories</Button>
                {tableContent && tableContent}
            </div>
        )
    }

    return content
}

export default CategoryTree