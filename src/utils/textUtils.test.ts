import { TERRAIN } from '@/app/create/creationSteps';
import { dragon } from '@/app/dragon/__stubs__/dragon';
import { dragonBio } from '@/utils/textUtils';

describe('dragonBio', () => {
    const expected = 'Adopted on Wed Feb 02 2022 ';
    const warningText = ` Better make sure you stay away from the horns. `;
    const friendlyText = `this friendly Dragon is a pleasure to protect. Their friendly nature can get them into trouble.`;

    it('returns a friendly message for a non-armored dragon with no special abilities', () => {
        const testDragon = {
            ...dragon,
            fireBreather: false,
            waterBreather: false,
            fins: false,
            armored: false,
            wings: false,
        };
        const abilityText = `They love galloping around the forest. That they call home.`;

        expect(dragonBio(testDragon)).toEqual(expected + friendlyText + warningText + abilityText);
    });

    it('returns an aggressive message for an armored dragon', () => {
        const testDragon = {
            ...dragon,
            fireBreather: false,
            waterBreather: false,
            fins: false,
            armored: true,
            wings: false,
            terrain: TERRAIN.mountain,
        };

        const aggressiveText = `this Dragon is not to be messed with.`;
        const abilityText = `They love galloping around the mountain. That they call home.`;

        expect(dragonBio(testDragon)).toEqual(expected + aggressiveText + warningText + abilityText);
    });

    it('includes flying ability and fire warning if the dragon has fire and wings', () => {
        const testDragon = {
            ...dragon,
            fireBreather: true,
            waterBreather: false,
            fins: false,
            armored: false,
            wings: true,
        };

        const warningText = ` Better make sure you stay away from the fire. `;
        const abilityText = `They love swooping high in the air and galloping around the forest. That they call home.`;

        expect(dragonBio(testDragon)).toEqual(expected + friendlyText + warningText + abilityText);
    });

    it('includes swimming ability if the dragon has fins', () => {
        const testDragon = {
            ...dragon,
            fireBreather: false,
            waterBreather: false,
            fins: true,
            armored: false,
            wings: false,
            horns: 0,
        };

        const friendlyText = `this friendly Dragon is a pleasure to protect. Their friendly nature can get them into trouble.`;
        const warningText = ` Better make sure you stay away from the claws.`;
        const abilityText = ` They love diving in the water, that they call home.`;

        expect(dragonBio(testDragon)).toEqual(expected + friendlyText + warningText + abilityText);
    });

    // Additional tests can be added for other edge cases and combinations
});