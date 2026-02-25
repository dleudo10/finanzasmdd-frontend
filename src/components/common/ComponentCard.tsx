interface ComponentCardProps {
    title: string;
    children: React.ReactNode;
    className?: string; // Additional custom classes for styling
    desc?: string;
    actions?: React.ReactNode
}

const ComponentCard: React.FC<ComponentCardProps> = (props: ComponentCardProps) => {
    return (
        <div
            className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${props.className}`}
        >
            {/* Card Header */}
            <div className="px-6 py-5 flex flex-col gap-5 justify-between lg:flex-row">
                <div className="">
                    <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
                        {props.title}
                    </h3>
                    {props.desc && (
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {props.desc}
                        </p>
                    )}
                </div>
                {props.actions && (
                    props.actions
                )}
            </div>

            {/* Card Body */}
            <div className="border-t border-gray-100 dark:border-gray-800">
                <div>{props.children}</div>
            </div>
        </div>
    );
};

export default ComponentCard;
