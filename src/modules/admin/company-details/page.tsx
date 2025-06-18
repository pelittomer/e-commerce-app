import { useParams } from 'react-router';
import { useGetCompaniesQuery } from '../../seller/company/store/companyApiSlice';
import { useGetUploadFileQuery } from '../../../common/service/uploadApiSlice';
import CompanyEdit from './components/CompanyEdit';

function page() {
    const { companyId } = useParams();
    const { company, isLoading: isCompanyLoading, isError: isCompanyError } = useGetCompaniesQuery("companiesList", {
        selectFromResult: ({ data, isLoading, isError }) => ({
            company: data?.entities[companyId],
            isLoading,
            isError
        }),
    })

    const fileId = company?.logo

    const { data: uploadData, isLoading: isUploadLoading, isError: isUploadError } = useGetUploadFileQuery(fileId, {
        skip: !fileId
    })

    let imageContent
    if (isUploadLoading) {
        imageContent = <p>Loading image...</p>
    } else if (isUploadError) {
        imageContent = <p>Error loading image.</p>
    } else if (uploadData) {
        imageContent = <img src={uploadData} alt="Company Logo" width={100} height={25} />
    } else {
        imageContent = <p>No logo available.</p>
    }

    if (isCompanyLoading) {
        return <div>Loading company details...</div>
    }

    if (isCompanyError) {
        return <div>Error loading company details.</div>
    }

    if (!company) {
        return <div>Company not found.</div>
    }

    return (
        <div>
            <h2>Company Details</h2>
            <CompanyEdit />
            <div>
                {imageContent}
                {Object.entries(company).map(([key, value]) => {
                    if (key !== "logo" && key !== "_id" && key !== "__v" && value !== undefined && value !== null) {
                        return (
                            <p key={key}>
                                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {String(value)}
                            </p>
                        )
                    }
                    return null
                })}
            </div>

        </div>
    )
}

export default page