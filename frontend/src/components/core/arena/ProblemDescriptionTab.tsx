import { EASY_DIFFICULTY, MEDIUM_DIFFICULTY } from '@/constants/problemConstants';
import { IProblemType } from '@/types/types';
import { useEffect, useState } from 'react';
import { AiFillLike, AiOutlineLoading3Quarters, AiFillDislike } from 'react-icons/ai';
interface ProblemDescriptionProps {
    problem: IProblemType;
    _solved: boolean;
}
const ProblemDescriptionTab: React.FC<ProblemDescriptionProps> = ({ problem, _solved }) => {
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [updating, setUpdating] = useState(false);
    const solved = _solved;
    console.log("Problem Description", solved);

    useEffect(() => {
        setLiked(false);
        setDisliked(false);
    }, []);

    const difficultyColor =
        problem.difficulty === EASY_DIFFICULTY
            ? "text-dark-green-s"
            : problem.difficulty === MEDIUM_DIFFICULTY
                ? "text-dark-yellow"
                : "text-dark-pink";

    const handleLike = async () => {
        if (updating) return;
        setUpdating(true);


        setLiked(!liked);
        setUpdating(false);
    };

    const handleDislike = async () => {
        if (updating) return;
        setUpdating(true);


        setDisliked(!disliked);
        setUpdating(false);
    };

    return (
        <div className="flex px-0 py-6 h-[calc(100vh-94px)]">
            <div className="px-5">
                {/* Problem heading */}
                <div className="w-full">
                    <div className="flex space-x-4">
                        {/* <div className="flex-1 mr-2 text-lg text-white font-medium">{problem?.title}</div> */}
                        <div className="flex-1 mr-2 text-2xl text-white font-medium">{problem.title}</div>
                    </div>
                    <div className="flex items-center mt-4">
                        <div
                            className={`${difficultyColor} rounded-[21px] bg-opacity-[.15] bg-white px-2.5 py-1 flex justify-center items-center text-xs font-medium capitalize `}
                        >
                            {problem.difficulty}
                        </div>
                        {/* {_solved && (
								<div className="rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s">
									<BsCheck2Circle />
								</div>
							)} */}
                        <div
                            className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-dark-gray-6"
                            onClick={handleLike}
                        >
                            {liked && !updating && <AiFillLike className="text-dark-blue-s" />}
                            {!liked && !updating && <AiFillLike />}
                            {updating && <AiOutlineLoading3Quarters className="animate-spin" />}
                            <span className="text-xs">Likes</span>
                        </div>
                        <div
                            className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-gray-6"
                            onClick={handleDislike}
                        >
                            {disliked && !updating && <AiFillDislike className="text-dark-blue-s" />}
                            {!disliked && !updating && <AiFillDislike />}
                            {updating && <AiOutlineLoading3Quarters className="animate-spin" />}
                            <span className="text-xs">Dislikes</span>
                        </div>
                    </div>
                </div>

                {/* Problem Statement */}
                <div className="text-white text-sm mt-4 space-y-4">
                    {/* <div dangerouslySetInnerHTML={{ __html: problem.problemStatement }} /> */}
                    <div className="leading-7">
                        {problem.description}
                    </div>
                    <div>You may assume that each input would have exactly one solution, and you may not use the same element twice.</div>
                    <div>You can return the answer in any order.</div>
                </div>


                {/* Constraints */}
                <div className="my-8">
                    <div className="text-white font-medium">Constraints:</div>
                    <ul>
                        <li className=" text-sm text-gray-500">
                            {problem.constraints}
                        </li>
                    </ul>
                </div>


                <div className=" text-gray-500  pt-3  mt-3">
                    <div>Accepted <span className="text-white pl-2 text-sm">14.1M</span></div>
                    {/* <br /> */}
                    {/* <div className="text-slate-200 text-transparent">|</div> */}
                    <div>Submissions <span className="text-white pl-2 text-sm">26.4M</span></div>
                    {/* <br /> */}
                    {/* <div className="text-slate-200 text-transparent">|</div> */}
                    <div>Acceptance Rate <span className="text-white pl-2 text-sm">53.4%</span></div>
                </div>

                <div className="text-gray-500 text-sm mt-9">Copyright ©️ 2024 PathFillers All rights reserved</div>
            </div>
        </div>
    )
}

export default ProblemDescriptionTab