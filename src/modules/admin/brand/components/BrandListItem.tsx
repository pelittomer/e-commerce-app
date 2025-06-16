import { memo } from 'react'
import { useGetUploadFileQuery } from '../../../../common/service/uploadApiSlice'
import { useGetbrandsQuery } from '../store/brandApiSlice';

interface ListItemProps {
    brandId: string;
    index: number;
}
function BrandListItem({ brandId, index }: ListItemProps) {
    const { brand } = useGetbrandsQuery("brandsList", {
        selectFromResult: ({ data }) => ({
            brand: data?.entities[brandId]
        }),
    })
    const file = brand['logo']
    const { data: uploadData, isLoading } = useGetUploadFileQuery(file)
    if (brand) {
        return (
            <div className='flex gap-5'>
                <img src={uploadData} alt="" width={50} height={50} />
                <h3>{brand.name}</h3>
            </div>
        )

    } else return null
}

export default memo(BrandListItem)