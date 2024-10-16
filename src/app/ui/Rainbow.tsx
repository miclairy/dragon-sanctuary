const colors = [
    'bg-red-500',
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-green',
    'bg-blue',
    'bg-indigo-500',
    'bg-violet-500',
    'bg-purpleLight',
];

export const Rainbow = () => {
    return (
        <div className="relative w-24 h-12 overflow-hidden opacity-75 -z-1 ">
            {colors.map((color, index) => (
                <div key={color} className="absolute inset-0 flex items-end justify-center">
                    <div className={`w-[${100 - index * 5}%] h-[${100 - index * 5}%] ${color} rounded-t-full`} />
                </div>
            ))}
        </div>
    );
};
