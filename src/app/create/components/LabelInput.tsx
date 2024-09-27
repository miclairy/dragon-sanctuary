import { InputHTMLAttributes } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Prisma } from '.prisma/client';
import DragonCreateInput = Prisma.DragonCreateInput;

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    name: keyof DragonCreateInput;
    register: UseFormRegister<DragonCreateInput>;
    errors: FieldErrors<DragonCreateInput>;
}

export const LabelInput = ({ name, required, register, errors, type, ...rest }: Props) => {
    const prettyName =
        name.charAt(0).toUpperCase() +
        name
            .slice(1)
            .split(/(?=[A-Z])/)
            .join(' ');

    const numberOptions =
        type === 'number'
            ? {
                  valueAsNumber: true,
                  min: { value: 0, message: 'Negative values are not possible in this universe' },
              }
            : {};

    return (
        <div>
            <label htmlFor={`id_${name}`} className="px-2">
                {prettyName}:
            </label>
            <input
                {...rest}
                type={type}
                {...register(name, {
                    required: required ? `${prettyName} is required` : false,
                    ...numberOptions,
                })}
                name={name}
                id={`id_${name}`}
                className="rounded-xl p-1"
            />
            {errors[name] && (
                <p role="alert" className="text-pink">
                    <i>{errors[name].message}</i>
                </p>
            )}
        </div>
    );
};