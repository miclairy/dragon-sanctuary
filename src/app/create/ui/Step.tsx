import { creationSteps, stepOrder } from '@/app/create/creationSteps';
import { FieldErrors, UseFormGetValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { Prisma } from '.prisma/client';
import DragonCreateInput = Prisma.DragonCreateInput;

interface Props {
    stepNumber: number;
    register: UseFormRegister<DragonCreateInput>;
    setValue: UseFormSetValue<DragonCreateInput>;
    errors: FieldErrors<DragonCreateInput>;
    getValues: UseFormGetValues<DragonCreateInput>;
}

export const Step = ({ stepNumber, register, errors, setValue, getValues }: Props) => {
    const { content, secondaryContent, options, freeText } = creationSteps[stepOrder[stepNumber]];

    const numberOptions =
        freeText?.type === 'number'
            ? {
                  valueAsNumber: true,
                  min: { value: 0, message: 'Negative values are not possible in this universe' },
              }
            : {};

    return (
        <div>
            <p>{content(getValues('terrain'))}</p>
            {freeText && (
                <input
                    type={freeText.type}
                    {...register(freeText.title, {
                        required: `${freeText.title} is required`,
                        ...numberOptions,
                    })}
                    className="rounded-xl p-1"
                />
            )}

            {options?.values.map(({ title, value }, i) => (
                <button
                    key={title}
                    onClick={(e) => {
                        e.preventDefault();

                        if (options?.attributes.length > 1) {
                            if (options?.attributes.length > i) {
                                setValue(options?.attributes[i], true); // pancake fix to toggle
                            }
                        } else {
                            setValue(options?.attributes[0], value);
                        }
                    }}
                    className="relative overflow-hidden py-3 bg-pink px-6 rounded-full text-lg shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:shadow-xl hover:from-pink-500 hover:to-purple-500"
                >
                    {title}
                </button>
            ))}
            {freeText?.title && errors[freeText?.title] && (
                <p role="alert" className="text-pink">
                    <i>{errors[freeText.title]?.message}</i>
                </p>
            )}
            {secondaryContent && <p>{secondaryContent}</p>}
        </div>
    );
};