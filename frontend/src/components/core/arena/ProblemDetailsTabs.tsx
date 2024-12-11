import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { DESCRIPTION_TAB, ProblemDetailsPageTabs, SOLUTIONS_TAB, SUBMISSIONS_TAB } from "@/constants/tabsConstants";
import { IProblemType } from "@/types/types";
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