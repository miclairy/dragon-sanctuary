import { setDragon } from '@/app/create/ui/setDragon';
import { dragonInput } from '@/app/create/__stubs__/dragonInput';
import { saveDragon } from '@/app/create/actions/saveDragon';
import { generateImage } from '@/app/create/actions/generateImage';

vi.mock('../actions/saveDragon');
vi.mock('../actions/generateImage', async () => ({
    ...(await vi.importActual('../actions/generateImage')),
    generateImage: vi.fn(),
}));

vi.mock('uuid', () => ({
    v4: vi.fn().mockReturnValue('mockKey'),
}));
vi.mock('openai', () => ({
    // a class, not an arrow fn: generateImage calls `new OpenAI()`
    default: class {
        images = {
            generate: vi.fn().mockReturnValue({ data: [{ url: 'mockUrl' }] }),
        };
    },
}));

describe('Set Dragon', () => {
    const mockUrl = 'mockUrl';
    const mockedGenerate = vi.mocked(generateImage);

    beforeAll(() => {
        process.env = Object.assign(process.env, { NODE_ENV: 'production' });
        process.env = Object.assign(process.env, { MOCK_OPENAI: 'false' });
    });

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('stores dragon and image', async () => {
        const setImageUrl = vi.fn();
        mockedGenerate.mockResolvedValue(mockUrl);
        const error = await setDragon(setImageUrl, dragonInput);
        expect(error).toBeUndefined();
        expect(setImageUrl).toHaveBeenCalledWith(mockUrl);
        expect(saveDragon).toHaveBeenCalledWith(mockUrl, dragonInput);
    });

    it('does not store dragon if generation fails', async () => {
        const setImageUrl = vi.fn();
        const errorMessage = 'test error';

        mockedGenerate.mockRejectedValue(new Error(errorMessage));
        const error = await setDragon(setImageUrl, dragonInput);

        expect(error).toBe(errorMessage);
        expect(setImageUrl).not.toHaveBeenCalled();
        expect(saveDragon).not.toHaveBeenCalled();
    });
});