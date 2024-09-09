import { IRenderTabsProps } from "@/types/types";
import { Book, Loader } from "lucide-react";
import React from "react";
import { AiOutlineSolution } from "react-icons/ai";

const iconColor = "#ffa825";

export const DESCRIPTION_TAB = "Description";
export const SOLUTIONS_TAB = "Solutions";
export const SUBMISSIONS_TAB = "Submissions";

export const ProblemDetailsPageTabs: IRenderTabsProps[] = [
  {
    tabName: DESCRIPTION_TAB,
    icon: React.createElement(Book, { size: 13, color: iconColor }),
  },
  {
    tabName: SOLUTIONS_TAB,
    icon: React.createElement(AiOutlineSolution, {
      size: 13,
      color: iconColor,
    }),
  },
  {
    tabName: SUBMISSIONS_TAB,
    icon: React.createElement(Loader, { size: 13, color: iconColor }),
  },
];
