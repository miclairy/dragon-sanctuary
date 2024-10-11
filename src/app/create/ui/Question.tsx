import { creationSteps, stepOrder } from '@/app/create/creationSteps';
import { UseFormGetValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { CreateDragonForm } from '@/app/create/ui/CreateDragonForm';
import { alegreya } from '@/app/ui/fonts';

interface Props {
    stepNumber: number;
    register: UseFormRegister<CreateDragonForm>;
    setValue: UseFormSetValue<CreateDragonForm>;
    getValues: UseFormGetValues<CreateDragonForm>;
}

export const Question = ({ register, getValues, stepNumber, setValue }: Props) => {
    const stepName = stepOrder[stepNumber];
    const { content, secondaryContent, options, freeText } = creationSteps[stepName];
    const attribute = options?.attribute ?? freeText?.title;
    const [selection, setSelection] = useState(attribute ? getValues(attribute) : null);

    const numberOptions = freeText?.type === 'number' ? { valueAsNumber: true } : {};

    useEffect(() => {
        setSelection(attribute ? getValues(attribute) : null);
    }, [attribute, getValues]);

    return (
        <div>
            <div className="lg:flex lg:m-4 ">
                <div className={`${alegreya.className} mb-2`}>
                    <h3 className="text-3xl text-purple">Q{stepNumber + 1}:</h3>
                    <h4 className="text-2xl whitespace-nowrap text-purple">
                        {stepNumber + 1} / {stepOrder.length}
                    </h4>
                </div>

                <p className="whitespace-pre-wrap lg:mx-4 sm:my-2 text-lg">{content(getValues('terrain'))}</p>
            </div>

            <div className="flex-col justify-center items-center align-middle my-4 gap-2 min-h-72">
                {freeText && (
                    <input
                        type={freeText.type}
                        {...register(freeText.title, numberOptions)}
                        className="flex mx-auto rounded-xl p-1 m-1 shadow-pink shadow-inner bg-pinkLight text-xl text-center text-purple"
                    />
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
                            'flex bg-pink mx-auto my-2 p-2 rounded-full shadow-pink text-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:shadow-xl hover:from-pink-500 hover:to-purple-500',
                            {
                                'bg-purple shadow-inner bg-opacity-75': value === selection,
                                'shadow-lg ': value !== selection,
                            },
                        )}
                    >
                        {title}
                    </button>
                ))}
                {secondaryContent && <p className="whitespace-pre-wrap mt-4 lg:ml-20 text-lg">{secondaryContent}</p>}
            </div>
        </div>
    );
};