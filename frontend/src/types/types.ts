export interface IProblem {
  _id: string;
  id: string;
  title: string;
  description: string;
  initialCode: string;
  constraints?: string;
  testCases: string[];
  difficulty: "easy" | "medium" | "hard";
  tags: ITag[];
  createdAt: string;
  updatedAt: string;
}

export interface ITag {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IProblemType {
  id: string;
  title: string;
  description: string;
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
}

export interface IMismatch {
  input: string;
  expectedOutput: string;
  actualOutput: string;
  _id: string;
}
