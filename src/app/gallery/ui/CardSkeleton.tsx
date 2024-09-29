import WhimsySpinner from '@/app/ui/WhimsySpinner';

export const CardSkeleton = () => {
    return (
        <div
            role="status"
            className="max-w-sm p-4 border border-purple-200 rounded shadow animate-pulse md:p-6 dark:border-purple-700"
        >
            <div className="flex items-center justify-center h-48 mb-4 bg-purple-300 rounded dark:bg-purple-700">
                <WhimsySpinner />
            </div>
            <div className="h-2.5 bg-purple-200 rounded-full dark:bg-purple-700 w-48 mb-4"></div>

            <span className="sr-only">Loading...</span>
        </div>
    );
};