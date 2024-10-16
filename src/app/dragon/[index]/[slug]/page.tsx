import Image from 'next/image';
import { s3BucketUrl } from '@/app/constants';
import { notFound } from 'next/navigation';
import { getDragon } from '@/app/dragon/actions/getDragon';
import { alegreya } from '@/app/ui/fonts';
import { Breeds, LEGS } from '@/app/create/creationSteps';
import { boolToYesNo, dragonBio } from '@/app/dragon/textUtils';

export default async function DragonDetail({ params }: { params: { index: string } }) {
    const dragon = await getDragon(params.index);

    if (!dragon) {
        return notFound();
    }

    const {
        fireBreather,
        waterBreather,
        fins,
        armored,
        wings,
        name,
        legs,
        terrain,
        createdAt,
        imageKey,
        color,
        eyeColor,
        horns,
        feathers,
    } = dragon;

    return (
        <div className="lg:mx-20 bg-purpleLight p-2 rounded-lg mb-10">
            <h2 className={`text-3xl px-4 mt-2 ${alegreya.className}`}>{name}</h2>
            <h3 className={`text-xl px-4 pb-2 italic ${alegreya.className}`}>
                {terrain[0].toUpperCase()}
                {terrain.slice(1)} {LEGS[legs as Breeds]}
            </h3>
            <p className="px-4 text-lg center mb-4">{dragonBio(dragon)}</p>

            <div className="lg:flex place-content-center ">
                {imageKey && (
                    <Image
                        priority
                        src={`${s3BucketUrl}${imageKey}.png`}
                        width="800"
                        height="800"
                        alt={name}
                        className="border-white border-solid border-4 shadow m-2 mx-auto"
                        style={{ transform: 'rotate(1deg)' }}
                    />
                )}
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
            </div>
        </div>
    );
}