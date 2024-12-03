import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { getAllProblems } from "@/api/problemApi";
import { DifficultyBadge } from "@/components/core/problem/DifficultyBadge";
import { TagsBadge } from "@/components/core/problem/TagsBadge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { getCurrentProblems, getProblemsBySearchQuery, getTotalPages } from "@/lib/utils";
import { IProblemType, ITag } from "@/types/types";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NotFound from "./Error/NotFound";



const itemsPerPage = 10;

const ProblemSet = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [problems, setProblems] = useState<IProblemType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalProblems, setTotalProblems] = useState<number>(0);
  const [focus, setFocus] = useState<boolean>(false);

  const navigate = useNavigate();
  const handleRoute = (id: string) => {
    navigate(`/codingarena/${id}`);
  }
  const { toast } = useToast()

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await getAllProblems();
        setProblems(response.data);
        setTotalProblems(response.data.length);
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

  // getting problems based on search
  const filteredProblems: IProblemType[] = getProblemsBySearchQuery(problems, searchQuery);


  // getting total pages for problems list
  const totalPages: number = getTotalPages(filteredProblems.length, itemsPerPage)

  // getting list of current items in table
  const currentItems: IProblemType[] = getCurrentProblems(filteredProblems, currentPage, itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleFocus = () => {
    setFocus(true);
  }
  const handleFocusOut = () => {
    setFocus(false);
  }

  if (error) {
    return <NotFound />
  }

  return (
    <div className="g7 md:px-4">
      {/* <Navbar /> */}
      <div className="min-h-screen pt-5 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-white">Problem Set</h1>
        <p className="mt-2 text-sm text-gray-400">
          A comprehensive list of coding problems with their difficulty levels and categories.
        </p>
        <div className="flex items-center mt-4">
          <Input
            placeholder="Search for a question"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md placeholder-slate-400 rounded-r-none h-8"
            onFocus={handleFocus}
            onBlur={handleFocusOut}
          />

          <Search className={`bg-white h-8 w-10 p-2 rounded-r-md text-black justify-center cursor-pointer hover:bg-gray-100 border-l-ring ${focus ? `ring-2 ring-offset-2  ring-black` : `outline-none`}`} />

        </div>
        <div className="mt-2 relative border border-gray-700  rounded-lg">
          {loading ? (
            <div className="absolute flex items-center justify-center text-white inset-0 h-8 text-bold">
              <div className="loader">Loading...</div>
              <img src="" alt="" />
            </div>
          ) : (
            <Table className="text-white">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-300 capitalize">S.No</TableHead>
                  <TableHead className="text-gray-300 capitalize">Questions</TableHead>
                  <TableHead className="text-gray-300 capitalize">Difficulty</TableHead>
                  <TableHead className="pr-10 text-right capitalize text-gray-300">Category</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((problem, index) => (
                  <TableRow key={problem._id} className={index % 2 !== 0 ? "border-b border-gray-700 hover:cursor-pointer" : "border-b hover:cursor-pointer border-gray-700"} onClick={
                    () => handleRoute(problem._id)
                  }>
                    <TableCell>{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                    <TableCell className="font-medium">{problem.title}</TableCell>
                    <TableCell><DifficultyBadge difficulty={problem.difficulty} key={problem.id} /></TableCell>
                    <TableCell className="text-right">
                      {problem.tags.map((tag: ITag) => (
                        <TagsBadge key={tag.id} Tags={tag.name} />
                      ))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter className="bg-s1 rounded-b-lg">
                <TableRow className="bg-s1 rounded-b-lg">
                  <TableCell colSpan={3}>Total Questions</TableCell>
                  <TableCell className="text-right text-white">{totalProblems}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          )}
        </div>

        {!loading && (
          <Pagination className="text-gray-500 mt-5">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    isActive={currentPage === index + 1}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default ProblemSet;
