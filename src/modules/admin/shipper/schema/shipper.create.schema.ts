import { z } from "zod"
import { SHIPPER_ERROR_MESSAGES } from "../constants/shipper-validation-message";

export const ShipperValidationSchema = z.object({
  name: z.string()
    .min(2, SHIPPER_ERROR_MESSAGES.NAME_MIN)
    .max(100, SHIPPER_ERROR_MESSAGES.NAME_MAX)
    .nonempty(SHIPPER_ERROR_MESSAGES.NAME_REQUIRED),
  description: z.string()
    .max(500, SHIPPER_ERROR_MESSAGES.DESCRIPTION_MAX),
  website: z.string()
    .url(SHIPPER_ERROR_MESSAGES.WEBSITE_INVALID)
    .or(z.literal('')),
  phone: z.string()
    .refine(
      (phone) => /^\+?[1-9]\d{1,14}$/.test(phone) || phone === '',
      SHIPPER_ERROR_MESSAGES.PHONE_INVALID
    ),
  email: z.string()
    .email(SHIPPER_ERROR_MESSAGES.EMAIL_INVALID)
    .max(255, SHIPPER_ERROR_MESSAGES.EMAIL_MAX)
    .nonempty(SHIPPER_ERROR_MESSAGES.EMAIL_REQUIRED),
  address: z.string()
    .max(255, SHIPPER_ERROR_MESSAGES.ADDRESS_MAX),
})

export type ShipperFormValues = z.infer<typeof ShipperValidationSchema>

export const shipperDefaultValues: ShipperFormValues = {
  name: '',
  description: '',
  website: '',
  phone: '',
  email: '',
  address: '',
}