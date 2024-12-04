import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { DESCRIPTION_TAB, ProblemDetailsPageTabs, SOLUTIONS_TAB, SUBMISSIONS_TAB } from "@/constants/tabsConstants";
import { IProblemType } from "@/types/types";
import { ListIcon, ShuffleIcon } from "lucide-react";
import { Link } from "react-router-dom";
import ProblemDescriptionTab from "./ProblemDescriptionTab";
import RenderTabs from "./RenderTabs";
import SolutionTab from "./SolutionTab";
import SubmissionTab from "./SubmissionTab";

interface ProblemDetailsTabsProps {
    problem: IProblemType;
    _solved: boolean;
}

const ProblemDetailsTabs: React.FC<ProblemDetailsTabsProps> = ({ problem, _solved }) => {

    return (
        <>
            <div className="bg-s1 w-full h-full">
                <div className="text-white bg-s1 px-5 pb-2 flex space-x-3 cursor-pointer">
                    <div className="text-dark-yellow font-bold"><a href="/">Pathfiller</a></div>
                    <div className="text-slate-800 text-transparent">|</div>
                    <div className="flex space-x-4">
                        <div className="text-gray-400 pt-0.5"><ListIcon size={22} /></div>
                        <div className="font-bold text-sm pt-1">
                            <Link to="/problemset">Problem List</Link>
                        </div>
                        <div className="text-xl text-gray-400 -translate-y-1">&lt;</div>
                        <div className="text-xl text-gray-400 -translate-y-1">&gt;</div>
                        <div className="pt-1 text-gray-400"><ShuffleIcon size={16} /></div>
                    </div>
                </div>

                <Tabs defaultValue={DESCRIPTION_TAB} className="w-full h-full overflow-y-scroll">
                    <TabsList className="bg-s1 gap-1 w-full">
                        {/* render tabs */}
                        {ProblemDetailsPageTabs.map((tab, index) => {
                            return (
                                <RenderTabs key={index} icon={tab.icon} tabName={tab.tabName} />
                            );
                        })}
                    </TabsList>

                    {/* render tabs content */}
                    <TabsContent value={DESCRIPTION_TAB} defaultChecked={true}>
                        <ProblemDescriptionTab problem={problem} _solved={_solved} />
                    </TabsContent>
                    <TabsContent value={SOLUTIONS_TAB} defaultChecked={true}>
                        <SolutionTab solution={""} />
                    </TabsContent>
                    <TabsContent value={SUBMISSIONS_TAB} defaultChecked={true}>
                        <SubmissionTab submission={""} />
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )
}

export default ProblemDetailsTabs