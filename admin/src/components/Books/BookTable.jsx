import { useEffect, useState, useCallback, useMemo } from "react";
import {  DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,

  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { fetchBooks, deleteBook } from "@/redux/actions/actionBook";
import { DeleteBook } from "./DeleteBook";
import { SheetModifyBook } from "./SheetModifyBook";
import { MdEdit } from "react-icons/md";

export function BookTable() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books || []);
  const [showModifyBook, setShowModifyBook] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    if (!books.length) {
      dispatch(fetchBooks());
    }
  }, [books.length, dispatch]);

  const handleDeleteBook = useCallback(
    (bookId) => {
      dispatch(deleteBook(bookId)).then(() => {
        dispatch(fetchBooks());
      });
    },
    [dispatch]
  );

  const handleUpdateBook = useCallback(
    (book) => {
      setSelectedBook(book);
      setShowModifyBook(true);
    },
    []
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "author",
        header: "Author",
      },
      {
        accessorKey: "bookSchema",
        header: "Book Schema",
      },
      {
        accessorKey: "img",
        header: "Image",
        cell: ({ row }) => (
          <img src={row.original.img} alt={row.original.name} width="50" />
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const book = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Button
                    variant="ghost"
                    onClick={() => handleUpdateBook(book)}
                    className="flex justify-left items-center cursor-pointer w-full h-full hover:border-blue_super_dark"
                  >
                    <MdEdit className="text-blue_super_dark w-6 h-6" />
                    Edit Book
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <DeleteBook onDeleteBook={() => handleDeleteBook(book._id)} />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [handleUpdateBook, handleDeleteBook]
  );

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: books,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by book title..."
          value={table.getColumn("title")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {/* Additional controls like dropdowns for filtering can be added here */}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        {/* Pagination and other controls */}
      </div>
      {selectedBook && (
        <SheetModifyBook
          bookData={selectedBook}
          isOpen={showModifyBook}
          onClose={() => setShowModifyBook(false)}
        />
      )}
    </div>
  );
}
