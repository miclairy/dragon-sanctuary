import { InputHTMLAttributes } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { Prisma } from '.prisma/client';
import DragonCreateInput = Prisma.DragonCreateInput;

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    name: keyof DragonCreateInput;
    register: UseFormRegister<DragonCreateInput>;
}

export const LabelInput = ({ name, required, register, type, ...rest }: Props) => {
    return (
        <div>
            <label htmlFor={`id_${name}`}>
                {name.charAt(0).toUpperCase() +
                    name
                        .slice(1)
                        .split(/(?=[A-Z])/)
                        .join(' ')}
                :
            </label>
            <input
                {...rest}
                type={type}
                {...register(name, { required: !!required, valueAsNumber: type === 'number', min: 0 })}
                name={name}
                id={`id_${name}`}
            />
        </div>
    );
};