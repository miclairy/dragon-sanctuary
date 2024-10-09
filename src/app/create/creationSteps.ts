import { Prisma } from '.prisma/client';
import DragonCreateInput = Prisma.DragonCreateInput;

export const Breath = {
    WATER: 'water',
    FIRE: 'fire',
    STEAM: 'steam',
    NONE: 'nothing',
} as const;

interface Question {
    index: number;
    content: (v: string) => string;
    secondaryContent?: string;
    options?: {
        attributes: (keyof DragonCreateInput)[];
        values: { title: string; value?: string | number | boolean }[];
    };
    freeText?: { title: keyof DragonCreateInput; type?: 'number' };
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

export const creationSteps: Record<string, Question> = {
    intro: {
        index: 0,
        content: () =>
            'You stand at the precipice, down there is the dragon sanctuary. Do you dare to adopt a dragon? Be warned you may not come out alive.',
    },
    terrain: {
        index: 1,
        content: () =>
            'You feel dizzy and the fog clears. You get up from the soft grass and look around. \n' +
            'Above there is a mountain leading to a sky with fluffy clouds, to the left there is a forest to the right is a lake. A salty breeze wafts under your nose. \n' +
            'Where do you go?',
        options: {
            attributes: ['terrain'],
            values: [
                { title: 'Explore the dark Forest', value: TERRAIN.forest },
                { title: 'Follow the scent of the sea', value: TERRAIN.sea },
                { title: 'Refresh in the Lake', value: TERRAIN.lake },
                {
                    title: 'Relax in the Meadow',
                    value: TERRAIN.meadow,
                },
                { title: 'Climb the Mountain', value: TERRAIN.meadow },
            ],
        },
    },
    color: {
        index: 2,
        content: (terrain: string) =>
            `You ${movementMap[terrain as Terrain]} the ${terrain} and find yourself surrounded by raw beauty. Something catches your eye: a grove of strange plants colored with the most fantastic shades of....`,
        freeText: { title: 'color' },
    },
    eyeColor: {
        index: 3,
        content: () => `There is something camouflaged in the foliage but its....`,
        secondaryContent: '....eyes stand out',
        freeText: { title: 'eyeColor' },
    },
    legs: {
        index: 4,
        content: () => 'It looks to be a',
        options: {
            attributes: ['legs'],
            values: [
                { title: 'Coatyl', value: 0 },
                { title: 'Dragon', value: 4 },
                { title: 'Wyvern', value: 2 },
                { title: 'Octolegged monstrosity', value: 8 },
            ],
        },
    },
    wings: {
        index: 5,
        content: () => 'It launches into the air it looks most at home there, swooping and twirling with its beautiful',
        options: {
            attributes: ['wings'],
            values: [
                { title: 'wings', value: true },
                { title: 'tail', value: false },
            ],
        },
    },
    horns: {
        index: 6,
        content: () =>
            'They turn to you curiously. Perhaps they see something in you, that you do not. Not losing your composure and remembering your training you remember to count the horns. How many do you count?',
        freeText: { title: 'horns', type: 'number' },
    },
    armor: {
        index: 7,
        content: () =>
            'After the count you know your relative safety.... Are the textbooks correct? Because this one looks particularly....',
        options: {
            attributes: ['armored'],
            values: [
                { title: 'ready for a fight', value: true },
                { title: 'kind and wise', value: false },
            ],
        },
    },
    breathes: {
        index: 8,
        content: () =>
            'You finish your assessment them and they finish their assessment of you with a large ROOOOAARR. You feel....',
        secondaryContent: '....when their breath reaches you.',
        options: {
            attributes: ['waterBreather', 'fireBreather'],
            values: [
                { title: 'wet', value: Breath.WATER },
                { title: 'hot', value: Breath.FIRE },
                {
                    title: 'Oddly settled',
                    value: Breath.NONE,
                },
            ],
        },
    },
    name: {
        index: 9,
        content: () =>
            "You haven't been eaten or burnt so you risk it all and reach out to them. You hear something. Is their name? Their name is",
        freeText: { title: 'name' },
    },
    outro: {
        index: 11,
        content: () =>
            'Congratulations you survived here is your dragon. Adoption is in sponsorship only. You reserve no rights to the dragon in life or death. Thank you for helping protect these majestic creatures. T&Cs apply',
    },
};

export const stepOrder: (keyof typeof creationSteps)[] = [
    'intro',
    'terrain',
    'color',
    'eyeColor',
    'legs',
    'wings',
    'horns',
    'armor',
    'breathes',
    'name',
    'outro',
];

// if water terrain then fins, if friendly then feathers,

// wait where did they go? They should be back soon.... You feel a shove from below is that them... Are we flying?... UP UP UP....
// You land again back on the precipice all you are left with is a picture for your journal.