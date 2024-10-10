import { useForm } from 'react-hook-form';
import { generateDragon } from '@/app/create/actions/generateDragon';
import { Prisma } from '.prisma/client';
import { useState } from 'react';
import WhimsySpinner from '@/app/ui/WhimsySpinner';
import { ErrorBox } from '@/app/ui/ErrorBox';
import clsx from 'clsx';
import { Step } from '@/app/create/ui/Step';
import { Breath, stepOrder } from '@/app/create/creationSteps';
import { validateDragon } from '@/app/create/validation';
import DragonCreateInput = Prisma.DragonCreateInput;

export interface CreateDragonForm extends DragonCreateInput {
    breathes: Breath;
}

export const CreateDragonForm = () => {
    const { register, handleSubmit, setValue, getValues } = useForm<CreateDragonForm>({
        defaultValues: {
            fins: false,
            feathers: false,
            horns: 0,
            fireBreather: false,
            waterBreather: false,
        },
    });

    const [imageUrl, setImageUrl] = useState<string>();
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
                setImageUrl(imageUrl);
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
                {step < stepOrder.length && (
                    <Step
                        stepNumber={step}
                        register={register}
                        setValue={setValue}
                        getValues={getValues}
                        setStep={setStep}
                    ></Step>
                )}

                {step >= stepOrder.length && (
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

            <div>
                {imageUrl && <img src={imageUrl} alt="dragon" width={1024} height={1024} />}
                {loading && (
                    <div className="min-h-screen">
                        <WhimsySpinner size="lg" />
                    </div>
                )}
                {error && <ErrorBox message={error} />}
            </div>
        </div>
    );
};