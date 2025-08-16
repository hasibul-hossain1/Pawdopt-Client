import React, { useState } from "react";
import { api } from "../../lib/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "../../components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { toast } from "sonner";
import TableSkeleton from "./TableSkeleton";

const AllUsers = () => {
  const queryClient = useQueryClient();
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await api.get("/users");
      return res.data;
    },
  });

  const toggleAdminMutation = useMutation({
    mutationFn: async ({ id, currentRole }) => {
      // if () {

      // }
      const newRole = currentRole === "admin" ? "user" : "admin";
      await api.patch(`/users/admin/${id}`, { role: newRole });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-users"]);
      toast.success("User role updated successfully!");
    },
    onError: (error) => {
      toast.error("Failed to update user role." + error?.message);
    },
  });

  const toggleBanUserMutation = useMutation({
    mutationFn: async ({ id, isBanned }) => {
      await api.patch(`/users/ban/${id}`, { isBanned: !isBanned });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-users"]);
      toast.success("User ban status updated successfully!");
    },
    onError: (error) => {
      toast.error("Failed to update ban status." + error?.message);
    },
  });

  const columns = [
    {
      accessorKey: "serialNumber",
      header: "SL",
      cell: (info) =>
        info.row.index + 1 + pagination.pageIndex * pagination.pageSize,
      enableSorting: false,
    },
    {
      accessorKey: "photoURL",
      header: "Profile",
      cell: ({ row }) => (
        <Avatar>
          <AvatarImage src={row.original.photoURL} alt={row.original.name} />
          <AvatarFallback>
            {row.original.name ? row.original.name[0] : "U"}
          </AvatarFallback>
        </Avatar>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "name",
      header: () => <span className="cursor-pointer">Name</span>,
    },
    {
      accessorKey: "email",
      header: () => <span className="cursor-pointer">Email</span>,
    },
    {
      accessorKey: "role",
      header: () => <span className="cursor-pointer">Role</span>,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              toggleAdminMutation.mutate({
                id: row.original._id,
                currentRole: row.original.role,
              })
            }
            disabled={row.original.isBanned} // Disable if user is banned
          >
            {row.original.role === "admin" ? "Make User" : "Make Admin"}
          </Button>
          <Button
            variant={row.original.isBanned ? "outline" : "destructive"}
            size="sm"
            onClick={() =>
              toggleBanUserMutation.mutate({
                id: row.original._id,
                isBanned: row.original.isBanned,
              })
            }
          >
            {row.original.isBanned ? "Unban User" : "Ban User"}
          </Button>
        </div>
      ),
      enableSorting: false,
    },
  ];

  const table = useReactTable({
    data: users || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    state: {
      sorting,
      pagination,
    },
  });

  if (isLoading) return <TableSkeleton columns={columns} />;
  if (isError) return <div>Error loading users: {error.message}</div>;

  return (
      <div className="container mx-auto py-10" data-aos="fade-up">
        <h2 className="text-2xl font-bold mb-4">All Users</h2>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className={
                        header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : ""
                      }
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted()] ?? null}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
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

        {table.getPageCount() > 1 && (
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <span className="text-sm">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        )}
      </div>
  );
};

export default AllUsers;
