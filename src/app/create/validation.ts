import { z, ZodIssue, ZodSchema } from 'zod';
import { BREATH, TERRAIN } from '@/app/create/creationSteps';
import { Prisma } from '.prisma/client';
import { CreateDragonForm } from '@/app/create/ui/CreateDragonForm';
import DragonCreateInput = Prisma.DragonCreateInput;

const validation: { [k: string]: ZodSchema } = {
    name: z
        .string()
        .min(3, { message: 'There are no dragon names in the historical record that have less than 3 characters' }),
    legs: z.number({
        message:
            'You know from your training that it must be a specific breed. Dragons have 4 legs, Wyvern have 2 Coatyls have none. Octolegged monstrosities naturally have 8 but they have never ben sighted',
    }),
    color: z.string().min(3, { message: 'Unless perhaps it is colourless? In that case write transparent.' }),
    terrain: z.string({ message: 'You are you going to explore somewhere, right?' }),
    eyeColor: z
        .string()
        .min(3, { message: '*Consults notes* Common dragon eye colors include yellow, blue and green' }),
    armored: z.boolean({ message: 'You do have to pick one' }),
    horns: z
        .number()
        .min(0, { message: 'As a scientist you would know that it is physically impossible to have a negative count' }),
    fins: z.boolean(),
    feathers: z.boolean(),
    wings: z.boolean({ message: 'You have eyes, does it have wings or not?' }),
};

export const formSchema: { [k: string]: ZodSchema } = {
    ...validation,
    breathes: z.string({ message: 'Perhaps your are also grossed out but your journal only has these options' }),
};

//export type ValidationSchema = z.infer<typeof validationSchema>;

export const validateDragon = (
    formInput: CreateDragonForm,
): {
    success: boolean;
    data: DragonCreateInput;
    errors: ZodIssue[] | undefined;
} => {
    const { breathes, ...data } = formInput;
    if (data.terrain === TERRAIN.sea || data.terrain === TERRAIN.lake) {
        data.fins = true;
    }
    if (!data.armored) {
        data.feathers = true;
    }
    if (breathes === BREATH.FIRE) {
        data.fireBreather = true;
    }
    if (breathes === BREATH.WATER) {
        data.waterBreather = true;
    }

    const schema = z.object({
        ...validation,
        waterBreather: z.boolean(),
        fireBreather: z.boolean(),
    });

    const { success, error } = schema.safeParse(data);

    return { success, data, errors: error?.issues };
};