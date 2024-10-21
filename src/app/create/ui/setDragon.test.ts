import { setDragon } from '@/app/create/ui/setDragon';
import { dragonInput } from '@/app/create/__stubs__/dragonInput';
import { upload } from '@/app/create/actions/upload';
import { createDragon } from '@/app/create/actions/createDragon';

jest.mock('../actions/createDragon');
jest.mock('../actions/upload');

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

describe('Set Dragon', () => {
    const mockUrl = 'mockUrl';
    const mockKey = 'mockKey';
    beforeAll(() => {
        process.env = Object.assign(process.env, { NODE_ENV: 'production' });
        process.env = Object.assign(process.env, { MOCK_OPENAI: 'false' });
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('uploads dragon to s3', async () => {
        const setImageUrl = jest.fn();

        const error = await setDragon(setImageUrl, dragonInput);
        expect(error).toBeUndefined();
        expect(setImageUrl).toHaveBeenCalledWith(mockUrl);
        expect(upload).toHaveBeenCalledWith(mockKey, mockUrl);
    });

    it('relays error back', async () => {
        const setImageUrl = jest.fn();
        const errorMessage = 'test error';

        const mockedCreate = jest.mocked(createDragon);
        mockedCreate.mockRejectedValue(new Error(errorMessage));
        const error = await setDragon(setImageUrl, dragonInput);

        expect(error).toBe(errorMessage);
        expect(setImageUrl).not.toHaveBeenCalled();
        expect(upload).not.toHaveBeenCalled();
    });
});