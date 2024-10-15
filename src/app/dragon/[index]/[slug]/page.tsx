import Image from 'next/image';
import { s3BucketUrl } from '@/app/constants';
import { notFound } from 'next/navigation';
import { getDragon } from '@/app/dragon/actions/getDragon';
import { alegreya } from '@/app/ui/fonts';
import { boolToYesNo, dragonBio } from '@/app/textUtils';
import { Breeds, LEGS } from '@/app/create/creationSteps';

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
            <h2 className={`text-3xl px-4 ${alegreya.className}`}>{name}</h2>
            <h3 className={`text-xl px-4 pb-2 italic ${alegreya.className}`}>
                {terrain[0].toUpperCase()}
                {terrain.slice(1)} {LEGS[legs as Breeds]}
            </h3>

            {imageKey && (
                <Image
                    priority
                    src={`${s3BucketUrl}${imageKey}.png`}
                    width="1024"
                    height="1024"
                    alt={name}
                    className="border-white border-solid border-4 shadow m-2 "
                    style={{ transform: 'rotate(1deg)' }}
                />
            )}
            <div className="lg:flex ">
                <p className="py-4 lg:px-4 text-lg center w-full">{dragonBio(dragon)}</p>

                <table
                    cellPadding="4"
                    cellSpacing="0"
                    border={1}
                    className="my-2 border-dashed border-blue border-2 w-full mx-auto"
                >
                    <tbody>
                        <tr>
                            <td className=" border-dashed border-blue border-2"> Color:</td>
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