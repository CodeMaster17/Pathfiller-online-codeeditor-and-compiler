

const ProblemDescription = ({ description }: { description: string }) => {
    return (
        <div className="text-white text-sm mt-4 space-y-4">
            {/* <div dangerouslySetInnerHTML={{ __html: problem.problemStatement }} /> */}
            <div className="leading-7">
                {description}
            </div>
            <div>You may assume that each input would have exactly one solution, and you may not use the same element twice.</div>
            <div>You can return the answer in any order.</div>
        </div>
    )
}

export default ProblemDescription