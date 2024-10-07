import { generateDragon } from '@/app/create/actions/generateDragon';
import { dragon } from '@/app/create/__stubs__/dragon';
import { createDragon } from '@/app/create/actions/createDragon';
import { upload } from '@/app/create/actions/upload';
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
jest.mock('@aws-sdk/client-s3');

describe('Generate Dragon', () => {
    const mockUrl = 'mockUrl';
    const mockKey = 'mockKey';
    beforeAll(() => {
        process.env = Object.assign(process.env, { NODE_ENV: 'production' });
        process.env = Object.assign(process.env, { MOCK_OPENAI: 'false' });
    });

    it('generates an imageUrl', async () => {
        const result = await generateDragon(dragon);

        expect(result).toEqual(mockUrl);
        expect(createDragon).toHaveBeenCalledWith(dragon, mockKey);
        expect(upload).toHaveBeenCalledWith(mockKey, mockUrl);
    });

    it('gives an default imageUrl', async () => {
        process.env = Object.assign(process.env, { NODE_ENV: 'development' });
        process.env = Object.assign(process.env, { MOCK_OPENAI: 'true' });

        const result = await generateDragon(dragon);

        expect(result).toEqual(defaultImage);
        expect(createDragon).toHaveBeenCalledWith(dragon, mockKey);
        expect(upload).toHaveBeenCalledWith(mockKey, defaultImage);
    });
});