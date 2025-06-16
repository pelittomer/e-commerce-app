import { FormInputText } from '../../../../../common/components/form/FormInputText'
import type { CategoryFormValues } from '../../schema/category.create.schema'

function FormBody({ setImageFile, setIconFile }) {
    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            event.target.name === "icon" ?
                setIconFile(event.target.files[0])
                : setImageFile(event.target.files[0])
        } else {
            setImageFile(null)
        }
    }
    return (
        <div>
            <FormInputText<CategoryFormValues>
                name='name'
                label='Category Name'
                type='text'
                placeholder='e.g., Electronics, Apparel'
            />
            <FormInputText<CategoryFormValues>
                name='description'
                label='Description'
                type='textarea'
                placeholder='e.g., Products related to consumer electronics.'
            />
            <FormInputText<CategoryFormValues>
                name='parent'
                label='Parent ID'
                type='text'
                placeholder='e.g., 12345'
            />
            <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">Category Image</label>
                <input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-5"
                />
            </div>
            <div>
                <label htmlFor="icon" className="block text-sm font-medium text-gray-700">Category Icon</label>
                <input
                    id="icon"
                    name="icon"
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