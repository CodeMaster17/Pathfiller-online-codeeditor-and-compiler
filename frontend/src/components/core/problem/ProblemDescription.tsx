import { Book, BookMarked, ListIcon, Loader, ShuffleIcon } from "lucide-react";
import { useState } from "react";
import { AiFillLike, AiFillDislike, AiOutlineLoading3Quarters, AiFillStar, AiOutlineSolution } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";

type ProblemDescriptionProps = {
	problem: {
		id: string;
		title: string;
		difficulty: string;
		problemStatement: string;
		examples: Array<{
			id: string;
			inputText: string;
			outputText: string;
			explanation?: string;
			img?: string;
		}>;
		constraints: string;
		likes: number;
		dislikes: number;
	};
	_solved: boolean;
};

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({ problem, _solved }) => {
	const [liked, setLiked] = useState(false);
	const [disliked, setDisliked] = useState(false);
	const [starred, setStarred] = useState(false);
	const [updating, setUpdating] = useState(false);

	const difficultyColor =
		problem.difficulty === "Easy"
			? "text-dark-green-s"
			: problem.difficulty === "Medium"
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

	const handleStar = async () => {
		if (updating) return;
		setUpdating(true);


		setStarred(!starred);
		setUpdating(false);
	};

	return (
		<div className="bg-dark-layer-2 w-full overflow-y-scroll h-full">
			<div className="text-white bg-black px-5 pb-2 flex space-x-3 cursor-pointer">
				<div className="text-dark-yellow font-bold">Pathfiller</div>
				<div className="text-slate-800 text-transparent">|</div>
				<div className="flex space-x-4">
					<div className="text-gray-400 pt-0.5"><ListIcon size={22}/></div>
					<div className="font-bold text-sm pt-1">Problem List</div>
					<div className="text-xl text-gray-400 -translate-y-1">&lt;</div>
					<div className="text-xl text-gray-400 -translate-y-1">&gt;</div>
					<div className="pt-1 text-gray-400"><ShuffleIcon size={16}/></div>
				</div>
			</div>
			{/* TAB */}
			<div className="flex h-9 w-full items-center pt-3 px-5 space-x-3 cursor-pointer rounded-lg bg-dark-layer-1 text-sm text-white">
				<div className="flex space-x-1">
					<Book size={13} color="#ffa825"/>
					<div className="-translate-y-1">Description</div>
				</div>
				<div className="text-slate-700 text-transparent -translate-y-1">|</div>
				<div className="flex space-x-1">
					<BookMarked size={13} color="#ffa825"/>
					<div className="-translate-y-1">Editorial</div>
				</div>
				<div className="text-slate-700 text-transparent -translate-y-1">|</div>
				<div className="flex space-x-1">
					<AiOutlineSolution size={13} color="#ffa825"/>
					<div className="-translate-y-1">Solutions</div>
				</div>
				<div className="text-slate-700 text-transparent -translate-y-1">|</div>
				<div className="flex space-x-1">
					<Loader size={13} color="#ffa825"/>
					<div className="-translate-y-1">Submissions</div>
				</div>
			</div>

			<div className="flex px-0 py-6 h-[calc(100vh-94px)]">
				<div className="px-5">
					{/* Problem heading */}
					<div className="w-full">
						<div className="flex space-x-4">
							{/* <div className="flex-1 mr-2 text-lg text-white font-medium">{problem?.title}</div> */}
							<div className="flex-1 mr-2 text-2xl text-white font-medium">1. Two Sum</div>
						</div>
						<div className="flex items-center mt-4">
							<div
								className={`${difficultyColor} inline-block rounded-[21px] bg-opacity-[.15] bg-white px-2.5 py-1 pb-1.5 text-xs font-medium capitalize `}
							>
								{problem.difficulty}
							</div>
							{_solved && (
								<div className="rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s">
									<BsCheck2Circle />
								</div>
							)}
							<div
								className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-dark-gray-6"
								onClick={handleLike}
							>
								{liked && !updating && <AiFillLike className="text-dark-blue-s" />}
								{!liked && !updating && <AiFillLike />}
								{updating && <AiOutlineLoading3Quarters className="animate-spin" />}
								<span className="text-xs">{problem.likes}</span>
							</div>
							<div
								className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-gray-6"
								onClick={handleDislike}
							>
								{disliked && !updating && <AiFillDislike className="text-dark-blue-s" />}
								{!disliked && !updating && <AiFillDislike />}
								{updating && <AiOutlineLoading3Quarters className="animate-spin" />}
								<span className="text-xs">{problem.dislikes}</span>
							</div>
							<div
								className="cursor-pointer hover:bg-dark-fill-3 rounded p-[3px] ml-4 text-xl transition-colors duration-200 text-dark-gray-6"
								onClick={handleStar}
							>
								{starred && !updating && <AiFillStar className="text-dark-yellow" />}
								{!starred && !updating && <TiStarOutline />}
								{updating && <AiOutlineLoading3Quarters className="animate-spin" />}
							</div>
						</div>
					</div>

					{/* Problem Statement */}
					<div className="text-white text-sm mt-4 space-y-4">
						{/* <div dangerouslySetInnerHTML={{ __html: problem.problemStatement }} /> */}
						<div className="leading-7">Given an array of integers <span className="rounded-[5px] border border-slate-400 p-0.5 bg-opacity-[.15] bg-white">nums</span> and an integer <span className="rounded-[5px] border border-slate-400 p-0.5 bg-opacity-[.15] bg-white">target</span>, return indices of the two numbers such that they add up to <span className="rounded-[5px] border border-slate-400 p-0.5 bg-opacity-[.15] bg-white">target</span>.</div>
						<div>You may assume that each input would have exactly one solution, and you may not use the same element twice.</div>
						<div>You can return the answer in any order.</div>
					</div>

					{/* Examples */}
					<div className="mt-10">
						{problem.examples.map((example, index) => (
							<div key={example.id}>
								<p className="font-medium text-white">Example {index + 1}: </p>
								{example.img && <img src={example.img} alt="" className="mt-3" />}
								<div className="example-card text-zinc-600">
									<pre>
										<strong className="text-white">Input: <span className="text-gray-400">nums = [2,7,11,15], target = 9</span></strong> 
										{/* {example.inputText} */}
										<br />
										<strong className="text-white">Output: <span className="text-gray-400">[0,1]</span></strong> 
										{/* {example.outputText}  */}
										<br />
										{example.explanation && (
											<>
												<strong className="text-white">Explanation: <span className="text-gray-400">Because nums[0] + nums[1] == 9, we return [0, 1].</span></strong> 
												{/* {example.explanation} */}
											</>
										)}
									</pre>
								</div>
							</div>
						))}
					</div>

					{/* Constraints */}
					<div className="my-8 pb-4">
						<div className="text-white font-medium">Constraints:</div>
						<ul className="text-white ml-5 list-disc text-sm mt-2">
							<li className="rounded-[21px] bg-opacity-[.15] bg-white px-2 w-[28%]">2 &lt;= nums.length &lt;= 10<sup>4</sup></li>
							<li className="rounded-[21px] bg-opacity-[.15] bg-white px-2 mt-1 w-[26%]">-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></li>
							<li className="rounded-[21px] bg-opacity-[.15] bg-white px-2 mt-1 w-[24%]">-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></li>
						</ul>
					</div>


					<div className="border-t flex text-gray-500 pl-9 pt-3 space-x-14 mt-3">
						<div>Accepted <span className="text-white pl-2">14.1M</span></div>
						<div className="text-slate-200 text-transparent">|</div>
						<div>Submissions <span className="text-white pl-2">26.4M</span></div>
						<div className="text-slate-200 text-transparent">|</div>
						<div>Acceptance Rate <span className="text-white pl-2">53.4%</span></div>
					</div>

					<div className="text-gray-500 text-sm mt-9">Copyright ©️ 2024 PathFillers All rights reserved</div>
				</div>
			</div>
		</div>
	);
};

export default ProblemDescription;
