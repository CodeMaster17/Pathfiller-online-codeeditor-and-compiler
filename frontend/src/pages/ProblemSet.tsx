import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { IProblem, ITag } from "@/types/types";
import { getCurrentProblems, getProblemsBySearchQuery, getTotalPages } from "@/lib/utils";
import { EASY_DIFFICULTY, MEDIUM_DIFFICULTY } from "@/constants/problemConstants";
import { getAllProblems } from "@/api/problemApi";



const itemsPerPage = 10;

const ProblemSet = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [problems, setProblems] = useState<IProblem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalProblems, setTotalProblems] = useState<number>(0);

  const navigate = useNavigate();
  const handleRoute = (id: string) => {
    navigate(`/codingarena/${id}`);
  }

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const data: IProblem[] = await getAllProblems();
        setProblems(data);
        setTotalProblems(data.length);
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  // getting problems based on search
  const filteredProblems: IProblem[] = getProblemsBySearchQuery(problems, searchQuery);


  // getting total pages for problems list
  const totalPages: number = getTotalPages(filteredProblems.length, itemsPerPage)

  // getting list of current items in table
  const currentItems: IProblem[] = getCurrentProblems(filteredProblems, currentPage, itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-dark-layer-2 ">
      <Navbar />
      <div className="min-h-screen pt-5 max-w-7xl mx-auto">
        <Input
          placeholder="Search for a question"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md placeholder-slate-400"
        />
        <div className="mt-2 relative">
          {loading ? (
            <div className="absolute flex items-center justify-center text-white inset-0 h-8 text-bold">
              <div className="loader">Loading...</div>
              <img src="" alt="" />
            </div>
          ) : (
            <Table className="text-white">
              <TableHeader>
                <TableRow>
                  <TableHead>S.no</TableHead>
                  <TableHead>Question</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead className="pr-10 text-right">Category</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((problem, index) => (
                  <TableRow key={problem._id} className={index % 2 !== 0 ? "bg-dark-layer-1 hover:cursor-pointer" : "hover:cursor-pointer"} onClick={
                    () => handleRoute(problem._id)
                  }>
                    <TableCell>{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                    <TableCell className="font-medium">{problem.title}</TableCell>
                    <TableCell
                      className={
                        problem.difficulty === EASY_DIFFICULTY
                          ? "text-green-500"
                          : problem.difficulty === MEDIUM_DIFFICULTY
                            ? "text-yellow-500"
                            : "text-red-500"
                      }
                    >
                      {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                    </TableCell>
                    <TableCell className="text-right">
                      {problem.tags.map((tag: ITag, index: number) => (
                        <span key={index} className="tag inline-block px-1 mr-1 mb-1 bg-gray-300 border border-gray-400 rounded-full text-dark-layer-1">
                          {tag.name}
                        </span>
                      ))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total Questions</TableCell>
                  <TableCell className="text-right">{totalProblems}</TableCell>
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
