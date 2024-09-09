import { TabsTrigger } from "@/components/ui/tabs"
import { IRenderTabsProps } from "@/types/types"

import React from 'react'


const RenderTabs: React.FC<IRenderTabsProps> = ({ icon, tabName }) => {
    return (
        <TabsTrigger defaultChecked={tabName === "Description" ? true : false} value={tabName} className="[state=active]:bg-dark-layer-2 flex items-center gap-2 bg-dark-fill-2">
            {icon}
            <div className="">{tabName}</div>
        </TabsTrigger>
    )
}

export default RenderTabs