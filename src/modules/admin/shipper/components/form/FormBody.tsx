import { FormInputText } from '../../../../../common/components/form/FormInputText'
import type { ShipperFormValues } from '../../schema/shipper.create.schema'

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
            <FormInputText<ShipperFormValues>
                name='name'
                label='Shipper Name'
                type='text'
                placeholder='e.g., Global Logistics Inc.'
            />
            <FormInputText<ShipperFormValues>
                name='description'
                label='Description'
                type='textarea'
                placeholder='e.g., A leading shipping company with global reach.'
            />
            <FormInputText<ShipperFormValues>
                name='website'
                label='Website'
                type='url'
                placeholder='e.g., https://www.shipperwebsite.com'
            />
            <FormInputText<ShipperFormValues>
                name='phone'
                label='Phone Number'
                type='tel'
                placeholder='e.g., +1234567890'
            />
            <FormInputText<ShipperFormValues>
                name='email'
                label='Email Address'
                type='email'
                placeholder='e.g., contact@shipper.com'
            />
            <FormInputText<ShipperFormValues>
                name='address'
                label='Address'
                type='text'
                placeholder='e.g., 123 Main St, City, Country'
            />
            <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">Shipper Image</label>
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
    )
}

export default FormBody