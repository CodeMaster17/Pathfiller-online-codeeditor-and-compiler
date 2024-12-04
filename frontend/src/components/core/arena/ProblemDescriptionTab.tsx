import { IProblemType, ITag } from '@/types/types';
import { useEffect, useState } from 'react';
import { AiFillDislike, AiFillLike, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { DifficultyBadge } from '../problem/DifficultyBadge';
import { TagsBadge } from '../problem/TagsBadge';
import ProblemConstraints from './components/ProblemConstraints';
import ProblemDescription from './components/ProblemDescription';
interface ProblemDescriptionProps {
    problem: IProblemType;

    // FIXME: _solved not used anywhere
    _solved: boolean;
}
const ProblemDescriptionTab: React.FC<ProblemDescriptionProps> = ({ problem }) => {
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        setLiked(false);
        setDisliked(false);
    }, []);


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
        <div className="flex px-0 py-6 h-[calc(100vh-94px)] bg-s1">
            <div className="px-5">
                {/* Problem heading */}
                <div className="w-full">
                    <div className="flex space-x-4">
                        {/* Title */}
                        <div className="flex-1 mr-2 text-2xl text-white font-medium">{problem.title}</div>
                    </div>
                    <div className="flex items-center mt-2">

                        {/* Displaying difficulty */}

                        <DifficultyBadge difficulty={problem.difficulty} />
                        {problem.tags.map((tag: ITag) => (
                            <TagsBadge key={tag.id} Tags={tag.name} />
                        ))}
                        {/* {_solved && (
								<div className="rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s">
									<BsCheck2Circle />
								</div>
							)} */}

                        {/* Displaying likes */}
                        <div
                            className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-dark-gray-6"
                            onClick={handleLike}
                        >
                            {liked && !updating && <AiFillLike className="text-dark-blue-s" />}
                            {!liked && !updating && <AiFillLike />}
                            {updating && <AiOutlineLoading3Quarters className="animate-spin" />}
                            <span className="text-xs">Likes</span>
                        </div>

                        {/* Displaying dislikes */}
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

                {/* Displaying Problem Statement */}
                <ProblemDescription description={problem.description} />


                {/* Displaying Constraints */}
                <ProblemConstraints constraints={problem.constraints} />

                {/* displaying results */}
                <div className=" text-gray-500  pt-3  mt-3">
                    <div>Accepted <span className="text-white pl-2 text-sm">14.1M</span></div>


                    <div>Submissions <span className="text-white pl-2 text-sm">26.4M</span></div>

                    <div>Acceptance Rate <span className="text-white pl-2 text-sm">53.4%</span></div>
                </div>

                <div className="text-gray-500 text-sm mt-9">Copyright ©️ 2024 PathFillers All rights reserved</div>
            </div>
        </div >
    )
}

export default ProblemDescriptionTab