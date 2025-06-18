import { FormInputText } from '../../../../../common/components/form/FormInputText';
import type { CompanyFormValues } from '../../schema/company.create.schema';

function FormBody({ setImageFile }) {
    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImageFile(event.target.files[0])
        } else {
            setImageFile(null)
        }
    }
    return (
        <div>
            <FormInputText<CompanyFormValues>
                name='name'
                label='Company Name'
                type='text'
                placeholder='e.g., Adidas, Nike, Global Logistics Inc.'
            />
            <FormInputText<CompanyFormValues>
                name='description'
                label='Description'
                type='text'
                placeholder='e.g., Leading sportswear brand, Global shipping provider'
            />
            <FormInputText<CompanyFormValues>
                name='website'
                label='Website'
                type='url'
                placeholder='e.g., www.example.com'
            />
            <FormInputText<CompanyFormValues>
                name='phone'
                label='Phone Number'
                type='tel'
                placeholder='e.g., +1 555 123 4567'
            />
            <FormInputText<CompanyFormValues>
                name='email'
                label='Email Address'
                type='email'
                placeholder='e.g., contact@example.com'
            />
            <FormInputText<CompanyFormValues>
                name='address'
                label='Address'
                type='text'
                placeholder='e.g., 123 Main St, Anytown, USA'
            />
            <FormInputText<CompanyFormValues>
                name='tax_id'
                label='Tax ID'
                type='text'
                placeholder='e.g., 12-3456789'
            />
            <FormInputText<CompanyFormValues>
                name='tax_office'
                label='Tax Office'
                type='text'
                placeholder='e.g., State Tax Office'
            />
            <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">Company Image</label>
                <input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-5"
                />
            </div>
        </div>
    );
}

export default FormBody