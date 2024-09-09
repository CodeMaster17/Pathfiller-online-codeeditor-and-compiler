

const InformationText = ({ message }: { message: string }) => {
    return (
        <div className="w-full text-white bg-dark-fill-3 text-sm p-3 rounded-md">{message}</div>
    )
}

export default InformationText