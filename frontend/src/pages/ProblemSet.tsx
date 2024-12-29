import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";

import { getAllProblems } from "@/api/problemApi";
import { DifficultyBadge } from "@/components/core/problem/DifficultyBadge";
import { TagsBadge } from "@/components/core/problem/TagsBadge";
import { useToast } from "@/hooks/use-toast";
import { Difficulty, IProblemType, ITag } from "@/types/types";

import LoadingProblems from "@/components/core/problem/LoadingProblems";
import { DataTable } from "@/components/core/problem/table/Datatable";
import { ServerError } from "./Error/ServerError";


const ProblemSet = () => {
  const [problems, setProblems] = useState<IProblemType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  const { toast } = useToast()

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await getAllProblems();
        setProblems(response.data);
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
          toast({
            title: "Failed to fetch data.",
            description: "Server Error. Please try again later.",
          })
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);

      }
    };
    fetchProblems();
  }, []);



  type IProblemTable = {
    _id: string
    title: string;
    difficulty: Difficulty;
    tags: ITag[];
  }

  // columns of table
  const columns: ColumnDef<IProblemTable>[] = [
    {
      header: "S.no",
      cell: (info) => info.row.index + 1,
    },
    {
      accessorKey: "title",
      header: "Questions",
    },
    {
      accessorKey: "difficulty",
      header: "Difficulty",
      cell: (info) => <DifficultyBadge difficulty={info.row.original.difficulty} key={info.row.original._id} />
    },
    {
      accessorKey: "tags",
      header: "Category",
      cell: (info) => {
        const tags = info.row.original.tags;
        return (
          <>
            {
              tags.map((tag: ITag) => (
                <TagsBadge key={tag.id} Tags={tag.name} />
              ))
            }
          </>

        )
      }
    }
  ]

  if (error) {
    return <ServerError />
  }

  return (
    <div className="g7 md:px-4">
      {/* <Navbar /> */}
      <div className="min-h-screen pt-5 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-white">Problem Set</h1>
        <p className="mt-2 text-sm text-gray-400">
          A comprehensive list of coding problems with their difficulty levels and categories.
        </p>
        <div className="mt-2 relative rounded-lg">
          {loading ? (
            <>
              <LoadingProblems />
            </>
          ) : (
            <DataTable columns={columns} data={problems} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemSet;
