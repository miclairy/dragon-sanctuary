import Color from 'color';

function getRandomInt(min: number, max: number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

const getSaturation = () => getRandomInt(12, 64);
const getLightness = () => getRandomInt(49, 86);
export const getColourOptions = (): { title: string; value: string }[] => {
    return [
        {
            title: 'Red',
            value: Color.hsv(getRandomInt(-15, 15) % 360, getSaturation(), getLightness()).hex(),
        },
        {
            title: 'Orange',
            value: Color.hsv(getRandomInt(15, 45), getSaturation(), getLightness()).hex(),
        },
        {
            title: 'Yellow',
            value: Color.hsv(getRandomInt(45, 75), getSaturation(), getLightness()).hex(),
        },
        {
            title: 'Green',
            value: Color.hsv(getRandomInt(75, 150), getSaturation(), getLightness()).hex(),
        },
        {
            title: 'Blue',
            value: Color.hsv(getRandomInt(150, 260), getSaturation(), getLightness()).hex(),
        },
        {
            title: 'Magenta',
            value: Color.hsv(getRandomInt(260, 345), getSaturation(), getLightness()).hex(),
        },
        {
            title: 'Black',
            value: Color.hsv(0, 0, getRandomInt(0, 10)).hex(),
        },
    ];
};
