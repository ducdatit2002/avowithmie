import { useEffect, useState, useCallback, useMemo } from "react";
import { ChevronDownIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
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
  DropdownMenuCheckboxItem,
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

import { fetchUsers, deleteUser, updateUser } from "@/redux/actions/actionUser";
import { DeleteUser } from "./DeleteUser";
import { SheetModifyUser } from "./SheetModifyUser";
import { MdEdit } from "react-icons/md";

export function UserTable() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users || []); // Make sure the state slice name is correct
  const [showModifyUser, setShowModifyUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [departmentFilter, setDepartmentFilter] = useState("");

  useEffect(() => {
    if (!users.length) {
      dispatch(fetchUsers());
    }
  }, [users.length, dispatch]);

  const handleDeleteUser = useCallback(
    (userId) => {
      dispatch(deleteUser(userId)).then(() => {
        dispatch(fetchUsers());
      });
    },
    [dispatch]
  );

  const handleUpdateUser = useCallback(
    (index, updatedUser) => {
      const userId = updatedUser._id;
      dispatch(updateUser(userId, updatedUser)).then(() => {
        dispatch(fetchUsers());
        setShowModifyUser(false);
      });
    },
    [dispatch]
  );

  const handleModifyUser = useCallback((user) => {
    setSelectedUser(user);
    setShowModifyUser(true);
  }, []);

  const handleSetDepartmentFilter = useCallback((department) => {
    setDepartmentFilter(department);
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) => departmentFilter === "" || user.department === departmentFilter
    );
  }, [users, departmentFilter]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "gender",
        header: "Gender",
      },
      {
        accessorKey: "isAdmin",
        header: "Admin",
        cell: ({ row }) => (row.original.isAdmin ? "Yes" : "No"),
      },
      {
        id: "actions",
        header: "Action",
        enableHiding: false,
        cell: ({ row }) => {
          const user = row.original;

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
                    onClick={() => handleModifyUser(user)}
                    className="flex justify-left items-center cursor-pointer w-full h-full hover:border-blue_super_dark"
                  >
                    <MdEdit className="text-blue_super_dark w-6 h-6" />
                    Edit User
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <DeleteUser onDeleteUser={() => handleDeleteUser(user._id)} />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    []
  );

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: filteredUsers,
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
          placeholder="Filter by user name..."
          value={table.getColumn("name")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Department <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem
              checked={departmentFilter === ""}
              onCheckedChange={() => setDepartmentFilter("")}
            >
              All Departments
            </DropdownMenuCheckboxItem>
            {Array.from(new Set(users.map((u) => u.department))).map(
              (department) => (
                <DropdownMenuCheckboxItem
                  key={department}
                  checked={departmentFilter === department}
                  onCheckedChange={() => handleSetDepartmentFilter(department)}
                >
                  {department}
                </DropdownMenuCheckboxItem>
              )
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
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
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
      {selectedUser && (
        <SheetModifyUser
          userData={selectedUser}
          updateUser={handleUpdateUser}
          isOpen={showModifyUser}
          onClose={() => setShowModifyUser(false)}
        />
      )}
    </div>
  );
}
