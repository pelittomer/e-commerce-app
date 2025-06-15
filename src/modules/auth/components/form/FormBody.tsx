import { FormInputText } from '../../../../common/components/form/FormInputText'
import type { AuthFormMethod, AuthMethodMap } from '../../types'

interface FormBodyProps {
    method: AuthFormMethod;
}

function FormBody({ method }: FormBodyProps) {
    return (
        <div>
            {
                method === "sign-up" && (
                    <FormInputText<AuthMethodMap[typeof method]>
                        name='username'
                        label='Username'
                        type='username'
                        placeholder='johndoe_1'
                    />
                )
            }
            <FormInputText<AuthMethodMap[typeof method]>
                name='email'
                label='Email Address'
                type='email'
                placeholder='example@email.com'
            />
            <FormInputText<AuthMethodMap[typeof method]>
                name='password'
                label='Password'
                type='password'
                placeholder='Minimum 6 characters'
            />
            {
                method === "sign-up" && (
                    <FormInputText<AuthMethodMap[typeof method]>
                        name='confirmPassword'
                        label='Confirm Password'
                        type='password'
                        placeholder='Re-enter your password'
                    />
                )
            }
        </div>
    )
}

export default FormBody