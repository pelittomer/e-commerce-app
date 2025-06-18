import { memo } from 'react'
import { useGetUploadFileQuery } from '../../../../common/service/uploadApiSlice'

interface ListItemProps {
    company: any;
}
function CompanyItem({ company }: ListItemProps) {
    console.log("company : ", company)
    const file = company['logo']
    const { data: uploadData, isLoading } = useGetUploadFileQuery(file)
    let imageContent;
    if (isLoading) {
        imageContent = <p>Loading...</p>
    } else {
        imageContent = <img src={uploadData} alt="image.png" width={100} height={25} />
    }
    if (company) {
        return (
            <div>
                {Object.entries(company).map(([key, value]) => {
                    if (key !== "logo" && key !== "_id" && key !== "__v") {
                        return (
                            <p key={key}>
                                <strong>{key}:</strong> {String(value)}
                            </p>
                        )
                    }
                    return null
                })}
                {imageContent}
            </div>
        )

    } else return null
}

export default memo(CompanyItem)