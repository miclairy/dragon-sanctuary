export const ErrorBox = () => {
    return (
        <div className="max-w-md mx-auto my-8">
            <div className="bg-red-100 border-4 border-dashed border-red-400 rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-4">
                    <div className="flex-1 min-w-0">
                        <p className="text-lg font-medium text-gray-900">Trust me somebody is not have a good day</p>
                        <p className="text-sm text-gray-500 truncate">Something went wrong and we are sad too</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
