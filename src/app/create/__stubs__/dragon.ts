import { Prisma } from '.prisma/client';
import DragonCreateInput = Prisma.DragonCreateInput;

export const dragon: DragonCreateInput = {
    name: 'Drogon',
    slug: 'drogon',
    color: 'purple',
    terrain: 'forest',
    fireBreather: true,
    waterBreather: false,
    eyeColor: 'blue',
    armored: true,
    horns: 2,
    fins: false,
    feathers: false,
    wings: true,
    legs: 4,
};