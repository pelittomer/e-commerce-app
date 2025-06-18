import { z } from "zod"
import { COMPANY_STATUS_VALIDATION_MESSAGES } from "../constants/company-validation.message"


export const CompanyStatus = {
    Pending: "PENDING",
    Approved: "APPROVED",
    Rejected: "REJECTED"
}

export const CompanyValidationSchema = z.object({
    status: z.nativeEnum(CompanyStatus),

    rejection_reason: z.string()
        .max(500, { message: COMPANY_STATUS_VALIDATION_MESSAGES.REJECTION_REASON_MAX_LENGTH })
        .optional(),
})


export type CompanyFormValues = z.infer<typeof CompanyValidationSchema>

export const companyDefaultValues: CompanyFormValues = {
    status: CompanyStatus.Pending,
    rejection_reason: '',
}