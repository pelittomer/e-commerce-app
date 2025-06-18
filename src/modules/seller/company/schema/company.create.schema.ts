import { z } from "zod"
import { COMPANY_VALIDATION_MESSAGES } from "../constants/company-validation-message";

export const CompanyValidationSchema = z.object({
  name: z.string()
    .min(1, { message: COMPANY_VALIDATION_MESSAGES.NAME_REQUIRED })
    .min(2, { message: COMPANY_VALIDATION_MESSAGES.NAME_MIN_LENGTH })
    .max(255, { message: COMPANY_VALIDATION_MESSAGES.NAME_MAX_LENGTH })
    .trim(),

  description: z.string()
    .min(1, { message: COMPANY_VALIDATION_MESSAGES.DESCRIPTION_REQUIRED })
    .min(10, { message: COMPANY_VALIDATION_MESSAGES.DESCRIPTION_MIN_LENGTH })
    .max(1000, { message: COMPANY_VALIDATION_MESSAGES.DESCRIPTION_MAX_LENGTH })
    .trim(),

  website: z.string()
    .min(1, { message: COMPANY_VALIDATION_MESSAGES.WEBSITE_REQUIRED })
    .max(255, { message: COMPANY_VALIDATION_MESSAGES.WEBSITE_MAX_LENGTH })
    .url({ message: COMPANY_VALIDATION_MESSAGES.WEBSITE_INVALID })
    .trim(),

  phone: z.string()
    .min(1, { message: COMPANY_VALIDATION_MESSAGES.PHONE_REQUIRED })
    .max(20, { message: COMPANY_VALIDATION_MESSAGES.PHONE_MAX_LENGTH })
    .regex(/^\+\d{1,3}\d{6,14}$/, { message: COMPANY_VALIDATION_MESSAGES.PHONE_INVALID })
    .trim(),

  email: z.string()
    .min(1, { message: COMPANY_VALIDATION_MESSAGES.EMAIL_REQUIRED })
    .max(255, { message: COMPANY_VALIDATION_MESSAGES.EMAIL_MAX_LENGTH })
    .email({ message: COMPANY_VALIDATION_MESSAGES.EMAIL_INVALID }) 
    .trim(),

  address: z.string()
    .min(1, { message: COMPANY_VALIDATION_MESSAGES.ADDRESS_REQUIRED })
    .min(10, { message: COMPANY_VALIDATION_MESSAGES.ADDRESS_MIN_LENGTH })
    .max(500, { message: COMPANY_VALIDATION_MESSAGES.ADDRESS_MAX_LENGTH })
    .trim(),

  tax_id: z.string()
    .min(1, { message: COMPANY_VALIDATION_MESSAGES.TAX_ID_REQUIRED })
    .length(10, { message: COMPANY_VALIDATION_MESSAGES.TAX_ID_INVALID }) 
    .regex(/^\d{10}$/, { message: COMPANY_VALIDATION_MESSAGES.TAX_ID_INVALID }) 
    .trim(),

  tax_office: z.string()
    .min(1, { message: COMPANY_VALIDATION_MESSAGES.TAX_OFFICE_REQUIRED })
    .min(2, { message: COMPANY_VALIDATION_MESSAGES.TAX_OFFICE_MIN_LENGTH })
    .max(100, { message: COMPANY_VALIDATION_MESSAGES.TAX_OFFICE_MAX_LENGTH })
    .trim(),
})

export type CompanyFormValues = z.infer<typeof CompanyValidationSchema>

export const companyDefaultValues: CompanyFormValues = {
  name: '',
  description: '',
  website: '',
  phone: '',
  email: '',
  address: '',
  tax_id: '',
  tax_office: '',
}