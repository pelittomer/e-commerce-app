import { MenuItem } from '@mui/material'
import { FormInputText } from '../../../../../common/components/form/FormInputText'
import { FormSelect } from '../../../../../common/components/form/FormSelect'
import { CompanyStatus, type CompanyFormValues } from '../../schema/compant.create.schema'
import { useFormContext } from 'react-hook-form';

function FormBody() {
    const { watch } = useFormContext<CompanyFormValues>()
    const currentStatus = watch('status')

    return (
        <div>
            <FormSelect<CompanyFormValues>
                name='status'
                label='Select Status'
            >
                <MenuItem value="">-- Select Status --</MenuItem>
                {Object.entries(CompanyStatus).map(([key, value]) => (
                    <MenuItem key={value} value={value}>
                        {key}
                    </MenuItem>
                ))}
            </FormSelect>
            {currentStatus === CompanyStatus.Rejected && (
                <FormInputText<CompanyFormValues>
                    name='rejection_reason'
                    label='Reason for Rejection' 
                    type='text'
                    placeholder='e.g., Incomplete documentation, failed background check'
                />
            )}
        </div>
    )
}

export default FormBody