import { Prisma } from '.prisma/client';
import DragonCreateInput = Prisma.DragonCreateInput;

export const dragonInput: DragonCreateInput = {
    name: 'TestDrogon',
    slug: 'testDrogon',
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