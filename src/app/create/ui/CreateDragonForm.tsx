import { useForm } from 'react-hook-form';
import { LabelInput } from '@/app/create/ui/LabelInput';
import { generateDragon } from '@/app/create/actions/generateDragon';
import { Prisma } from '.prisma/client';
import { useState } from 'react';
import WhimsySpinner from '@/app/ui/WhimsySpinner';
import { ErrorBox } from '@/app/ui/ErrorBox';
import clsx from 'clsx';
import DragonCreateInput = Prisma.DragonCreateInput;

export const CreateDragonForm = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<DragonCreateInput>({
        defaultValues: {
            legs: 4,
            wings: true,
            terrain: 'Sky',
            horns: 2,
        },
    });

    const [imageUrl, setImageUrl] = useState<string>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>();
    const onSubmit = async (data: DragonCreateInput) => {
        setLoading(true);
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
                <LabelInput register={register} errors={errors} name="name" required type="text" />
                <LabelInput register={register} errors={errors} name="color" required type="text" />
                <LabelInput register={register} errors={errors} name="eyeColor" required type="text" />
                <LabelInput register={register} errors={errors} name="legs" required type="number" />
                <LabelInput register={register} errors={errors} name="fireBreather" type="checkbox" />
                <LabelInput register={register} errors={errors} name="waterBreather" type="checkbox" />
                <LabelInput register={register} errors={errors} name="armored" type="checkbox" />
                <LabelInput register={register} errors={errors} name="horns" required type="number" />
                <LabelInput register={register} errors={errors} name="fins" type="checkbox" />
                <LabelInput register={register} errors={errors} name="feathers" type="checkbox" />
                <LabelInput register={register} errors={errors} name="wings" type="checkbox" />
                <LabelInput register={register} errors={errors} name="terrain" required type="text" />

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