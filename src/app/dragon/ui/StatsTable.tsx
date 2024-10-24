import { Dragon } from '.prisma/client';
import { capitalize, prettifyValue } from '@/utils/textUtils';

export const StatsTable = ({ dragon }: { dragon: Dragon }) => {
    const specialKeyTitles = new Map([
        ['fireBreather', 'Breathes Fire'],
        ['waterBreather', 'Breathes Water'],
        ['createdAt', 'Adopted'],
        ['eyeColor', 'Eye Color'],
    ]);

    const excludedKeys = new Set(['index', 'id', 'slug', 'imageKey']);

    return (
        <table
            cellPadding="4"
            cellSpacing="0"
            border={1}
            className="my-2 border-dashed border-blue border-2 lg:w-auto lg:mb-auto lg:ml-0.5 lg:align-top w-full mx-auto z-10 bg-blueLight bg-opacity-75"
        >
            <thead>
                <tr>
                    <th className=" border-dashed border-blue border-2 bg-pinkLight  " colSpan={2}>
                        Attributes
                    </th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(dragon).map(([key, value]) => {
                    return excludedKeys.has(key) ? null : (
                        <tr key={key}>
                            <td className="border-dashed border-blue border-2 ">
                                {specialKeyTitles.get(key) || capitalize(key)}:
                            </td>
                            <td className="border-dashed border-blue border-2">{prettifyValue(value)}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};