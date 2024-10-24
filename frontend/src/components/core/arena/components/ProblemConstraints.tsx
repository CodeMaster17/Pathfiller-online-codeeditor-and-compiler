import React from 'react'

const ProblemConstraints = ({ constraints }) => {
    return (
        <div className="my-8">
            <div className="text-white font-medium">Constraints:</div>
            <ul>
                <li className=" text-sm text-gray-500">
                    {constraints}
                </li>
            </ul>
        </div>
    )
}

export default ProblemConstraints