import { composeDragon } from '@/app/create/actions/composeDragon';
import { dragonInput } from '@/app/create/__stubs__/dragonInput';

describe('Compose Dragon', () => {
    it('stacks one horn layer per horn inside a single svg root', async () => {
        const svg = (await composeDragon({ ...dragonInput, horns: 2 })) ?? '';

        expect(svg.match(/<svg[\s>]/g)).toHaveLength(1);
        expect(svg.trimEnd().endsWith('</svg>')).toBe(true);
        expect(svg).toContain('inkscape:label="horn-1"');
        expect(svg).toContain('inkscape:label="horn-2"');
        expect(svg).not.toContain('inkscape:label="horn-3"');
    });
});
