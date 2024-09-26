import { useForm } from 'react-hook-form';
import { LabelInput } from '@/app/create/components/LabelInput';
import { Dragon } from '.prisma/client';

export const CreateDragonFrom = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<Dragon>({
        defaultValues: {
            legs: 4,
            wings: true,
            terrain: 'Sky',
            horns: 2,
        },
    });
    // console.log('pancake', errors);

    return (
        <div className="lg:flex pt-4 gap-2 justify-content:space-around">
            <form
                onSubmit={handleSubmit((data) => {
                    console.log('pancake', data);
                })}
                className="flex flex-col gap-2 pl-2"
            >
                <LabelInput register={register} name="name" required type="text" />
                <LabelInput register={register} name="color" required type="text" />
                <LabelInput register={register} name="eyecolor" required type="text" />
                <LabelInput register={register} name="legs" required type="number" />
                <LabelInput register={register} name="fireBreather" type="checkbox" />
                <LabelInput register={register} name="waterBreather" type="checkbox" />
                <LabelInput register={register} name="armored" type="checkbox" />
                <LabelInput register={register} name="horns" required type="number" />
                <LabelInput register={register} name="fins" type="checkbox" />
                <LabelInput register={register} name="feathers" type="checkbox" />
                <LabelInput register={register} name="wings" type="checkbox" />
                <LabelInput register={register} name="terrain" required type="text" />

                <input
                    type="submit"
                    id="generate-btn"
                    value="Generate"
                    className="text-xl bg-pink rounded-lg m-4 p-4 px-8 hover:bg-purple"
                />
            </form>
        </div>
    );
};