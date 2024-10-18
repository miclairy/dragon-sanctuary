import { FormProvider, useForm } from 'react-hook-form';
import { generateDragon } from '@/app/create/actions/generateDragon';
import { Prisma } from '.prisma/client';
import { Dispatch, SetStateAction, useState } from 'react';
import { ErrorBox } from '@/app/ui/ErrorBox';
import { Step } from '@/app/create/ui/Step';
import { Breath, creationSteps, stepOrder } from '@/app/create/creationSteps';
import { validateDragon } from '@/app/create/validation';
import { Loading } from '@/app/create/ui/Loading';
import DragonCreateInput = Prisma.DragonCreateInput;

export interface CreateDragonForm extends DragonCreateInput {
    breathes: Breath;
}

interface Props {
    setImageUrl: Dispatch<SetStateAction<string | undefined>>;
}

export const CreateDragonForm = ({ setImageUrl }: Props) => {
    const formMethods = useForm<CreateDragonForm>({
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
    const { backgroundImage } = creationSteps[stepOrder[step]];

    const onSubmit = async (formInput: CreateDragonForm) => {
        setLoading(true);
        setError(null);
        const { data, success } = validateDragon(formInput);
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
        }
    };

    return (
        <div
            style={{ backgroundImage: `url(/${backgroundImage}.svg)` }}
            className="bg-contain bg-no-repeat bg-center mt-4 max-w-3xl h-3xl mx-auto rounded-xl border-dashed border-blue border-2 "
        >
            <FormProvider {...formMethods}>
                <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                    {step < stepOrder.length && !loading && <Step stepNumber={step} setStep={setStep}></Step>}
                </form>
                {error && <ErrorBox message={error} />}
                {loading && <Loading />}
            </FormProvider>
        </div>
    );
};