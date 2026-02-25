type ContainerProps = {
    className?: string;
    children: React.ReactNode
}

const Container = (props: ContainerProps) => {
    return (
        <div className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${props.className}`}>
            {props.children}
        </div>
    )
}

export default Container
