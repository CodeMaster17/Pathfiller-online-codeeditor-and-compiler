import InformationText from "../InformationText"


const SolutionTab = ({ solution }: { solution: string }) => {
    return (
        <>{solution.length > 0 ? solution :
            <div className="p-2">
                <InformationText message="Feature coming soon!" />
            </div>
        }</>
    )
}

export default SolutionTab