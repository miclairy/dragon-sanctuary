import { useForm } from 'react-hook-form';
import { generateDragon } from '@/app/create/actions/generateDragon';
import { Prisma } from '.prisma/client';
import { Dispatch, SetStateAction, useState } from 'react';
import { ErrorBox } from '@/app/ui/ErrorBox';
import { Step } from '@/app/create/ui/Step';
import { Breath, stepOrder } from '@/app/create/creationSteps';
import { validateDragon } from '@/app/create/validation';
import clsx from 'clsx';
import { Loading } from '@/app/create/ui/Loading';
import DragonCreateInput = Prisma.DragonCreateInput;

export interface CreateDragonForm extends DragonCreateInput {
    breathes: Breath;
}

interface Props {
    setImageUrl: Dispatch<SetStateAction<string | undefined>>;
}

export const CreateDragonForm = ({ setImageUrl }: Props) => {
    const { register, handleSubmit, setValue, getValues } = useForm<CreateDragonForm>({
        defaultValues: {
            fins: false,
            feathers: false,
            horns: 0,
            fireBreather: false,
            waterBreather: false,
        },
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>();
    const [step, setStep] = useState(0);

    const onSubmit = async (formInput: CreateDragonForm) => {
        setLoading(true);
        setError(null);
        const { data, success, errors } = validateDragon(formInput);
        if (success) {
            try {
                const imageUrl = await generateDragon(data);
                if (!imageUrl) {
                    setError('Something went wrong');
                } else {
                    setImageUrl(imageUrl);
                }
            } catch (e) {
                if (e instanceof Error) {
                    setError(e.message);
                }
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
            setError(errors?.pop()?.message);
        }
    };

    // pancake todo use nextjs Image component

    return (
        <div className="lg:flex pt-4 gap-2 justify-content:space-around">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 pl-2">
                {step < stepOrder.length && !loading && (
                    <Step
                        stepNumber={step}
                        register={register}
                        setValue={setValue}
                        getValues={getValues}
                        setStep={setStep}
                    ></Step>
                )}

                {step === stepOrder.length && (
                    <input
                        type="submit"
                        id="generate-btn"
                        value="Generate"
                        disabled={loading}
                        className={clsx('text-xl bg-pink rounded-lg m-4 p-4 px-8 hover:bg-purple', {
                            'bg-pinkLight': loading,
                            'hover:bg-pinkLight': loading,
                            'text-gray-400': loading,
                        })}
                    />
                )}
            </form>
            {error && <ErrorBox message={error} />}
            {loading && <Loading />}
        </div>
    );
};