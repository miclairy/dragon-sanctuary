import { setDragon } from '@/app/create/ui/setDragon';
import { dragonInput, svgResult } from '@/app/create/__stubs__/dragonInput';
import { saveDragon } from '@/app/create/actions/saveDragon';

vi.mock('../actions/saveDragon');

vi.mock('uuid', () => ({
    v4: vi.fn().mockReturnValue('mockKey'),
}));


describe('Set Dragon', () => {

    beforeAll(() => {
        process.env = Object.assign(process.env, { NODE_ENV: 'production' });
        process.env = Object.assign(process.env, { MOCK_OPENAI: 'false' });
    });

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('stores dragon and image', async () => {
        const setSvg = vi.fn();
        const error = await setDragon(setSvg, dragonInput);
        expect(error).toBeUndefined();
        expect(setSvg).toHaveBeenCalledWith(svgResult);
        expect(saveDragon).toHaveBeenCalledWith(svgResult, dragonInput);
    });

});