import { generateImage } from '@/app/create/actions/generateImage';
import { dragonInput } from '@/app/create/__stubs__/dragonInput';
import { defaultImage } from '@/app/constants';

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
    beforeAll(() => {
        process.env = Object.assign(process.env, { NODE_ENV: 'production' });
        process.env = Object.assign(process.env, { MOCK_OPENAI: 'false' });
    });

    it('generates an imageUrl', async () => {
        const result = await generateImage(dragonInput);

        expect(result).toEqual(mockUrl);
    });

    it('gives an default imageUrl', async () => {
        process.env = Object.assign(process.env, { NODE_ENV: 'development' });
        process.env = Object.assign(process.env, { MOCK_OPENAI: 'true' });

        const result = await generateImage(dragonInput);

        expect(result).toEqual(defaultImage);
    });
});