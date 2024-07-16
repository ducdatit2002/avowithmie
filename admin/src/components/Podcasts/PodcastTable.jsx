import { useEffect, useState, useCallback, useMemo } from "react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
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

import { fetchPodcasts, deletePodcast } from "@/redux/actions/actionPodcast";
import { DeletePodcast } from "./DeletePodcast";
import { SheetModifyPodcast } from "./SheetModifyPodcast";
import { MdEdit } from "react-icons/md";

export function PodcastTable() {
  const dispatch = useDispatch();
  const podcasts = useSelector((state) => state.podcasts.podcasts || []);
  const [showModifyPodcast, setShowModifyPodcast] = useState(false);
  const [selectedPodcast, setSelectedPodcast] = useState(null);

  useEffect(() => {
    if (!podcasts.length) {
      dispatch(fetchPodcasts());
    }
  }, [podcasts.length, dispatch]);

  const handleDeletePodcast = useCallback(
    (podcastId) => {
      dispatch(deletePodcast(podcastId)).then(() => {
        dispatch(fetchPodcasts());
      });
    },
    [dispatch]
  );

  const handleUpdatePodcast = useCallback(
    (podcast) => {
      setSelectedPodcast(podcast);
      setShowModifyPodcast(true);
    },
    []
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "artist",
        header: "Artist",
      },
      {
        accessorKey: "podcast",
        header: "Podcast",
      },
      {
        accessorKey: "img",
        header: "Image",
        cell: ({ row }) => (
          <img src={row.original.img} alt={row.original.name} width="50" />
        ),
      },
      {
        accessorKey: "duration",
        header: "Duration",
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const podcast = row.original;
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
                    onClick={() => handleUpdatePodcast(podcast)}
                    className="flex justify-left items-center cursor-pointer w-full h-full hover:border-blue_super_dark"
                  >
                    <MdEdit className="text-blue_super_dark w-6 h-6" />
                    Edit Podcast
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <DeletePodcast onDeletePodcast={() => handleDeletePodcast(podcast._id)} />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [handleUpdatePodcast, handleDeletePodcast]
  );

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: podcasts,
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
          placeholder="Filter by podcast name..."
          value={table.getColumn("name")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
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
      {selectedPodcast && (
        <SheetModifyPodcast
          podcastData={selectedPodcast}
          isOpen={showModifyPodcast}
          onClose={() => setShowModifyPodcast(false)}
        />
      )}
    </div>
  );
}
