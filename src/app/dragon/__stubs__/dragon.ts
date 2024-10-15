import { Dragon } from '.prisma/client';
import { dragonInput } from '@/app/create/__stubs__/dragonInput';

export const dragon: Dragon = {
    ...dragonInput,
    createdAt: new Date('2022-02-02'),
    id: '1234',
    index: 1,
    imageKey: 'testImageKey',
};