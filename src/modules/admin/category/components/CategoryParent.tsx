import { memo } from 'react'
import { useGetCategoryTreeQuery } from '../store/categoryApiSlice';
import CategoryChildren from './CategoryChildren';

interface ListItemProps {
    categoryId: string;
    categoryQuery: string;
    setCategoryQuery: React.Dispatch<React.SetStateAction<string>>;
}

function CategoryParent({ categoryId, categoryQuery, setCategoryQuery }: ListItemProps) {
    const { category } = useGetCategoryTreeQuery(categoryQuery, {
        selectFromResult: ({ data }) => ({
            category: data?.entities[categoryId]
        }),
    })
    if (category) {
        const { name, _id, children } = category
        return (
            <div className=''>
                <div className='flex gap-2'>
                    <p>{_id}</p>
                    <p>{name}</p>
                    <button onClick={() => setCategoryQuery(_id)}>+</button>
                </div>
                {children && children.length > 0 && <CategoryChildren categoryChildren={children} />}
            </div>
        )

    } else return null
}

export default memo(CategoryParent)