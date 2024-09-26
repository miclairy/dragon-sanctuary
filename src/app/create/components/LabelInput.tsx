import { InputHTMLAttributes } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { Dragon } from '.prisma/client';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    register: UseFormRegister<Dragon>;
}

export const LabelInput = ({ name, required, register, ...rest }: Props) => {
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
            <input {...rest} {...register(name, { required: !!required })} name={name} id={`id_${name}`} />
        </div>
    );
};