import { TabsContent } from '@radix-ui/react-tabs';
import React from 'react'

interface IRenderTabsComponent {
    content: string;
    value: string;
}

const RenderTabsContent: React.FC<IRenderTabsComponent> = ({ content, value }) => {
    return (
        <TabsContent value={value} className="w-full border-2 border-red-100">{content}</TabsContent>
    )
}

export default RenderTabsContent