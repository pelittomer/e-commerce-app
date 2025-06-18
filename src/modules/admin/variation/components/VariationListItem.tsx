import { memo } from 'react'
import { useGetVariationsQuery } from '../store/variationApiSlice';
import type { EntityId } from '@reduxjs/toolkit';

interface ListItemProps {
    variationId: EntityId;
    categoryId: string;
}
function VariationListItem({ variationId, categoryId }: ListItemProps) {
    const { variation } = useGetVariationsQuery(categoryId, {
        selectFromResult: ({ data }) => ({
            variation: data?.entities[variationId]
        }),
    })
    if (categoryId) {
        return (
            <div className='flex gap-5'>
                <h3>{variation.name}</h3>
                <ul>
                    {
                        variation.options.map((item,index) => (
                            <li key={index}>{item.name}</li>
                        ))
                    }
                </ul>
            </div>
        )

    } else return null
}

export default memo(VariationListItem)