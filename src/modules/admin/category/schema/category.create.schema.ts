import { z } from "zod";
import { CATEGORY_VALIDATION_MESSAGES } from "../constants/category-validation.message";

export const CategoryValidationSchema = z.object({
    name: z.string()
        .min(1, { message: CATEGORY_VALIDATION_MESSAGES.NAME_REQUIRED })
        .min(2, { message: CATEGORY_VALIDATION_MESSAGES.NAME_MIN_LENGTH })
        .max(100, { message: CATEGORY_VALIDATION_MESSAGES.NAME_MAX_LENGTH })
        .trim(),
    description: z.string()
        .min(1, { message: CATEGORY_VALIDATION_MESSAGES.DESCRIPTION_REQUIRED })
        .min(10, { message: CATEGORY_VALIDATION_MESSAGES.DESCRIPTION_MIN_LENGTH })
        .max(500, { message: CATEGORY_VALIDATION_MESSAGES.DESCRIPTION_MAX_LENGTH })
        .trim(),
    parent: z.string()
        .nullish(),
})

export type CategoryFormValues = z.infer<typeof CategoryValidationSchema>

export const categoryDefaultValues: CategoryFormValues = {
    name: '',
    description: '',
    parent: '',
}