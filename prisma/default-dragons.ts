import { Prisma } from '.prisma/client';
import DragonCreateInput = Prisma.DragonCreateInput;

export const defaultDragons: DragonCreateInput[] = [
    {
        name: 'Drogo',
        slug: 'drogo',
        color: 'black',
        terrain: 'mountains',
        fireBreather: true,
        waterBreather: false,
        eyeColor: 'black',
        armored: true,
        horns: 6,
        fins: false,
        feathers: false,
        wings: true,
        legs: 4,
        imageKey: 'img-hk6W3YFem90GyKIy82eFDAD3',
    },
];