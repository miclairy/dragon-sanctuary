import { creationSteps, stepOrder } from '@/app/create/creationSteps';
import { UseFormGetValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Question } from '@/app/create/ui/Question';
import { ZodIssue } from 'zod';
import { formSchema } from '@/app/create/validation';
import { CreateDragonForm } from '@/app/create/ui/CreateDragonForm';

interface Props {
    stepNumber: number;
    register: UseFormRegister<CreateDragonForm>;
    setValue: UseFormSetValue<CreateDragonForm>;
    getValues: UseFormGetValues<CreateDragonForm>;
    setStep: Dispatch<SetStateAction<number>>;
}

export const Step = ({ stepNumber, register, setValue, getValues, setStep }: Props) => {
    const { options, freeText } = creationSteps[stepOrder[stepNumber]];
    const attribute = options?.attribute ?? freeText?.title;
    const [error, setError] = useState<ZodIssue | null>();
    const nextRef = useRef<HTMLButtonElement>(null);
    const validate = () => {
        const { success, error } = attribute
            ? formSchema[attribute].safeParse(getValues(attribute))
            : { success: true };
        setError(error?.issues.pop());
        return success;
    };

    const goToNextStep = () => {
        setError(null);
        if (validate()) {
            setStep((s) => s + 1);
        }
    };

    useEffect(() => {
        nextRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'start',
        });
    });

    return (
        <div>
            <div className="p-2">
                <Question stepNumber={stepNumber} register={register} setValue={setValue} getValues={getValues} />
                {error && (
                    <p role="alert" className="text-rose-600">
                        <i>{error.message}</i>
                    </p>
                )}
            </div>

            <div className="w-full flex justify-around align-middle my-4 p-2">
                {stepNumber > 0 && (
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setError(null);
                            setStep((s) => s - 1);
                        }}
                        className="p-1 m-1 border-solid border-2 border-blue hover:bg-blueLight bg-blue bg-opacity-20"
                    >
                        &lt;-- back away
                    </button>
                )}
                <button
                    ref={nextRef}
                    onClick={(e) => {
                        validate();
                        if (stepNumber !== stepOrder.length - 1) {
                            e.preventDefault();
                            goToNextStep();
                        }
                    }}
                    className="p-1 m-1 border-solid border-2 border-blue hover:bg-blueLight bg-blue bg-opacity-20"
                >
                    keep exploring --&#62;
                </button>
            </div>
        </div>
    );
};