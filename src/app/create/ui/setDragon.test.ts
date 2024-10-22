import { setDragon } from '@/app/create/ui/setDragon';
import { dragonInput } from '@/app/create/__stubs__/dragonInput';
import { saveDragon } from '@/app/create/actions/saveDragon';
import { generateImage } from '@/app/create/actions/generateImage';

jest.mock('../actions/saveDragon');
jest.mock('../actions/generateImage', () => ({
    ...jest.requireActual('../actions/generateImage'),
    generateImage: jest.fn(),
}));

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
    const mockedGenerate = jest.mocked(generateImage);

    beforeAll(() => {
        process.env = Object.assign(process.env, { NODE_ENV: 'production' });
        process.env = Object.assign(process.env, { MOCK_OPENAI: 'false' });
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('stores dragon and image', async () => {
        const setImageUrl = jest.fn();
        mockedGenerate.mockResolvedValue(mockUrl);
        const error = await setDragon(setImageUrl, dragonInput);
        expect(error).toBeUndefined();
        expect(setImageUrl).toHaveBeenCalledWith(mockUrl);
        expect(saveDragon).toHaveBeenCalledWith(mockUrl, dragonInput);
    });

    it('does not store dragon if generation fails', async () => {
        const setImageUrl = jest.fn();
        const errorMessage = 'test error';

        mockedGenerate.mockRejectedValue(new Error(errorMessage));
        const error = await setDragon(setImageUrl, dragonInput);

        expect(error).toBe(errorMessage);
        expect(setImageUrl).not.toHaveBeenCalled();
        expect(saveDragon).not.toHaveBeenCalled();
    });
});