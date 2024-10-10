interface Props {
    imageUrl?: string;
}

export const GeneratedResult = ({ imageUrl }: Props) => {
    //todo: pancake add dragon description here
    if (!imageUrl) {
        return null;
    }
    return (
        <div>
            <h3>You land again back on the precipice all you are left with is a picture for your journal.</h3>
            <img src={imageUrl} alt="dragon" width={1024} height={1024} />
            <p>
                Congratulations you survived here is your dragon. Adoption is in sponsorship only. You reserve no rights
                to the dragon in life or death. Thank you for helping protect these majestic creatures. T&Cs apply
            </p>
        </div>
    );
};
