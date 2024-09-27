import { useForm } from 'react-hook-form';
import { LabelInput } from '@/app/create/components/LabelInput';
import { createDragon } from '@/app/create/actions/postDragon';
import { Prisma } from '.prisma/client';
import DragonCreateInput = Prisma.DragonCreateInput;

export const CreateDragonFrom = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<DragonCreateInput>({
        defaultValues: {
            legs: 4,
            wings: true,
            terrain: 'Sky',
            horns: 2, // todo pancake fix numbers
        },
    });
    // pancake todo use the watch api to visually display a dragon representation

    return (
        <div className="lg:flex pt-4 gap-2 justify-content:space-around">
            <form
                onSubmit={handleSubmit((data) => {
                    void createDragon(data);
                })}
                className="flex flex-col gap-2 pl-2"
            >
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
                    className="text-xl bg-pink rounded-lg m-4 p-4 px-8 hover:bg-purple"
                />
            </form>
        </div>
    );
};