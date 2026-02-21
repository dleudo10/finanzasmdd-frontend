import Container from "@/components/common/Container";
import Skeleton from "@/components/ui/skeleton/Skeleton";

const PlaceholderProfile = () => {
    return (
        <div className="space-y-6">

            {/* Meta Card */}
            <Container>
                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                    <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
                        <div className="space-y-3">
                            <Skeleton className="h-4 w-40" />
                            <Skeleton className="h-3 w-60" />
                        </div>
                    </div>
                    <Skeleton className="h-10 w-32 rounded-full" />
                </div>
            </Container>

            <Container>
                <div className="space-y-6">
                    <Skeleton className="h-5 w-48" />

                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="space-y-2">
                                <Skeleton className="h-3 w-24" />
                                <Skeleton className="h-4 w-40" />
                            </div>
                        ))}
                    </div>
                </div>
            </Container>

            <Container>
                <div className="space-y-6">
                    <Skeleton className="h-5 w-40" />
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7">
                        {Array.from({ length: 2 }).map((_, i) => (
                            <div key={i} className="space-y-2">
                                <Skeleton className="h-3 w-20" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                        ))}
                    </div>
                </div>
            </Container>

        </div>
    );
};

export default PlaceholderProfile;