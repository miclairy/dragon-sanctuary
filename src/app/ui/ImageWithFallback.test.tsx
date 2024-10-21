import { fireEvent, render, screen } from '@testing-library/react';
import { ImageWithFallback } from '@/app/ui/ImageWithFallback';

describe('Image with fallback', () => {
    it('shows fallback image if the src does not exist', async () => {
        await render(<ImageWithFallback src="/test123.png" width={100} height={100} alt="test" />);
        fireEvent.error(screen.getByAltText('test'));
        const img = await screen.getByAltText('fallback image of a purple dragon');
        expect(img.getAttribute('src')).toContain('purpleDragon.png');
    });

    it('shows src image if there are no errors', async () => {
        render(<ImageWithFallback src="/cloud.svg" width={100} height={100} alt="test cloud" />);
        const img = await screen.getByAltText('test cloud');
        expect(img.getAttribute('src')).toContain('cloud.svg');
    });
});