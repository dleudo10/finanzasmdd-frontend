type ContainerProps = {
    className?: string;
    children: React.ReactNode
}

const Container = ({ children }: ContainerProps) => {
    return (
        <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
            {children}
        </div>
    )
}

export default Container
