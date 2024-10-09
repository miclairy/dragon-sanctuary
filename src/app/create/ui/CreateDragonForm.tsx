import { useForm } from 'react-hook-form';
import { generateDragon } from '@/app/create/actions/generateDragon';
import { Prisma } from '.prisma/client';
import { useState } from 'react';
import WhimsySpinner from '@/app/ui/WhimsySpinner';
import { ErrorBox } from '@/app/ui/ErrorBox';
import clsx from 'clsx';
import { Step } from '@/app/create/ui/Step';
import { stepOrder, TERRAIN } from '@/app/create/creationSteps';
import DragonCreateInput = Prisma.DragonCreateInput;

export const CreateDragonForm = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
        getValues,
    } = useForm<DragonCreateInput>({
        defaultValues: {
            waterBreather: false,
            fireBreather: false,
            fins: false,
            feathers: false,
        },
    });

    const [imageUrl, setImageUrl] = useState<string>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>();
    const [step, setStep] = useState(0);

    const onSubmit = async (data: DragonCreateInput) => {
        setLoading(true);
        if (data.terrain === TERRAIN.sea || data.terrain === TERRAIN.lake) {
            data.fins = true;
        }
        if (!data.armored) {
            data.feathers = true;
        }
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
    };

    // pancake todo use the watch api to visually display a dragon representation or fun quiz like UI
    // pancake todo use nextjs Image component

    return (
        <div className="lg:flex pt-4 gap-2 justify-content:space-around">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 pl-2">
                {step < stepOrder.length && (
                    <>
                        <Step
                            stepNumber={step}
                            register={register}
                            errors={errors}
                            setValue={setValue}
                            getValues={getValues}
                        ></Step>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setStep((s) => s + 1);
                            }}
                        >
                            continue
                        </button>
                    </>
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
                {error && <ErrorBox />}
            </div>
        </div>
    );
};