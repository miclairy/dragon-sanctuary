import { boolToYesNo } from '@/app/dragon/textUtils';
import { Dragon } from '.prisma/client';

export const StatsTable = ({ dragon }: { dragon: Dragon }) => {
    const { color, eyeColor, fireBreather, waterBreather, armored, horns, fins, feathers, wings, legs, createdAt } =
        dragon;
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
                <tr>
                    <td className=" border-dashed border-blue border-2 "> Color:</td>
                    <td className=" border-dashed border-blue border-2"> {color}</td>
                </tr>
                <tr className="border-dashed border-blue border-2">
                    <td className="border-dashed border-blue border-2"> Eye Color:</td>
                    <td className="border-dashed border-blue border-2"> {eyeColor}</td>
                </tr>
                <tr>
                    <td className="border-dashed border-blue border-2"> Breathes Fire:</td>
                    <td className="border-dashed border-blue border-2"> {boolToYesNo(fireBreather)}</td>
                </tr>
                <tr>
                    <td className="border-dashed border-blue border-2"> Shoots Water:</td>
                    <td className="border-dashed border-blue border-2"> {boolToYesNo(waterBreather)}</td>
                </tr>
                <tr>
                    <td className="border-dashed border-blue border-2"> Armor:</td>
                    <td className="border-dashed border-blue border-2"> {boolToYesNo(armored)}</td>
                </tr>
                <tr>
                    <td className="border-dashed border-blue border-2"> Horns:</td>
                    <td className="border-dashed border-blue border-2"> {horns}</td>
                </tr>
                <tr>
                    <td className="border-dashed border-blue border-2"> Fins:</td>
                    <td className="border-dashed border-blue border-2"> {boolToYesNo(fins)} </td>
                </tr>
                <tr>
                    <td className="border-dashed border-blue border-2"> Feathers:</td>
                    <td className="border-dashed border-blue border-2"> {boolToYesNo(feathers)} </td>
                </tr>
                <tr>
                    <td className="border-dashed border-blue border-2"> Wings:</td>
                    <td className="border-dashed border-blue border-2"> {boolToYesNo(wings)}</td>
                </tr>
                <tr>
                    <td className="border-dashed border-blue border-2"> Legs:</td>
                    <td className="border-dashed border-blue border-2"> {legs}</td>
                </tr>
                <tr>
                    <td className="border-dashed border-blue border-2"> Adopted:</td>
                    <td className="border-dashed border-blue border-2"> {createdAt.toLocaleDateString()}</td>
                </tr>
            </tbody>
        </table>
    );
};