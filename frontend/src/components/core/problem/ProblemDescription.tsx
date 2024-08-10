import { useState } from "react";
import { AiFillLike, AiFillDislike, AiOutlineLoading3Quarters, AiFillStar } from "react-icons/ai";
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
		<div className="bg-dark-layer-1 w-full">
			{/* TAB */}
			<div className="flex h-11 w-full items-center pt-2 bg-dark-layer-2 text-white">
				<div className={"bg-dark-layer-1 rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer"}>
					Description
				</div>
			</div>

			<div className="flex px-0 py-4 h-[calc(100vh-94px)]">
				<div className="px-5">
					{/* Problem heading */}
					<div className="w-full">
						<div className="flex space-x-4">
							<div className="flex-1 mr-2 text-lg text-white font-medium">{problem?.title}</div>
						</div>
						<div className="flex items-center mt-3">
							<div
								className={`${difficultyColor} inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize `}
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
					<div className="text-white text-sm">
						<div dangerouslySetInnerHTML={{ __html: problem.problemStatement }} />
					</div>

					{/* Examples */}
					<div className="mt-4">
						{problem.examples.map((example, index) => (
							<div key={example.id}>
								<p className="font-medium text-white">Example {index + 1}: </p>
								{example.img && <img src={example.img} alt="" className="mt-3" />}
								<div className="example-card text-zinc-600">
									<pre>
										<strong className="text-white">Input: </strong> {example.inputText}
										<br />
										<strong>Output:</strong> {example.outputText} <br />
										{example.explanation && (
											<>
												<strong>Explanation:</strong> {example.explanation}
											</>
										)}
									</pre>
								</div>
							</div>
						))}
					</div>

					{/* Constraints */}
					<div className="my-8 pb-4">
						<div className="text-white text-sm font-medium">Constraints:</div>
						<ul className="text-white ml-5 list-disc">
							<div dangerouslySetInnerHTML={{ __html: problem.constraints }} />
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProblemDescription;
