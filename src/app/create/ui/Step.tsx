import { creationSteps, stepOrder } from '@/app/create/creationSteps';
import { UseFormGetValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { Dispatch, SetStateAction, useState } from 'react';
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
    const stepName = stepOrder[stepNumber];
    const { options, freeText } = creationSteps[stepName];
    const attribute = options?.attribute ?? freeText?.title;
    const [error, setError] = useState<ZodIssue | null>();
    const validate = () => {
        const { success, error } = attribute
            ? formSchema[attribute].safeParse(getValues(attribute))
            : { success: true };
        setError(error?.issues.pop());
        return success;
    };
    const goToNextStep = () => {
        if (validate()) {
            setStep((s) => s + 1);
            setError(null);
        }
    };

    return (
        <div>
            <Question stepName={stepName} register={register} setValue={setValue} getValues={getValues} />
            {error && (
                <p role="alert" className="text-pink">
                    <i>{error.message}</i>
                </p>
            )}

            <div>
                {stepNumber > 0 && (
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setError(null);
                            setStep((s) => s - 1);
                        }}
                        className="p-1 m-1 border-solid border-4 border-blue hover:bg-blue"
                    >
                        &lt;-- i think i missed something go back
                    </button>
                )}
                <button
                    onClick={(e) => {
                        validate();
                        if (stepNumber !== stepOrder.length - 1) {
                            e.preventDefault();
                            goToNextStep();
                        }
                    }}
                    className="p-1 m-1 border-solid border-4 border-blue hover:bg-blue"
                >
                    keep exploring --&#62;
                </button>
            </div>
        </div>
    );
};