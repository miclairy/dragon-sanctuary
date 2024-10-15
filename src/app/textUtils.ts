import { Breeds, LEGS } from '@/app/create/creationSteps';
import { Dragon } from '.prisma/client';

export const boolToYesNo = (value: boolean) => {
    return value ? 'Yes' : 'No';
};

export const biggestWeapon = (fire: boolean, water: boolean, horns: number) => {
    if (fire) {
        return 'fire';
    } else if (water) {
        return 'water';
    } else if (horns > 1) {
        return 'horns';
    }
    return 'claws';
};

export const dragonBio = (dragon: Dragon) => {
    const { fireBreather, waterBreather, fins, armored, wings, legs, terrain, createdAt, horns } = dragon;
    const breed = LEGS[legs as Breeds];
    const friendly = `this friendly ${breed ?? 'dragon'} is a pleasure to protect. Their friendly nature can get them into trouble.`;
    const aggressive = `this ${breed ?? 'dragon'} is not to be messed with.`;
    const warning = `Better make sure you stay away from the ${biggestWeapon(fireBreather, waterBreather, horns)}.`;
    const swim = 'diving in the water, that they call home.';
    const fly = 'swooping high in the air and ';
    const gallop = `galloping around the ${terrain.toLowerCase()}. That they call home`;
    const personalityText = armored ? friendly : aggressive;
    const abilityText = `They love ${wings ? fly : ''} ${fins ? swim : gallop}.`;
    return `Adopted on ${createdAt.toLocaleDateString()} ${personalityText} ${warning} ${abilityText}`;
};