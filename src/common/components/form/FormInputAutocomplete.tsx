import TextField, { type TextFieldProps } from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import { Controller, useFormContext, type FieldValues, type Path } from "react-hook-form";
import type { AutocompleteProps } from "@mui/material/Autocomplete";

type Props<T extends FieldValues, OptionType> = {
    name: Path<T>;
    label: string;
    placeholder?: string;
    options: AutocompleteProps<OptionType, true, false, true>['options'];
    freeSolo?: boolean;
    multiple?: boolean;
} & Pick<TextFieldProps, 'variant' | 'fullWidth' | 'margin' | 'autoComplete'>;


export function FormInputAutocomplete<T extends FieldValues, OptionType = string>({
    name,
    label,
    placeholder,
    options,
    freeSolo = true,
    multiple = true,
    ...props
}: Props<T, OptionType>) {
    const { control } = useFormContext();
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <Autocomplete
                    {...field}
                    multiple={multiple}
                    freeSolo={freeSolo}
                    options={options}
                    onChange={(_, data) => field.onChange(data)}
                    renderValue={(value, getTagProps) =>
                        (value as OptionType[]).map((option, index) => (
                            <Chip
                                variant="outlined"
                                label={String(option)}
                                {...getTagProps({ index })}
                                key={index}
                            />
                        ))
                    }

                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={label}
                            placeholder={placeholder}
                            error={!!error}
                            helperText={error?.message || ''}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            {...props}
                        />
                    )}
                />
            )}
        />
    );
}