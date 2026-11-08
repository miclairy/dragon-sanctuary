import { useState } from 'react';
interface Props {
    svg: string;
}

export const GeneratedResult = ({ svg }: Props) => {
    //todo: pancake add dragon description here

    const [objectUrl] = useState(() => {
        const blob = new Blob([svg], {
            type: 'image/svg+xml',
        });
        return URL.createObjectURL(blob);
    });

    return (
        <div className=" mt-4 max-w-3xl h-3xl mx-auto rounded-xl border-dashed border-blue border-2 ">
            <h3 className="p-4 text-lg">
                You land again back on the precipice and all you are left with is a picture for your journal.
            </h3>
            {/*eslint-disable-next-line @next/next/no-img-element -- short-lived svg URL, not worth optimising */}
            <img
                className="border-white border-solid border-4 shadow"
                style={{ transform: 'rotate(1deg)' }}
                src={objectUrl}
                alt="the dragon you found"
                width={1024}
                height={1024}
            />
            <p className="text-sm p-2 my-4">
                Congratulations you survived here is your dragon. Adoption is in sponsorship only. You reserve no rights
                to the dragon in life or death. Thank you for helping protect these majestic creatures. T&Cs apply
            </p>
        </div>
    );
};
