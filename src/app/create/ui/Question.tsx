import { creationSteps } from '@/app/create/creationSteps';
import { UseFormGetValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { CreateDragonForm } from '@/app/create/ui/CreateDragonForm';

interface Props {
    stepName: string;
    register: UseFormRegister<CreateDragonForm>;
    setValue: UseFormSetValue<CreateDragonForm>;
    getValues: UseFormGetValues<CreateDragonForm>;
}

export const Question = ({ register, getValues, stepName, setValue }: Props) => {
    const { content, secondaryContent, options, freeText } = creationSteps[stepName];
    const attribute = options?.attribute ?? freeText?.title;
    const [selection, setSelection] = useState(attribute ? getValues(attribute) : null);

    const numberOptions = freeText?.type === 'number' ? { valueAsNumber: true } : {};

    useEffect(() => {
        setSelection(attribute ? getValues(attribute) : null);
    }, [attribute, getValues]);

    return (
        <div>
            <p>{content(getValues('terrain'))}</p>
            {freeText && (
                <input type={freeText.type} {...register(freeText.title, numberOptions)} className="rounded-xl p-1" />
            )}

            {options?.values.map(({ title, value }) => (
                <button
                    key={title}
                    onClick={(e) => {
                        e.preventDefault();
                        if (selection === value) {
                            setSelection(null);
                            setValue(options?.attribute, null);
                        } else {
                            setSelection(value);
                            setValue(options?.attribute, value);
                        }
                    }}
                    className={clsx(
                        'relative overflow-hidden py-3 bg-pink px-6 rounded-full text-lg shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:shadow-xl hover:from-pink-500 hover:to-purple-500',
                        { 'bg-purple': value === selection },
                    )}
                >
                    {title}
                </button>
            ))}

            {secondaryContent && <p>{secondaryContent}</p>}
        </div>
    );
};