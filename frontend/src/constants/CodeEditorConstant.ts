type LanguageConfig = Record<
  string,
  {
    id: string;
    name: string;
    pistonRuntime: { language: string; version: string };
    defaultCode: string | null;
  }
>;

export const LANGUAGE_CONFIG: LanguageConfig = {
  python: {
    id: "python",
    name: "python",
    pistonRuntime: { language: "python", version: "3.10.0" },
    defaultCode: `print("Hello World")`,
  },
};
