import { creationSteps, stepOrder } from '@/app/create/creationSteps';
import { useFormContext } from 'react-hook-form';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Question } from '@/app/create/ui/Question';
import { ZodIssue } from 'zod';
import { formSchema } from '@/app/create/validation';

interface Props {
    stepNumber: number;

    setStep: Dispatch<SetStateAction<number>>;
}

export const Step = ({ stepNumber, setStep }: Props) => {
    const { getValues } = useFormContext();
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
        if (!attribute) {
            nextRef.current?.focus();
        }
    });

    return (
        <div>
            <div className="p-2">
                <Question stepNumber={stepNumber} error={!!error} goToNextStep={goToNextStep} />
                {error && (
                    <span role="alert" className="text-rose-800">
                        <i>{error.message}</i>
                    </span>
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