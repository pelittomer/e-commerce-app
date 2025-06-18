import { Controller,type FieldValues,type Path, useFormContext } from 'react-hook-form';
import {
    Select,
    InputLabel,
    FormControl,
    FormHelperText,
    type SelectProps,
} from '@mui/material';
import React from 'react';

type Props<T extends FieldValues> = {
    name: Path<T>;
    label: string; 
    children: React.ReactNode;
} & Omit<SelectProps, 'value' | 'onChange' | 'name' | 'label'>; 

export function FormSelect<T extends FieldValues>({
    name,
    label,
    children,
    ...props
}: Props<T>) {
    const { control } = useFormContext();

    return (
        <FormControl fullWidth error={!!control.getFieldState(name, control)?.error}>
            <InputLabel id={`${name}-label`}>{label}</InputLabel>
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <Select
                        {...field}
                        labelId={`${name}-label`}
                        label={label}
                        error={!!error}
                        {...props}
                    >
                        {children}
                    </Select>
                )}
            />
            {control.getFieldState(name, control)?.error && (
                <FormHelperText>
                    {control.getFieldState(name, control)?.error?.message}
                </FormHelperText>
            )}
        </FormControl>
    );
}