import { Prisma } from '.prisma/client';
import { CreateDragonForm } from '@/app/create/ui/CreateDragonForm';
import { Question } from '@/app/create/ui/Question';
import DragonCreateInput = Prisma.DragonCreateInput;

export const BREATH = {
    WATER: 'water',
    FIRE: 'fire',
    STEAM: 'steam',
    NONE: 'nothing',
} as const;
export type Breath = (typeof BREATH)[keyof typeof BREATH];

interface Question {
    index: number;
    content: (v: string) => string;
    secondaryContent?: string;
    options?: {
        attribute: keyof CreateDragonForm;
        values: { title: string; value?: string | number | boolean }[];
    };
    freeText?: { title: keyof DragonCreateInput; type?: 'number' };
    backgroundImage: string;
}

export const TERRAIN = {
    forest: 'forest',
    sea: 'sea',
    meadow: 'meadow',
    mountain: 'mountain',
    lake: 'lake',
} as const;

type Terrain = (typeof TERRAIN)[keyof typeof TERRAIN];

const movementMap: { [K in Terrain]: string } = {
    forest: 'creep into',
    sea: 'follow you nose towards',
    lake: 'dive into',
    meadow: 'lay down again in',
    mountain: 'power up',
};

export const creationSteps: { [k: string]: Question } = {
    intro: {
        index: 0,
        content: () =>
            'You stand at the precipice, down there is the dragon sanctuary. Do you dare to adopt a dragon?\nBe warned you may not come out alive.',
        backgroundImage: 'mountain',
    },
    terrain: {
        index: 1,
        content: () =>
            'You feel dizzy and the fog clears. You get up from the soft grass and look around. \n' +
            'Above you there is a mountain leading to a sky with fluffy clouds, to the left there is a forest, to the right a lake. A salty breeze wafts under your nose. \n' +
            'Where do you go?',
        options: {
            attribute: 'terrain',
            values: [
                { title: 'Explore the dark Forest', value: TERRAIN.forest },
                { title: 'Follow the scent of the sea', value: TERRAIN.sea },
                { title: 'Refresh in the Lake', value: TERRAIN.lake },
                {
                    title: 'Relax in the Meadow',
                    value: TERRAIN.meadow,
                },
                { title: 'Climb the Mountain', value: TERRAIN.mountain },
            ],
        },
        backgroundImage: 'fluffy-cloud',
    },
    color: {
        index: 2,
        content: (terrain: string) =>
            `You ${movementMap[terrain as Terrain]} the ${terrain} and find yourself surrounded by raw beauty. Something catches your eye: a grove of strange plants colored with the most fantastic shades of....`,
        freeText: { title: 'color' },
        backgroundImage: 'tree',
    },
    eyeColor: {
        index: 3,
        content: () => `There is something camouflaged in the foliage but its....`,
        secondaryContent: '....eyes stand out',
        freeText: { title: 'eyeColor' },
        backgroundImage: 'eye',
    },
    legs: {
        index: 4,
        content: () =>
            'You know from your training that Dragons have 4 legs, Wyvern have 2 and Coatyls have none. Octolegged monstrosities naturally have 8 but they have never been sighted. \n Which is it?',
        options: {
            attribute: 'legs',
            values: [
                { title: 'Coatyl', value: 0 },
                { title: 'Dragon', value: 4 },
                { title: 'Wyvern', value: 2 },
                { title: 'Octolegged monstrosity', value: 8 },
            ],
        },
        backgroundImage: 'claw',
    },
    wings: {
        index: 5,
        content: () => 'It launches into the air it looks most at home there, swooping and twirling with its beautiful',
        options: {
            attribute: 'wings',
            values: [
                { title: 'wings', value: true },
                { title: 'tail', value: false },
            ],
        },
        backgroundImage: 'wing',
    },
    horns: {
        index: 6,
        content: () =>
            'They turn to you curiously. Perhaps they see something in you, that you do not. Not losing your composure and remembering your training you count the horns.\n How many do you count?',
        freeText: { title: 'horns', type: 'number' },
        backgroundImage: 'horns',
    },
    armored: {
        index: 7,
        content: () =>
            'After the count you know your relative safety....\nAre the textbooks correct? Because this one looks particularly....',
        options: {
            attribute: 'armored',
            values: [
                { title: 'ready for a fight', value: true },
                { title: 'kind and wise', value: false },
            ],
        },
        backgroundImage: 'head',
    },
    breathes: {
        index: 8,
        content: () => 'Time to find out their judgment of you..... ROOOOAARR\nYou feel....',
        secondaryContent: '....when their breath reaches you.',
        options: {
            attribute: 'breathes',
            values: [
                { title: 'Wet and gasping for air', value: BREATH.WATER },
                { title: 'Roasted but unburnt', value: BREATH.FIRE },
                {
                    title: 'Oddly settled',
                    value: BREATH.NONE,
                },
            ],
        },
        backgroundImage: 'breath',
    },
    name: {
        index: 9,
        content: () =>
            "You haven't been eaten or burnt so you risk it all and reach out to them.\n...You hear something on the wind....\nIs it their name? Their name is...",
        freeText: { title: 'name' },
        backgroundImage: 'wyvern',
    },
};

export const stepOrder = Object.keys(creationSteps);

// wait where did they go?  You feel a shove from below. Is that them... Are we flying?... UP UP UP....