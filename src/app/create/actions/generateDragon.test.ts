import { generateDragon } from '@/app/create/actions/generateDragon';
import { dragonInput } from '@/app/create/__stubs__/dragonInput';
import { createDragon } from '@/app/create/actions/createDragon';
import { defaultImage } from '@/app/constants';

jest.mock('./createDragon');
jest.mock('./upload');

jest.mock('uuid', () => ({
    v4: jest.fn().mockReturnValue('mockKey'),
}));
jest.mock('openai', () => {
    return {
        __esModule: true,
        default: jest.fn().mockImplementation(() => ({
            images: {
                generate: jest.fn().mockReturnValue({ data: [{ url: 'mockUrl' }] }),
            },
        })),
    };
});

describe('Generate Dragon', () => {
    const mockUrl = 'mockUrl';
    const mockKey = 'mockKey';
    beforeAll(() => {
        process.env = Object.assign(process.env, { NODE_ENV: 'production' });
        process.env = Object.assign(process.env, { MOCK_OPENAI: 'false' });
    });

    it('generates an imageUrl', async () => {
        const result = await generateDragon(dragonInput);

        expect(result).toEqual({ url: mockUrl, imageKey: mockKey });
        expect(createDragon).toHaveBeenCalledWith(dragonInput, mockKey);
    });

    it('gives an default imageUrl', async () => {
        process.env = Object.assign(process.env, { NODE_ENV: 'development' });
        process.env = Object.assign(process.env, { MOCK_OPENAI: 'true' });

        const result = await generateDragon(dragonInput);

        expect(result).toEqual({ url: defaultImage, imageKey: mockKey });
        expect(createDragon).toHaveBeenCalledWith(dragonInput, mockKey);
    });
});