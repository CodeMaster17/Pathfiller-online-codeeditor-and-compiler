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



const itemsPerPage = 3;

const ProblemSet = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [problems, setProblems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalProblems, setTotalProblems] = useState<number>(0);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await fetch("http://localhost:5002/api/v1/problem/all");
        if (!response.ok) {
          throw new Error("Failed to fetch problems");
        }
        const data = await response.json();
        setProblems(data);
        setTotalProblems(data.length); // Store the total number of problems
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

  const filteredProblems = problems.filter((problem) =>
    problem.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);

  const currentItems = filteredProblems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-dark-layer-2 ">
      <Navbar/>
      <div className="min-h-screen pt-5 max-w-7xl mx-auto">
        <Input
          placeholder="Search for a question"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
        <div className="mt-2 relative">
          {loading ? (
            <div className="absolute flex items-center justify-center text-white inset-0 h-8 text-bold">
              <div className="loader">Loading...</div> {/* Replace with your preferred loader */}
              <img src="" alt="" />
            </div>
          ) : (
            <Table className="text-white">
              <TableHeader>
                <TableRow>
                  <TableHead>S.no</TableHead>
                  <TableHead>Question</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead className="text-right">Category</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((problem, index) => (
                  <TableRow key={problem._id} className={index % 2 !== 0 ? "bg-dark-layer-1" : ""}>
                    <TableCell>{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                    <TableCell className="font-medium">{problem.title}</TableCell>
                    <TableCell
                      className={
                        problem.difficulty === "easy"
                          ? "text-green-500"
                          : problem.difficulty === "medium"
                          ? "text-yellow-500"
                          : "text-red-500"
                      }
                    >
                      {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                    </TableCell>
                    <TableCell className="text-right">
                      {problem.tags.map((tag: any, index: number) => (
                        <span key={index} className="tag">
                          {tag.name}
                          {index < problem.tags.length - 1 && ", "}
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
