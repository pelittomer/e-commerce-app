import { z } from "zod"
import { VARIATION_VALIDATION_MESSAGES } from "../constants/variation-validation-message";


export const VariationValidationSchema = z.object({
    name: z
        .string()
        .min(1, { message: VARIATION_VALIDATION_MESSAGES.NAME_REQUIRED })
        .min(2, { message: VARIATION_VALIDATION_MESSAGES.NAME_MIN_LENGTH })
        .max(100, { message: VARIATION_VALIDATION_MESSAGES.NAME_MAX_LENGTH })
        .trim(),

    category: z
        .string()
        .min(1, { message: VARIATION_VALIDATION_MESSAGES.CATEGORY_REQUIRED })
        .trim(),
    options: z
        .array(
            z.string()
                .max(50, { message: VARIATION_VALIDATION_MESSAGES.OPTION_ITEM_MAX_LENGTH })
                .trim()
                .nullish()
        )
})

export type VariationFormValues = z.infer<typeof VariationValidationSchema>

export const variationDefaultValues: VariationFormValues = {
    name: '',
    category: '',
    options: [],
}
