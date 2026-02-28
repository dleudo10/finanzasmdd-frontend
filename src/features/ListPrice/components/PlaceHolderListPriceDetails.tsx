import Skeleton from '@/components/ui/skeleton/Skeleton'

const PlaceHolderListPriceDetails = () => {
    return (
        <div className="space-y-6">

            <div className="mb-5 p-5 border border-gray-200 bg-white rounded-2xl dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1">
                        <Skeleton className="h-6 w-48 mb-6" />
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="space-y-2">
                                    <Skeleton className="h-3 w-24" /> 
                                    <Skeleton className="h-4 w-40" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <Skeleton className="h-10 w-32 rounded-full" /> 
                </div>
            </div>

            <div className="mb-4 p-5 border border-gray-200 bg-white rounded-2xl dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1">
                        <Skeleton className="h-6 w-40 mb-2" /> 
                        <Skeleton className="h-4 w-80" /> 
                    </div>

                    <Skeleton className="h-10 w-32 rounded-full" /> 
                </div>
            </div>

            <div className="p-5 border border-gray-200 bg-white rounded-2xl dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1">
                        <Skeleton className="h-6 w-40 mb-2" />
                        <Skeleton className="h-4 w-80" /> 
                    </div>

                    <Skeleton className="h-10 w-32 rounded-full" /> 
                </div>
            </div>

        </div>
    )
}

export default PlaceHolderListPriceDetails
