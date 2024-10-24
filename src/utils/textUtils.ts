import { Breeds, LEGS } from '@/app/create/creationSteps';
import { Dragon } from '.prisma/client';

export const capitalize = (value: string) => `${value[0].toUpperCase()}${value.slice(1)}`;

export const boolToYesNo = (value: boolean | null) => {
    return value ? 'Yes' : 'No';
};

export const prettifyValue = (value: string | number | Date | boolean | null) => {
    switch (typeof value) {
        case 'boolean':
            return boolToYesNo(value);
        case 'string':
            return capitalize(value);
        case 'object':
            return value === null ? boolToYesNo(value) : value.toDateString();
        case 'number':
        default:
            return value;
    }
};

const biggestWeapon = (fire: boolean, water: boolean, horns: number) => {
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
    const swim = 'diving in the water, that they call home';
    const fly = ' swooping high in the air and';
    const gallop = `galloping around the ${terrain.toLowerCase()}. That they call home`;
    const personalityText = armored ? aggressive : friendly;
    const abilityText = `They love${wings ? fly : ''} ${fins ? swim : gallop}.`;
    return `Adopted on ${prettifyValue(createdAt)} ${personalityText} ${warning} ${abilityText}`;
};