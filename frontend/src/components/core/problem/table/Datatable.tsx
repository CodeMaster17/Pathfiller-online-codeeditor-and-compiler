import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { DataTablePagination } from "./DataTablePagination"


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData extends { _id: string }, TValue>({
    columns,
    data,

}: DataTableProps<TData, TValue>) {

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters,
        },
    })


    const navigate = useNavigate();
    const handleRoute = (id: string) => {
        navigate(`/codingarena/${id}`);
    }

    return (
        <div>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Search questions..."
                    value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("title")?.setFilterValue(event.target.value)
                    }
                    className="max-w-md placeholder-slate-400  h-10  border-2 border-slate-400 bg-s1 text-white"
                />
            </div>
            <Table className="border border-gray-700 rounded-md">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => {
                        return (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        )
                    })}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => {
                            const rowId = row.original._id;
                            return (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    onClick={() => handleRoute(rowId)}
                                    className="cursor-pointer border-b border-gray-700"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell onClick={() => handleRoute(cell.id)} key={cell.id} className="text-gray-300 capitalize">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            )
                        })
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div className="w-full mt-4">
                <DataTablePagination table={table} />
            </div>
        </div >
    )

}